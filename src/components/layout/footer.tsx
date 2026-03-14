import React from "react";
import Link from "next/link";
import { BookOpen, Github, Twitter, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { href: "/ask", label: "Ask History" },
    { href: "/figures", label: "Historical Figures" },
    { href: "/timelines", label: "Timelines" },
    { href: "/lessons", label: "Lessons Library" },
    { href: "/daily", label: "Daily Digest" },
    { href: "/pricing", label: "Pricing" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/blog/what-ancient-rome-teaches-about-inflation", label: "Rome & Inflation" },
    { href: "/blog/five-leaders-who-transformed-crisis-into-opportunity", label: "Crisis Leadership" },
    { href: "/blog/the-silk-road-was-the-original-internet", label: "Silk Road & Internet" },
  ],
  Company: [
    { href: "#", label: "About" },
    { href: "#", label: "Careers" },
    { href: "#", label: "Press" },
    { href: "#", label: "Terms of Service" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-accent/20 bg-primary text-parchment-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white shadow-md">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-parchment-50">History.ai</h3>
                <p className="text-[10px] font-mono text-accent-300">Wisdom of the Ages</p>
              </div>
            </div>
            <p className="font-body text-sm text-parchment-200 leading-relaxed">
              AI-powered historical wisdom for modern problems. Learn from 5,000 years of human
              experience through conversations with history&apos;s greatest minds.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-parchment-300 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-parchment-300 hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-parchment-300 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-display text-lg font-bold text-parchment-50 mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body text-parchment-300 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-parchment-50/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm font-body text-parchment-300">
              &copy; {new Date().getFullYear()} History.ai. All rights reserved.
            </p>
            <p className="text-xs font-mono text-parchment-400 italic">
              &ldquo;Those who cannot remember the past are condemned to repeat it.&rdquo; - George
              Santayana
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
