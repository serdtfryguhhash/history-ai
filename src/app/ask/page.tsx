import { Metadata } from "next";
import AskHistoryChat from "@/components/features/ask-history-chat";

export const metadata: Metadata = {
  title: "Ask History - Get Historical Parallels for Modern Problems | History.ai",
  description: "Describe any modern challenge and our AI finds historical parallels with real sources, dates, and actionable lessons from 5,000 years of human experience.",
};

export default function AskPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <AskHistoryChat />
    </div>
  );
}
