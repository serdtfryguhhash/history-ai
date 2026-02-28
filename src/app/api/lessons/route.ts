import { NextRequest, NextResponse } from "next/server";
import { lessons, getLessonsByCategory } from "@/data/lessons";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  if (category) {
    return NextResponse.json({ lessons: getLessonsByCategory(category) });
  }

  return NextResponse.json({ lessons });
}
