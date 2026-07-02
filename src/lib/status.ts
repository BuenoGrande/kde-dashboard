import type { Status } from "../data/types";

// One status vocabulary, one color each, used everywhere: domains, writing
// tasks, speaking checklist items. No separate "color" concept to map.

export const STATUS_BG: Record<Status, string> = {
  not_covered: "bg-status-grey-bg",
  started: "bg-status-yellow-bg",
  needs_review: "bg-status-orange-bg",
  ready: "bg-status-green-bg",
  planned: "bg-status-blue-bg",
};

export const STATUS_FG: Record<Status, string> = {
  not_covered: "text-status-grey-fg",
  started: "text-status-yellow-fg",
  needs_review: "text-status-orange-fg",
  ready: "text-status-green-fg",
  planned: "text-status-blue-fg",
};

export const STATUS_BORDER: Record<Status, string> = {
  not_covered: "border-status-grey-fg/30",
  started: "border-status-yellow-fg/40",
  needs_review: "border-status-orange-fg/40",
  ready: "border-status-green-fg/40",
  planned: "border-status-blue-fg/40",
};

export const STATUS_DOT: Record<Status, string> = {
  not_covered: "bg-status-grey-fg",
  started: "bg-status-yellow-fg",
  needs_review: "bg-status-orange-fg",
  ready: "bg-status-green-fg",
  planned: "bg-status-blue-fg",
};

export const STATUS_LABEL: Record<Status, string> = {
  not_covered: "Not covered",
  started: "Started",
  needs_review: "Needs review",
  ready: "Ready",
  planned: "Planned",
};

export function statusBadgeClasses(status: Status): string {
  return `${STATUS_BG[status]} ${STATUS_FG[status]}`;
}
