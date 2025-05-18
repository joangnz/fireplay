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
