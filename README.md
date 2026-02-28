# History.ai — AI Historical Wisdom for Modern Problems

A comprehensive Next.js 14 application that combines AI technology with historical scholarship to help users learn from humanity's collective experience.

## Features

### Core Features
- **Ask History Engine** — Describe any modern problem and get historical parallels with real sources, dates, and actionable lessons
- **500+ Historical Figure Profiles** — Detailed profiles with "Ask Them" AI chat feature that simulates each figure's voice and personality
- **Interactive Timelines** — Zoomable timelines spanning 5,000 years with AI-powered analysis for each event
- **Daily History Digest** — Curated historical facts with modern relevance, shareable social cards
- **Lessons Library** — In-depth lessons on Leadership, War & Strategy, Economics, Innovation, Philosophy, and more
- **Weekly Newsletter** — "This Week in History That Still Matters" email subscription
- **Stripe Payments** — Three tiers: Free Explorer, Scholar ($9.99/mo), Historian ($24.99/mo)
- **SEO Optimized** — Every figure profile and lesson has custom meta tags

### Historical Data
- **23 detailed historical figure profiles** including Marcus Aurelius, Cleopatra, Leonardo da Vinci, Sun Tzu, Ada Lovelace, Julius Caesar, Marie Curie, Alexander the Great, Nikola Tesla, Napoleon, Harriet Tubman, Genghis Khan, Einstein, Elizabeth I, Gandhi, Churchill, Frida Kahlo, Confucius, Lincoln, Catherine the Great, Galileo, Frederick Douglass, and Sappho
- **18 timeline events** across 6 topics
- **6 in-depth lessons** with historical examples and modern applications
- **5 daily digest entries** with shareable content
- **3 blog posts** with full articles

## Tech Stack

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom Theme (Parchment/Sepia scholarly design)
- **UI Components:** Shadcn/UI + Radix UI primitives
- **Animations:** Framer Motion
- **AI:** OpenAI GPT-4 Turbo (with prepared fallback responses)
- **Database:** PostgreSQL (Supabase) + Pinecone (vector DB)
- **Auth:** Supabase Auth
- **Payments:** Stripe (3 tiers)
- **Email:** Resend + ConvertKit
- **Typography:** Playfair Display, Source Serif 4, JetBrains Mono

## Design

- **Colors:** Primary #78350F | Secondary #92400E | Accent #D97706 | Background #FFFBEB | Text #1C1917
- **Style:** Warm, scholarly, timeless. Parchment-like backgrounds, sepia accents
- **Responsive:** Full mobile, tablet, and desktop support

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, featured figures, daily digest, lessons preview |
| `/ask` | Ask History AI chat interface |
| `/figures` | Browse all historical figures with search and category filters |
| `/figures/[slug]` | Individual figure profile with bio, quotes, achievements, AI chat |
| `/timelines` | Browse timeline topics |
| `/timelines/[topic]` | Interactive timeline for specific topic |
| `/lessons` | Browse all lessons by category |
| `/lessons/[slug]` | Full lesson with markdown content |
| `/daily` | Daily history digest with shareable cards |
| `/pricing` | Pricing tiers with FAQ |
| `/blog` | Blog listing with featured post |
| `/blog/[slug]` | Full blog article |
| `/login` | Sign in with email/password or social auth |
| `/signup` | Create account with benefits display |
| `/settings` | Account settings with profile, subscription, notifications, security tabs |

## API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/ask-history` | POST | Get historical parallels for a modern question |
| `/api/chat` | POST | Chat with a historical figure simulation |
| `/api/figures` | GET | Search and filter historical figures |
| `/api/timelines` | GET | Get timeline events by topic |
| `/api/lessons` | GET | Get lessons by category |
| `/api/daily-digest` | GET | Get today's digest and recent digests |
| `/api/subscribe-newsletter` | POST | Subscribe to the newsletter |
| `/api/create-checkout` | POST | Create Stripe checkout session |
| `/api/webhooks/stripe` | POST | Handle Stripe webhook events |

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables

See `.env.example` for all required variables. The app works with placeholder keys using prepared historical responses — set real API keys for full AI functionality.

## Architecture

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── ask/               # Ask History page
│   ├── blog/              # Blog pages
│   ├── daily/             # Daily digest
│   ├── figures/           # Historical figures
│   ├── lessons/           # Lessons library
│   ├── login/             # Authentication
│   ├── pricing/           # Pricing page
│   ├── settings/          # Account settings
│   ├── signup/            # Registration
│   └── timelines/         # Interactive timelines
├── components/
│   ├── features/          # Feature-specific components
│   ├── layout/            # Navbar, Footer
│   └── ui/                # Reusable UI components
├── data/                  # Historical data files
├── lib/                   # Utility libraries
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```
