// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Profile from "./assets/Mugshot.jpg";
import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import binit from "./assets/binit.png";
import workflow from "./assets/workflow.png";
import conway from "./assets/conway.png";
import dmoj from "./assets/dmoj.png";
import freaky from "./assets/freaky.png";
import smashspeed from "./assets/smashspeed.png";
import PixelTrail from "./components/PixelTrail";
import resume from "./assets/Resume.pdf";
import { FaXTwitter } from "react-icons/fa6";



function Reveal({ children, className = "", mode = "transform" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShow(true);
            obs.unobserve(el);
            break;
          }
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const classes =
    mode === "transform"
      ? `${
          show
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-6 scale-[0.98]"
        } transition-all duration-700 ease-out will-change-transform`
      : `${
          show ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-out will-change-[opacity]`;

  return (
    <div ref={ref} className={`${classes} ${className}`}>
      {children}
    </div>
  );
}

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
];

export default function App() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (els.length === 0) return;

    let ticking = false;

    const computeActive = () => {
      const targetY = 100;
      let bestId = els[0].id;
      let bestDist = Infinity;

      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom <= 0 || r.top >= window.innerHeight) continue;
        const dist = Math.abs(r.top - targetY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = el.id;
        }
      }
      setActive(bestId);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    const onResize = () => computeActive();

    computeActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const experience = [
    {
      companyUrl: "https://smashspeed.ca/",
      role: "Smashspeed",
      subtitle: "Chief Technology Officer",
      range: "2025 — Present",
      description:
        "Executed an end-to-end port of the machine-learning shuttle tracker to React Native. Implemented a scalable serverless Firebase architecture (Auth, Firestore, Cloud Functions, Cloud Storage). Developed the marketing/product website with React + Tailwind, sustaining 10k+ monthly active users. Helped build the data pipeline using YOLOv5, curated and hand-annotated 13k+ images to reach 93% model accuracy. The platform sustained 21k+ downloads across 80+ countries, amplified by a viral social campaign with 2M+ reach.",
      tags: [
        "TypeScript",
        "React Native",
        "Tailwind CSS",
        "Firebase",
        "Cloud Storage",
        "YoloV5",
        "Onnx",
      ],
    },
    {
      companyUrl: "https://furious-frogs-website.vercel.app/",
      role: "Furious Frogs",
      subtitle: "Developer",
      range: "2024-Present",
      description:
        "Co-designed the autonomous system that ranked #191/100,000 competitors in the 2024 season, built with Pedro Pathing and odometry for reliable multi-path routines. For 2025, implemented an auto-aim pipeline using AprilTag detection with OpenCV and tuned proportional-integral-derivative (PID) controllers for fast, stable targeting and shot alignment.",
      tags: ["Java", "FTC SDK", "OpenCV", "PID Control", "Sensors", "Encoders"],
    },
  ];

  const projects = [
    {
      name: "Smashspeed",
      text: "An AI-powered badminton tracker that detects shots, estimates smash speed in real time, and visualizes your improvement with session summaries and trend charts. 21k downloads across 80+ countries, amplified by a viral social media campaign with 2M+ reach.",
      link: "https://smashspeed.ca/",
      repo: "https://github.com/HaoCuii/smashspeed_rn",
    },
    {
      name: "Steve the Freakysaur",
      text: "Won 1st place out of 124 participants and 50+ projects in BC’s largest high school hackathon. A Chrome Dino–style game controlled entirely using tongue detection through real-time facial segmentation. Prototyped in Pygame before being ported to Next.js with TypeScript for web play.",
      link: "https://haocuii.itch.io/steve-the-freakysaur",
      repo: "https://github.com/diwenne/freakysaur",
      tech: ["Python", "OpenCV", "Next.js", "TypeScript"],
    },
    {
      name: "DMOJ Solutions",
      text: "1 year of my life. Over 200 competitive programming problems ranging from trivial graph theory problems to baffling IOI ones. Seg-Tree, Bitmask DP, DSU, Convex Hull, I **** CP.",
      link: "https://dmoj.ca/user/haocuii",
      repo: "https://github.com/HaoCuii/DMOJ-Solutions",
      tech: ["C++", "Python", "Data Structures", "Algorithms"],
    },
    {
      name: "Conway's Game of Life",
      text: "A take on Conway’s Game of Life using memoized cells and batched updates for smooth simulation on large grids, with controls for seeding, stepping, and speed. ",
      link: "https://conways-game-of-life-38hy.vercel.app/",
      repo: "https://github.com/HaoCuii/Conways-Game-Of-Life",
      tech: ["JavaScript", "React"],
    },
    {
      name: "WorkFlow",
      text: "Collaborate with peers in real time. A clean, distraction-free UI lets you create rooms, track tasks, and see updates instantly. Powered by WebSockets for low-latency presence and Firebase for auth, data sync, and persistence.",
      link: "https://www.yourworkflow.co/",
      repo: "https://github.com/HaoCuii/WorkFlow",
      tech: ["Websocket", "Firebase"],
    },
    {
      name: "Binit",
      text: "LLM Wrapper = VC funding when? Reduce waste, dashboard, and leaderboard system that was created for NWHacks 2025.",
      link: "https://www.bin-it.co/",
      repo: "https://github.com/HaoCuii/Binit",
    },
  ];

  // Map project names to imported images
  const imageByName = {
    Smashspeed: smashspeed,
    "Steve the Freakysaur": freaky,
    "DMOJ Solutions": dmoj,
    "Conway's Game of Life": conway,
    WorkFlow: workflow,
    Binit: binit,
  };

  return (
    <>
       {/* Background bits effect */}
      <div className="fixed inset-0 z-50 pointer-events-none">
        <PixelTrail
          gridSize={60}
          trailSize={0.05}
          maxAge={200}
          interpolate={5}
          color="#f1d3ff"
          gooeyFilter={{ id: "goo", strength: 9 }}
        />
      </div>

      <div className="relative bg-white text-black antialiased">
        {/* The "relative" class was added here to create a stacking context for the content */}
        <div className="mx-auto grid min-h-[100svh] max-w-7xl grid-cols-1 gap-10 px-6 md:grid-cols-[0.9fr,1.1fr] lg:grid-cols-[0.9fr,1.1fr] lg:gap-16 lg:px-10">
          <aside className="md:sticky md:top-0 md:h-[100svh] py-10 lg:py-24 flex flex-col">
            <Reveal mode="fade" className="space-y-4">
              <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">Hao Cui</h1>
              <h2 className="text-xl font-medium text-neutral-400">Fullstack Engineer</h2>
              <p className="max-w-sm text-neutral-400">
                CS student focused on fullstack web, mobile, and machine learning.
              </p>
            </Reveal>

            <nav className="mt-10 space-y-2">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setActive(s.id)}
                    className={[
                      "group relative flex items-center gap-3 rounded-lg px-2 py-2 text-sm",
                      "transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300",
                      isActive ? "text-black" : "text-neutral-500 hover:text-black",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden
                      className={[
                        "h-[2px] flex-none rounded-full transition-all duration-300 ease-out",
                        isActive
                          ? "bg-black w-20"
                          : "bg-black w-6 group-hover:w-20 group-hover:bg-black",
                      ].join(" ")}
                    />
                    <span
                      className={[
                        "transition-transform duration-300 ease-out",
                        isActive ? "translate-x-1.5" : "group-hover:translate-x-1.5",
                      ].join(" ")}
                    >
                      {s.label}
                    </span>
                  </a>
                );
              })}
            </nav>

            <div className="mt-10 h-px w-24 bg-black" />

            {/* Social icons pinned to bottom-left */}
            <div className="mt-auto pt-6">
              <div className="flex items-center gap-4 text-black">
                <a
                  href="https://www.linkedin.com/in/hao-cui-247101312/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="transition-colors hover:text-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/HaoCuii"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="transition-colors hover:text-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/hao_cuii/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/HaoCuii"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors hover:text-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:decubingexpert@gmail.com"
                  aria-label="Email"
                  className="transition-colors hover:text-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                >
                  <Mail className="h-5 w-5" />
                </a>
  
<a
  href={resume}
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Resume"
  className="group ml-2 inline-flex items-center gap-1.5 rounded-md border-black/20 px-3 py-1.5 text-sm font-medium transition-colors transition-transform duration-200 hover:-translate-y-0.5 hover:text-[#e19fff] hover:border-[#e19fff] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47]"
>
  <span>Résumé</span>
  <ArrowUpRight
    className="h-4 w-4 translate-y-[1px] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#e19fff]"
    aria-hidden="true"
  />
</a>

                {/* ======================================================== */}
              </div>
            </div>
          </aside>

          <main className="py-10 lg:py-24 space-y-24">
            <section id="about" aria-label="About" className="scroll-mt-20">
              <Reveal className="space-y-4">
                <p className="max-w-prose text-neutral-700 text-lg">
                  I’m a student in the IB Diploma Programme at Port Moody Secondary School.
                  Most of my free time goes into building things I want to use. In my free time I like
                  playing badminton and programming.
                </p>

                <div className="max-w-prose text-neutral-700 text-lg space-y-2">
                  <div className="font-semibold text-black">Stack</div>
                  <ul className="list-disc pl-5 space-y-1 text-[15px] leading-7">
                    <li><span className="font-medium text-black">Languages:</span> Python, C++, Java, Kotlin, TypeScript/JavaScript, HTML, CSS</li>
                    <li><span className="font-medium text-black">Frontend:</span> React, Next.js, Vite, Tailwind</li>
                    <li><span className="font-medium text-black">Mobile:</span> React Native, Expo</li>
                    <li><span className="font-medium text-black">Backend:</span> Firebase, WebSocket, Node.js</li>
                    <li><span className="font-medium text-black">ML:</span> OpenCV, PyTorch, NumPy, Tensorflow, ONNX, Pandas, YOLO, Mediapipe</li>
                    <li><span className="font-medium text-black">Other:</span> Git, Figma, Vercel, Badminton :)</li>
                  </ul>
                </div>

              </Reveal>
            </section>

            <section id="experience" aria-label="Experience" className="scroll-mt-20">
              <Reveal className="space-y-6">
                <ol className="space-y-16">
                  {experience.map((job, i) => (
                    <li
                      key={i}
                      className="relative group grid items-start gap-6 md:grid-cols-[0.40fr,1.65fr] p-3 -m-3"
                    >
                      {/* clickable over the whole row */}
                      <a
                        href={job.companyUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0"
                        aria-label={`${job.role} (opens in new tab)`}
                      />

                      {/* subtle grey “glass” on hover (no shadow) */}
                      <span
                        className="
                    pointer-events-none absolute inset-0
                    bg-neutral-900/5 dark:bg-white/5
                    opacity-0 transition-opacity duration-200
                    group-hover:opacity-50
                  "
                        aria-hidden="true"
                      />

                      {/* date (also reacts to hover) */}
                      <div className="text-sm font-medium text-black]">
                        {job.range}
                      </div>

                      {/* content */}
                      <div className="space-y-3">
                        <header className="flex items-start gap-2">
                          <h3
                            className="
                              text-xl font-semibold tracking-tight
                              transition-transform duration-200
                              group-hover:-translate-y-0.5
                              group-hover:text-[#e19fff]
                            "
                          >
                            {job.role}
                          </h3>
                          <ArrowUpRight
                            className="
                              h-4 w-4 translate-y-[2px]
                              transition-transform duration-200
                              group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                              group-hover:text-[#e19fff]
                            "
                            aria-hidden="true"
                          />
                        </header>
                        {job.subtitle && (
                          <div className="text-sm text-black">{job.subtitle}</div>
                        )}

                        {job.description && (
                          <p className="text-sm leading-6 text-neutral-700">
                            {job.description}
                          </p>
                        )}

                        {Array.isArray(job.tags) && job.tags.length > 0 && (
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {job.tags.map((t) => (
                              <li
                                key={t}
                                className="rounded-md px-3 py-1 text-xs font-medium bg-[#f1d3ff] text-black transition-transform duration-200 group-hover:-translate-y-0.5"
                              >
                                {t}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Projects Section */}
            <section id="projects" aria-label="Projects" className="scroll-mt-20">
              <Reveal className="space-y-6">
                <div className="space-y-6">
                  {projects.map((p, i) => {
                    const href = p.link || p.repo || "#";
                    const img = imageByName[p.name]; // use imported image by project name
                    return (
                      <a
                        key={i}
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="relative group grid items-stretch gap-4 rounded-2xl transition sm:grid-cols-[168px,1fr] p-3 -m-3"
                      >
                        {/* subtle grey “glass” on hover (match Experience) */}
                        <span
                          className="
                              pointer-events-none absolute inset-0
                              bg-neutral-900/5 dark:bg-white/5
                              opacity-0 transition-opacity duration-200
                              group-hover:opacity-50
                            "
                          aria-hidden="true"
                        />

                        <div className="relative hidden sm:block w-[168px] h-[105px] overflow-hidden rounded-md">
                          {img ? (
                            <img
                              src={img}
                              alt={p.name}
                              className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-xs text-neutral-300 bg-neutral-100">
                              Preview
                            </div>
                          )}
                          <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-neutral-200/60" />
                        </div>

                        {/* Right: content drives the height the image matches */}
                        <div className="flex min-h-[7rem] flex-col justify-start">
                          <div className="flex items-start justify-between">
                            <h3
                              className="
                                text-lg font-semibold tracking-tight
                                transition-transform duration-200
                                group-hover:-translate-y-0.5
                                group-hover:text-[#e19fff]
                              "
                            >
                              <span className="inline-flex items-center gap-1.5">
                                {p.name}
                                <ArrowUpRight
                                  className="
                                    h-4 w-4 translate-y-[1px]
                                    transition-all duration-200
                                    group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                                    group-hover:text-[#e19fff]
                                  "
                                  aria-hidden="true"
                                />
                              </span>
                            </h3>


                            {/* GitHub icon on the right (opens repo in new tab) */}
                            {p.repo && p.repo !== "#" && (
                              <span
                                role="button"
                                tabIndex={0}
                                aria-label="Open GitHub repository"
                                className="ml-3 inline-flex items-center text-black hover:text-[#e19fff] transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(p.repo, "_blank", "noopener,noreferrer");
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    window.open(p.repo, "_blank", "noopener,noreferrer");
                                  }
                                }}
                              >
                                <Github className="h-5 w-5" aria-hidden="true" />
                              </span>
                            )}
                          </div>

                          {p.text && (
                            <p className="mt-1 text-[13px] leading-6 text-neutral-700">{p.text}</p>
                          )}

                          {typeof p.stars === "number" && (
                            <div className="mt-2 text-sm text-neutral-600">★ {p.stars}</div>
                          )}

                          {Array.isArray(p.tech) && p.tech.length > 0 && (
                            <ul className="mt-3 flex flex-wrap gap-2">
                              {p.tech.map((t) => (
                                <li
                                  key={t}
                                  className="rounded-md px-3 py-1 text-xs font-medium
                     bg-[#f1d3ff] text-[#000000] ring-1 ring-[#f1d3ff]/20
                     dark:bg-[#f1d3ff] dark:text-[#000000] dark:ring-[#f1d3ff]/20
                     transition-transform duration-200 group-hover:-translate-y-0.5"
                                >
                                  {t}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              </Reveal>
            </section>

            <section aria-label="footer">
              <Reveal>
                <p className="text-sm text-neutral-500">
                  Thanks to{" "}
                  <a
                    href="https://brittanychiang.com"
                    rel="noreferrer"
                    target="_blank"
                    className=" text-neutral-800 hover:text-[#e19fff] font-medium underline"
                  >
                    Brittany Chiang
                  </a>{" "}
                  for the inspiration.
                </p>
              </Reveal>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
