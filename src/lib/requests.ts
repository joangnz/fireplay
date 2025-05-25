import axios from "axios";
import { resolveMetadata } from "next/dist/lib/metadata/resolve-metadata";

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

export async function getUserCart(username: string) {
  try {
    const res = (await axios.get("/api/cart?username=" + username)).data.rows;
    return res;
  } catch (error) { }
}

export async function addCartGame(username: string, game_id: number) {
  try {
    const res = await axios.post('/api/cart', { username, game_id });
  } catch (error) { }
}

export async function removeCartGame(username: string, game_id: number) {
  try {
    const res = await axios.delete(`/api/cart?username=${username}&game_id=${game_id}`);
  } catch (error) { }
}

export async function completePurchase(username: string) {
  try {
    const res = await axios.post('api/cart/buy', {username});
    return res;
  } catch (error) { }
}

export async function getFavoritesList(username: string) {
  try {
    return (await axios.get("/api/favorites?username=" + username)).data.rows;
  } catch (error) { }
}

export async function toggleFavorite(
  username: string,
  game_id: number,
  isFavorite: boolean
) {
  try {
    const res = await axios.post("/api/favorites", {
      username,
      game_id,
      isFavorite,
    });
    return res;
  } catch (error: any) { }
}

export async function changeUsername(username: string, newUsername: string) {
  try {
    const res = await axios.post("api/user/name", { username, newUsername });
    return res;
  } catch (error) { }
}

export async function getPfp(username: string) {
  try {
    const res = await axios.get("api/user/pfp?username=" + username);
    return res;
  } catch (error) { }
}

export async function newPfp(formData: FormData) {
  try {
    const res = await axios.post("/api/user/pfp", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) { }
}
