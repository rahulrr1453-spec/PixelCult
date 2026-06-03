export const PIXEL14_FRAME_COUNT = 120;

export const pixel14FramePath = (n: number) =>
  `/pixel14frames/frame_${String(n).padStart(4, "0")}.jpg`;

export type Pixel14Beat = {
  id: string;
  show: number;
  hide: number;
  label: string;
  headline: string;
  sub: string;
};

export const PIXEL14_BEATS: Pixel14Beat[] = [
  {
    id: "p1",
    show: 0.08,
    hide: 0.32,
    label: "01 — Pixel Meets Craft",
    headline: "We Build\nExperiences.",
    sub: "High-performance interfaces engineered for the modern web.",
  },
  {
    id: "p2",
    show: 0.38,
    hide: 0.62,
    label: "02 — Full Spectrum",
    headline: "End-to-End\nExecution.",
    sub: "From concept to deployment — every layer of the stack, handled.",
  },
  {
    id: "p3",
    show: 0.68,
    hide: 0.88,
    label: "03 — Precision",
    headline: "Obsessive\nPrecision.",
    sub: "Design systems, AI integrations, and performance-first architecture.",
  },
];
