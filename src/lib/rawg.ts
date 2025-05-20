import axios from "axios";

import { Game } from "@/types/games.types";
import { GameDetails } from "@/types/game-details.types";

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function getSearchedGames(query: string, username: string) {
  const rawgUrl = `${API_URL}/games?key=${API_KEY}&search=${query}`;
  const { data } = await axios.get(rawgUrl);

  try {
    if (username) {
      const favoritesRes = (await axios.get("/api/favorites?username=" + username)).data.rows;

      console.log(favoritesRes);
      favoritesRes.forEach((favoriteGame: any) => {
        data.results.forEach((game: Game) => {
            game.favorite = favoriteGame.game_id == game.id ? true : false;
        });
      });
    }
  } catch (error) {}
  return data.results;
}

export async function getGameDetails(slug: string): Promise<GameDetails> {
  const { data: game } = await axios.get(
    `${API_URL}/games/${slug}?key=${API_KEY}`
  );
  const { data: screenshotsData } = await axios.get(
    `${API_URL}/games/${game.id}/screenshots?key=${API_KEY}`
  );

  return {
    ...game,
    screenshots: screenshotsData.results.map(
      (screenshot: { image: string }) => ({
        image: screenshot.image,
      })
    ),
  };
}
