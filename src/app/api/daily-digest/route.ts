import { NextResponse } from "next/server";
import { getTodaysDigest, dailyDigests } from "@/data/daily-digests";

export async function GET() {
  const today = getTodaysDigest();
  return NextResponse.json({ today, recent: dailyDigests });
}
