"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowSquareOut, X, ArrowLeft, ArrowRight, GlobeSimple } from "@phosphor-icons/react";

/* ── Project data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: "tyedits",
    index: "001",
    title: "TYzEN Edits",
    category: "Video & Graphic Design",
    description:
      "A highly dynamic, cinematic portfolio showcase for a professional video editing and graphic design YouTube channel. Built with immersive scroll-driven animations, a custom cursor, and a deeply cinematic dark aesthetic designed to keep visitors engaged.",
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
    index: "002",
    title: "Padmini Homeo Clinic",
    category: "Healthcare UI/UX",
    description:
      "A clean, accessible healthcare website built for a homeopathic clinic to help patients find information and schedule appointments with ease. Features a calm visual language, clear navigation, and a fully responsive design across all devices.",
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
    index: "003",
    title: "YSC Throwball Club",
    category: "Full-Stack Webapp",
    description:
      "A complete web application for a sports club enabling members to track events, manage memberships, and stay connected with the community. Features a real-time dashboard, mobile-first design, and a clean administrative interface.",
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

type Project = (typeof PROJECTS)[number];

/* ── Lightbox ─────────────────────────────────────────────────── */
function Lightbox({
  project,
  startIndex,
  onClose,
}: {
  project: Project;
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  const total = project.screenshots.length;

  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{ background: "rgba(2,6,23,0.97)", backdropFilter: "blur(24px)" }}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/8 text-accent transition hover:bg-accent hover:text-black"
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + total) % total); }}
        className="absolute left-4 md:left-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % total); }}
        className="absolute right-4 md:right-8 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:border-accent/50 hover:text-accent"
      >
        <ArrowRight size={20} />
      </button>

      <div className="w-full max-w-5xl px-20" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={project.screenshots[idx]}
            alt={`${project.title} screenshot ${idx + 1}`}
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.93 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="w-full rounded-2xl object-contain"
            style={{
              maxHeight: "80vh",
              border: "1px solid rgba(16,185,129,0.35)",
              boxShadow:
                "0 0 0 1px rgba(16,185,129,0.08), 0 0 60px rgba(16,185,129,0.08), 0 40px 80px rgba(0,0,0,0.9)",
            }}
          />
        </AnimatePresence>
        <div className="mt-5 flex items-center justify-center gap-2">
          {project.screenshots.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setIdx(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                height: "6px",
                width: i === idx ? "28px" : "6px",
                background: i === idx ? "var(--accent)" : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </div>

      <div className="absolute top-5 left-6">
        <span className="block font-mono text-[9px] uppercase tracking-[0.4em] text-accent">
          {project.category}
        </span>
        <span className="block text-sm font-bold text-white">{project.title}</span>
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[10px] tabular-nums text-zinc-500">
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

/* ── Project Entry ────────────────────────────────────────────── */
function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activeShot, setActiveShot] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isEven = index % 2 === 0;

  /* Auto-rotate every 2.5s; pauses on hover or when lightbox is open */
  useEffect(() => {
    if (isPaused || lightboxIdx !== null) return;
    const timer = setInterval(() => {
      setActiveShot((prev) => (prev + 1) % project.screenshots.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [isPaused, lightboxIdx, project.screenshots.length]);

  return (
    <>
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            project={project}
            startIndex={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
          />
        )}
      </AnimatePresence>

      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
        className="relative py-20 md:py-28"
      >
        {/* Top divider */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.18) 30%, rgba(16,185,129,0.18) 70%, transparent)",
          }}
        />

        {/* Watermark index */}
        <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-sans text-[8rem] font-black leading-none tracking-tighter text-white opacity-[0.025] md:text-[14rem]">
          {project.index}
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">

          {/* ─── IMAGE COLUMN ─── */}
          <div className={`md:col-span-7 ${!isEven ? "md:order-2" : ""}`}>

            {/* Main screenshot — fixed height container, object-contain shows full image */}
            <div
              className="group relative cursor-zoom-in overflow-hidden rounded-2xl"
              onClick={() => setLightboxIdx(activeShot)}
              onMouseEnter={(e) => {
                setIsPaused(true);
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(16,185,129,0.65)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 30px rgba(16,185,129,0.12), 0 32px 64px -24px rgba(0,0,0,0.9)";
              }}
              onMouseLeave={(e) => {
                setIsPaused(false);
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(16,185,129,0.3)";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 32px 64px -24px rgba(0,0,0,0.8)";
              }}
              style={{
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(4,8,28,0.95)",
                boxShadow: "0 32px 64px -24px rgba(0,0,0,0.8)",
                transition: "box-shadow 0.4s ease, border-color 0.4s ease",
              }}
            >
              {/* HUD: Feed Secure */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-accent/40 bg-black/70 px-2.5 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                <span className="font-mono text-[8px] uppercase tracking-[0.38em] text-accent">
                  Feed Secure
                </span>
              </div>
              {/* HUD: SYS ID */}
              <div className="absolute top-3 right-3 z-10 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md">
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-zinc-400">
                  SYS // {project.id.toUpperCase()}
                </span>
              </div>

              {/* Fixed-height image — object-contain so full screenshot is always visible */}
              <div className="relative flex h-[300px] w-full items-center justify-center sm:h-[360px] md:h-[420px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeShot}
                    src={project.screenshots[activeShot]}
                    alt={`${project.title} screenshot ${activeShot + 1}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="max-h-full max-w-full object-contain"
                    style={{ padding: "12px" }}
                  />
                </AnimatePresence>
              </div>

              {/* Auto-progress bar */}
              <div className="relative h-[2px] w-full overflow-hidden bg-white/5">
                <motion.div
                  key={`bar-${activeShot}-${isPaused}`}
                  className="absolute left-0 top-0 h-full bg-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: isPaused ? "0%" : "100%" }}
                  transition={{ duration: 2.5, ease: "linear" }}
                />
              </div>

              {/* Hover: expand hint + counter */}
              <div
                className="absolute inset-x-0 bottom-[2px] flex items-center justify-between px-4 py-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(2,6,23,0.92) 0%, transparent 100%)",
                }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-accent">
                  Click to expand
                </span>
                <span className="font-mono text-[9px] tabular-nums text-zinc-500">
                  {String(activeShot + 1).padStart(2, "0")} /{" "}
                  {String(project.screenshots.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="mt-3 flex gap-2">
              {project.screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveShot(i)}
                  className="relative flex-1 overflow-hidden rounded-lg transition-all duration-200"
                  style={{
                    border:
                      i === activeShot
                        ? "1px solid rgba(16,185,129,0.7)"
                        : "1px solid rgba(255,255,255,0.07)",
                    opacity: i === activeShot ? 1 : 0.45,
                    boxShadow:
                      i === activeShot ? "0 0 12px rgba(16,185,129,0.2)" : "none",
                    transition: "all 0.2s ease",
                    background: "rgba(4,8,28,0.9)",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== activeShot) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.72";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(16,185,129,0.35)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (i !== activeShot) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.45";
                      (e.currentTarget as HTMLButtonElement).style.borderColor =
                        "rgba(255,255,255,0.07)";
                    }
                  }}
                >
                  {/* Fixed-height thumb — object-contain so full thumb is visible */}
                  <div className="flex h-16 w-full items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`thumb ${i + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  {i === activeShot && (
                    <div className="absolute inset-x-0 bottom-0 h-0.5 bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ─── INFO COLUMN ─── */}
          <div
            className={`flex flex-col justify-center md:col-span-5 ${
              !isEven ? "md:order-1 md:pr-8" : "md:pl-8"
            }`}
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-accent/50" />
              <span className="font-mono text-[9px] uppercase tracking-[0.45em] text-accent">
                {project.category} // {project.index}
              </span>
            </div>

            {/* Title */}
            <h3 className="mb-5 font-sans text-4xl font-black leading-[0.9] tracking-tighter text-foreground md:text-5xl lg:text-6xl">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-[15px]">
              {project.description}
            </p>

            {/* Status — flat indicator, NOT a button */}
            <div className="mb-6 flex items-center gap-2.5">
              {project.local ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-zinc-500">
                    Status — Locally Hosted
                  </span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.42em] text-accent">
                    Status — Live
                  </span>
                </>
              )}
            </div>

            {/* CTA */}
            {!project.local && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2.5 rounded-full border border-accent/30 bg-accent/8 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.35em] text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-black"
              >
                <GlobeSimple size={13} weight="bold" />
                View Deployment
                <ArrowSquareOut
                  size={13}
                  weight="bold"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </>
  );
}

/* ── Section export ───────────────────────────────────────────── */
export function ProjectArchive() {
  return (
    <section id="archive" className="relative z-10 px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Section header */}
        <motion.div
          className="pb-4 pt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5">
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.4em] text-accent"
              style={{
                border: "1px solid rgba(16,185,129,0.3)",
                background: "rgba(16,185,129,0.06)",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Archive // Classified Builds
            </div>
          </div>

          <h2 className="font-sans text-5xl font-black leading-[0.9] tracking-tighter text-foreground md:text-7xl">
            Project <span className="text-accent">Archive.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            A curated repository of every deployed interface and web experience —
            engineered with obsessive precision. Screenshots auto-advance every 2.5 s.
          </p>
        </motion.div>

        {/* Entries */}
        <div>
          {PROJECTS.map((project, i) => (
            <ProjectEntry key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Footer line */}
        <motion.div
          className="mb-8 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.25) 50%, transparent)",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
