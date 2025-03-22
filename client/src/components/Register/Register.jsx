export default function Register() {
    return (
        <div className="register-form-container">
            <h2>Register</h2>
            <form>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
}