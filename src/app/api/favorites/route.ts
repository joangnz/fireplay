import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "fireplay_db",
  });

  const [rows] = await connection.execute(
    "SELECT user_id, game_id FROM users_favorites WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
    [username]
  );

  await connection.end();

  return NextResponse.json({ success: true });
}
