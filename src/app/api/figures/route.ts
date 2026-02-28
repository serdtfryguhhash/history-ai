import { NextRequest, NextResponse } from "next/server";
import { historicalFigures, searchFigures, getFiguresByCategory } from "@/data/figures";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const category = searchParams.get("category");

  let results = historicalFigures;

  if (query) {
    results = searchFigures(query);
  }

  if (category) {
    results = getFiguresByCategory(category);
  }

  return NextResponse.json({ figures: results });
}
