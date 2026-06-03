"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PIXEL14_BEATS, PIXEL14_FRAME_COUNT, pixel14FramePath } from "@/lib/pixel14";

/* ─── helpers ─────────────────────────────────────────────── */
function pad(n: number) {
  return String(Math.round(n)).padStart(3, "0");
}

export function VideoScroll() {
  const sectionRef   = useRef<HTMLElement | null>(null);
  const canvasRef    = useRef<HTMLCanvasElement | null>(null);
  const progressRef  = useRef<HTMLDivElement | null>(null);
  const counterRef   = useRef<HTMLSpanElement | null>(null);
  const pctRef       = useRef<HTMLSpanElement | null>(null);

  const framesRef    = useRef<HTMLImageElement[]>([]);
  const loadedRef    = useRef(false);
  const tickingRef   = useRef(false);
  const lastFrameRef = useRef(-1);

  const [loadProgress, setLoadProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // beat refs array — avoids re-renders on scroll
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── preload all frames ── */
  useEffect(() => {
    let cancelled = false;
    let done = 0;
    const imgs: HTMLImageElement[] = [];

    for (let i = 1; i <= PIXEL14_FRAME_COUNT; i++) {
      const img = new Image();
      img.src = pixel14FramePath(i);
      img.onload = img.onerror = () => {
        if (cancelled) return;
        done++;
        setLoadProgress(done / PIXEL14_FRAME_COUNT);
        if (done === PIXEL14_FRAME_COUNT) {
          loadedRef.current = true;
          setReady(true);
        }
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
    return () => { cancelled = true; };
  }, []);

  /* ── draw a frame onto canvas ── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const img = framesRef.current[index];
    if (!canvas || !img?.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iR = img.naturalWidth / img.naturalHeight;
    const cR = cw / ch;

    let dw: number, dh: number;
    if (cR > iR) { dw = cw; dh = cw / iR; }
    else         { dh = ch; dw = ch * iR; }

    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  /* ── handle resize ── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width  = window.innerWidth  + "px";
    canvas.style.height = window.innerHeight + "px";
    if (lastFrameRef.current >= 0) drawFrame(lastFrameRef.current);
  }, [drawFrame]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  /* ── draw frame 0 once loaded ── */
  useEffect(() => {
    if (!ready) return;
    drawFrame(0);
    lastFrameRef.current = 0;
  }, [ready, drawFrame]);

  /* ── scroll handler ── */
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section || !loadedRef.current) return;

        const rect       = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress   = scrollable <= 0
          ? 0
          : Math.min(1, Math.max(0, -rect.top / scrollable));

        // frame
        const fi = Math.min(PIXEL14_FRAME_COUNT - 1, Math.floor(progress * PIXEL14_FRAME_COUNT));
        if (fi !== lastFrameRef.current) {
          lastFrameRef.current = fi;
          drawFrame(fi);
        }

        // progress bar
        if (progressRef.current) {
          progressRef.current.style.transform = `scaleX(${progress})`;
        }
        // counter
        if (counterRef.current) {
          counterRef.current.textContent = `${pad(fi + 1)} / ${pad(PIXEL14_FRAME_COUNT)}`;
        }
        // pct
        if (pctRef.current) {
          pctRef.current.textContent = `${Math.round(progress * 100)}%`;
        }

        // beats — direct DOM update, no state
        PIXEL14_BEATS.forEach((b, i) => {
          const el = beatRefs.current[i];
          if (!el) return;
          const visible = progress >= b.show && progress <= b.hide;
          el.style.opacity    = visible ? "1" : "0";
          el.style.transform  = visible ? "translateY(0)" : "translateY(22px)";
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [drawFrame]);

  return (
    <section
      ref={sectionRef}
      id="video-scroll"
      className="scroll-animation relative bg-background border-t border-white/5"
    >
      {/* ── sticky viewport ── */}
      <div
        className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-background"
        style={{ willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "contents", transform: "translateZ(0)" }}
        />

        {/* cinematic vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: [
              "linear-gradient(to bottom, rgba(2,6,23,0.55) 0%, transparent 18%, transparent 75%, rgba(2,6,23,0.75) 100%)",
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(2,6,23,0.35) 100%)",
            ].join(", "),
          }}
        />

        {/* letterbox bars */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-background/70 backdrop-blur-[2px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-background/70 backdrop-blur-[2px]" />

        {/* ── top-left label ── */}
        <div className="pointer-events-none absolute left-6 top-3 z-20 flex items-center gap-2.5 md:left-10">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.9)]"
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-zinc-400 md:text-[10px]">
            Pixel14 — Live Render
          </span>
        </div>

        {/* ── top-right frame counter ── */}
        <div className="pointer-events-none absolute right-6 top-3 z-20 flex items-center gap-2 md:right-10">
          <span
            ref={counterRef}
            className="font-mono text-[9px] uppercase tracking-[0.28em] text-accent md:text-[10px]"
          >
            001 / {pad(PIXEL14_FRAME_COUNT)}
          </span>
          <span
            ref={pctRef}
            className="font-mono text-[9px] tracking-[0.22em] text-zinc-500 md:text-[10px]"
          >
            0%
          </span>
        </div>

        {/* ── beat overlays ── */}
        {PIXEL14_BEATS.map((b, i) => (
          <div
            key={b.id}
            ref={(el) => { beatRefs.current[i] = el; }}
            className="pointer-events-none absolute z-20"
            style={{
              opacity: 0,
              transform: "translateY(22px)",
              transition: "opacity 350ms cubic-bezier(0.23,1,0.32,1), transform 350ms cubic-bezier(0.23,1,0.32,1)",
              // stagger positions
              ...(i === 0
                ? { left: "5%",  top: "20%",  maxWidth: "min(420px, 80vw)" }
                : i === 1
                ? { right: "5%", top: "50%",  transform: "translateY(-50%)", maxWidth: "min(420px, 80vw)" }
                : { left: "5%",  bottom: "22%", maxWidth: "min(420px, 80vw)" }
              ),
            }}
          >
            <div
              className="rounded-2xl border border-white/8 bg-slate-950/65 p-5 backdrop-blur-xl md:p-7"
              style={{
                boxShadow: "0 8px 32px -8px rgba(0,0,0,0.7), 0 1px 0 inset rgba(255,255,255,0.05)",
              }}
            >
              <span className="mb-3 block font-mono text-[9px] uppercase tracking-[0.34em] text-accent md:text-[10px]">
                {b.label}
              </span>
              <p
                className="font-sans font-black leading-[0.9] tracking-tighter text-foreground"
                style={{ fontSize: "clamp(1.6rem, 4.5vw, 3rem)", whiteSpace: "pre-line" }}
              >
                {b.headline}
              </p>
              <p className="mt-3 font-sans text-xs leading-relaxed text-zinc-400 md:text-sm">
                {b.sub}
              </p>
            </div>
          </div>
        ))}

        {/* ── progress bar ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="mx-6 mb-2.5 h-px bg-white/8 md:mx-10">
            <div
              ref={progressRef}
              className="h-full origin-left bg-accent"
              style={{ transform: "scaleX(0)", transition: "transform 60ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-3.5 font-mono text-[9px] uppercase tracking-[0.28em] text-zinc-600 md:mx-10 md:text-[10px]">
            <span>PixelCult // Reel</span>
            <span>pixel14.mp4</span>
            <span>Scroll ↓</span>
          </div>
        </div>

        {/* ── loading overlay ── */}
        {!ready && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-background px-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
              PixelCult // Loading Reel
            </span>
            <div className="h-px w-60 bg-white/10 md:w-80">
              <div
                className="h-full bg-accent transition-[width] duration-150 ease-out"
                style={{ width: `${Math.round(loadProgress * 100)}%` }}
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
              {Math.round(loadProgress * 100)}% — Buffering Frames
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
