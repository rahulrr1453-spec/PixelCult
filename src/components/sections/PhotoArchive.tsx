"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { ArrowSquareOut, ArrowDown } from "@phosphor-icons/react";

/* ── Data ─────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "tyedits",
    title: "TYzEN Edits",
    category: "Video & Graphic Design",
    description:
      "A highly dynamic, cinematic portfolio showcase for a professional video editing and graphic design YouTube channel.",
    link: "https://tyzenedits.netlify.app",
    local: false,
    screenshots: [
      "/projects/tyedits1.png",
      "/projects/tyedits2.png",
      "/projects/tyedits3.png",
      "/projects/tyedits4.png",
      "/projects/tyedits5.png",
    ],
  },
  {
    id: "phc",
    title: "Padmini Homeo Clinic",
    category: "Healthcare UI/UX",
    description:
      "An accessible, user-friendly static webpage built for a homeopathic clinic to provide clear information and easy patient scheduling.",
    link: "#",
    local: true,
    screenshots: [
      "/projects/phc1.png",
      "/projects/phc2.png",
      "/projects/phc3.png",
      "/projects/phc4.png",
      "/projects/phc5.png",
    ],
  },
  {
    id: "ysc",
    title: "YSC Throwball Club",
    category: "Full-Stack Webapp",
    description:
      "A complete full-stack web application for a sports club to manage memberships, events, and community updates seamlessly.",
    link: "https://bangalore-throwball-premier-league.netlify.app/",
    local: false,
    screenshots: [
      "/projects/ysc1.png",
      "/projects/ysc2.png",
      "/projects/ysc3.png",
      "/projects/ysc4.png",
      "/projects/ysc5.png",
    ],
  },
];

/* Flatten all screenshots into a single ordered list */
const ALL_SLIDES = PROJECTS.flatMap((p) =>
  p.screenshots.map((src, i) => ({
    src,
    projectId: p.id,
    projectTitle: p.title,
    projectCategory: p.category,
    projectDescription: p.description,
    projectLink: p.link,
    local: p.local,
    screenshotIndex: i + 1,
    totalScreenshots: p.screenshots.length,
  }))
);

const TOTAL = ALL_SLIDES.length; // 15

/* ── 3D slide variants ────────────────────────────────────────── */
const variants = {
  enter: (dir: number) => ({
    rotateX: dir > 0 ? 55 : -55,
    scale: 0.82,
    opacity: 0,
    z: -500,
    y: dir > 0 ? 60 : -60,
  }),
  center: {
    rotateX: 0,
    scale: 1,
    opacity: 1,
    z: 0,
    y: 0,
  },
  exit: (dir: number) => ({
    rotateX: dir > 0 ? -55 : 55,
    scale: 0.82,
    opacity: 0,
    z: -500,
    y: dir > 0 ? -60 : 60,
  }),
};

/* ── Dot map: project colour class using site palette ─────────── */
function projectDot(id: string) {
  if (id === "tyedits") return "bg-accent";
  if (id === "phc")     return "bg-accent";
  return "bg-brand-accent";
}

/* ── Main Component ───────────────────────────────────────────── */
export function PhotoArchive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);

  /* Scroll tracking — maps full section scroll to slide index */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      // clamp to [0, TOTAL-1]
      const raw = Math.floor(v * TOTAL);
      const next = Math.max(0, Math.min(raw, TOTAL - 1));
      setActiveIdx((prev) => {
        if (next !== prev) setDirection(next > prev ? 1 : -1);
        return next;
      });
    });
  }, [scrollYProgress]);

  const slide = ALL_SLIDES[activeIdx];

  /* Compute overall progress 0–1 */
  const progress = (activeIdx / (TOTAL - 1)) * 100;

  /* Find which project indices form the project blocks */
  const projectBlocks = PROJECTS.map((p, pi) => {
    const start = PROJECTS.slice(0, pi).reduce((a, q) => a + q.screenshots.length, 0);
    return { id: p.id, title: p.title, start, count: p.screenshots.length };
  });

  return (
    /* Section height = TOTAL * 100vh so scroll drives the viewer */
    <section
      ref={sectionRef}
      id="archive"
      className="relative"
      style={{ height: `${TOTAL * 100}vh` }}
    >
      {/* ── Sticky 3D Viewer ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* Ambient background that shifts subtly */}
        <div
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(16,185,129,0.05) 0%, transparent 70%)",
          }}
        />

        {/* ── Top HUD bar ── */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
          {/* Section label */}
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-accent/60" />
            <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-accent">
              Photo Archive
            </span>
          </div>

          {/* Project title + link */}
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500 md:block">
              {slide.projectTitle}
            </span>
            {!slide.local ? (
              <a
                href={slide.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/8 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent transition-all hover:border-accent/60 hover:bg-accent/15"
              >
                Live <ArrowSquareOut size={10} weight="bold" />
              </a>
            ) : (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                Locally Hosted
              </span>
            )}
          </div>
        </div>

        {/* ── 3D Stage ── */}
        <div
          className="relative flex flex-1 items-center justify-center px-6 md:px-16"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 40%" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIdx}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.55,
                ease: [0.23, 1, 0.32, 1],
              }}
              className="relative w-full max-w-5xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Screenshot */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.src}
                alt={`${slide.projectTitle} screenshot ${slide.screenshotIndex}`}
                className="h-auto w-full rounded-2xl object-contain"
                style={{
                  maxHeight: "72vh",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06), 0 40px 80px -20px rgba(0,0,0,0.85), 0 0 60px rgba(16,185,129,0.06)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              />

              {/* Bottom meta chip on the image */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-1.5 backdrop-blur-md">
                <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-400">
                  {slide.projectTitle}
                </span>
                <span className="text-zinc-600">·</span>
                <span className="font-mono text-[9px] tabular-nums text-zinc-500">
                  {String(slide.screenshotIndex).padStart(2, "0")} / {String(slide.totalScreenshots).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom HUD ── */}
        <div className="relative z-20 px-6 pb-6 md:px-12 md:pb-8">
          {/* Progress bar */}
          <div className="mb-3 h-px w-full bg-white/6">
            <div
              className="h-full bg-accent origin-left transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            {/* Project dots navigator */}
            <div className="flex items-center gap-4">
              {projectBlocks.map((pb) => {
                const isActive =
                  activeIdx >= pb.start && activeIdx < pb.start + pb.count;
                const localProgress = isActive
                  ? ((activeIdx - pb.start + 1) / pb.count) * 100
                  : 0;

                return (
                  <div key={pb.id} className="flex flex-col gap-1">
                    <span
                      className="font-mono text-[8px] uppercase tracking-[0.35em] transition-colors duration-300"
                      style={{ color: isActive ? "var(--accent)" : "var(--muted)" }}
                    >
                      {pb.title}
                    </span>
                    {/* Mini progress bar per project */}
                    <div className="h-0.5 w-16 rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${localProgress}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Scroll hint + global counter */}
            <div className="flex items-center gap-3">
              {activeIdx < TOTAL - 1 && (
                <span className="hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 md:flex">
                  <ArrowDown size={10} className="animate-bounce" />
                  Scroll
                </span>
              )}
              <span className="font-mono text-[10px] tabular-nums text-zinc-500">
                {String(activeIdx + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(TOTAL).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
