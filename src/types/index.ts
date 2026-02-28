export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  subscription_tier: "free" | "scholar" | "historian";
  stripe_customer_id?: string;
  queries_today: number;
  queries_limit: number;
  created_at: string;
  updated_at: string;
}

export interface HistoricalFigure {
  id: string;
  slug: string;
  name: string;
  title: string;
  born: string;
  died: string;
  era: string;
  nationality: string;
  image_url: string;
  portrait_description: string;
  short_bio: string;
  full_bio: string;
  key_achievements: string[];
  famous_quotes: string[];
  lessons_for_today: string[];
  categories: string[];
  related_figures: string[];
  personality_prompt: string;
  seo_title: string;
  seo_description: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  figure_id?: string;
  type: "ask_history" | "figure_chat";
  title: string;
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  sources?: HistoricalSource[];
  timestamp: string;
}

export interface HistoricalSource {
  title: string;
  author: string;
  year: string;
  excerpt: string;
  url?: string;
}

export interface TimelineEvent {
  id: string;
  year: number;
  month?: number;
  day?: number;
  title: string;
  description: string;
  long_description: string;
  category: string;
  topic: string;
  importance: number;
  figures_involved: string[];
  modern_relevance: string;
  image_url?: string;
}

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: LessonCategory;
  content: string;
  historical_examples: string[];
  key_takeaways: string[];
  figures_mentioned: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  read_time: number;
  image_url?: string;
  seo_title: string;
  seo_description: string;
  created_at: string;
}

export type LessonCategory =
  | "Leadership"
  | "War & Strategy"
  | "Economics"
  | "Innovation"
  | "Philosophy"
  | "Diplomacy"
  | "Revolution"
  | "Science"
  | "Art & Culture"
  | "Governance";

export interface DailyDigest {
  id: string;
  date: string;
  title: string;
  historical_fact: string;
  year: number;
  modern_relevance: string;
  figure_mentioned?: string;
  category: string;
  share_text: string;
  image_url?: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  tier: "free" | "scholar" | "historian";
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image_url?: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
}

export interface NewsletterSub {
  id: string;
  email: string;
  name?: string;
  subscribed_at: string;
  status: "active" | "unsubscribed";
}

export interface MerchItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: "poster" | "apparel" | "mug" | "book";
  figure_slug?: string;
  stripe_price_id: string;
}

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
  stripe_price_id: string;
}
