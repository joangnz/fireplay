import { GameDetails } from "../types/game-details.types";

export default function GameMainImages({ game }: { game: GameDetails }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {game.screenshots?.map((screenshot, index) => (
                <img
                    key={index}
                    src={screenshot.image}
                    alt={`Screenshot ${index + 1}`}
                    className="rounded-lg shadow-md"
                />
            ))}
        </div>
    );
}