import { formatDate, getThought, getThoughts } from "@/lib/thoughts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return getThoughts().map((thought) => ({ slug: thought.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const thought = getThought(params.slug);
  if (!thought) return {};

  return {
    title: thought.title,
    description: thought.summary,
  };
}

export default function ThoughtPage({ params }: Props) {
  const thought = getThought(params.slug);
  if (!thought) notFound();

  return (
    <article className="prose-page thought-enter">
      <h1 className="title mb-0">{thought.title}</h1>
      <time dateTime={thought.date} className="block leading-7 text-muted">
        {formatDate(thought.date)}
      </time>

      <ReactMarkdown>{thought.content}</ReactMarkdown>
    </article>
  );
}
