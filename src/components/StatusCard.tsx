import type { ReactNode } from "react";
import type { Status } from "../data/types";
import { STATUS_BG, STATUS_BORDER } from "../lib/status";

// The whole card carries the status as a tinted background + left stripe,
// instead of a small badge buried inside. Scanning a list of these should
// read as a color pattern before any text is read.
export function StatusCard({
  status,
  children,
  className = "",
}: {
  status: Status;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border-y border-r border-border border-l-4 ${STATUS_BORDER[status]} ${STATUS_BG[status]} p-5 shadow-[0_14px_36px_-30px_rgba(34,41,37,0.5)] ${className}`}
    >
      {children}
    </div>
  );
}
