import Experience from "@/components/Experience";
import LinkWithIcon from "@/components/LinkWithIcon";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Socials from "@/components/Socials";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  FileDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const LIMIT = 2; // max show 2

export default async function Home() {
  return (
    <article className="mt-8 flex flex-col gap-16 pb-16">
      <section className="flex flex-col items-start gap-8 md:flex-row-reverse md:items-center md:justify-between">
        <div className="relative h-[320px] w-[240px] md:mr-8">
          <Image
            src="/eric_assets/formal_pic-removebg-preview.png"
            alt="Eric Tao"
            fill
            className="rounded-lg object-contain object-top"
            priority
          />
        </div>

        <div className="flex flex-col sm:max-w-xl">
          <h1 className="title text-balance text-4xl sm:text-5xl">
            Hi, I&apos;m Eric! 👋
          </h1>

          <div className="mt-6 space-y-4 text-sm sm:text-base">
            <p>
              I&apos;m a first-year at NYU <strong>Stern</strong>, double-majoring in <strong>Finance and Math</strong>, with a <strong>Philosophy</strong> minor.
            </p>

            <p>
              I&apos;m from <strong>Vancouver, Canada</strong> and am obsessed with the world of business, especially banking and VC.
            </p>

            <p>
              Outside of the classroom, I&apos;m a competitive <strong>badminton</strong> player, amateur <strong>poker</strong> player, and <strong>snowboard</strong> instructor!
            </p>
          </div>

          <p className="mt-4 text-xs font-light">
            Check out my&nbsp;
            <Link
              href="/resume.pdf"
              target="_blank"
              className="link font-semibold underline"
              title="Resume"
            >
              resume
            </Link>
            &nbsp;for more details.
          </p>

          <section className="mt-6 flex flex-wrap items-center gap-4">
            <Link href="/resume.pdf" target="_blank">
              <Button variant="outline">
                <span className="font-semibold">Resume</span>
                <FileDown className="ml-2 size-5" />
              </Button>
            </Link>
            <Socials />
          </section>
        </div>
      </section>

      <Experience />

      <section className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h2 className="title text-2xl sm:text-3xl">featured projects</h2>
          <LinkWithIcon
            href="/projects"
            position="right"
            icon={<ArrowRightIcon className="size-5" />}
            text="view more"
          />
        </div>
        <Projects limit={LIMIT} />
      </section>

      <section className="flex flex-col gap-8">
        <h2 className="title text-2xl sm:text-3xl">my skills</h2>
        <Skills />
      </section>
    </article>
  );
}
