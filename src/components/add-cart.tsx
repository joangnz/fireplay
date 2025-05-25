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

    return <button onClick={handleAddCart}>ADD TO CART</button>
}