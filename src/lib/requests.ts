import axios from "axios";

import { GameDetails } from "@/types/game-details.types";

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function getSearchedGames(query: string) {
  const url = `${API_URL}/games?key=${API_KEY}&search=${query}`;
  const { data } = await axios.get(url);

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

export async function registerUser(username: string, password: string) {
  try {
    const res = await axios.post("/api/register", {
      username,
      password,
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
}

export async function loginUser(username: string, password: string) {
  try {
    const res = await axios.post("/api/login", {
      username,
      password,
    });
    return res;
  } catch (error: any) {
    return error.response;
  }
}
