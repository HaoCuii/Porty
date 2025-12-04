// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Palette } from "lucide-react";
import { Linkedin, Github, Mail } from "lucide-react";
import binit from "./assets/logo-binit.png";
import workflow from "./assets/workflow.png";
import conway from "./assets/conway.jpg";
import dmoj from "./assets/dmoj.png";
import freaky from "./assets/freaky.png";
import smashspeed from "./assets/AppIcon.png";
import fresco from "./assets/fresco.jpg";
import cluely from "./assets/cluely.jpg";
import PixelTrail from "./components/PixelTrail";
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
  const [accentColor, setAccentColor] = useState("#f1d3ff");

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
      companyUrl: "https://www.magichour.ai/",
      role: "Magic Hour",
      subtitle: "Software Engineer Intern",
      range: "NOV 2025 — PRESENT",
      description:
        "Prototyped and optimized end-to-end AI workflows, improving model generation latency by 15% using SageAttn2, FP16Fast, Teacache, and Torch Compile. Developed a data ingestion pipeline including a mobile TikTok scraper that bypasses SSL pinning with a custom MITM proxy, enabling collection of high-engagement video datasets.",
    },
    {
      companyUrl: "https://smashspeed.ca/",
      role: "Smashspeed",
      subtitle: "Chief Technology Officer",
      range: "MAY 2025 — PRESENT",
      description:
        "40k+ downloads across 100+ countries, amplified by a viral social campaign with millions reached. Executed an end-to-end port of the machine-learning shuttle tracker to React Native. Implemented a scalable serverless Firebase architecture (Auth, Firestore, Cloud Functions, Cloud Storage). Developed the marketing and product website with React + Tailwind, sustaining 10k+ monthly active users. Helped build the data pipeline using YOLOv5, curated and annotated 13k+ images to reach 93% model accuracy.",
    },
    {
      companyUrl: "https://furious-frogs-website.vercel.app/",
      role: "Furious Frogs",
      subtitle: "Developer",
      range: "SEPT 2024 — PRESENT",
      description:
        "Co-designed the autonomous system that ranked #191/100,000 competitors in the 2024 season. Implemented an auto-aim pipeline using AprilTag detection with OpenCV and tuning PID controllers for fast, stable targeting and shot alignment.",
    },
  ];

  const projects = [
    {
      name: "Smashspeed",
      brief: "AI-powered badminton tracker — 40k downloads across 100+ countries.",
      text: "Detects shots, estimates smash speed in real time, and visualizes your improvement with session summaries and trend charts. Amplified by a viral social media campaign with millions reached.",
      link: "https://smashspeed.ca/",
      repo: "https://github.com/HaoCuii/smashspeed_rn",
    },
    {
      name: "Steve the Freakysaur",
      brief: "Won 1st place at BC's largest high school hackathon — 160k+ impressions.",
      text: "A Chrome Dino–style game controlled entirely using tongue detection through real-time facial segmentation. Prototyped in Pygame before being ported to Next.js with TypeScript for web play.",
      link: "https://haocuii.itch.io/steve-the-freakysaur",
      repo: "https://github.com/diwenne/freakysaur",
      tech: ["Python", "OpenCV", "Next.js", "TypeScript"],
    },
    {
      name: "Architectural RAG",
      brief: "RAG chatbot for architectural drawings — created for Fresco YC F24.",
      text: "Preprocessed a vector pdf of the plan into a 300 DPI image, then ran multiple different passes of tesseract OCR over the regions of interests to convert the pdf to a json format.",
      link: "https://www.ycombinator.com/companies/fresco",
      repo: "https://github.com/HaoCuii/Fresco",
      tech: ["Python", "Tesseract OCR", "RAG", "Computer Vision"],
    },
    {
      name: "Cluely Gaze Tracker",
      brief: "Real-time gaze tracking at 15-30 FPS — 100ms latency on CPU only.",
      text: "Lightweight, local-only gaze tracking prototype using webcam to infer eye/pupil position and head pose, classifying gaze direction with landmark detection and temporal smoothing.",
      link: "https://cluely.com/",
      repo: "https://github.com/diwenne/gaze_detector",
      tech: ["Python", "OpenCV", "Mediapipe", "Computer Vision"],
    },
    {
      name: "DMOJ Solutions",
      brief: "200+ competitive programming problems — graph theory to IOI challenges.",
      text: "1 year of my life. Seg-Tree, Bitmask DP, DSU, Convex Hull, and more advanced algorithms and data structures.",
      link: "https://dmoj.ca/user/haocuii",
      repo: "https://github.com/HaoCuii/DMOJ-Solutions",
      tech: ["C++", "Python", "Data Structures", "Algorithms"],
    },
    {
      name: "Conway's Game of Life",
      brief: "Smooth simulation on large grids with memoized cells and batched updates.",
      text: "A take on Conway's Game of Life with controls for seeding, stepping, and speed adjustments.",
      link: "https://conways-game-of-life-38hy.vercel.app/",
      repo: "https://github.com/HaoCuii/Conways-Game-Of-Life",
      tech: ["JavaScript", "React"],
    },
    {
      name: "WorkFlow",
      brief: "Real-time collaboration tool with WebSockets and Firebase.",
      text: "A clean, distraction-free UI lets you create rooms, track tasks, and see updates instantly. Powered by WebSockets for low-latency presence and Firebase for auth, data sync, and persistence.",
      link: "https://www.yourworkflow.co/",
      repo: "https://github.com/HaoCuii/WorkFlow",
      tech: ["Websocket", "Firebase"],
    },
    {
      name: "Binit",
      brief: "Waste reduction dashboard and leaderboard — NWHacks 2025.",
      text: "LLM Wrapper = VC funding when? Built for NWHacks 2025 hackathon.",
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
    "Architectural RAG": fresco,
    "Cluely Gaze Tracker": cluely,
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
          color={accentColor}
          gooeyFilter={{ id: "goo", strength: 9 }}
        />
      </div>

      <div className="relative bg-white text-black antialiased">
        {/* Theme button in top right corner */}
        <div className="fixed top-6 right-6 z-50">
          <label className="relative cursor-pointer group">
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white transition-all duration-200 hover:scale-110">
              <Palette
                className="h-6 w-6 transition-all duration-200"
                style={{ color: accentColor }}
              />
            </div>
          </label>
        </div>

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
                  className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/HaoCuii"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/HaoCuii"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>
                <a
                  href="mailto:decubingexpert@gmail.com"
                  aria-label="Email"
                  className="transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47] rounded"
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <Mail className="h-5 w-5" />
                </a>

<a
  href="/Resume.pdf"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Resume"
  className="group ml-2 inline-flex items-center gap-1.5 rounded-md border-black/20 px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#515A47]"
  onMouseEnter={(e) => {
    e.currentTarget.style.color = accentColor;
    e.currentTarget.style.borderColor = accentColor;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.color = '';
    e.currentTarget.style.borderColor = '';
  }}
>
  <span>Résumé</span>
  <ArrowUpRight
    className="h-4 w-4 translate-y-[1px] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
                  I'm a student in the IB Diploma Programme at Port Moody Secondary School, studying Computer Science and Mathematics AA Higher Level with a 4.0 GPA. Most of my free time goes into building things I want to use. In my free time I like playing badminton and programming.
                </p>

                <div className="max-w-prose text-neutral-700 leading-relaxed space-y-2">
                  <p>
                    <span className="font-medium text-black">Languages:</span> Python, C++, Java, Kotlin, TypeScript, JavaScript, HTML, CSS, Bash
                  </p>
                  <p>
                    <span className="font-medium text-black">Frameworks:</span> React, Next.js, Node.js, Flask, Expo, React Native, Pandas, Tailwind
                  </p>
                  <p>
                    <span className="font-medium text-black">Technologies:</span> Git, Docker, Google Cloud, Firebase, Nginx, OpenCV, TensorFlow, PyTorch, ONNX, CUDA, MongoDB
                  </p>
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
                      onMouseEnter={(e) => {
                        const h3 = e.currentTarget.querySelector('h3');
                        const arrow = e.currentTarget.querySelector('.arrow-icon');
                        if (h3) {
                          h3.style.color = accentColor;
                          h3.style.textShadow = `0 0 20px ${accentColor}80`;
                        }
                        if (arrow) {
                          arrow.style.color = accentColor;
                          arrow.style.filter = `drop-shadow(0 0 8px ${accentColor}80)`;
                        }
                      }}
                      onMouseLeave={(e) => {
                        const h3 = e.currentTarget.querySelector('h3');
                        const arrow = e.currentTarget.querySelector('.arrow-icon');
                        if (h3) {
                          h3.style.color = '';
                          h3.style.textShadow = '';
                        }
                        if (arrow) {
                          arrow.style.color = '';
                          arrow.style.filter = '';
                        }
                      }}
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
                      <div className="text-xs font-medium text-black uppercase tracking-wider whitespace-nowrap">
                        {job.range}
                      </div>

                      {/* content */}
                      <div className="space-y-3">
                        <header className="flex items-start gap-2">
                          <h3
                            className="
                              text-xl font-semibold tracking-tight
                              transition-all duration-200
                              group-hover:-translate-y-0.5
                            "
                            style={{
                              transition: 'all 0.2s, text-shadow 0.2s'
                            }}
                          >
                            {job.role}
                          </h3>
                          <ArrowUpRight
                            className="
                              arrow-icon
                              h-4 w-4 translate-y-[2px]
                              transition-all duration-200
                              group-hover:-translate-y-0.5 group-hover:translate-x-0.5
                            "
                            style={{
                              transition: 'all 0.2s, filter 0.2s'
                            }}
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
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Projects Section */}
            <section id="projects" aria-label="Projects" className="scroll-mt-20">
              <Reveal className="space-y-6">
                <div className="space-y-3">
                  {projects.map((p, i) => {
                    const [isExpanded, setIsExpanded] = useState(false);
                    const href = p.link || p.repo || "#";
                    const img = imageByName[p.name];
                    return (
                      <div
                        key={i}
                        className="relative group p-3 -m-3"
                        onMouseEnter={(e) => {
                          const h3 = e.currentTarget.querySelector('.project-title');
                          const arrow = e.currentTarget.querySelector('.project-arrow');
                          if (h3) {
                            h3.style.color = accentColor;
                            h3.style.textShadow = `0 0 20px ${accentColor}80`;
                          }
                          if (arrow) {
                            arrow.style.color = accentColor;
                            arrow.style.filter = `drop-shadow(0 0 8px ${accentColor}80)`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          const h3 = e.currentTarget.querySelector('.project-title');
                          const arrow = e.currentTarget.querySelector('.project-arrow');
                          if (h3) {
                            h3.style.color = '';
                            h3.style.textShadow = '';
                          }
                          if (arrow) {
                            arrow.style.color = '';
                            arrow.style.filter = '';
                          }
                        }}
                      >
                        {/* subtle grey "glass" on hover */}
                        <span
                          className="
                              pointer-events-none absolute inset-0
                              bg-neutral-900/5 dark:bg-white/5
                              opacity-0 transition-opacity duration-200
                              group-hover:opacity-50 rounded-lg
                            "   
                          aria-hidden="true"
                        />

                        <div className="relative flex items-start gap-4">
                          {/* Square Logo */}
                          <div className="relative w-12 h-12 overflow-hidden rounded-md flex-shrink-0">
                            {img ? (
                              <img
                                src={img}
                                alt={p.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              <div className="w-full h-full bg-neutral-100 flex items-center justify-center text-xs text-neutral-400">
                                {p.name[0]}
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1.5 group/link"
                              >
                                <h3
                                  className="project-title text-base font-semibold tracking-tight transition-all"
                                  style={{ transition: 'all 0.2s, text-shadow 0.2s' }}
                                >
                                  {p.name}
                                </h3>
                                <ArrowUpRight
                                  className="project-arrow h-3.5 w-3.5 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                  style={{ transition: 'all 0.2s, filter 0.2s' }}
                                  aria-hidden="true"
                                />
                              </a>

                              {p.repo && p.repo !== "#" && (
                                <a
                                  href={p.repo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label="GitHub repository"
                                  className="text-black transition-colors"
                                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Github className="h-4 w-4" aria-hidden="true" />
                                </a>
                              )}

                              <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="ml-auto text-xs text-neutral-500 hover:text-black flex items-center gap-1 transition-colors"
                              >
                                {isExpanded ? "Less" : "More"}
                                <ChevronDown
                                  className={`h-3 w-3 transition-transform duration-200 ${
                                    isExpanded ? "rotate-180" : ""
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Brief description - always visible */}
                            <p className="text-sm text-neutral-700 mt-1">
                              {p.brief}
                            </p>

                            {/* Expandable content */}
                            {isExpanded && (
                              <div className="mt-3 space-y-3 pt-3 border-t border-neutral-200">
                                {p.text && (
                                  <p className="text-sm text-neutral-700">{p.text}</p>
                                )}

                                {Array.isArray(p.tech) && p.tech.length > 0 && (
                                  <ul className="flex flex-wrap gap-2">
                                    {p.tech.map((t) => (
                                      <li
                                        key={t}
                                        className="rounded-md px-3 py-1 text-xs font-medium text-black"
                                        style={{
                                          backgroundColor: `${accentColor}20`
                                        }}
                                      >
                                        {t}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
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
                    className=" text-neutral-800 hover:text-[#2596be] font-medium underline"
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
