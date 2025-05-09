import Link from "next/link"

import '../../styles/auth.css'

export default function loginPage() {
    return (
        <div id="authWrapper" className="auth-container">
            <h1 className="auth-title">Log In</h1>
            <form className="auth-form mb-2">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" id="username" className="form-input" placeholder="Enter your username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-input" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="auth-button">Log In</button>
            </form>
            <p className="auth-footer">
                Don't have an account? <Link href="/register" className="auth-link">Register</Link>
            </p>
        </div>
    );
}