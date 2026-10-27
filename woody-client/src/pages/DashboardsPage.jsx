import { useState } from "react";
import { navigation } from "../config/navigation";
import "../components/components-style.css";

const ALL_ROLES = ["admin", "manager", "employee"];

function DashboardsPage() {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [roles, setRoles] = useState(ALL_ROLES);
    const [error, setError] = useState(null);

    const customDashboards = navigation.filter((item) => item.custom);

    const toggleRole = (role) => {
        setRoles((prev) =>
            prev.includes(role)
                ? prev.filter((r) => r !== role)
                : [...prev, role],
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        const trimmedName = name.trim();
        // One URL segment: lowercase, letters/numbers only, dashes between words.
        const slug = path
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        if (!trimmedName) return setError("Name is required.");
        if (!slug) return setError("Path is required.");
        if (roles.length === 0) return setError("Pick at least one role.");

        // The Vite dev server writes the entry into navigation.js,
        // then reloads the page with the updated file.
        fetch("/__navigation", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmedName, path: `/${slug}`, roles }),
        })
            .then(async (res) => {
                if (!res.ok) throw new Error((await res.json()).error);
                setName("");
                setPath("");
            })
            .catch((err) => setError(err.message));
    };

    const handleRemove = (navPath) => {
        setError(null);
        fetch(`/__navigation?path=${encodeURIComponent(navPath)}`, {
            method: "DELETE",
        })
            .then(async (res) => {
                if (!res.ok) throw new Error((await res.json()).error);
            })
            .catch((err) => setError(err.message));
    };

    return (
        <div>
            <h2>Dashboards</h2>
            <form className="dashboard-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Dashboard name"
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Path (e.g. inventory)"
                    className="input"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                />
                <fieldset className="role-checks">
                    <legend>Visible to</legend>
                    {ALL_ROLES.map((role) => (
                        <label key={role}>
                            <input
                                type="checkbox"
                                checked={roles.includes(role)}
                                onChange={() => toggleRole(role)}
                            />
                            {role}
                        </label>
                    ))}
                </fieldset>
                {error && (
                    <span style={{ color: "red", fontSize: "0.85rem" }}>
                        {error}
                    </span>
                )}
                <button type="submit">Add Dashboard</button>
            </form>

            {customDashboards.length > 0 && (
                <ul className="dashboard-list">
                    {customDashboards.map((d) => (
                        <li key={d.path}>
                            <span>
                                {d.name} — {d.path}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(d.path)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default DashboardsPage;
