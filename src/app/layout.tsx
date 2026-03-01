import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SoarinBackground from "@/components/features/soarin-background";

export const metadata: Metadata = {
  title: "History.ai — AI Historical Wisdom for Modern Problems",
  description:
    "Describe any modern challenge and our AI finds historical parallels, cites real sources, and extracts timeless lessons. Chat with 500+ historical figures. Learn from 5,000 years of human experience.",
  keywords:
    "history, AI, historical figures, leadership lessons, strategy, philosophy, timelines, education",
  openGraph: {
    title: "History.ai — AI Historical Wisdom for Modern Problems",
    description:
      "The past has already solved your problem. Ask History anything and get wisdom from 5,000 years of human experience.",
    type: "website",
    locale: "en_US",
    siteName: "History.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "History.ai — AI Historical Wisdom for Modern Problems",
    description: "The past has already solved your problem. Ask History anything.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SoarinBackground />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
