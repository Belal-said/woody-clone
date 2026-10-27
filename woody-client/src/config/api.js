// Vite sets PROD/DEV at build time: `npm run build` bakes in the live API,
// `npm run dev` uses the local server.
export const API_URL = import.meta.env.PROD
    ? "https://api.woody.hwoodgroup.com"
    : "http://localhost:3001";
