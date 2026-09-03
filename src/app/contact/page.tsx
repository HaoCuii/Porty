import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Hao Cui.",
};

export default function ContactPage() {
  return (
    <article className="prose-page">
      <p>
        {/* The address is written out rather than linked, so it is not sitting
            in the markup as a mailto for scrapers to harvest. */}
        You can contact me at{" "}
        <span className="whitespace-nowrap">haocui43 [at] gmail [dot] com</span>
        .
        <br />
      </p>
    </article>
  );
}
