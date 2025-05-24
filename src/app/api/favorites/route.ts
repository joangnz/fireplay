import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { connection_data } from "@/lib/connection";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const connection = await mysql.createConnection(connection_data);

  const [rows] = await connection.execute(
    "SELECT user_id, game_id FROM users_favorites WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
    [username]
  );

  await connection.end();

  return NextResponse.json({ rows: rows });
}

export async function POST(request: NextRequest) {
  const { username, game_id, isFavorite } = await request.json();

  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "fireplay_db",
  });

  if (isFavorite) {
    const sql = `DELETE FROM users_favorites
    WHERE user_id = (SELECT user_id FROM users WHERE username = ?)
    AND game_id = ?;`;
    const [rows] = await connection.execute(sql, [username, game_id]);
  } else {
    const sql = `INSERT INTO users_favorites
    VALUES ((SELECT user_id FROM users WHERE username = ?), ?, CURRENT_TIMESTAMP);`;
    const [rows] = await connection.execute(sql, [username, game_id]);
  }

  await connection.end();

  return NextResponse.json({ success: true });
}
