'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import $ from "jquery";

import '../styles/header.css';

export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState('');
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        setUsername(localStorage.getItem('username'));
    }, []);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        window.location.reload();
    };

    return (
        <header>
            <div className="container">
                <Link href="/" className="text-xl font-bold tracking-wide">
                    Fireplay
                </Link>
                <form id="searchBarWrapper" onSubmit={handleSearchSubmit}>
                    <input id="searchBar"
                        placeholder='Search games...'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} ></input>
                    <button id="searchBarSubmit" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                        </svg>
                    </button>
                </form>
                <nav>
                    <Link href={username ? ("/favorites") : ("/login")} className="hover:underline">
                        Favoritos
                    </Link>
                    <Link href={username ? ("/cart") : ("/login")} className="hover:underline">
                        Carrito
                    </Link>
                    {username ? (
                        <>
                            <Link href="/profile">
                                <span className="username">{username}</span>
                            </Link>
                            <a href="#" className="hover:underline" onClick={handleLogout}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <Link href="/login" className="hover:underline">
                            Login
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}