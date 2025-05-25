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
        "SELECT user_id, game_id FROM users_games_cart WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
        [username]
    );

    await connection.end();

    return NextResponse.json({ rows: rows });
}

export async function POST(request: NextRequest) {
    const { username, game_id } = await request.json();

    const connection = await mysql.createConnection(connection_data);

    const [rows] = await connection.execute(
        `
        SELECT * FROM users_games_cart
        WHERE game_id = ?
        AND user_id = (SELECT user_id FROM users WHERE username = ?)
        `,
        [game_id, username]
    )

    if ((rows as any[]).length > 0) {
        await connection.end();
        return NextResponse.json(
            { error: "Game already in cart" },
            { status: 409 }
        );
    }

    await connection.execute(
        `
        INSERT INTO users_games_cart
        VALUES ((SELECT user_id FROM users WHERE username = ?), ?, CURRENT_TIMESTAMP)
        `,
        [username, game_id]
    );

    await connection.end();

    return NextResponse.json({});
}

export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");
    const game_id = searchParams.get("game_id");

    if (!username || !game_id) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const connection = await mysql.createConnection(connection_data);

    await connection.execute(
        `
        DELETE FROM users_games_cart
        WHERE game_id = ?
        AND user_id = (SELECT user_id FROM users WHERE username = ?)
        `,
        [game_id, username]
    );

    await connection.end();

    return NextResponse.json({ success: true });
}