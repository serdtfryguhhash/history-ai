import { NextRequest, NextResponse } from "next/server";
import { chatWithFigure } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const { figure_name, personality_prompt, messages, memoryContext } = await request.json();

    if (!figure_name || !messages) {
      return NextResponse.json({ error: "Figure name and messages are required" }, { status: 400 });
    }

    // Inject memory context into personality prompt if available
    const enhancedPrompt = memoryContext
      ? `${personality_prompt}\n\nContext about the user you are speaking with: ${memoryContext}`
      : personality_prompt;

    const response = await chatWithFigure(figure_name, enhancedPrompt, messages);
    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
