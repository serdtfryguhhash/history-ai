import { NextRequest, NextResponse } from "next/server";
import { chatWithFigure } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { figure_name, personality_prompt, messages } = await request.json();

    if (!figure_name || !messages) {
      return NextResponse.json({ error: "Figure name and messages are required" }, { status: 400 });
    }

    const response = await chatWithFigure(figure_name, personality_prompt, messages);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
