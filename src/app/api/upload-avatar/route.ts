import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("avatarFile") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No avatar image file provided." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure assets/images directory exists
    const imagesDir = path.join(process.cwd(), "public", "assets", "images");
    await fs.mkdir(imagesDir, { recursive: true });

    // Extract extension and generate a clean name
    const extension = path.extname(file.name) || ".jpeg";
    const filename = `avatar-${Date.now()}${extension}`;
    const filePath = path.join(imagesDir, filename);

    // Save the image
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/assets/images/${filename}`;

    return NextResponse.json({
      success: true,
      imageUrl: relativeUrl
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred while uploading the avatar." },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
