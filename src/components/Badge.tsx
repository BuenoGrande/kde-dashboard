import type { StatusColor } from "../data/types";
import { STATUS_COLOR_CLASSES } from "../lib/status";

export function Badge({
  color,
  children,
}: {
  color: StatusColor;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase ${STATUS_COLOR_CLASSES[color]}`}
    >
      {children}
    </span>
  );
}

export function Dot({ color }: { color: StatusColor }) {
  const dotClass: Record<StatusColor, string> = {
    red: "bg-status-red-fg",
    orange: "bg-status-orange-fg",
    yellow: "bg-status-yellow-fg",
    green: "bg-status-green-fg",
    blue: "bg-status-blue-fg",
  };
  return <span className={`inline-block h-2 w-2 rounded-full ${dotClass[color]}`} />;
}
