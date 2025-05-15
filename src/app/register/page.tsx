"use client";

import { useState } from "react";
import Link from "next/link"
import $ from 'jquery';

import { registerUser } from "@/lib/requests";

import '../../styles/auth.css'

export default function registerPage() {
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const res = await registerUser(
            formData.get("username") as string, formData.get("password") as string
        );

        if (res && res.status == 200) {
            $("#authWrapper form, #authWrapper p.auth-footer").remove();

            $("#authWrapper").append(`
                <div class="register-success">
                    <h2>Register Successful</h2>
                    <p>
                        You can now <a href="/login">log in</a>.
                    </p>
                </div>
            `);
        } else {
            setError(res?.data?.error || "Registration failed");
        }
    }

    return (
        <div id="authWrapper" className="auth-container">
            <h1 className="auth-title">Register</h1>
            <form className="auth-form mb-2" onSubmit={handleSubmit}>
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
            {error && <div className="auth-error">{error}</div>}
            <p className="auth-footer">
                Already have an account? <Link href="/login">Log in</Link>
            </p>
        </div>
    );
}