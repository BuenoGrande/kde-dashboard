import type { CellStatus, StatusColor } from "../data/types";

export const STATUS_COLOR_CLASSES: Record<StatusColor, string> = {
  red: "bg-status-red-bg text-status-red-fg",
  orange: "bg-status-orange-bg text-status-orange-fg",
  yellow: "bg-status-yellow-bg text-status-yellow-fg",
  green: "bg-status-green-bg text-status-green-fg",
  blue: "bg-status-blue-bg text-status-blue-fg",
};

export const STATUS_COLOR_DOT: Record<StatusColor, string> = {
  red: "bg-status-red-fg",
  orange: "bg-status-orange-fg",
  yellow: "bg-status-yellow-fg",
  green: "bg-status-green-fg",
  blue: "bg-status-blue-fg",
};

export const STATUS_COLOR_LABEL: Record<StatusColor, string> = {
  red: "Not covered",
  orange: "Partially covered",
  yellow: "Practiced, unstable",
  green: "Exam-ready",
  blue: "Planned next",
};

export const CELL_STATUS_META: Record<
  CellStatus,
  { color: StatusColor; label: string }
> = {
  not_started: { color: "red", label: "Not started" },
  planned: { color: "blue", label: "Planned" },
  practiced_once: { color: "yellow", label: "Practiced once" },
  needs_review: { color: "orange", label: "Needs review" },
  improving: { color: "yellow", label: "Improving" },
  exam_ready: { color: "green", label: "Exam-ready" },
};

export function cellColor(status: CellStatus): StatusColor {
  return CELL_STATUS_META[status].color;
}

export function cellLabel(status: CellStatus): string {
  return CELL_STATUS_META[status].label;
}
