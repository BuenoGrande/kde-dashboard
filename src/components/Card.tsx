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
      className={`rounded-xl border border-border bg-surface p-6 ${className}`}
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
        <h2 className="text-lg font-semibold text-ink">{title}</h2>
      </div>
      {right}
    </div>
  );
}
