import { NextRequest, NextResponse } from "next/server";
import { timelineEvents, timelineTopics, getTimelineByTopic } from "@/data/timelines";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (topic) {
    const events = getTimelineByTopic(topic);
    const topicInfo = timelineTopics.find((t) => t.slug === topic);
    return NextResponse.json({ topic: topicInfo, events });
  }

  return NextResponse.json({ topics: timelineTopics, events: timelineEvents });
}
