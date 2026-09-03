import type { Metadata } from "next";
import { promises as fs } from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site handles your data.",
};

async function getPrivacyContent() {
  const filePath = path.join(process.cwd(), "src/data/privacy.md");
  return fs.readFile(filePath, "utf-8");
}

export default async function PrivacyPage() {
  const privacyContent = await getPrivacyContent();

  return (
    <article className="prose-page">
      <h1 className="title">Privacy</h1>
      <ReactMarkdown>{privacyContent}</ReactMarkdown>
    </article>
  );
}
