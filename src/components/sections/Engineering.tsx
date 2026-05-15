"use client";

import { Desktop, DeviceMobile, Brain, Wrench } from "@phosphor-icons/react";
import { TiltCard } from "@/components/ui/TiltCard";

const CAPABILITIES = [
  {
    title: "Web & Full-Stack Apps",
    description: "Custom websites, responsive UI/UX, and robust full-stack applications. We build resilient backends pairing Node.js with dynamic React frontends.",
    icon: Desktop,
    color: "text-accent",
    techs: ["Node.js", "React", "MongoDB"],
  },
  {
    title: "Native Android Apps",
    description: "High-performance mobile experiences developed natively. Utilizing Java and XML in Android Studio to ensure seamless hardware integration.",
    icon: DeviceMobile,
    color: "text-brand-accent",
    techs: ["Java", "Android Studio", "XML"],
  },
  {
    title: "AI Integrations & ML",
    description: "Intelligent software solutions specializing in local/offline LLM deployments and custom AI memory architectures.",
    icon: Brain,
    color: "text-accent",
    techs: ["Offline LLMs", "Python", "Data Pipelines"],
  },
  {
    title: "Maintenance & Hosting",
    description: "Long-term reliability. We maintain existing codebases, manage CentOS Linux servers, and handle smooth application deployments.",
    icon: Wrench,
    color: "text-brand-accent",
    techs: ["Linux / CentOS", "DevOps", "Support"],
  },
];

export function Engineering() {
  return (
    <section id="engineering" className="relative z-10 py-24 px-6 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16">
          <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl lg:text-6xl">
            Core <span className="text-accent">Capabilities.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            End-to-end development solutions tailored for startups and enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {CAPABILITIES.map((cap, i) => (
            <TiltCard key={i} className="p-8">
              <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 border border-white/10 ${cap.color}`}>
                  <cap.icon size={32} weight="duotone" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">{cap.title}</h3>
                <p className="mb-8 text-lg leading-relaxed text-muted">{cap.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {cap.techs.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-black/40 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-zinc-400 border border-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
