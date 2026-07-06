import { NextResponse } from "next/server";
import { savePortfolioData } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { data } = await request.json();

    if (!data || !data.profile || !data.skills) {
      return NextResponse.json(
        { error: "Invalid portfolio data." },
        { status: 400 }
      );
    }

    await savePortfolioData(data);

    return NextResponse.json({
      success: true,
      message: "Portfolio changes saved successfully.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "An error occurred while saving portfolio." },
      { status: 500 }
    );
  }
}
