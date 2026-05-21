"use client";

import { Buildings, Volleyball, Heartbeat, ArrowSquareOut, PaintBrush } from "@phosphor-icons/react";
import { TiltCard } from "@/components/ui/TiltCard";

const PROJECTS = [
  {
    title: "Abstream Tech",
    category: "Corporate Static Site",
    description: "A sleek, modern, and highly optimized static company website developed to establish a strong enterprise digital presence.",
    icon: Buildings,
    link: "https://abstreamtech.com",
    color: "text-accent",
  },
  {
    title: "YSC Throwball Club",
    category: "Full-Stack Webapp",
    description: "A complete full-stack web application designed for a sports club to manage memberships, events, and community updates seamlessly.",
    icon: Volleyball,
    link: "https://bangalore-throwball-premier-league.netlify.app/",
    color: "text-brand-accent",
  },
  {
    title: "TYzEN Edits",
    category: "Video & Graphic Design",
    description: "A highly dynamic, cinematic portfolio showcase built for a professional video editing and graphic design YouTube channel.",
    icon: PaintBrush,
    link: "https://tyzenedits.netlify.app",
    color: "text-violet-400",
  },
  {
    title: "Padmini Homeo Clinic",
    category: "Healthcare UI/UX",
    description: "An accessible, user-friendly static webpage built for a homeopathic clinic to provide clear information and easy patient scheduling.",
    icon: Heartbeat,
    link: "#",
    color: "text-emerald-400",
    local: true,
  },
];

export function Works() {
  return (
    <section id="works" className="relative z-10 py-24 px-6 md:px-12 bg-slate-900/20 border-y border-white/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl lg:text-6xl text-right">
            Featured <span className="text-accent">Deployments.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted ml-auto text-right">
            A selection of the technical solutions and interfaces we have shipped since forming our collective.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((project, i) => (
            <TiltCard key={i} delay={i * 0.1} className="p-8">
              <div className="flex h-full flex-col pointer-events-none" style={{ transform: "translateZ(25px)" }}>
                <div className="mb-8 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 ${project.color}`}>
                    <project.icon size={28} weight="duotone" />
                  </div>
                  {!project.local && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 transition-colors hover:text-accent pointer-events-auto"
                    >
                      <ArrowSquareOut size={24} />
                    </a>
                  )}
                </div>
                
                <h3 className="mb-1 text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-brand-accent">{project.category}</p>
                <p className="mb-8 flex-grow text-base leading-relaxed text-zinc-400">{project.description}</p>
                
                {project.local ? (
                  <span className="font-mono text-xs italic text-zinc-600">Locally Hosted</span>
                ) : (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-accent hover:underline pointer-events-auto"
                  >
                    Visit Deployment
                  </a>
                )}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
