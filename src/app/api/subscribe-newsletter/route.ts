import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }

    // In production, this would integrate with Resend/ConvertKit
    // For now, we simulate a successful subscription
    console.log(`Newsletter subscription: ${email}`);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to the newsletter",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
