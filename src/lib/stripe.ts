import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "placeholder-key", {
  apiVersion: "2025-01-27.acacia" as any,
});

export const PRICING_TIERS = {
  free: {
    name: "Free Explorer",
    price: "$0",
    period: "forever",
    description: "Begin your journey through the annals of history",
    features: [
      "5 Ask History queries per day",
      "Browse 50 historical figures",
      "Read daily history digest",
      "Access basic timelines",
      "Community discussions",
    ],
    cta: "Start Exploring",
    stripe_price_id: "",
  },
  scholar: {
    name: "Scholar",
    price: "$9.99",
    period: "per month",
    description: "Unlock deeper historical insights and conversations",
    features: [
      "50 Ask History queries per day",
      "Access all 500+ historical figures",
      "Unlimited figure conversations",
      "Interactive timeline deep-dives",
      "Full lessons library access",
      "Weekly newsletter",
      "Save & export conversations",
      "Priority AI responses",
    ],
    cta: "Become a Scholar",
    popular: true,
    stripe_price_id: process.env.STRIPE_SCHOLAR_PRICE_ID || "",
  },
  historian: {
    name: "Historian",
    price: "$24.99",
    period: "per month",
    description: "The complete historical wisdom experience",
    features: [
      "Unlimited Ask History queries",
      "All Scholar features included",
      "Custom AI personality tuning",
      "Advanced source citations",
      "Create custom timelines",
      "API access for research",
      "1-on-1 AI history tutoring",
      "Early access to new features",
      "Exclusive merch discounts (20%)",
      "Cancel anytime",
    ],
    cta: "Become a Historian",
    stripe_price_id: process.env.STRIPE_HISTORIAN_PRICE_ID || "",
  },
};
