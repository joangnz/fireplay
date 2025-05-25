import { useEffect, useState } from "react";
import Link from "next/link";

import { removeCartGame } from "@/lib/requests";

import DeleteButton from "../../public/close-x.svg";

import type { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        setUsername(storedUsername);
    });

    async function handleDelete(game_id: number) {

        if (!username) {
            return window.location.href = '/login';
        }

        const res = await removeCartGame(username, game_id);
    }

    return (
        <Link href={`/game/${game.slug}`}>
            <div className="game-card relative flex items-start gap-4 rounded-xl shadow hover:shadow-lg transition p-4 bg-blue-600">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-64 h-32 object-cover rounded-lg flex-shrink-0"
                />

                <div className="flex-1">
                    <h3 className="text-xl font-semibold">{game.name}</h3>
                    <span className="text-lg text-white font-bold block mt-1">30.00€</span>
                </div>

                <div className="absolute top-2 right-2">
                    <DeleteButton onClick={(event: Event) => {
                        event.preventDefault();
                        handleDelete(game.id);
                    }}></DeleteButton>
                </div>
            </div>
        </Link>
    );
}