"use client";

import Link from "next/link";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/TiltCard";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import {
  Desktop,
  DeviceMobile,
  Cube,
  Cpu,
  Code,
  HardDrives,
  Graph,
  ShieldCheck,
  TerminalWindow,
  GraduationCap,
  Certificate,
  Student,
  ArrowUpRight,
  Database,
  Briefcase
} from "@phosphor-icons/react";

const COURSES = [
  {
    title: "Python Engineering & Scripting",
    description: "Master advanced Python logic, object-oriented programming, data structures, scripting automation, and custom API integrations.",
    icon: Code,
    color: "text-accent",
    tag: "Python / OOP"
  },
  {
    title: "Cloud Architectures",
    description: "Architect secure, fault-tolerant infrastructure on AWS & Azure. Master VPC networking, virtual machines, and cloud storage paradigms.",
    icon: HardDrives,
    color: "text-brand-accent",
    tag: "AWS / Azure"
  },
  {
    title: "DevOps & Infrastructure",
    description: "Learn infrastructure as code, containerization with Docker, CI/CD automation pipelines, Git collaboration, and automated deployments.",
    icon: TerminalWindow,
    color: "text-accent",
    tag: "CI/CD / Docker"
  },
  {
    title: "Database Administration",
    description: "Design efficient schemas, write optimized SQL queries, manage users, set backup protocols, and administer PostgreSQL & MySQL servers.",
    icon: Database,
    color: "text-emerald-400",
    tag: "SQL / DBA"
  },
  {
    title: "Data Analytics",
    description: "Extract actionable business insights. Perform advanced data cleaning and visualizations using Python, SQL, and advanced analytics packages.",
    icon: Graph,
    color: "text-amber-400",
    tag: "Pandas / SQL"
  },
  {
    title: "Linux Engineering",
    description: "Master CentOS & enterprise Linux systems. Navigate the CLI, automate operations with Bash scripting, and secure Linux servers.",
    icon: Cpu,
    color: "text-brand-accent",
    tag: "CentOS / Shell"
  },
  {
    title: "Cybersecurity & SOC Operations",
    description: "Deploy SIEM tools (Splunk, Wazuh) on AWS, simulated threat responses, web app penetration testing, and vulnerability assessments.",
    icon: ShieldCheck,
    color: "text-red-400",
    tag: "SIEM / Pentesting"
  }
];

export function ServicesClient() {
  return (
    <>
      <Navbar />

      {/* Background radial gradient overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 20%, rgba(2,6,23,0.30) 0%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.65) 100%)",
        }}
      />

      <main className="relative z-10">
        {/* ── Page Hero ── */}
        <section className="relative flex min-h-[50vh] flex-col items-start justify-end px-6 pb-16 pt-36 md:px-12 md:pb-20 md:pt-44">
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
            <div className="mb-6 flex items-center gap-3">
              <EyebrowBadge>PixelCult OS — Services & Programs</EyebrowBadge>
            </div>

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
                Services.
              </span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="mt-5 max-w-[48ch] text-sm leading-relaxed text-zinc-400 md:text-base"
            >
              Deploying cutting-edge software architecture, providing specialized technical training, and mentoring next-generation engineers with verifiable certifications.
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

        {/* ── SECTION 1: WEB & MOBILE DEVELOPMENT ── */}
        <section id="engineering-capabilities" className="relative z-10 py-24 px-6 md:px-12 border-b border-white/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">Capabilities // 01</p>
                <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl">
                  Web & App <span className="text-accent">Designs.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-base text-zinc-400 md:text-lg">
                  Custom engineered frontends, scalable application logic, and premium performance metrics optimized for maximum visual impact and robust stability.
                </p>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                SYSTEM LATENCY: MINIMAL
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Static Websites */}
              <TiltCard className="p-8 md:p-10">
                <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent">
                    <Desktop size={32} weight="duotone" />
                  </div>
                  
                  <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent/80">Option 01 // Lightweight</div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Static Website Architecture</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                    Ultra-fast loading, fully responsive marketing environments and landing pages. Built with pristine semantic layouts ensuring flawless SEO configurations and lightweight client footprints.
                  </p>
                </div>
              </TiltCard>

              {/* Dynamic Websites */}
              <TiltCard className="p-8 md:p-10">
                <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-accent">
                    <Cpu size={32} weight="duotone" />
                  </div>
                  
                  <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent/80">Option 02 // Interactive</div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Dynamic Web Applications</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                    Feature-rich, complex web apps driven by backend computation. Integrated with administrative dashboards, user authorization gates (JWT), real-time database syncing, and automated email nodes.
                  </p>
                </div>
              </TiltCard>

              {/* 3D Websites */}
              <TiltCard className="p-8 md:p-10">
                <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-accent">
                    <Cube size={32} weight="duotone" />
                  </div>
                  
                  <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent/80">Option 03 // Immersive</div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Immersive 3D WebGL Experiences</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                    Bespoke web platforms built using high-performance 3D graphics. Custom GLSL shaders, camera tracking, scroll-triggered environments, and particle simulations to create unforgettable corporate statements.
                  </p>
                </div>
              </TiltCard>

              {/* Android Applications */}
              <TiltCard className="p-8 md:p-10">
                <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-brand-accent">
                    <DeviceMobile size={32} weight="duotone" />
                  </div>
                  
                  <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-brand-accent/80">Option 04 // Mobile</div>
                  <h3 className="mb-4 text-2xl font-bold text-foreground">Native Android Development</h3>
                  <p className="text-sm leading-relaxed text-zinc-400 md:text-base">
                    Robust, enterprise-ready mobile products built natively for Android OS. Excellent optimization for sensor pipelines, background notification protocols, secure local data storage, and smooth touch responsive interfaces.
                  </p>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: TECHNICAL TRAINING & CERTIFICATION ── */}
        <section id="training-certification" className="relative z-10 py-24 px-6 md:px-12 bg-slate-900/20 border-b border-white/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-16 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent mb-3">Education // 02</p>
              <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl">
                Technical Training <span className="text-accent">& Courses.</span>
              </h2>
              <p className="mt-4 mx-auto max-w-3xl text-base text-zinc-300 md:text-lg">
                Rigorous programs tailored to equip you with real-world deployment skills. Train with production architects on current tech stacks and receive an official verified digital credential.
              </p>
            </div>

            {/* Redesigned grid with 7 courses and 1 featured certification highlight card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {COURSES.map((course, i) => (
                <TiltCard key={i} className="p-8">
                  <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${course.color}`}>
                      <course.icon size={32} weight="duotone" />
                    </div>
                    
                    <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-zinc-500">Course Offer // {i+1}</div>
                    <h3 className="mb-4 text-xl font-bold text-foreground">{course.title}</h3>
                    <p className="mb-8 text-sm leading-relaxed text-zinc-400 md:text-base">{course.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      <span className="rounded bg-black/40 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-zinc-400 border border-white/5">
                        {course.tag}
                      </span>
                    </div>
                  </div>
                </TiltCard>
              ))}

              {/* Grid Balancer: Featured PixelCult Academy Certification spotlight */}
              <TiltCard className="p-8 border border-accent/20 bg-gradient-to-br from-slate-950 to-emerald-950/20 md:col-span-2 lg:col-span-2">
                <div className="pointer-events-none h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/15 border border-accent/30 text-accent">
                      <Certificate size={32} weight="duotone" />
                    </div>
                    
                    <div className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">Credential Standard</div>
                    <h3 className="mb-4 text-2xl font-black text-foreground">PixelCult Academy Digital Certification</h3>
                    <p className="mb-8 text-sm leading-relaxed text-zinc-300 md:text-base">
                      Upon successful completion of any course track, final review lab modules, and practical assignments, **every student will be getting an official digital certificate directly from the company end (PixelCult).** This cryptographically verifiable credential validates your hands-on code capability to potential employers.
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {["Official PixelCult Seal", "Direct Recruiter Verification", "Project Verified"].map((feat) => (
                      <span key={feat} className="rounded-full bg-accent/10 border border-accent/30 px-3.5 py-1.5 font-mono text-xs text-accent">
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </section>

        {/* ── SECTION 3: COLLEGE PROJECTS & INTERNSHIP ── */}
        <section id="college-internships" className="relative z-10 py-24 px-6 md:px-12 border-b border-white/5">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* College Projects Overview */}
              <div className="lg:col-span-6 space-y-8">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Academic Accelerator // 03</p>
                <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl">
                  College Projects & <span className="text-accent">Internships.</span>
                </h2>
                
                <p className="text-zinc-300 text-base leading-relaxed md:text-lg">
                  Designed specifically for final-year engineering and computer science students. We provide standard academic project guidance and dual-certification internship positions to maximize job placement potentials.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start p-5 rounded-xl bg-slate-950/40 border border-white/5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                      <Student size={28} weight="duotone" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-foreground text-base md:text-lg">Final Year Academic Project Mentorship</h4>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                        Complete guidance to design, architect, write, and deploy your final year academic projects. We cover system design, testing parameters, and documentation blueprints.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start p-5 rounded-xl bg-slate-950/40 border border-white/5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent">
                      <Briefcase size={28} weight="duotone" />
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-foreground text-base md:text-lg">Structured Corporate Internship</h4>
                      <p className="text-sm text-zinc-400 mt-2 leading-relaxed">
                        Work closely inside our Git repositories. Shadow senior engineers, contribute to active micro-services, and gain true project collaboration workspace exposure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Dual Certificates Grid */}
              <div className="lg:col-span-6 space-y-6">
                <div className="border border-white/10 rounded-2xl bg-[#020617]/60 p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 h-48 w-48 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
                  
                  <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 mb-6 flex items-center gap-2">
                    <Certificate className="text-accent" size={20} />
                    Double Credentials Awarded
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Completion Certificate Card */}
                    <div className="border border-white/5 rounded-xl bg-slate-950 p-6 space-y-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent font-mono text-sm font-bold">
                        01
                      </div>
                      <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-wider">
                        Project Completion Certificate
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                        Validates your architecture parameters, technology selection, software structure, database schemas, and clean code deployment compliance.
                      </p>
                      <span className="inline-block font-mono text-[10px] bg-accent/5 border border-accent/20 text-accent px-2.5 py-1 rounded">
                        Academic Approved
                      </span>
                    </div>

                    {/* Internship Certificate Card */}
                    <div className="border border-white/5 rounded-xl bg-slate-950 p-6 space-y-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent font-mono text-sm font-bold">
                        02
                      </div>
                      <h4 className="font-sans font-bold text-foreground text-sm uppercase tracking-wider">
                        Internship Experience Certificate
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">
                        Validates your internship tenure, engineering contributions, repository collaboration compliance, agile cycle task updates, and developer traits.
                      </p>
                      <span className="inline-block font-mono text-[10px] bg-brand-accent/5 border border-brand-accent/20 text-brand-accent px-2.5 py-1 rounded">
                        Corporate Accredited
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                      ★ PIXELCULT COLLABORATIVE ENVIRONMENT
                    </div>
                    <Link
                      href="/#contact"
                      className="group inline-flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-background transition-all hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] shrink-0"
                    >
                      Inquire Program
                      <ArrowUpRight size={14} weight="bold" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
