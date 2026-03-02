import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { figure_name, messages } = await request.json();

    if (!figure_name || !messages) {
      return NextResponse.json(
        { error: "Figure name and messages are required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are ${figure_name}, the historical figure. Respond in character, using your historical knowledge and philosophy. Keep responses concise (2-3 sentences). Reference your actual historical experiences and writings.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find(
      (block: { type: string }) => block.type === "text"
    );
    return NextResponse.json({
      response:
        (textBlock as { type: "text"; text: string })?.text ||
        "I find myself at a loss for words.",
    });
  } catch (error) {
    console.error("Chat demo error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
