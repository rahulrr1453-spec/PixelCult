"use client";

import { Navbar } from "@/components/ui/Navbar";
import { Works } from "@/components/sections/Works";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";

export default function WorkPage() {
  return (
    <>
      <Navbar />

      {/* Subtle dark layer — keeps particles visible but readable over them */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(2,6,23,0.30) 0%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.65) 100%)",
        }}
      />

      <main className="relative z-10">
        {/* ── Page Hero ── */}
        <section className="relative flex min-h-[55vh] flex-col items-start justify-end px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
          {/* Scanline grid texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(16,185,129,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Large ambient glow */}
          <div
            className="pointer-events-none absolute left-0 top-1/3 h-[500px] w-[500px] -translate-y-1/2 rounded-full blur-[120px]"
            style={{ background: "rgba(16,185,129,0.06)" }}
          />

          {/* HUD corner brackets */}
          <div className="pointer-events-none absolute left-6 top-28 text-accent/30 md:left-12 md:top-36">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M0 14V0H14" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-6 top-28 text-accent/30 md:right-12 md:top-36">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M24 14V0H10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1400px]">
            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center gap-3"
            >
              <div
                className="flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.45em] text-accent"
                style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.06)" }}
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
                PixelCult OS — Works & Deployments
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.07 }}
              className="font-sans text-[clamp(3.5rem,11vw,8rem)] font-black leading-[0.87] tracking-tighter text-foreground"
            >
              Our{" "}
              <span
                className="text-accent"
                style={{ textShadow: "0 0 60px rgba(16,185,129,0.25)" }}
              >
                Work.
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-5 max-w-[44ch] text-sm leading-relaxed text-zinc-400 md:text-base"
            >
              A complete record of every interface, application, and digital system we have shipped — from featured deployments to the full project archive.
            </motion.p>
          </div>

          {/* Bottom scan line */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.25) 35%, rgba(16,185,129,0.5) 50%, rgba(16,185,129,0.25) 65%, transparent 100%)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.2 }}
          />
        </section>

        {/* Section: Featured Deployments */}
        <div className="relative">
          {/* Subtle section background so cards float over the particles */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(2,6,23,0.3)" }}
          />
          <div className="relative z-10">
            <Works />
          </div>
        </div>

        {/* Section: Project Archive */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "rgba(2,6,23,0.25)" }}
          />
          <div className="relative z-10">
            <ProjectArchive />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
