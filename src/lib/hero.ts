export type Dialogue = {
  id: string;
  show: number;
  hide: number;
  quote: string;
  speaker: string;
  film: string;
};

export const DIALOGUES: Dialogue[] = [
  {
    id: "d1",
    show: 0.1,
    hide: 0.3,
    quote: "Engineering scale and logic into every pixel we craft.",
    speaker: "PixelCult Philosophy",
    film: "SYSTEM_NOMINAL",
  },
  {
    id: "d2",
    show: 0.35,
    hide: 0.55,
    quote: "Bridging the gap between academic theory and industrial excellence.",
    speaker: "Technical Training",
    film: "CORE_LOGIC",
  },
  {
    id: "d3",
    show: 0.6,
    hide: 0.8,
    quote: "Tactical strike teams for complex software engineering challenges.",
    speaker: "The Collective",
    film: "AGILE_DEPLOY",
  },
];

export const HERO_TEXT_FADE_END = 0.08;
