'use client';
import { useEffect, useState } from "react";

import { addCartGame } from "@/lib/requests";

export default function AddCart({ game_id }: { game_id: number }) {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';
    }, []);

    const handleAddCart = () => {
        if (!username) {
            window.location.href = "/login";
        }

        addCartGame(username, game_id);
    }

    return <button onClick={handleAddCart} className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all">ADD TO CART</button>
}