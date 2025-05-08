import { GameDetails } from "../types/game-details.types";

export default function GameMainInfo({ game }: { game: GameDetails }) {
    return (
        <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Game Details</h2>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Released:</strong> {game.released}</li>
                <li><strong>Developers:</strong> {game.developers.map(dev => dev.name).join(", ")}</li>
                <li><strong>Genres:</strong> {game.genres.map(genre => genre.name).join(", ")}</li>
                <li><strong>Platforms:</strong> {game.platforms.map(platform => platform.platform.name).join(", ")}</li>
                <li><strong>Website:</strong> <a href={game.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{game.website}</a></li>
            </ul>
        </div>
    );
}