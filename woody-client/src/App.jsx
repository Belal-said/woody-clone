import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import TipsPage from "./pages/TipsPage";
import SalesPage from "./pages/SalesPage";
import CommissionsPage from "./pages/CommissionsPage";
import ChecklistsPage from "./pages/ChecklistsPage";
import CashDropsPage from "./pages/CashDropsPage";
import SafeCountPage from "./pages/SafeCountPage";
import DashboardsPage from "./pages/DashboardsPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Navigate to="/home" replace />,
            },
            { path: "home", element: <HomePage /> },
            { path: "tips", element: <TipsPage /> },
            { path: "sales", element: <SalesPage /> },
            { path: "commissions", element: <CommissionsPage /> },
            { path: "checklists", element: <ChecklistsPage /> },
            { path: "cashdrops", element: <CashDropsPage /> },
            { path: "safecount", element: <SafeCountPage /> },
            { path: "dashboards", element: <DashboardsPage /> },
            { path: ":slug", element: <DashboardPage /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
