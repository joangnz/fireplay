import { getSearchedGames } from "../lib/requests";
import GameCard from "../components/card";

export default async function HomePage() {
  const games = await getSearchedGames("zelda");

  return (
    <section className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}