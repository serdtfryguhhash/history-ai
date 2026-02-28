import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function getHistoricalAnalysis(problem: string): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    system: `You are History.ai, a scholarly AI historian. When given a modern problem or question, you find historical parallels, cite real historical events and figures, and extract timeless lessons. Always provide:
1. A relevant historical parallel with specific dates, figures, and events
2. The context of what happened historically
3. How it relates to the modern situation
4. Actionable lessons derived from history
5. At least 2-3 real historical sources or references

Your tone is warm, scholarly, and engaging - like a brilliant history professor at a fireside chat. Use specific names, dates, and places. Never fabricate historical events.`,
    messages: [
      {
        role: "user",
        content: problem,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text || "I could not generate a response.";
}

export async function chatWithFigure(
  figureName: string,
  personalityPrompt: string,
  messages: { role: "user" | "assistant"; content: string }[]
): Promise<string> {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    system: `You are ${figureName}. ${personalityPrompt}

Respond as this historical figure would, using their known speech patterns, beliefs, and knowledge. Stay in character. Reference real events from their life. Be historically accurate but conversational. If asked about events after your death, acknowledge you cannot speak from experience but may offer wisdom based on your principles.`,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text || "I find myself at a loss for words.";
}

export default anthropic;
