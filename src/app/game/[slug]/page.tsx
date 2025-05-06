import { getGameDetails } from "../../../lib/requests";
import { GameDetails } from "../../../types/game-details.types";
import GameMainInfo from "../../../components/game-main-info";
import GameMainImages from "../../../components/game-main-images";
import Rating from "../../../components/rating";
export default async function GameDetailPage({ params }: {
    params: {
        slug: string
    }
}) {
    const game: GameDetails = await getGameDetails(params.slug);
    if (!game) return null;
    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
            <GameMainImages game={game} />
            <GameMainInfo game={game} />
            <Rating rating={game.rating} />
            <div className="mt-6 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: game.description }} />
            </div>
        </div>
    );
}