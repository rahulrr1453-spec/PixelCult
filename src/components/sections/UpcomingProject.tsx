"use client";

import { motion } from "framer-motion";
import {
  UsersThree,
  CalendarCheck,
  NotePencil,
  Brain,
  ChartLineUp,
  DeviceMobile,
  Desktop,
  Sparkle,
  ArrowRight,
  ShieldCheck,
} from "@phosphor-icons/react";
import { TiltCard } from "@/components/ui/TiltCard";

const CAPABILITIES = [
  {
    icon: UsersThree,
    title: "Student & Staff Data Hub",
    badge: "Institution Scale",
    color: "text-accent",
    description:
      "Centralizes the entire institution's records into a secure, unified database. Seamlessly manage student directories, faculty credentials, departmental hierarchies, and academic profiles with enterprise-grade access control.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Attendance Tracking",
    badge: "Real-Time Tracking",
    color: "text-brand-accent",
    description:
      "Automated attendance capture across lecture halls, laboratory sessions, and events. Real-time absence alerts, automated eligibility threshold calculations, and instant administrative compliance reports.",
  },
  {
    icon: NotePencil,
    title: "Manual & AI Assessment Generation",
    badge: "Dual Generation Engine",
    color: "text-violet-400",
    description:
      "Create tests, quizzes, and comprehensive semester exams with total flexibility. Educators can craft questions manually or deploy fine-tuned academic AI to generate curriculum-mapped question banks in seconds.",
  },
  {
    icon: Brain,
    title: "Automated & Manual Evaluation",
    badge: "AI & Faculty Grading",
    color: "text-emerald-400",
    description:
      "Combines cutting-edge AI automated scoring for rapid question evaluation with customizable faculty rubrics for manual review. Provides students with immediate, detailed feedback.",
  },
  {
    icon: ChartLineUp,
    title: "AI Student Ranking & Analytics",
    badge: "Predictive Analytics",
    color: "text-sky-400",
    description:
      "Intelligent neural models evaluate cumulative performance to calculate institutional and cohort percentiles, discover learning plateaus early, and deliver actionable academic intervention insights.",
  },
  {
    icon: DeviceMobile,
    title: "Webapp & Native Mobile Ecosystem",
    badge: "Cross-Platform",
    color: "text-amber-400",
    description:
      "Built for universal accessibility. Features a responsive, high-throughput desktop web application alongside native mobile applications for iOS and Android, keeping students and staff synced in real time.",
  },
];

export function UpcomingProject() {
  return (
    <section id="campusiq" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-900/30 border-y border-white/5 overflow-hidden w-full">
      <div className="mx-auto max-w-[1400px]">

        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex flex-wrap items-center gap-2.5"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-accent max-w-full flex-wrap"
              style={{
                border: "1px solid rgba(16,185,129,0.35)",
                background: "rgba(16,185,129,0.08)",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
              Pipeline {"//"} Upcoming Project
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500">
              In Active Engineering
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight break-words">
                Upcoming Flagship: <span className="text-accent">CampusIQ.</span>
              </h2>
              <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base text-zinc-300 md:text-lg leading-relaxed">
                An AI-powered campus management system engineered to orchestrate an entire university or educational institution&apos;s data, operations, and academic assessment pipelines.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-end shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-300">
                <Desktop size={14} className="text-accent" />
                Web Application
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-300">
                <DeviceMobile size={14} className="text-brand-accent" />
                Mobile App
              </span>
            </div>
          </div>
        </div>

        {/* Hero Spotlight Card with Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-12 overflow-hidden rounded-3xl border border-accent/25 bg-gradient-to-br from-[#020617] via-[#040d24] to-[#02131b] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(16,185,129,0.12)] w-full"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-sky-500/10 blur-[100px]" />

          {/* Corner brackets */}
          <div className="pointer-events-none absolute left-5 top-5 text-accent/30">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M0 12V0H12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-5 top-5 text-accent/30">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M20 12V0H8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo Display Area */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative mb-6 w-full max-w-[340px] sm:max-w-[400px] rounded-2xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl shadow-2xl flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/campusIQ.png"
                  alt="CampusIQ — AI Powered Campus Management System Logo"
                  className="h-auto max-h-24 sm:max-h-28 w-auto object-contain filter drop-shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                  <Sparkle size={12} weight="fill" />
                  AI-Powered Ecosystem
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                  <ShieldCheck size={12} />
                  Enterprise Secure
                </span>
              </div>
            </div>

            {/* Description & Institutional Scope */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                System Briefing {"//"} Educational OS
              </div>
              <h3 className="font-sans text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                The Operating System for Modern Academic Institutions.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                <strong className="text-white">CampusIQ</strong> is engineered to eliminate fragmented administrative software. By consolidating student registries, faculty administration, daily attendance, automated AI-generated assessments, precision evaluations, and dynamic student rankings into one intelligent platform, institutions operate with real-time clarity across both web and mobile environments.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] w-full sm:w-auto"
                >
                  Inquire Early Access
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </a>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-500 text-center sm:text-left">
                  ★ Webapp & Mobile App Currently In Development
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6 Capabilities Grid */}
        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
          {CAPABILITIES.map((cap, i) => (
            <TiltCard key={i} delay={i * 0.08} className="p-5 sm:p-7">
              <div className="flex h-full flex-col pointer-events-none" style={{ transform: "translateZ(25px)" }}>
                <div className="mb-6 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${cap.color}`}>
                    <cap.icon size={26} weight="duotone" />
                  </div>
                  <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                    {cap.badge}
                  </span>
                </div>

                <h4 className="mb-2 text-xl font-bold text-foreground">{cap.title}</h4>
                <p className="flex-grow text-sm leading-relaxed text-zinc-400">{cap.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}