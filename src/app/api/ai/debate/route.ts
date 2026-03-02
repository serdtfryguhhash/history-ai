import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { topic, aiSide, messages, roundNumber } = await request.json();

    if (!topic || !messages) {
      return NextResponse.json({ error: "Topic and messages are required" }, { status: 400 });
    }

    const isEvaluation = roundNumber > 4;

    const systemPrompt = isEvaluation
      ? `You are a scholarly debate judge for History.ai. The debate topic was: "${topic}". You took the "${aiSide}" position. Now evaluate the user's arguments.

Respond ONLY with valid JSON:
{
  "evaluation": "Your detailed evaluation of both sides' arguments (2-3 paragraphs)",
  "score": <number 1-10>,
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"]
}

Be fair but rigorous. Award higher scores for specific historical evidence, logical reasoning, and nuanced analysis.`
      : `You are a brilliant historical debater for History.ai. The debate topic is: "${topic}". You are arguing the "${aiSide}" position.

Make compelling arguments using specific historical evidence, dates, figures, and events. Be persuasive but intellectually honest. Keep responses to 2-3 paragraphs. Challenge the user's arguments directly while advancing your own position.

This is round ${roundNumber} of 4. In later rounds, directly address and counter the user's previous points.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: isEvaluation ? 1500 : 800,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const textBlock = response.content.find(
      (block: { type: string }) => block.type === "text"
    );
    const text = (textBlock as { type: "text"; text: string })?.text || "";

    if (isEvaluation) {
      try {
        const parsed = JSON.parse(text);
        return NextResponse.json({ evaluation: parsed });
      } catch {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return NextResponse.json({ evaluation: parsed });
        }
        return NextResponse.json({
          evaluation: {
            evaluation: text,
            score: 5,
            strengths: ["Good effort"],
            improvements: ["Try using more specific historical evidence"],
          },
        });
      }
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Debate error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
