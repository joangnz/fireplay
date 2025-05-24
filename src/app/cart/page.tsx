'use client';

import { useEffect, useState } from 'react';

export default function CartPage() {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';
    }, []);


    return (
        <section>

        </section>
    )
}