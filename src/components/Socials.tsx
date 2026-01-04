import data from "@/data/socials.json";
import { socialSchema } from "@/lib/schemas";
import Icon from "./Icon";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Socials() {
  const socials = socialSchema.parse(data).socials;

  return (
    <section className="flex gap-6">
      {socials.map((item) => (
        <a
          href={item.href}
          key={item.name}
          target="_blank"
          className="text-muted-foreground hover:text-foreground"
          rel="noopener noreferrer"
          title={item.name}
        >
          <span className="sr-only">{item.name}</span>
          {item.icon === "x" ? (
            <XIcon className="size-5" />
          ) : (
            <Icon name={item.icon} aria-hidden="true" className="size-5" />
          )}
        </a>
      ))}
    </section>
  );
}
