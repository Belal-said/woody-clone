import { navigation } from "./navigation";

// Custom dashboards work differently per environment:
// - dev: the Vite plugin writes them into navigation.js (see vite.config.js),
//   so the file is the single source of truth.
// - production: the deployed site is static files and can't rewrite source,
//   so they are saved in this browser's localStorage instead.

function getStored() {
    try {
        return JSON.parse(localStorage.getItem("customDashboards")) ?? [];
    } catch {
        return [];
    }
}

export function getAllNavigation() {
    if (import.meta.env.DEV) return navigation;
    return [...navigation, ...getStored()];
}

export function getCustomDashboards() {
    if (import.meta.env.DEV) return navigation.filter((item) => item.custom);
    return getStored();
}

export async function addDashboard(dashboard) {
    if (import.meta.env.DEV) {
        const res = await fetch("/__navigation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dashboard),
        });
        if (!res.ok) throw new Error((await res.json()).error);
        return; // Vite reloads the page when navigation.js changes.
    }

    localStorage.setItem(
        "customDashboards",
        JSON.stringify([...getStored(), { ...dashboard, custom: true }]),
    );
    window.location.reload();
}

export async function removeDashboard(path) {
    if (import.meta.env.DEV) {
        const res = await fetch(
            `/__navigation?path=${encodeURIComponent(path)}`,
            { method: "DELETE" },
        );
        if (!res.ok) throw new Error((await res.json()).error);
        return;
    }

    localStorage.setItem(
        "customDashboards",
        JSON.stringify(getStored().filter((d) => d.path !== path)),
    );
    window.location.reload();
}
