'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import CartGame from '@/components/cart-game';
import { Game } from '@/types/games.types';
import Loading from './loading';

import { getCartGames } from '@/lib/rawg';

export default function CartPage() {
    const [username, setUsername] = useState<string>("");
    const [cartGames, setCartGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';

        getCartGames(storedUsername).then((fetchedGames) => {
            setCartGames(fetchedGames);
            setLoading(false);
        });
    }, []);


    return (
        <>
            {loading ? (
                <Loading></Loading>
            ) : cartGames.length > 0 ? (
                <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {cartGames.map((game) => (
                        <CartGame key={game.id} game={game} />
                    ))}
                </section>
            ) : (
                <p className="text-center text-gray-500">No tienes ningún juego en tu carrito aún... <br /> <Link href="/">¡Ve a comprar!</Link></p>
            )}
        </>
    )
}