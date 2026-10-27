import { useState } from "react";
import axios from "axios";
import "./components-style.css";

function LoginForm({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        axios
            .post("http://localhost:3001/api/auth/login", { email, password })
            .then((loginRes) => {
                const userData = loginRes.data;
                const headers = { Authorization: `Bearer ${userData.token}` };

                return Promise.all([
                    Promise.resolve(userData),
                    axios.get("http://localhost:3001/api/auth/permissions", { headers }),
                ]);
            })
            .then(([userData, permRes]) => {
                const user = {
                    ...userData.user,
                    role: userData.user.role?.toLowerCase(),
                    token: userData.token,
                    permissions: permRes.data.permissions,
                    roles: permRes.data.roles,
                };
                localStorage.setItem("user", JSON.stringify(user));
                onLogin(user);
            })
            .catch((err) => {
                if (err.response?.status === 401 || err.response?.status === 403) {
                    setError("Invalid email or password.");
                } else {
                    setError(err.response?.data?.message ?? "Something went wrong. Please try again.");
                }
            });
    };


    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                className="email input"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <input
                type="password"
                placeholder="Password"
                className="password input"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            {error && (
                <span style={{ color: "red", fontSize: "0.85rem" }}>
                    {error}
                </span>
            )}
            <button type="submit">Sign In</button>
        </form>
    );
}

export default LoginForm;
