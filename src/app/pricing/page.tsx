import { Metadata } from "next";
import PricingPage from "./pricing-page";

export const metadata: Metadata = {
  title: "Pricing - History.ai Plans & Features",
  description: "Choose your History.ai plan: Free Explorer, Scholar ($9.99/mo), or Historian ($24.99/mo). Unlock AI historical wisdom, figure conversations, and more.",
};

export default function Page() {
  return <PricingPage />;
}
