type Props = {
  corner: "tl" | "tr" | "bl" | "br";
  size?: number;
  className?: string;
};

export function HudFrame({ corner, size = 22, className = "" }: Props) {
  const paths: Record<Props["corner"], string> = {
    tl: `M 2 ${size} L 2 2 L ${size} 2`,
    tr: `M 2 2 L ${size} 2 L ${size} ${size}`,
    bl: `M 2 2 L 2 ${size} L ${size} ${size}`,
    br: `M 2 ${size} L ${size} ${size} L ${size} 2`,
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      className={className}
    >
      <path
        d={paths[corner]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

