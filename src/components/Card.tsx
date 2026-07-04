import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface p-5 shadow-[0_18px_50px_-42px_rgba(34,41,37,0.45)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeading({
  eyebrow,
  title,
  right,
}: {
  eyebrow?: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-medium tracking-wide text-muted uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-lg font-semibold leading-tight tracking-tight text-ink">{title}</h2>
      </div>
      {right}
    </div>
  );
}
