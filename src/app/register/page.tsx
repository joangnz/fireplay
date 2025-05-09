import Link from "next/link"

import '../../styles/auth.css'

export default function registerPage() {
    return (
        <div id="authWrapper" className="auth-container">
            <h1 className="auth-title">Register</h1>
            <form className="auth-form mb-2">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" name="username" id="username" className="form-input" placeholder="Enter your username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" id="password" className="form-input" placeholder="Enter your password" required />
                </div>
                <button type="submit" className="auth-button">Register</button>
            </form>
            <p className="auth-footer">
                Already have an account? <Link href="/login">Log in</Link>
            </p>
        </div>
    );
}