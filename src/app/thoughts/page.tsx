import TransitionLink from "@/components/TransitionLink";
import { formatDate, getThoughts } from "@/lib/thoughts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Writing by Hao Cui.",
};

export default function ThoughtsPage() {
  const thoughts = getThoughts();

  return (
    <article className="prose-page">
      {/* The index has no visible title — the list starts at the top of the
          column, its first row level with the first nav link. */}
      <h1 className="sr-only">Thoughts</h1>

      {thoughts.length === 0 ? (
        <p className="mt-0">Nothing here yet.</p>
      ) : (
        <ul className="mt-0 list-none space-y-0 pl-0">
          {thoughts.map((thought) => (
            <li key={thought.slug}>
              {/* The whole row is the link: title, leader, and date all darken
                  together on hover. */}
              <TransitionLink
                href={`/thoughts/${thought.slug}`}
                className="group flex items-baseline leading-7 text-heading/85 no-underline"
              >
                <span className="shrink-0 font-medium transition-colors group-hover:text-heading">
                  {thought.title}
                </span>
                <span className="leader" aria-hidden />
                <time
                  dateTime={thought.date}
                  className="shrink-0 tabular-nums text-muted transition-colors group-hover:text-heading"
                >
                  {formatDate(thought.date)}
                </time>
              </TransitionLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
