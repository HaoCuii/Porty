import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { z } from "zod";

const THOUGHTS_DIR = path.join(process.cwd(), "src/content/thoughts");

const frontmatterSchema = z.object({
  title: z.string(),
  // YAML parses an unquoted date into a Date; accept either shape.
  date: z.union([z.string(), z.date()]).transform(toIsoDate),
  summary: z.string().optional(),
});

export type Thought = z.infer<typeof frontmatterSchema> & {
  slug: string;
  content: string;
};

function toIsoDate(value: string | Date) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Unparseable thought date: ${String(value)}`);
  }
  return date.toISOString().slice(0, 10);
}

/** `An Obligatory Post` becomes `an-obligatory-post`. */
export function slugify(title: string) {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function read(file: string): Thought {
  const raw = fs.readFileSync(path.join(THOUGHTS_DIR, file), "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);

  // The URL follows the title, not the filename — retitle a post and its link
  // follows. Titles with no Latin characters fall back to the filename.
  const slug = slugify(frontmatter.title) || file.replace(/\.md$/, "");

  return { ...frontmatter, slug, content };
}

/** Every thought, newest first. */
export function getThoughts(): Thought[] {
  if (!fs.existsSync(THOUGHTS_DIR)) return [];

  return fs
    .readdirSync(THOUGHTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(read)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getThought(slug: string): Thought | null {
  return getThoughts().find((thought) => thought.slug === slug) ?? null;
}

/** `2026-09-02` becomes `2026.09.02`, as in the reference list. */
export function formatDate(date: string) {
  return date.replaceAll("-", ".");
}
