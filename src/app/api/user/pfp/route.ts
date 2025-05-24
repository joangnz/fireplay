import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, rm } from "fs/promises";
import path from "path";
import mysql from "mysql2/promise";
import { randomBytes } from "crypto";
import { connection_data } from "@/lib/connection";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const connection = await mysql.createConnection(connection_data);

  const [rows]: any[] = await connection.execute(
    "SELECT pfp_route FROM users WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
    [username]
  );

  await connection.end();

  if ((rows).length != 1) {
    await connection.end();
    return NextResponse.json(
      { error: "Couldn't find the specified user." },
      { status: 409 }
    );
  }

  let pfpRoute: string = rows[0].pfp_route;
  
  return NextResponse.json({ success: true, route: pfpRoute });
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("pfpFile") as File;
  const username = formData.get("username") as string;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (!username) {
    return NextResponse.json({ error: "User is invalid." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");

  await mkdir(uploadsDir, { recursive: true });

  const ext = path.extname(file.name) || ".png";
  const randomName = randomBytes(16).toString("hex");
  const fileName = `${randomName}${ext}`;
  const filePath = path.join(uploadsDir, fileName);
  const fileRoute = `/uploads/${fileName}`;

  await writeFile(filePath, buffer);

  const connection = await mysql.createConnection(connection_data);

  const [rows] = await connection.execute(
    "SELECT pfp_route FROM users WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
    [username]
  );

  const pfpRoute = (rows as any[])[0].pfp_route;

  let hadPfp = false;

  if (pfpRoute) {
    hadPfp = true;
  }

  try {
    await addPfpDb(connection, username, fileRoute);
  } catch (error) {
    await rm(filePath);
  }

  if (hadPfp) {
    const oldFilePath = path.join(process.cwd(), "public", pfpRoute);
    try {
      await rm(oldFilePath);
    } catch (e) {
      console.log("Error removing old file:", e);
    }
  }

  return NextResponse.json({ success: true, path: fileRoute });
}

async function addPfpDb(
  connection: mysql.Connection,
  username: string,
  fileRoute: string
) {
  const [rows] = await connection.execute(
    "UPDATE users SET pfp_route = ? WHERE user_id = (SELECT user_id FROM users WHERE username = ?)",
    [fileRoute, username]
  );
}
