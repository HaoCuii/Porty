import { z } from "zod";

const iconLink = z.object({
  name: z.string(),
  href: z.string(),
});

const project = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  links: z.array(iconLink),
});
export const projectSchema = z.object({ projects: z.array(project) });
export type Project = z.infer<typeof project>;
