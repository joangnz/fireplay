"use client";

import { useState } from "react";
import Link from "next/link"

import { loginUser } from "@/lib/requests";

import '../../styles/auth.css'

export default function loginPage() {
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const res = await loginUser(
            formData.get("username") as string, formData.get("password") as string
        );

        if (res && res.status == 200) {
            localStorage.setItem('username', formData.get("username") as string);
            window.location.href = '/';
        } else {
            setError(res?.data?.error || "Login failed");
        }
    }

    return (
        <div id="authWrapper" className="auth-container">
            <h1 className="auth-title">Log In</h1>
            <form className="auth-form mb-2" onSubmit={handleSubmit}>
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
            {error && <div className="auth-error">{error}</div>}
            <p className="auth-footer">
                Don't have an account? <Link href="/register" className="auth-link">Register</Link>
            </p>
        </div>
    );
}