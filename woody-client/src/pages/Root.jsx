import { useState } from "react";
import { Outlet } from "react-router";
import LoginPage from "./LoginPage";
import Sidebar from "../components/Sidebar";
import getStoredUser from "../utils/auth";
import { UserContext } from "../context/UserContext";

function Root() {
    const [user, setUser] = useState(getStoredUser);

    if (!user) {
        return <LoginPage onLogin={setUser} />;
    }

    return (
        <UserContext.Provider value={user}>
            <div className="container">
                <Sidebar />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </UserContext.Provider>
    );
}

export default Root;
