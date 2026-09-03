import projectsData from "@/data/projects.json";
import { projectSchema, type Project } from "@/lib/schemas";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things Hao Cui has designed and built.",
};

const { projects } = projectSchema.parse(projectsData);

export default function ProjectsPage() {
  return (
    <article className="prose-page">

      <div className="mt-10">
        {projects.map((project) => (
          <Entry key={project.name} project={project} />
        ))}
      </div>
    </article>
  );
}

function Entry({ project }: { project: Project }) {
  return (
    <section className="mt-10 first:mt-0">
      {/* Name, dotted leader, links — the list treatment from the theme. */}
      <div className="flex items-baseline leading-7">
        <h2 className="mt-0 shrink-0 font-semibold text-heading">
          {project.name}
        </h2>
        <span className="leader" aria-hidden />
        <span className="shrink-0">
          {project.links.map((link, index) => (
            <span key={link.href}>
              {index > 0 && <span className="text-muted">, </span>}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                {link.name}
              </a>
            </span>
          ))}
        </span>
      </div>

      <p className="mt-2">{project.description}</p>

      <p className="mt-2 text-muted">{project.tags.join(" · ")}</p>
    </section>
  );
}
