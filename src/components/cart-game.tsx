import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import $ from 'jquery';

import { removeCartGame } from "@/lib/requests";

import DeleteButton from "../../public/close-x.svg";

import type { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
    const [username, setUsername] = useState<string>("");
    const [isVisible, setIsVisible] = useState(true);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        setUsername(storedUsername);
    });

    async function handleDelete(game_id: number) {

        if (!username) {
            return window.location.href = '/login';
        }

        await removeCartGame(username, game_id);

        if (cardRef.current) {
            $(cardRef.current).hide(400, () => {
                setIsVisible(false);
            });
        }
    }

    if (!isVisible) return null;

    return (
        <div ref={cardRef} className="relative">
            <div className="absolute top-2 right-2 z-10">
                <button className="pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        handleDelete(game.id);
                    }}
                    aria-label="Delete Game"
                >
                    <DeleteButton />
                </button>
            </div>

            <Link href={`/game/${game.slug}`}>
                <div className="game-card flex items-center gap-4 rounded-xl shadow hover:shadow-lg transition p-4 bg-blue-600">
                    <img
                        src={game.background_image}
                        alt={game.name}
                        className="w-64 h-32 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                        <h3 className="text-4xl font-semibold">{game.name}</h3>
                    </div>
                </div>
            </Link>
        </div>
    );
}