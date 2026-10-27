import { NavLink } from "react-router";
import { getAllNavigation } from "../config/customDashboards";
import { useUser } from "../context/UserContext";

function Sidebar() {
    const user = useUser();
    const navigation = getAllNavigation();

    if (!user) return null;

    const userPermissionKeys = Array.isArray(user.permissions)
        ? user.permissions.map((p) => (typeof p === "string" ? p : p.key))
        : [];

    console.log('user.role:', user.role);
    console.log('userPermissionKeys:', userPermissionKeys);

    const visibleItems = navigation.filter((item) => {
        const hasRole = !item.roles || item.roles.includes(user.role);
        const hasPermission =
            !item.permissions ||
            item.permissions.some((per) => userPermissionKeys.includes(per));
        return hasRole && hasPermission;
    });

    return (
        <aside className="sidebar">
            <div>Woody</div>
            <nav>
                {visibleItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === "/home"}
                    >
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
