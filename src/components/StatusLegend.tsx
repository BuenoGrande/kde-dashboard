import type { StatusColor } from "../data/types";
import { STATUS_COLOR_DOT, STATUS_COLOR_LABEL } from "../lib/status";

const ORDER: StatusColor[] = ["red", "orange", "yellow", "green", "blue"];

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted">
      {ORDER.map((color) => (
        <span key={color} className="inline-flex items-center gap-1.5">
          <span className={`inline-block h-2 w-2 rounded-full ${STATUS_COLOR_DOT[color]}`} />
          {STATUS_COLOR_LABEL[color]}
        </span>
      ))}
    </div>
  );
}
