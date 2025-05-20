import { getSearchedGames } from '../../lib/rawg';
import GameCard from '../../components/card';
import { Game } from '@/types/games.types';

export default async function SearchPage(props: { searchParams: Promise<{ query: string }> }) {
    const searchParams = await props.searchParams;
    const searchQuery = searchParams.query || '';
    const games: Game[] = searchQuery ? await getSearchedGames(searchQuery) : [];

    return (
        <section className="p-8">
            {games.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {games.map((game: Game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No hay juegos que coincidan con tu búsqueda.</p>
            )}
        </section>
    );
}