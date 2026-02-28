import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { figure_name, personality_prompt, messages } = await request.json();

    if (!figure_name || !messages) {
      return NextResponse.json({ error: "Figure name and messages are required" }, { status: 400 });
    }

    // If OpenAI key is configured, use it
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "placeholder-key") {
      const { chatWithFigure } = await import("@/lib/openai");
      const response = await chatWithFigure(figure_name, personality_prompt, messages);
      return NextResponse.json({ response });
    }

    // Generate a contextual response based on the figure
    const lastMessage = messages[messages.length - 1]?.content || "";
    const figureResponses: Record<string, string[]> = {
      "Marcus Aurelius": [
        "You ask a worthy question, my friend. In my years ruling Rome — through plague, war, and betrayal — I learned that the obstacle is not separate from the path. It IS the path. What troubles you is precisely what will forge your character, if you face it with equanimity rather than resistance. As I wrote in my journal: 'The impediment to action advances action. What stands in the way becomes the way.'",
        "Consider this: I was Emperor of Rome, the most powerful man in the known world, yet I spent my evenings writing reminders to myself about humility and impermanence. Why? Because power without self-reflection is merely tyranny wearing a purple toga. You have asked about something that touches the very heart of Stoic teaching — that we control our judgments, our intentions, and our responses. Everything else is beyond our dominion.",
        "When the Antonine Plague swept through Rome, killing perhaps one in ten of my subjects, I did not retreat to a country villa as many urged. I stayed. I governed. I mourned. And I wrote. The crisis did not make me a philosopher — it revealed whether my philosophy was genuine. This is what adversity does: it tests whether our principles are convictions or merely preferences.",
      ],
      "Cleopatra VII": [
        "You address the last Pharaoh of Egypt — a queen who spoke nine tongues and held the Roman wolf at bay for two decades through wit, not merely beauty. What the historians of Rome wrote about me says more about their fears than my character. I was educated in mathematics, philosophy, and astronomy at the Mouseion of Alexandria. I was the first Ptolemy to speak the Egyptian language. I did not merely rule — I understood.",
        "In my time, I negotiated with Julius Caesar and Mark Antony — two of the most powerful men the world has known. My weapon was never seduction, as the Roman propagandists would have you believe. It was intelligence. I understood economics, naval strategy, and the art of making myself indispensable to those who thought themselves my superior. Let Rome underestimate me — it was their loss, not mine.",
        "Egypt was the wealthiest kingdom in the Mediterranean, and I wielded that wealth as precisely as any general wields a sword. When I met Caesar, I presented not a woman seeking protection but an ally offering the resources of the Nile. Strategic partnership, properly negotiated, is worth more than any army. This is something the modern world still struggles to understand.",
      ],
      default: [
        `I appreciate your thoughtful question. In my experience and through the lens of my era, I can say that the challenges you describe are not new to humankind. We faced similar questions in our time, and the answers we found — through trial, error, and much suffering — still carry wisdom today. The specifics change, but the human condition remains remarkably constant across the ages.`,
        `What you ask reminds me of a principle I held dear: that understanding the past is not merely academic exercise but practical wisdom for the present. Every generation believes its problems are unprecedented, yet the patterns of human behavior — ambition, fear, cooperation, conflict — remain remarkably consistent. Let me share what I learned from my own trials...`,
        `That is a question worthy of deep consideration. In my time, we did not have the luxury of your modern comforts, but we had something perhaps more valuable: the clarity that comes from facing life's fundamental challenges directly. What I can tell you from my experience is that the answer usually lies not in clever strategy alone, but in the character of the person facing the challenge.`,
      ],
    };

    const responses = figureResponses[figure_name] || figureResponses.default;
    const response = responses[Math.floor(Math.random() * responses.length)];

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
