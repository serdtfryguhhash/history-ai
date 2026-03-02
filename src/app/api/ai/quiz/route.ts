import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { exploredFigures, exploredEras, exploredTopics } = await request.json();

    const context = exploredFigures && exploredFigures.length > 0
      ? `The user has explored these historical figures: ${exploredFigures.join(", ")}. Focus questions on these figures and their eras.`
      : "Generate general history quiz questions spanning multiple eras.";

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      system: `You are a history quiz master for History.ai. Generate exactly 5 multiple-choice history questions. ${context}

Respond ONLY with valid JSON in this exact format, no other text:
{
  "questions": [
    {
      "id": 1,
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of the correct answer"
    }
  ]
}

Make questions challenging but fair. Include specific dates, events, and figures. Vary difficulty.`,
      messages: [
        {
          role: "user",
          content: "Generate 5 history quiz questions based on my learning history.",
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const text = textBlock?.text || "{}";

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }
      return NextResponse.json({ error: "Failed to parse quiz" }, { status: 500 });
    }
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
