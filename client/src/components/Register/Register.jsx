import { useNavigate } from "react-router";
import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";
import request from "../../utils/request";

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (formData) => {
        const { username, email, password, confirmPassword } = Object.fromEntries(formData);

        if (password !== confirmPassword){
            console.log('Password missmatch');
        }

        const authData = await register(username, email, password);

        userLoginHandler(authData);

        navigate('/');
    }
    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form action={registerHandler}>
                <div className="register-form-group">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" required />
                </div>
                <div className="register-form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email" required />
                </div>
                <div className="register-form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required />
                </div>
                <div className="register-form-group">
                    <label htmlFor="confirmPassword">Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat your password" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}