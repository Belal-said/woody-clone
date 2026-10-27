import { useParams } from "react-router";
import { navigation } from "../config/navigation";

function DashboardPage() {
    const { slug } = useParams();

    const dashboard = navigation.find((item) => item.path === `/${slug}`);

    if (!dashboard) return <div>No dashboard found at /{slug}</div>;

    return <div>This is {dashboard.name} Dashboard</div>;
}

export default DashboardPage;
