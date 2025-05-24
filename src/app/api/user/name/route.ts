import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { connection_data } from "@/lib/connection";

export async function POST(request: NextRequest) {
    const { username, newUsername } = await request.json();

    if (!username || !newUsername) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const connection = await mysql.createConnection(connection_data);

    await connection.execute(
        "UPDATE users SET username = ? WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
        [newUsername, username]
    );

    await connection.end();

    return NextResponse.json({ success: true });
}