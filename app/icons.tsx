type IconProps = {
  className?: string;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconArrow({ className }: IconProps) {
  return (
    <svg className={`icon-arrow ${className ?? ""}`} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M4.5 11.5 L11.5 4.5" {...stroke} />
      <path d="M7 4.5 H11.5 V9" {...stroke} />
    </svg>
  );
}

export function IconChevron({ direction = "right", className }: IconProps & { direction?: "left" | "right" }) {
  return (
    <svg className={`icon-arrow ${className ?? ""}`} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      {direction === "left"
        ? <path d="M10 3.5 L5.5 8 L10 12.5" {...stroke} />
        : <path d="M6 3.5 L10.5 8 L6 12.5" {...stroke} />}
    </svg>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <svg className={`icon-mark ${className ?? ""}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M7 3.8 h3.2 l1.1 3.2 -1.7 1.1 a12 12 0 0 0 5.3 5.3 l1.1 -1.7 3.2 1.1 v3.2 c0 .8 -.7 1.5 -1.5 1.5 A15.7 15.7 0 0 1 5.5 5.3 C5.5 4.5 6.2 3.8 7 3.8 Z" {...stroke} />
    </svg>
  );
}

export function IconPin({ className }: IconProps) {
  return (
    <svg className={`icon-mark ${className ?? ""}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M12 21 s7 -6.2 7 -11.2 A7 7 0 0 0 5 9.8 C5 14.8 12 21 12 21 Z" {...stroke} />
      <circle cx="12" cy="9.8" r="2.2" {...stroke} />
    </svg>
  );
}

export function IconMail({ className }: IconProps) {
  return (
    <svg className={`icon-mark ${className ?? ""}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <rect x="3.5" y="6" width="17" height="12" rx="1.6" {...stroke} />
      <path d="M4.2 7.2 L12 13 l7.8 -5.8" {...stroke} />
    </svg>
  );
}

export function IconClock({ className }: IconProps) {
  return (
    <svg className={`icon-mark ${className ?? ""}`} viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <circle cx="12" cy="12" r="8.2" {...stroke} />
      <path d="M12 8.2 V12.2 L15.2 14" {...stroke} />
    </svg>
  );
}
