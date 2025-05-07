'use client';

import Link from 'next/link';
import './header.css';

export default function Header() {
    return (
        <header>
            <div className="container">
                <Link href="/" className="text-xl font-bold tracking-wide">
                    Fireplay
                </Link>
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