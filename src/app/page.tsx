import { getSearchedGames } from "../lib/rawg";
import GameCard from "../components/card";
import { Game } from "@/types/games.types";

export default async function HomePage() {
  const games = await getSearchedGames("");

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game: Game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}