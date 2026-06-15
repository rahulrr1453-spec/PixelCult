"use client";

import { GraduationCap, Code, HardDrives, Graph, Student, CheckCircle, ArrowRight, ShieldCheck, TerminalWindow, Bug } from "@phosphor-icons/react";
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
      "Design Splunk dashboards for visualizing attack trends and failure timelines."
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
      "Build live dashboards for visualizing top attack sources and event frequency."
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
      "Produce structured vulnerability reports with CVSS severity and remediation guidance."
    ],
    icon: Bug,
  },
];


export function Training() {
  return (
    <section id="training" className="relative z-10 py-24 px-6 md:px-12 bg-slate-900/40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
            <GraduationCap size={32} className="text-accent" />
          </div>
          <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl lg:text-6xl">
            Technical <span className="text-accent">Training.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-xl text-zinc-300">
            We bridge the gap between academia and industry. Providing extensive technical courses with <span className="text-accent font-bold">hands-on project integration</span> and specializing in Final Year College Project Mentorship.
          </p>

        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

          {COURSES.map((course, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/5 bg-slate-950/60 p-8 transition-all duration-300 hover:border-accent/20"
            >
              <h4 className={`mb-6 flex items-center gap-3 text-lg font-bold ${course.color}`}>
                <course.icon size={24} weight="duotone" />
                {course.title}
              </h4>
              <ul className="space-y-4">
                {course.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-xs text-zinc-400 transition-colors hover:text-foreground">
                    <ArrowRight size={14} className="text-accent" />
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
            className="group inline-flex items-center gap-2 rounded-xl border border-accent/20 bg-accent/5 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-md transition-all duration-300 hover:bg-accent hover:text-black"
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
            <p className="mt-2 text-zinc-400">Industry-aligned training focused on building real-world security and software solutions.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {PRACTICAL_PROJECTS.map((project, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-8 transition-all hover:border-accent/30"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-background transition-all duration-500">
                  <project.icon size={24} weight="duotone" />
                </div>
                
                <h4 className="text-xl font-bold text-foreground">{project.title}</h4>
                <p className="mb-4 text-xs font-medium text-accent/80">{project.subtitle}</p>
                
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="rounded-md bg-white/5 px-2 py-1 font-mono text-[9px] text-zinc-500 border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="space-y-3">
                  {project.achievements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[11px] leading-relaxed text-zinc-400">
                      <div className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        {/* Mentorship Card */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-12 relative">
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
              Struggling with your final year project? We freelance directly with students to <span className="font-semibold text-foreground">guide, train, and build</span> robust technical projects from scratch.
            </p>

            <div className="flex flex-wrap gap-3">
              {["1-on-1 Guidance", "End-to-End Dev", "Documentation", "Any Stack"].map((feat) => (
                <span key={feat} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-[10px] text-zinc-400">
                  <CheckCircle size={14} className="text-accent" />
                  {feat}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-background transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                Get Project Help
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link
                href="/services#college-internships"
                className="group inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
              >
                View Internship Details
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          {/* Decorative Background Element */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
