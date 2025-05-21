import Link from "next/link";
import { useEffect, useState } from "react";

import { toggleFavorite } from "@/lib/requests";

import Favorite from '../../public/favorite.svg';
import type { Game } from "../types/games.types";

import '../styles/card.css';

export default function GameCard({ game }: { game: Game }) {
    const [username, setUsername] = useState<string>("");
    const [isFavorite, setIsFavorite] = useState<boolean>(game.favorite);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        setUsername(storedUsername);
    });

    async function handleFavorite(game_id: number, isFavorite: boolean) {
        if (!username) {
            return window.location.href = '/login';
        }
        
        const res = await toggleFavorite(username, game_id, isFavorite);
        if (res && res.status == 200) {
            setIsFavorite(!isFavorite);
        }
    }

    return (
        <Link href={`/game/${game.slug}`}>
            <div className="game-card rounded-xl shadow hover:shadow-lg transition p-4">
                <div className={'favorite-button' + (isFavorite ? ' favorite' : '')}>
                    <Favorite onClick={(event: Event) => {
                        event.preventDefault();
                        handleFavorite(game.id, isFavorite);
                    }}></Favorite>
                </div>
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <p className="text-sm text-gray-500">Rating: {game.rating}</p>
            </div>
        </Link>
    );
}