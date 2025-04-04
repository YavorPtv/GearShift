import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { useRegister } from "../../api/authApi";
import { useUserContext } from "../../contexts/UserContext";

export default function Register() {
    const navigate = useNavigate();
    const { register, isLoading } = useRegister();
    const { userLoginHandler } = useUserContext();

    const registerHandler = async (formData) => {
        const { username, email, password, confirmPassword, profilePicture } = Object.fromEntries(formData);

        try {
            if (password !== confirmPassword){
                throw new Error('Password missmatch!');
            }
            const authData = await register(username, email, password, profilePicture);

            toast.success('Successfully registered!');

            navigate(-1);
            userLoginHandler(authData);
        } catch (err) {
            toast.error(err.message);
        }


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
                    <label htmlFor="confirmPassword">Repeat Password:</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Repeat your password" required />
                </div>
                <div className="register-form-group">
                    <label htmlFor="profilePicture">Profile Picture (Optional):</label>
                    <input type="text" id="profilePicture" name="profilePicture" placeholder="Enter your profile picture" />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}