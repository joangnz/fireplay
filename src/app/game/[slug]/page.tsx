import { useEffect, useState } from "react";

import { getGameDetails } from "../../../lib/rawg";
import { GameDetails } from "../../../types/game-details.types";
import GameMainInfo from "../../../components/game-main-info";
import GameMainImages from "../../../components/game-main-images";
import Rating from "../../../components/rating";
import AddCart from "../../../components/add-cart";

export default async function GameDetailPage(
    props: { params: Promise<{ slug: string }> }
) {
    const params = await props.params;
    const game: GameDetails = await getGameDetails(params.slug);
    if (!game) return null;

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
            <GameMainImages game={game} />
            <GameMainInfo game={game} />
            <Rating rating={game.rating} />
            <AddCart game_id={game.id}></AddCart>
            <div className="mt-6 prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: game.description }} />
            </div>
        </div>
    );
}