import { Metadata } from "next";
import { notFound } from "next/navigation";
import { lessons, getLessonBySlug } from "@/data/lessons";
import LessonDetailPage from "./lesson-detail";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return lessons.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return { title: "Lesson Not Found" };

  return {
    title: lesson.seo_title,
    description: lesson.seo_description,
  };
}

export default function LessonPage({ params }: Props) {
  const lesson = getLessonBySlug(params.slug);

  if (!lesson) {
    notFound();
  }

  return <LessonDetailPage lesson={lesson} />;
}
