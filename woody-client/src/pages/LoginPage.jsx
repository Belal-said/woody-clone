import LoginForm from "../components/LoginForm";

function LoginPage({ onLogin }) {
    return (
        <div className="login-container">
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;
