import type { StatusColor } from "../data/types";
import { STATUS_COLOR_DOT } from "../lib/status";

export function ProgressBar({
  value,
  color,
}: {
  value: number;
  color: StatusColor;
}) {
  return (
    <div className="h-1.5 w-full rounded-full bg-border">
      <div
        className={`h-1.5 rounded-full ${STATUS_COLOR_DOT[color]}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
