import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import { writeFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import path from 'node:path'

function sendJson(res, status, body) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(body))
}

// Dev-only plugin: lets the Dashboards page save entries straight into
// src/config/navigation.js. The browser can't write files, but the Vite
// dev server (a Node process) can.
function navigationWriter() {
  let navFile

  async function readNavigation() {
    // ?t= skips Node's module cache so we always get the file's current contents.
    const { navigation } = await import(`${pathToFileURL(navFile).href}?t=${Date.now()}`)
    return navigation
  }

  function writeNavigation(navigation) {
    const data = JSON.stringify(navigation, null, 4)
      .replace(/"([A-Za-z_$][\w$]*)":/g, '$1:')
    writeFileSync(navFile, `export const navigation = ${data};\n`)
  }

  return {
    name: 'navigation-writer',
    apply: 'serve',
    configResolved(config) {
      navFile = path.resolve(config.root, 'src/config/navigation.js')
    },
    configureServer(server) {
      server.middlewares.use('/__navigation', async (req, res) => {
        try {
          if (req.method === 'POST') {
            let body = ''
            for await (const chunk of req) body += chunk
            const { name, path: navPath, roles } = JSON.parse(body)

            if (!name?.trim())
              return sendJson(res, 400, { error: 'Name is required.' })
            if (!/^\/[a-z0-9-]+$/.test(navPath ?? ''))
              return sendJson(res, 400, { error: 'Path must look like /inventory.' })
            if (!Array.isArray(roles) || roles.length === 0)
              return sendJson(res, 400, { error: 'Pick at least one role.' })

            const navigation = await readNavigation()
            if (navigation.some((item) => item.path === navPath))
              return sendJson(res, 409, { error: `${navPath} is already used.` })

            navigation.push({ name: name.trim(), path: navPath, roles, custom: true })
            writeNavigation(navigation)
            return sendJson(res, 201, { ok: true })
          }

          if (req.method === 'DELETE') {
            const navPath = new URL(req.url, 'http://localhost').searchParams.get('path')
            const navigation = await readNavigation()
            const item = navigation.find((i) => i.path === navPath)

            if (!item)
              return sendJson(res, 404, { error: 'No dashboard at that path.' })
            if (!item.custom)
              return sendJson(res, 400, { error: "Built-in pages can't be removed." })

            writeNavigation(navigation.filter((i) => i.path !== navPath))
            return sendJson(res, 200, { ok: true })
          }

          sendJson(res, 405, { error: 'Method not allowed.' })
        } catch (err) {
          sendJson(res, 500, { error: err.message })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  // Read .env from the project root, shared with woody-server.
  envDir: '../',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    navigationWriter(),
  ],
})
