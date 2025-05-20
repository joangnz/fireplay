'use client';

import { useEffect, useState } from 'react';

import { getSearchedGames } from "../lib/rawg";
import GameCard from "../components/card";
import { Game } from "@/types/games.types";

export default function HomePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || '';
    setUsername(storedUsername);

    getSearchedGames("", storedUsername).then((fetchedGames) => {
      setGames(fetchedGames);
    });
  }, []);

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}