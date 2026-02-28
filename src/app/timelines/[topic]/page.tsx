import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTimelineByTopic, getTopicBySlug, timelineTopics } from "@/data/timelines";
import TimelineTopicPage from "./timeline-topic";

interface Props {
  params: { topic: string };
}

export async function generateStaticParams() {
  return timelineTopics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug(params.topic);
  if (!topic) return { title: "Timeline Not Found" };

  return {
    title: `${topic.name} Timeline | History.ai`,
    description: topic.description,
  };
}

export default function TimelinePage({ params }: Props) {
  const topic = getTopicBySlug(params.topic);
  const events = getTimelineByTopic(params.topic);

  if (!topic) {
    notFound();
  }

  return <TimelineTopicPage topic={topic} events={events} />;
}
