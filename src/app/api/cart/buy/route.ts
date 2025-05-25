import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { connection_data } from "@/lib/connection";

export async function POST(request: NextRequest) {
    const { username } = await request.json();

    if (!username) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const connection = await mysql.createConnection(connection_data);

    const [rows] = await connection.execute(
        "SELECT * FROM users_games_cart WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
        [username]
    );

    if ((rows as any[]).length == 0) {
        await connection.end();
        return NextResponse.json({ error: "No items to buy" }, { status: 400 });
    }

    (rows as any[]).forEach(async (row) => {
        let {user_id, game_id} = row;
        await connection.execute(
            `
            INSERT INTO users_purchases
            VALUES (?, ?, CURRENT_TIMESTAMP)
            `, [user_id, game_id]
        );
    });

    await connection.execute("DELETE FROM users_games_cart WHERE user_id = ?", [username]);

    await connection.end();

    return NextResponse.json({ success: true });

}