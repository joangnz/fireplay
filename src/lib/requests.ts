import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

export async function getSearchedGames(query: string) {
  const url = `${API_URL}/games?key=${API_KEY}&search=${query}`;
  const { data } = await axios.get(url);

  return data.results;
}
