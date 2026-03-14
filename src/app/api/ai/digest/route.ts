import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    const { exploredFigures, exploredLessons, exploredTimelines, quizScores, totalXP, rank } = await request.json();

    const context = `
User stats this week:
- Explored figures: ${exploredFigures?.length || 0} (${exploredFigures?.slice(-10).join(", ") || "none yet"})
- Lessons completed: ${exploredLessons?.length || 0}
- Timelines explored: ${exploredTimelines?.length || 0}
- Total XP: ${totalXP || 0}
- Scholar Rank: ${rank || "Student"}
`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: `You are History.ai's weekly digest generator. Create a personalized weekly learning summary. Be warm, encouraging, and scholarly.

Respond ONLY with valid JSON:
{
  "summary": "What you accomplished this week (1-2 sentences)",
  "knowledgeGaps": ["area 1 to explore", "area 2 to explore"],
  "recommendations": ["specific figure or topic 1", "specific figure or topic 2", "specific figure or topic 3"],
  "funFact": "A fascinating historical fact the user probably doesn't know",
  "encouragement": "A brief motivational message connecting to a historical quote or figure"
}`,
      messages: [
        {
          role: "user",
          content: `Generate my weekly history learning digest based on this activity:\n${context}`,
        },
      ],
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const text = textBlock?.text || "{}";

    try {
      const parsed = JSON.parse(text);
      return NextResponse.json(parsed);
    } catch {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return NextResponse.json(parsed);
      }
      return NextResponse.json({
        summary: "Keep exploring! Every figure you discover adds to your understanding of human history.",
        knowledgeGaps: ["Ancient civilizations", "Modern era"],
        recommendations: ["Marcus Aurelius", "Cleopatra VII", "Leonardo da Vinci"],
        funFact: "The Roman Empire at its peak was home to roughly 70 million people - about 25% of the world's population at the time.",
        encouragement: "As Confucius said, 'It does not matter how slowly you go as long as you do not stop.'",
      });
    }
  } catch (error) {
    console.error("Digest generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate digest" },
      { status: 500 }
    );
  }
}
