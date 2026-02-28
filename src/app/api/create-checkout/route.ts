import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json();

    if (!tier || !["scholar", "historian"].includes(tier)) {
      return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
    }

    // In production, this creates a Stripe Checkout session
    // For now, redirect to signup
    if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY !== "placeholder-key") {
      const { stripe, PRICING_TIERS } = await import("@/lib/stripe");
      const tierConfig = PRICING_TIERS[tier as keyof typeof PRICING_TIERS];

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: tierConfig.stripe_price_id,
            quantity: 1,
          },
        ],
        success_url: `${process.env.NEXT_PUBLIC_URL}/settings?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
      });

      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json({ url: "/signup" });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
