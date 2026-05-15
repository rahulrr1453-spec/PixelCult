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
  
  // Dialogues container ref to avoid state updates on scroll
  const dialoguesContainerRef = useRef<HTMLDivElement>(null);

  const tickingRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

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
          const opacity = Math.max(0, 1 - progress / HERO_TEXT_FADE_END);
          heroTextRef.current.style.opacity = String(opacity);
          heroTextRef.current.style.transform = `translateY(${(1 - opacity) * 12}px)`;
        }

        if (bigLeftTextRef.current) {
          const op = Math.min(1, Math.max(0, (progress - 0.1) / 0.08));
          bigLeftTextRef.current.style.opacity = String(op);
          bigLeftTextRef.current.style.transform = `translateY(${(1 - op) * 14}px)`;
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (powerReadoutRef.current) {
          const pwr = 92.4 + Math.sin(progress * Math.PI * 2) * 4.2;
          powerReadoutRef.current.textContent = pwr.toFixed(1) + "%";
        }

        // Update dialogue cards visibility via direct DOM manipulation
        if (dialoguesContainerRef.current) {
          const cards = dialoguesContainerRef.current.children;
          DIALOGUES.forEach((d, i) => {
            const card = cards[i] as HTMLElement;
            if (!card) return;
            const visible = progress >= d.show && progress <= d.hide;
            if (visible) {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
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

        <div className="pointer-events-none absolute left-6 top-24 text-accent md:left-10 md:top-28">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-accent md:right-10 md:top-28">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-accent md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-accent md:bottom-16 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        <div
          ref={heroTextRef}
          className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-start gap-5 px-6 pb-24 md:px-12 md:pb-28"
          style={{ transition: "opacity 80ms linear" }}
        >
          <EyebrowBadge>DEPLOYMENT Q3 // PIXELCULT_OS // ONLINE</EyebrowBadge>
          <h1 className="max-w-[14ch] font-sans text-5xl font-black leading-[0.95] tracking-tighter text-foreground md:text-7xl lg:text-8xl">
            Engineering
            <br />
            <span className="text-accent">Scale & Logic.</span>
          </h1>
          <p className="max-w-[42ch] font-sans text-sm leading-relaxed text-zinc-400 md:text-base">
            We are a full-spectrum development collective. Architecting high-performance websites and intelligent AI integrations.
          </p>
        </div>

        <div
          ref={bigLeftTextRef}
          className="pointer-events-none absolute bottom-24 left-6 z-10 hidden max-w-[58%] flex-col gap-5 md:flex md:bottom-28 md:left-12"
          style={{ opacity: 0, transition: "opacity 80ms linear" }}
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.85)]" />
            PROTOCOL &mdash; PIXEL_V1
          </span>
          <h2 className="font-sans font-black leading-[0.88] tracking-tighter text-foreground text-[clamp(4rem,9.5vw,9rem)]">
            Pixel
            <br />
            meets <span className="text-accent">Craft.</span>
          </h2>
          <p className="max-w-[36ch] font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400">
            Interfaces &amp; products, engineered with obsessive precision.
          </p>
        </div>

        <div className="pointer-events-none absolute left-6 top-20 z-10 flex items-center gap-2 md:left-10 md:top-24">
          <div className="h-px w-8 bg-accent/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Telemetry Link &mdash; Live
          </span>
        </div>

        <div className="pointer-events-none absolute right-6 top-20 z-10 flex items-center gap-3 md:right-10 md:top-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            Digital Core
          </span>
          <span
            ref={powerReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent"
          >
            92.4%
          </span>
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.85)]" />
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

        <div ref={dialoguesContainerRef} className="pointer-events-none absolute inset-0 z-20">
          {DIALOGUES.map((d) => {
            const position =
              d.id === "d1"
                ? "top-[22%] right-6 md:right-12"
                : d.id === "d2"
                ? "top-1/2 -translate-y-1/2 right-6 md:right-12"
                : "bottom-24 right-6 md:bottom-28 md:right-12";
            return (
              <div
                key={d.id}
                className={`absolute ${position} z-20 hidden w-[420px] max-w-[90vw] md:block opacity-0 transition-all duration-400 ease-out translate-y-5`}
              >
                <figure className="card-surface p-6 pointer-events-auto">
                  <blockquote className="font-sans text-xl font-medium leading-snug tracking-tight text-foreground">
                    &ldquo;{d.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 flex items-center justify-between">
                    <span className="font-sans text-sm text-zinc-300">{d.speaker}</span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                      {d.film}
                    </span>
                  </figcaption>
                </figure>
              </div>
            );
          })}
        </div>

        {!loaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-background px-6">
            <EyebrowBadge>PIXELCULT // BOOTING CORE</EyebrowBadge>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
              Initializing Engine ...
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
