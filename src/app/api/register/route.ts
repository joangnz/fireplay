import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { connection_data } from "@/lib/connection";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const connection = await mysql.createConnection(connection_data);

  const [rows] = await connection.execute(
    "SELECT user_id FROM users WHERE username = ?",
    [username]
  );
  if ((rows as any[]).length > 0) {
    await connection.end();
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await connection.execute(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword]
  );
  await connection.end();

  return NextResponse.json({ success: true });
}
