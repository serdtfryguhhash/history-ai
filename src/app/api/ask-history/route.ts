import { NextRequest, NextResponse } from "next/server";

const HISTORICAL_RESPONSES: Record<string, string> = {
  inflation: `## The Denarius Debasement: Rome's Inflation Crisis (3rd Century CE)

Your question about inflation has a remarkably precise historical parallel in the Roman Empire's monetary crisis of the 3rd century.

### Historical Parallel

**The Roman Inflation Crisis (200-300 CE)**

The Roman denarius, once containing 3.9 grams of pure silver under Augustus (27 BCE), was systematically debased by successive emperors until it contained less than 0.02 grams by 268 CE — a debasement of over 99%.

Emperor **Nero** (54-68 CE) was the first to reduce the silver content by about 10%. Each successor took a little more. The logic was irresistible: by putting less silver in each coin, the imperial mint could produce more coins from the same silver — essentially "printing money" to fund military campaigns and public welfare.

### What Happened

For decades, the reduced coins circulated at face value. But **Gresham's Law** ("bad money drives out good") took hold. Citizens hoarded old, pure coins and spent debased ones. Merchants raised prices. By the Crisis of the Third Century (235-284 CE), prices had risen an estimated **1,000%**.

Emperor **Diocletian** attempted price controls through his Edict on Maximum Prices (301 CE) — one of history's most detailed price-fixing attempts. It failed spectacularly. Merchants simply refused to sell, creating black markets and shortages.

### Lessons for Today

1. **Currency debasement is politically easy but economically destructive.** The short-term benefit of money creation always comes with long-term costs.
2. **Price controls don't fix inflation** — they treat the symptom, not the cause. Diocletian learned this 1,700 years before modern economists proved it mathematically.
3. **Trust is the real currency.** Once people lose faith in the monetary system, recovery requires structural reform, not just policy adjustments.
4. **Inflation is always and everywhere a fiscal phenomenon** — it results from spending more than you collect.

### Sources
- *The Fall of the Roman Denarius* by Kenneth W. Harl (1996)
- *The Roman Economy* by Peter Temin, Princeton University Press (2013)
- Diocletian's Edict on Maximum Prices, 301 CE (primary source)`,

  pandemic: `## The Antonine Plague & The Black Death: History's Pandemic Lessons

Your question connects to two of history's most transformative pandemic events, each offering distinct lessons for modern pandemic response.

### Historical Parallel 1: The Antonine Plague (165-180 CE)

The Antonine Plague — likely smallpox or measles — killed an estimated **5 million people** across the Roman Empire, roughly 10% of the population. It struck during the reign of **Marcus Aurelius**, testing one of history's most capable leaders.

**Marcus Aurelius's Response:**
- Personally commanded troops on the frontier despite the plague
- Sold imperial furniture and palace valuables to fund the army rather than raise taxes on a suffering population
- Maintained calm, reasoned leadership — his *Meditations* were written during this period
- Kept government functioning while acknowledging the crisis honestly

### Historical Parallel 2: The Black Death (1347-1353)

The Black Death killed roughly **one-third of Europe's population** — an estimated 25-50 million people. It was catastrophic beyond modern imagination.

**But from this devastation emerged transformation:**
- Labor shortages increased workers' wages by 100-200%
- Feudal structures weakened as peasants gained bargaining power
- The Church's authority declined, opening space for the Renaissance
- Technological innovation accelerated to compensate for lost labor
- Social mobility increased dramatically

### Lessons for Today

1. **Pandemics accelerate existing trends.** The Black Death didn't create the Renaissance — it accelerated forces already in motion. Similarly, COVID-19 accelerated remote work, digital transformation, and healthcare innovation.
2. **Leadership character is revealed, not created, by crisis.** Marcus Aurelius was prepared because he had spent decades building philosophical resilience.
3. **Post-pandemic periods are windows of maximum opportunity.** The Black Death created the conditions for the Renaissance. Those who position during crisis benefit most after it.
4. **Social contracts get renegotiated.** Every major pandemic has led to fundamental restructuring of the relationship between rulers and ruled.

### Sources
- *Meditations* by Marcus Aurelius (primary source)
- *The Black Death* by John Hatcher, Harvard University Press (2008)
- *Plagues and Peoples* by William H. McNeill (1976)`,

  default: `## Historical Parallels and Timeless Wisdom

Thank you for your thought-provoking question. Let me search the historical archives for relevant parallels.

### The Pattern of History

One of history's most consistent lessons is articulated by Mark Twain (possibly apocryphal): *"History doesn't repeat itself, but it often rhymes."* Your question touches on themes that have recurred throughout human civilization.

### Historical Parallel: Cycles of Challenge and Adaptation

Throughout 5,000 years of recorded history, humans have faced every conceivable challenge — from famine to war, from technological disruption to social upheaval. In each case, the civilizations that thrived were those that:

1. **Learned from predecessors.** The Roman Republic studied Greek democracy. The American founders studied both. Each generation built on what came before.

2. **Adapted rather than resisted change.** The civilizations that collapsed — from the Bronze Age to the Soviet Union — typically failed because they rigidly defended outdated systems instead of adapting.

3. **Maintained institutional resilience.** The Roman Empire lasted 500 years in the West and 1,500 in the East because its institutions (law, infrastructure, administration) were robust enough to survive bad leaders and external shocks.

4. **Invested in education and knowledge preservation.** From the Library of Alexandria to the medieval monasteries to the modern university system, societies that preserved and transmitted knowledge consistently outperformed those that didn't.

### Key Takeaway

Whatever specific challenge you're facing, history suggests that the combination of **learning from the past**, **adapting to present realities**, and **building resilient systems** is the most reliable path forward. This is not abstract wisdom — it is the empirical result of 5,000 years of human trial and error.

### Recommended Reading
- *Lessons of History* by Will and Ariel Durant (1968)
- *The Fate of Empires* by Sir John Glubb (1978)
- *Sapiens: A Brief History of Humankind* by Yuval Noah Harari (2011)`,
};

function getResponse(question: string): string {
  const lower = question.toLowerCase();
  if (lower.includes("inflation") || lower.includes("economy") || lower.includes("currency") || lower.includes("money")) {
    return HISTORICAL_RESPONSES.inflation;
  }
  if (lower.includes("pandemic") || lower.includes("plague") || lower.includes("disease") || lower.includes("covid") || lower.includes("health")) {
    return HISTORICAL_RESPONSES.pandemic;
  }

  if (lower.includes("ai") || lower.includes("technology") || lower.includes("revolution") || lower.includes("innovation")) {
    return `## The Printing Press Parallel: When Technology Transforms Everything

Your question about technological transformation connects to one of history's most profound parallels: the invention of the printing press.

### Historical Parallel: Gutenberg's Revolution (1440s)

When Johannes Gutenberg introduced movable type printing around 1440, he didn't just make books cheaper — he **restructured civilization**. Within 50 years:

- Book prices dropped by roughly 80%
- Literacy rates began a centuries-long surge
- The Protestant Reformation became possible (Luther's theses spread like wildfire)
- Scientific knowledge could be shared, verified, and built upon
- Established authorities (the Church, monarchies) lost their monopoly on information

### The Parallel to AI

The printing press democratized **information**. AI is democratizing **intelligence** — the ability to process, analyze, and generate knowledge. Like the printing press:

1. **Existing gatekeepers will lose power.** Just as the Church lost its monopoly on religious interpretation, current knowledge gatekeepers will face disruption.
2. **New industries will emerge that we cannot yet imagine.** Gutenberg couldn't have predicted newspapers, novels, or scientific journals.
3. **The transition will be messy and contested.** The printing press contributed to the Wars of Religion. Technological transitions always generate social friction.
4. **Those who adapt earliest will benefit most.** The first cities to embrace printing (Venice, Amsterdam) became centers of commerce and culture.

### Sources
- *The Printing Revolution in Early Modern Europe* by Elizabeth Eisenstein (1983)
- *The Gutenberg Galaxy* by Marshall McLuhan (1962)
- *A History of Reading* by Alberto Manguel (1996)`;
  }

  if (lower.includes("leader") || lower.includes("management") || lower.includes("team") || lower.includes("boss")) {
    return `## Lincoln's Team of Rivals: The Art of Leading Difficult People

Your question about leadership connects to one of history's most instructive examples: Abraham Lincoln's extraordinary ability to lead people who disagreed with — and sometimes despised — each other.

### Historical Parallel: Lincoln's Cabinet (1861-1865)

When Abraham Lincoln won the presidency in 1860, he did something unprecedented: he appointed his **political rivals** to the most important cabinet positions. William Seward (who thought himself superior), Salmon Chase (who openly campaigned against Lincoln), and Edwin Stanton (who had previously insulted Lincoln) all received top roles.

**Why it worked:**
- Lincoln recognized that the crisis required the **best minds**, not the most loyal ones
- He managed egos through patience, humor, and genuine respect for each person's strengths
- He absorbed criticism without retaliating, using it to improve his decisions
- He gave credit generously and took blame personally

### Lessons for Modern Leadership

1. **Hire for competence, not loyalty.** Lincoln's rivals were the most capable people available. Their disagreements improved decision-making.
2. **Ego management is a core leadership skill.** Lincoln spent enormous energy managing the emotions and ambitions of his team.
3. **Humor is a leadership tool.** Lincoln used stories and jokes to defuse tension, reframe problems, and build rapport.
4. **Absorb conflict, don't amplify it.** Great leaders act as shock absorbers for organizational tension.

### Sources
- *Team of Rivals* by Doris Kearns Goodwin (2005)
- *Lincoln on Leadership* by Donald T. Phillips (1992)
- *The Collected Works of Abraham Lincoln* (primary source)`;
  }

  if (lower.includes("war") || lower.includes("conflict") || lower.includes("strategy") || lower.includes("military") || lower.includes("competition")) {
    return `## Sun Tzu's Timeless Strategy: Winning Without Fighting

Your question about conflict and strategy connects to the oldest and most influential strategy text ever written: Sun Tzu's *The Art of War* (c. 500 BCE).

### Historical Parallel: The Art of War Applied

Sun Tzu's core insight — **"The supreme art of war is to subdue the enemy without fighting"** — has been applied successfully for 2,500 years:

**Fabius Maximus vs. Hannibal (218-201 BCE):** When Hannibal invaded Italy and won devastating victories, Roman general Fabius Maximus refused to fight. Instead, he shadowed Hannibal's army, cut supply lines, and let time work against the invader. The "Fabian strategy" of patient attrition eventually wore Hannibal down.

**Elizabeth I vs. the Spanish Armada (1588):** Rather than seeking a decisive naval battle, Elizabeth's navy used faster ships and fire ships to harass the much larger Spanish fleet, letting weather and overextension do most of the work.

**The Cold War (1947-1991):** The United States ultimately defeated the Soviet Union not through military conflict but through economic competition, technological innovation, and the patient application of containment strategy.

### Key Strategic Lessons

1. **Intelligence is more valuable than force.** Know your competitor's strengths, weaknesses, and intentions before engaging.
2. **Patience is a weapon.** The side that can wait longest often wins. Time destroys overextended positions.
3. **Fight on terrain that favors you.** Choose the battleground — whether in business, negotiation, or actual conflict — where your strengths matter most.
4. **The best victories look effortless.** If you've positioned correctly, the outcome should feel inevitable.

### Sources
- *The Art of War* by Sun Tzu (c. 500 BCE, primary source)
- *Strategy* by B.H. Liddell Hart (1954)
- *On War* by Carl von Clausewitz (1832)`;
  }

  return HISTORICAL_RESPONSES.default;
}

export async function POST(request: NextRequest) {
  try {
    const { question } = await request.json();

    if (!question) {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // If OpenAI key is configured, use it; otherwise use prepared responses
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "placeholder-key") {
      const { getHistoricalAnalysis } = await import("@/lib/openai");
      const answer = await getHistoricalAnalysis(question);
      return NextResponse.json({ answer });
    }

    // Use prepared historical responses
    const answer = getResponse(question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Ask History error:", error);
    return NextResponse.json(
      { error: "Failed to process your question" },
      { status: 500 }
    );
  }
}
