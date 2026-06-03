"use client";

import { useEffect, useRef, useState } from "react";

interface VideoIntroProps {
  onComplete: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps) {
  const videoRef   = useRef<HTMLVideoElement | null>(null);  // main (foreground)
  const bgVideoRef = useRef<HTMLVideoElement | null>(null);  // mobile blurred bg
  const overlayRef  = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const timeRef     = useRef<HTMLSpanElement | null>(null);

  const [phase, setPhase] = useState<"playing" | "fading" | "done">("playing");

  /* ── smooth fade-out ── */
  const exit = () => {
    if (phase !== "playing") return;
    setPhase("fading");
    const el = overlayRef.current;
    if (el) {
      el.style.transition = "opacity 900ms cubic-bezier(0.4,0,0.2,1)";
      el.style.opacity = "0";
    }
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 950);
  };

  /* ── play all videos & wire events ── */
  useEffect(() => {
    const vid   = videoRef.current;
    const bgVid = bgVideoRef.current;
    if (!vid) return;

    // Play both simultaneously; ignore bg failure (hidden on desktop)
    vid.play().catch(() => setTimeout(exit, 8000));
    bgVid?.play().catch(() => {});

    const onEnded = () => exit();
    const onTime  = () => {
      if (!vid.duration) return;
      const p = vid.currentTime / vid.duration;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${p})`;
      }
      if (timeRef.current) {
        timeRef.current.textContent = (vid.duration - vid.currentTime).toFixed(1) + "s";
      }
      // keep bg video in sync with main (within 0.3s tolerance)
      if (bgVid && Math.abs(bgVid.currentTime - vid.currentTime) > 0.3) {
        bgVid.currentTime = vid.currentTime;
      }
    };

    vid.addEventListener("ended",      onEnded);
    vid.addEventListener("timeupdate", onTime);
    return () => {
      vid.removeEventListener("ended",      onEnded);
      vid.removeEventListener("timeupdate", onTime);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === "done") return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col bg-background"
      style={{ opacity: 1 }}
    >

      {/* ════════════════════════════════════════════════════
          MOBILE ONLY  (hidden md:hidden)
          Layer 1 — blurred fullscreen background video
          Layer 2 — contained 16:9 foreground video centred
          ════════════════════════════════════════════════════ */}

      {/* Mobile bg: same video, object-cover, heavily blurred + darkened */}
      <video
        ref={bgVideoRef}
        src="/pixel14_enhanced.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        style={{
          filter: "blur(18px) brightness(0.28) saturate(1.4)",
          transform: "scale(1.08)", // prevent white blur edges
          willChange: "transform",
        }}
      />

      {/* Mobile fg: the actual video, natural 16:9, centred over the blurred bg */}
      <div className="absolute inset-0 flex items-center justify-center md:hidden">
        <video
          ref={videoRef}
          src="/pixel14_enhanced.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full"
          style={{
            aspectRatio: "16 / 9",
            willChange: "transform",
            transform: "translateZ(0)",
            // subtle shadow so it lifts off the blurred bg
            boxShadow: "0 0 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════════
          DESKTOP ONLY  (hidden on mobile, shown md+)
          Single full-bleed object-cover video
          ════════════════════════════════════════════════════ */}
      <video
        src="/pixel14_enhanced.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
        // Desktop video is a visual twin — ref controls the mobile fg video
        // on desktop we use a separate play trigger via onCanPlay
        onCanPlay={(e) => { e.currentTarget.play().catch(() => {}); }}
        onEnded={exit}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (!v.duration) return;
          const p = v.currentTime / v.duration;
          if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
          if (timeRef.current) timeRef.current.textContent = (v.duration - v.currentTime).toFixed(1) + "s";
        }}
      />

      {/* ── cinematic vignette ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(2,6,23,0.75) 0%, transparent 20%, transparent 70%, rgba(2,6,23,0.88) 100%)",
            "radial-gradient(ellipse 85% 65% at 50% 50%, transparent 35%, rgba(2,6,23,0.4) 100%)",
          ].join(", "),
        }}
      />

      {/* ── top bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_10px_rgba(16,185,129,0.9)]"
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.36em] text-zinc-400 md:text-[10px]">
            PixelCult OS — Booting
          </span>
        </div>

        <button
          onClick={exit}
          className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-500 backdrop-blur-md transition-all duration-200 hover:border-accent/40 hover:text-accent md:text-[10px]"
        >
          Skip
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
            <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* spacer */}
      <div className="flex-1" />

      {/* ── bottom HUD ── */}
      <div className="relative z-10 px-6 pb-6 md:px-10 md:pb-8">
        <div className="mb-3 h-px w-full bg-white/8">
          <div
            ref={progressRef}
            className="h-full origin-left bg-accent"
            style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600 md:text-[10px]">
          <span>Pixel14 — Reel 01</span>
          <span ref={timeRef} className="tabular-nums text-zinc-500">8.0s</span>
          <span>pixel14.mp4</span>
        </div>
      </div>
    </div>
  );
}
