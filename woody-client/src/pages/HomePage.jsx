import { useUser } from "../context/UserContext";

function HomePage() {
    const user = useUser();
    console.log(user);
    return <div>This is Home Page</div>
}

export default HomePage