import { useParams } from "react-router";
import { getAllNavigation } from "../config/customDashboards";

function DashboardPage() {
    const { slug } = useParams();

    const dashboard = getAllNavigation().find(
        (item) => item.path === `/${slug}`,
    );

    if (!dashboard) return <div>No dashboard found at /{slug}</div>;

    return <div>This is {dashboard.name} Dashboard</div>;
}

export default DashboardPage;
