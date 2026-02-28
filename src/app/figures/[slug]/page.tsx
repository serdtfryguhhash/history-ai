import { Metadata } from "next";
import { notFound } from "next/navigation";
import { historicalFigures, getFigureBySlug } from "@/data/figures";
import FigureProfilePage from "./figure-profile";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return historicalFigures.map((figure) => ({
    slug: figure.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const figure = getFigureBySlug(params.slug);
  if (!figure) return { title: "Figure Not Found" };

  return {
    title: figure.seo_title,
    description: figure.seo_description,
    openGraph: {
      title: figure.seo_title,
      description: figure.seo_description,
      type: "profile",
    },
  };
}

export default function FigurePage({ params }: Props) {
  const figure = getFigureBySlug(params.slug);

  if (!figure) {
    notFound();
  }

  return <FigureProfilePage figure={figure} />;
}
