export default function Login() {
    return (
        <div className="login-form-container">
            <h2>Login</h2>
            <form>
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