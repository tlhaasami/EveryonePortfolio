import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("fontFile") as File;
    const fontName = formData.get("fontName") as string;

    if (!file || !fontName) {
      return NextResponse.json(
        { error: "Missing font file or font name." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure target folder exists
    const fontsDir = path.join(process.cwd(), "public", "fonts");
    await fs.mkdir(fontsDir, { recursive: true });

    // Sanitize name and extract extension
    const extension = path.extname(file.name) || ".ttf";
    const filename = `custom-${fontName.toLowerCase().replace(/\s+/g, "-")}${extension}`;
    const filePath = path.join(fontsDir, filename);

    // Save the file
    await fs.writeFile(filePath, buffer);

    const relativeUrl = `/fonts/${filename}`;

    return NextResponse.json({
      success: true,
      fontName: fontName,
      fontUrl: relativeUrl,
      format: extension === ".woff2" ? "woff2" : extension === ".woff" ? "woff" : "truetype"
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred while uploading the font." },
      { status: 500 }
    );
  }
}
export const dynamic = "force-dynamic";
