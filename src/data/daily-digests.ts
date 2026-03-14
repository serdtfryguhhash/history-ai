import { DailyDigest } from "@/types";

export const dailyDigests: DailyDigest[] = [
  {
    id: "1",
    date: "2024-03-15",
    title: "The Ides of March",
    historical_fact: "On this day in 44 BCE, Julius Caesar was assassinated by a group of Roman senators including Marcus Brutus and Gaius Cassius. He was stabbed 23 times in the Theatre of Pompey.",
    year: -44,
    modern_relevance: "Caesar's assassination shows how attempts to preserve a political system through violence often accelerate its destruction. The conspirators wanted to save the Republic - instead, they destroyed it, paving the way for the very imperial system they feared.",
    figure_mentioned: "julius-caesar",
    category: "Governance",
    share_text: "On this day in 44 BCE, Julius Caesar was assassinated. The senators who killed him to save the Republic instead destroyed it. Some lessons never get old. #HistoryAI #IdesOfMarch",
  },
  {
    id: "2",
    date: "2024-03-14",
    title: "Einstein's Birthday & Pi Day",
    historical_fact: "Albert Einstein was born on March 14, 1879, in Ulm, Germany. He would go on to develop the theory of relativity, win the Nobel Prize, and become the most recognized scientist in history.",
    year: 1879,
    modern_relevance: "Einstein was a patent clerk when he published his four revolutionary 1905 papers. His story reminds us that breakthrough innovation can come from anywhere - not just from prestigious institutions or credentialed experts.",
    figure_mentioned: "albert-einstein",
    category: "Science",
    share_text: "Happy birthday, Einstein! Born today in 1879. A patent clerk who rewrote the laws of physics. Genius has no zip code. #HistoryAI #PiDay",
  },
  {
    id: "3",
    date: "2024-03-12",
    title: "Gandhi Begins the Salt March",
    historical_fact: "On March 12, 1930, Mahatma Gandhi set out from Sabarmati Ashram with 78 followers on a 240-mile march to the sea to make salt in defiance of British colonial law.",
    year: 1930,
    modern_relevance: "Gandhi chose salt - a basic necessity taxed by an imperial power - as his symbolic battleground. The lesson: the most powerful acts of resistance target policies that affect ordinary people's daily lives.",
    figure_mentioned: "mahatma-gandhi",
    category: "Revolution",
    share_text: "On this day in 1930, Gandhi walked 240 miles to make salt. The simplest act of defiance can shake an empire. #HistoryAI #SaltMarch",
  },
  {
    id: "4",
    date: "2024-03-10",
    title: "Harriet Tubman's Last Rescue",
    historical_fact: "In March 1857, Harriet Tubman made one of her most daring rescue missions, personally guiding her elderly parents from Maryland to freedom in Canada, traveling through harsh winter conditions.",
    year: 1857,
    modern_relevance: "Tubman didn't just escape slavery - she went back, again and again, risking her life for others. In an age of comfortable activism, her example challenges us to ask: what are we willing to risk for what we believe?",
    figure_mentioned: "harriet-tubman",
    category: "Leadership",
    share_text: "Harriet Tubman didn't just escape slavery - she went back 13 times. Never lost a passenger. That's not just courage, it's logistics genius. #HistoryAI",
  },
  {
    id: "5",
    date: "2024-03-08",
    title: "International Women's Day Origins",
    historical_fact: "International Women's Day was first observed on March 8, 1911, when over one million people rallied in Austria, Denmark, Germany, and Switzerland demanding women's rights to work, vote, and hold public office.",
    year: 1911,
    modern_relevance: "The first International Women's Day drew a million people - without social media, without the internet, organized through pamphlets and word of mouth. It reminds us that mass movements are built on conviction, not technology.",
    category: "Revolution",
    share_text: "The first International Women's Day in 1911 drew over a million people. No social media. No internet. Just conviction. #HistoryAI #IWD",
  },
];

export function getTodaysDigest(): DailyDigest {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();
  const index = (month * 31 + day) % dailyDigests.length;
  return dailyDigests[index];
}
