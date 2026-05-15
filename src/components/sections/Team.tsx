"use client";

import { Lightning, CodeBlock, Cpu } from "@phosphor-icons/react";
import { TiltCard } from "@/components/ui/TiltCard";

const TRAITS = [
  {
    title: "Agile Strike Team",
    description: "Not just another agency. We are a highly specialized tactical unit deployed to solve complex engineering challenges with speed and precision.",
    icon: Lightning,
    color: "border-t-accent",
    iconColor: "text-accent",
  },
  {
    title: "Battle-Tested",
    description: "Our developers have dirtied their hands building robust architectures. We thrive in the trenches of modern full-stack development.",
    icon: CodeBlock,
    color: "border-t-brand-accent",
    iconColor: "text-brand-accent",
  },
  {
    title: "Modern Stacks",
    description: "We don't do outdated tech. We leverage the absolute latest in React, Node, and custom AI to future-proof your digital reality.",
    icon: Cpu,
    color: "border-t-emerald-400",
    iconColor: "text-emerald-400",
  },
];

export function Team() {
  return (
    <section id="team" className="relative z-10 py-24 px-6 md:px-12 border-t border-white/5">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 text-center">
          <h2 className="font-sans text-4xl font-black text-foreground md:text-5xl lg:text-6xl">
            The <span className="text-accent">Collective.</span>
          </h2>
          <p className="mt-4 mx-auto max-w-3xl text-lg text-muted">
            We are a collective of relentless young minds unbound by legacy thinking. Bringing fresh perspectives and obsessive attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {TRAITS.map((trait, i) => (
            <TiltCard key={i} delay={i * 0.1} className={`border-t-4 p-10 ${trait.color}`}>
              <div className="pointer-events-none" style={{ transform: "translateZ(30px)" }}>
                <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 ${trait.iconColor}`}>
                  <trait.icon size={36} weight="duotone" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-foreground">{trait.title}</h3>
                <p className="text-base leading-relaxed text-zinc-400">{trait.description}</p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
