import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  if (!name) {
    return new NextResponse("Missing name parameter", { status: 400 });
  }

  try {
    const wikiRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`,
      {
        headers: { "User-Agent": "History.ai/1.0 (educational app)" },
      }
    );

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      if (data.thumbnail?.source) {
        // Redirect to the Wikipedia thumbnail — browsers follow this for <img> tags
        return new NextResponse(null, {
          status: 307,
          headers: {
            Location: data.thumbnail.source,
            "Cache-Control": "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400",
          },
        });
      }
    }
  } catch {
    // Fall through to fallback
  }

  // Fallback: generate a styled initial avatar
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=400&background=78350F&color=FEF7ED&bold=true&font-size=0.33`;
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: fallbackUrl,
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
