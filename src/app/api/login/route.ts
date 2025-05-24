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
    "SELECT user_id, password FROM users WHERE username = ?",
    [username]
  );

  await connection.end();

  if ((rows as any[]).length !== 1) {
    return NextResponse.json(
      { error: "Username or password are invalid." },
      { status: 409 }
    );
  }

  const user = (rows as any[])[0];
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return NextResponse.json(
      { error: "Username or password are invalid." },
      { status: 409 }
    );
  }

  return NextResponse.json({ success: true });
}
