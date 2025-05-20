'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';

import { Game } from '@/types/games.types';

import { getSearchedGames } from '../../lib/rawg';
import GameCard from '../../components/card';
import Loading from './loading';

interface SearchPageProps {
    searchParams: {
        query: string;
    };
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ query: string }> }) {
    const query = use(searchParams).query || '';

    const [games, setGames] = useState<Game[]>([]);
    const [username, setUsername] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        setUsername(storedUsername);

        if (query) {
            getSearchedGames(query, storedUsername).then(fetchedGames => {
                setGames(fetchedGames);
                setLoading(false);
            });
        } else {
            setGames([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div>
            <h2>Búsqueda de {query}</h2>
            {loading ? (
                <Loading></Loading>
            ) : games.length > 0 ? (
                <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game: Game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </section>
            ) : (
                <p className="text-center text-gray-500">No hay juegos que coincidan con tu búsqueda.</p>
            )}
        </div>
    );
}