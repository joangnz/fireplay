import axios from "axios";

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

export async function getFavoritesList(username: string) {
  return (await axios.get("/api/favorites?username=" + username)).data.rows;
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
  } catch (error: any) {}
}

export async function newPfp(formData: FormData) {
  try {
    const res = await axios.post("/api/user", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res;
  } catch (error) {}
}
