'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import $ from "jquery";

import './header.css';

export default function Header() {
    const router = useRouter();
    const [search, setSearch] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        }
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
                    <button id="searchBarSubmit" type="submit">SEARCH</button>
                </form>
                <nav>
                    <Link href="/favorites" className="hover:underline">
                        Favoritos
                    </Link>
                    <Link href="/cart" className="hover:underline">
                        Carrito
                    </Link>
                    <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}