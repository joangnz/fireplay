'use client';

import { useEffect, useState } from 'react';

import { Game } from "@/types/games.types";

import { getFavoriteGames } from "@/lib/rawg";
import GameCard from "../../components/card";
import Loading from './loading';

export default function FavoritesPage() {
    const [games, setGames] = useState<Game[]>([]);
    const [username, setUsername] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';

        getFavoriteGames(storedUsername).then((fetchedGames) => {
            setGames(fetchedGames);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : games.length > 0 ? (
                <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </section>
            ) : (
                <p className="text-center text-gray-500">No tienes ningún juego favorito aún... <br /> ¡Deberías jugar más!</p>
            )}
        </>
    );
}