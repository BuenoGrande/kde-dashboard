import type { ReactNode } from "react";

export function Collapsible({
  summary,
  children,
  defaultOpen = false,
}: {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-1 text-sm font-medium text-ink marker:content-none">
        {summary}
        <span className="text-muted transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pt-3">{children}</div>
    </details>
  );
}
