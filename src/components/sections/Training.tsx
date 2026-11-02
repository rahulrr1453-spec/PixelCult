"use client";

import {
  GraduationCap,
  Code,
  HardDrives,
  Graph,
  Student,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  TerminalWindow,
  Bug,
  Certificate,
  Sparkle,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import Link from "next/link";

const COURSES = [
  {
    title: "Software & Dev",
    icon: Code,
    color: "text-accent",
    items: ["Web Development", "Python Programming", "Android App Dev"],
  },
  {
    title: "Cloud & Infrastructure",
    icon: HardDrives,
    color: "text-brand-accent",
    items: ["Linux & Adv. Linux", "Azure & AWS Cloud", "DevOps & Databases"],
  },
  {
    title: "Data & AI",
    icon: Graph,
    color: "text-emerald-400",
    items: ["Data Analytics (SQL)", "Pandas & Python", "AI & ML Solutions"],
  },
  {
    title: "Cybersecurity & SOC",
    icon: ShieldCheck,
    color: "text-red-400",
    items: ["Splunk & Wazuh SIEM", "AWS Cloud Security", "Penetration Testing"],
  },
];

const PRACTICAL_PROJECTS = [
  {
    title: "SOC & Security Operations",
    subtitle: "Real-time Threat Detection with AWS & Splunk",
    stack: ["AWS EC2", "Splunk SIEM", "Linux", "Bash", "SPL"],
    achievements: [
      "Architect and deploy a fully functional cloud-based SOC environment on AWS EC2.",
      "Simulate SSH brute-force attacks and detect 100% of attack events using custom SPL.",
      "Implement real-time alerting rules for brute-force threshold detection.",
      "Design Splunk dashboards for visualizing attack trends and failure timelines.",
    ],
    icon: ShieldCheck,
  },
  {
    title: "End-to-End SIEM Deployment",
    subtitle: "MITRE ATT&CK Detection with Wazuh",
    stack: ["Wazuh SIEM", "AWS EC2", "Kali Linux", "Hydra", "MITRE ATT&CK"],
    achievements: [
      "Deploy a production-grade Wazuh SIEM instance on AWS and integrate monitored endpoints.",
      "Simulate real-world adversarial techniques using Kali Linux and Hydra.",
      "Map detected attack activity to MITRE ATT&CK techniques (T1110, T1046).",
      "Build live dashboards for visualizing top attack sources and event frequency.",
    ],
    icon: TerminalWindow,
  },
  {
    title: "Vulnerability Assessment",
    subtitle: "Web App Pentesting & OWASP Exploitation",
    stack: ["DVWA", "Burp Suite", "Kali Linux", "SQLi", "XSS"],
    achievements: [
      "Conduct structured web penetration tests covering OWASP Top 10 categories.",
      "Exploit SQL Injection and XSS vulnerabilities in controlled environments.",
      "Use Burp Suite to intercept and modify HTTP request parameters for testing.",
      "Produce structured vulnerability reports with CVSS severity and remediation guidance.",
    ],
    icon: Bug,
  },
];

export function Training() {
  return (
    <section
      id="nextskills"
      className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 md:px-12 bg-slate-900/40 border-y border-white/5 overflow-hidden w-full"
    >
      {/* Anchor for legacy #training links */}
      <span id="training" className="absolute -top-24" />

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
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-purple-300 max-w-full flex-wrap"
              style={{
                border: "1px solid rgba(168,85,247,0.35)",
                background: "rgba(168,85,247,0.08)",
              }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
              NextSkills {"//"} Powered by PixelCult
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-500">
              Active Cohort Training
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight break-words">
                Technical Training: <span className="text-purple-400">NextSkills.</span>
              </h2>
              <p className="mt-3 sm:mt-4 max-w-3xl text-sm sm:text-base text-zinc-300 md:text-lg leading-relaxed">
                NextSkills, powered by PixelCult — bridging the gap between academia and industry. Providing extensive technical courses with <span className="text-accent font-bold">hands-on project integration</span> and specializing in Final Year College Project Mentorship.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 self-start md:self-end shrink-0">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-purple-500/20 bg-purple-500/5 px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-purple-300">
                <Certificate size={14} className="text-purple-400" />
                Verified Digital Certs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-accent/20 bg-accent/5 px-2.5 sm:px-3 py-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-zinc-300">
                <Student size={14} className="text-accent" />
                College Mentorship
              </span>
            </div>
          </div>
        </div>

        {/* Hero Spotlight Card with NextSkills Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative mb-16 overflow-hidden rounded-3xl border border-purple-500/25 bg-gradient-to-br from-[#0c0418] via-[#050b24] to-[#02131b] p-6 sm:p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.18)] w-full"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-purple-600/10 blur-[100px]" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-accent/10 blur-[100px]" />

          {/* Corner brackets */}
          <div className="pointer-events-none absolute left-5 top-5 text-purple-400/40">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M0 12V0H12" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="pointer-events-none absolute right-5 top-5 text-purple-400/40">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M20 12V0H8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Logo Display Area */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative mb-6 w-full max-w-[340px] sm:max-w-[400px] rounded-2xl border border-purple-500/30 bg-black/50 p-5 sm:p-6 backdrop-blur-xl shadow-2xl flex items-center justify-center group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/nextskills.png"
                  alt="NextSkills — Powered by PixelCult Logo"
                  className="h-auto max-h-24 sm:max-h-28 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(168,85,247,0.45)] transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 bg-purple-500/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-purple-300">
                  <Sparkle size={12} weight="fill" />
                  Dual-Accredited Certs
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-accent">
                  <ShieldCheck size={12} />
                  Production Labs
                </span>
              </div>
            </div>

            {/* Description & Academy Scope */}
            <div className="lg:col-span-7 space-y-4">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-purple-400">
                Academy Briefing {"//"} Educational Ecosystem
              </div>
              <h3 className="font-sans text-2xl font-black text-foreground sm:text-3xl lg:text-4xl">
                Engineering-First Curriculum Built for Production.
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
                <strong className="text-white">NextSkills</strong> is the specialized training and technical research accelerator powered by PixelCult. We dismantle passive lecture learning in favor of production-grade development, real-time security operations (SIEM/SOC), and 1-on-1 Final Year College Project Mentorship. Every course is engineered to yield verifiable credentials and live portfolio repositories.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/services#training-certification"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-purple-500 hover:bg-purple-400 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] w-full sm:w-auto"
                >
                  Explore Course Tracks
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-200 transition-all duration-300 w-full sm:w-auto"
                >
                  Final Year Project Help
                  <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4 Course Tracks Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((course, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-slate-950/60 p-8 transition-all duration-300 hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.1)]"
            >
              <h4 className={`mb-6 flex items-center gap-3 text-lg font-bold ${course.color}`}>
                <course.icon size={24} weight="duotone" />
                {course.title}
              </h4>
              <ul className="space-y-4">
                {course.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 font-mono text-xs text-zinc-400 transition-colors hover:text-foreground"
                  >
                    <ArrowRight size={14} className="text-purple-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/services#training-certification"
            className="group inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300 backdrop-blur-md transition-all duration-300 hover:bg-purple-500 hover:text-black hover:shadow-[0_0_25px_rgba(168,85,247,0.3)]"
          >
            View More Courses
            <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Projects Section */}
        <div className="mt-24 mb-16">
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-foreground md:text-3xl">
              Project-Based <span className="text-accent">Practical Training.</span>
            </h3>
            <p className="mt-2 text-zinc-400">
              Industry-aligned training focused on building real-world security and software solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRACTICAL_PROJECTS.map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-8 transition-all hover:border-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.12)]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-black transition-all duration-500">
                  <project.icon size={24} weight="duotone" />
                </div>

                <h4 className="text-xl font-bold text-foreground">{project.title}</h4>
                <p className="mb-4 text-xs font-medium text-purple-400/80">{project.subtitle}</p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white/5 px-2 py-1 font-mono text-[9px] text-zinc-500 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {project.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[11px] leading-relaxed text-zinc-400">
                      <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-400/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-slate-900 via-slate-950 to-[#0c0418] p-5 sm:p-8 md:p-12 relative">
          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent">
                <Student size={32} weight="duotone" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">Special Programme</p>
                <h3 className="text-2xl font-black text-foreground md:text-3xl">College Project Mentorship</h3>
              </div>
            </div>

            <p className="max-w-2xl text-lg leading-relaxed text-zinc-300">
              Struggling with your final year project? We freelance directly with students to{" "}
              <span className="font-semibold text-foreground">guide, train, and build</span> robust technical projects from scratch.
            </p>

            <div className="flex flex-wrap gap-3">
              {["1-on-1 Guidance", "End-to-End Dev", "Documentation", "Any Stack"].map((feat) => (
                <span
                  key={feat}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] text-zinc-400"
                >
                  <CheckCircle size={14} className="text-accent" />
                  {feat}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Get Project Help
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/services#college-internships"
                className="group inline-flex w-full sm:w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                View Internship Details
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500/5 blur-[80px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
