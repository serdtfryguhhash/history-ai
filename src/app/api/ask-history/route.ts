import { NextRequest, NextResponse } from "next/server";
import { getHistoricalAnalysis } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const answer = await getHistoricalAnalysis(question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Ask History error:", error);
    return NextResponse.json(
      { error: "Failed to process your question" },
      { status: 500 }
    );
  }
}
