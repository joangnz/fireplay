import Link from "next/link";
import type { Game } from "../types/games.types";

export default function GameCard({ game }: { game: Game }) {
    return (
        <Link href={`/game/${game.slug}`}>
            <div className="rounded-xl shadow hover:shadow-lg transition p-4">
                <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-semibold">{game.name}</h3>
                <p className="text-sm text-gray-500">Rating: {game.rating}</p>
            </div>
        </Link>
    );
}