import axios from "axios";

import { Game } from "@/types/games.types";
import { GameDetails } from "@/types/game-details.types";

import { getFavoritesList } from "./requests";

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function getSearchedGames(query: string, username: string) {
  const rawgUrl = `${API_URL}/games?key=${API_KEY}&search=${query}`;
  const { data } = await axios.get(rawgUrl);

  try {
    if (username) {
      const favoritesRes = await getFavoritesList(username);

      favoritesRes.forEach((favoriteGame: any) => {
        data.results.forEach((game: Game) => {
          if (!game.favorite) {
            game.favorite = favoriteGame.game_id == game.id ? true : false;
          }
        });
      });
    }
  } catch (error) {}
  return data.results;
}

export async function getFavoriteGames(username: string) {
  const favoritesRes = await getFavoritesList(username);
  const favoriteGameIds = favoritesRes.map((favorite: any) => favorite.game_id);

  const favoriteGamesDetails: Game[] = [];

  for (const gameId of favoriteGameIds) {
    const rawgUrl = `${API_URL}/games/${gameId}?key=${API_KEY}`;
    try {
      const { data } = await axios.get(rawgUrl);

      const game: Game = {
        id: data.id,
        slug: data.slug,
        name: data.name,
        background_image: data.background_image || "",
        rating: data.rating || 0,
        favorite: true,
      };

      favoriteGamesDetails.push(game);
    } catch (error) {
      console.error(`Failed to fetch data for game ID ${gameId}:`, error);
    }
  }

  return favoriteGamesDetails;
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
