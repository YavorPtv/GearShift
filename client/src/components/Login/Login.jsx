import { useNavigate } from "react-router";
import { useLogin } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin();
    const { userLoginHandler } = useUserContext();

    const loginHandler = async (formData) => {
        const {email, password} = Object.fromEntries(formData);

        const authData = await login(email, password);

        userLoginHandler(authData);

        navigate('/');
    }

    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form action={loginHandler}>
                <div className="login-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}