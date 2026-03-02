import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { question, memoryContext } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const memoryAddition = memoryContext
      ? `\n\nUser context (use this to tailor your response depth and references): ${memoryContext}`
      : "";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: `You are History.ai, a scholarly AI historian. When given a modern problem or question, you find historical parallels, cite real historical events and figures, and extract timeless lessons. Always provide:
1. A relevant historical parallel with specific dates, figures, and events
2. The context of what happened historically
3. How it relates to the modern situation
4. Actionable lessons derived from history
5. At least 2-3 real historical sources or references

Your tone is warm, scholarly, and engaging - like a brilliant history professor at a fireside chat. Use specific names, dates, and places. Never fabricate historical events.${memoryAddition}`,
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const answer = textBlock?.text || "I could not generate a response.";
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Ask History error:", error);
    return NextResponse.json(
      { error: "Failed to process your question" },
      { status: 500 }
    );
  }
}
