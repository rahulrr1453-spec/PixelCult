"use client";

import { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { ArrowRight, ChatCircleText } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import { DIALOGUES, HERO_TEXT_FADE_END } from "@/lib/hero";

export function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const bigLeftTextRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const powerReadoutRef = useRef<HTMLSpanElement | null>(null);
  const logoRevealRef = useRef<HTMLDivElement | null>(null);

  
  // Dialogues container ref to avoid state updates on scroll
  const dialoguesContainerRef = useRef<HTMLDivElement>(null);

  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress = scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable));

        // Update elements via Refs for performance
        if (heroTextRef.current) {
          // Keep hero main text firmly visible, then gently fade out between 0.12 and 0.24
          let opacity = 1;
          if (progress > 0.12) {
            opacity = Math.max(0, 1 - (progress - 0.12) / 0.12);
          }
          heroTextRef.current.style.opacity = String(opacity);
          heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 16}px)`;
        }

        if (bigLeftTextRef.current) {
          // Fade in smoothly from 0.18 to 0.28, stay solidly visible through 0.65, fade out by 0.76
          let op = 0;
          if (progress >= 0.18 && progress < 0.28) {
            op = (progress - 0.18) / 0.1;
          } else if (progress >= 0.28 && progress <= 0.65) {
            op = 1;
          } else if (progress > 0.65 && progress <= 0.76) {
            op = 1 - (progress - 0.65) / 0.11;
          }
          
          bigLeftTextRef.current.style.opacity = String(Math.max(0, op));
          bigLeftTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (powerReadoutRef.current) {
          const pwr = 92.4 + Math.sin(progress * Math.PI * 2) * 4.2;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        if (logoRevealRef.current) {
          // Logo text reveal appears solidly from 0.72 to 0.94
          let logoOp = 0;
          if (progress >= 0.72 && progress < 0.82) {
            logoOp = (progress - 0.72) / 0.1;
          } else if (progress >= 0.82 && progress <= 0.92) {
            logoOp = 1;
          } else if (progress > 0.92 && progress <= 0.98) {
            logoOp = 1 - (progress - 0.92) / 0.06;
          }
          
          logoRevealRef.current.style.opacity = String(Math.max(0, logoOp));
          const zOffset = (1 - logoOp) * -60;
          const rotateX = (1 - logoOp) * 10;
          logoRevealRef.current.style.transform = `perspective(1000px) translateZ(${zOffset}px) rotateX(${rotateX}deg)`;
        }

        // Update dialogue cards visibility with ample dwell time so text is never cut short
        if (dialoguesContainerRef.current) {
          const cards = dialoguesContainerRef.current.children;
          const isMobile = window.innerWidth < 768;

          DIALOGUES.forEach((d, i) => {
            const card = cards[i] as HTMLElement;
            if (!card) return;

            let cardOp = 0;

            if (isMobile) {
              // Mobile: Each card gets a generous dwell window
              const mStart = i === 0 ? 0.18 : i === 1 ? 0.44 : 0.68;
              const mEnd = i === 0 ? 0.44 : i === 1 ? 0.68 : 0.92;
              
              if (progress >= mStart && progress <= mEnd) {
                if (progress < mStart + 0.05) {
                  cardOp = (progress - mStart) / 0.05;
                } else if (progress > mEnd - 0.05) {
                  cardOp = (mEnd - progress) / 0.05;
                } else {
                  cardOp = 1;
                }
              }
            } else {
              // Desktop: Cards appear in sequence and stay docked on the right
              const dStart = i === 0 ? 0.20 : i === 1 ? 0.38 : 0.56;
              const dEnd = 0.90;

              if (progress >= dStart && progress <= dEnd) {
                if (progress < dStart + 0.06) {
                  cardOp = (progress - dStart) / 0.06;
                } else if (progress > dEnd - 0.06) {
                  cardOp = (dEnd - progress) / 0.06;
                } else {
                  cardOp = 1;
                }
              }
            }

            if (cardOp > 0.01) {
              card.style.opacity = String(cardOp);
              card.style.transform = `translateY(${(1 - cardOp) * 14}px)`;
              card.style.pointerEvents = "auto";
            } else {
              card.style.opacity = "0";
              card.style.transform = "translateY(20px)";
              card.style.pointerEvents = "none";
            }
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="scroll-animation relative">
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-transparent"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 10%, transparent 20%, rgba(2,6,23,0.1) 70%, rgba(2,6,23,0.2) 100%)",
          }}
        />

        <div className="pointer-events-none absolute left-4 top-20 text-accent/60 md:left-10 md:top-28">
          <HudFrame corner="tl" size={24} />
        </div>
        <div className="pointer-events-none absolute right-4 top-20 text-accent/60 md:right-10 md:top-28">
          <HudFrame corner="tr" size={24} />
        </div>
        <div className="pointer-events-none absolute bottom-12 left-4 text-accent/60 md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={24} />
        </div>
        <div className="pointer-events-none absolute bottom-12 right-4 text-accent/60 md:bottom-16 md:right-10">
          <HudFrame corner="br" size={24} />
        </div>


        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-start gap-4 px-6 pb-20 md:px-12 md:pb-28"
          style={{ transition: "opacity 80ms linear" }}
        >
          <EyebrowBadge>DEPLOYMENT Q3 // PIXELCULT_OS // ONLINE</EyebrowBadge>
          <h1 className="max-w-[14ch] font-sans text-[clamp(2.2rem,10vw,5rem)] font-black leading-[0.95] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
            Engineering
            <br />
            <span className="text-accent">Scale & Logic.</span>
          </h1>
          <p className="max-w-[38ch] font-sans text-[11px] leading-relaxed text-zinc-400 md:text-base">
            We are a full-spectrum development collective. Architecting high-performance websites and intelligent AI integrations.
          </p>
        </div>



        <div
          ref={bigLeftTextRef}
          className="pointer-events-none absolute bottom-20 left-6 z-20 flex max-w-[90%] flex-col gap-3 md:bottom-28 md:left-12 md:max-w-[58%]"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.85)]" />
            PROTOCOL &mdash; PIXEL_V1
          </span>
          <h2 className="font-sans font-black leading-[0.88] tracking-tighter text-foreground text-[clamp(2.2rem,8vw,9rem)]">
            Pixel
            <br />
            meets <span className="text-accent">Craft.</span>
          </h2>
          <p className="max-w-[32ch] font-mono text-[9px] md:text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Interfaces &amp; products, engineered with obsessive precision.
          </p>
        </div>



        <div className="pointer-events-none absolute left-4 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24 lg:left-10">
          <div className="h-px w-4 bg-accent/60 md:w-8" />
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.32em] text-zinc-400">
            Link&mdash;Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-4 top-20 z-10 flex items-center gap-2 md:right-10 md:top-24 lg:right-10">
          <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.32em] text-zinc-400">
            Core
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.1em] md:tracking-[0.22em] text-accent"
          >
            92.4%
          </span>
          <span aria-hidden className="inline-block h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.85)]" />
        </div>



        <div
          ref={logoRevealRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-start px-6 pb-20 md:px-12 md:pb-28"
          style={{ opacity: 0, transition: "opacity 100ms linear" }}
        >
          <div className="relative">
            <img 
              src="/bgtext.png" 
              alt="PixelCult" 
              className="h-10 w-auto md:h-16 md:w-auto object-contain filter drop-shadow-[0_0_20px_rgba(52,211,153,0.15)]"
            />


            <div className="absolute inset-0 bg-accent/10 blur-[40px] rounded-full -z-10" />
          </div>
        </div>


        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">

          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
            <span>SYNC STATUS &mdash; OK</span>
            <span>CULT_OS // SYSTEM_ACTIVE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>

        <div ref={dialoguesContainerRef} className="pointer-events-none absolute inset-0 z-30">
          {DIALOGUES.map((d) => {
            const position =
              d.id === "d1"
                ? "top-[18%] right-6 md:right-12"
                : d.id === "d2"
                ? "top-[38%] md:top-1/2 md:-translate-y-1/2 right-6 md:right-12"
                : "top-[58%] md:bottom-28 md:top-auto right-6 md:right-12";


            return (
              <div
                key={d.id}
                className={`absolute ${position} z-30 flex w-full max-w-[calc(100vw-48px)] md:w-[420px] md:max-w-[90vw] opacity-0 transition-all duration-400 ease-out translate-y-5`}
              >
                <figure className="card-surface p-4 md:p-6 pointer-events-auto shadow-2xl">
                  <blockquote className="font-sans text-sm md:text-xl font-medium leading-tight md:leading-snug tracking-tight text-foreground">
                    &ldquo;{d.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-4 flex items-center justify-between">
                    <span className="font-sans text-[11px] md:text-sm text-zinc-300">{d.speaker}</span>
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.24em] text-accent">
                      {d.film}
                    </span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
