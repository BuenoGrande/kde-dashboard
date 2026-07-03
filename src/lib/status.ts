import type { Status } from "../data/types";

// One status vocabulary, one color each, used everywhere: domains, writing
// tasks, speaking checklist items. No separate "color" concept to map.

export const STATUS_BG: Record<Status, string> = {
  not_seen: "bg-status-grey-bg",
  planned: "bg-status-blue-bg",
  seen: "bg-status-green-bg",
  reviewed: "bg-status-yellow-bg",
};

export const STATUS_FG: Record<Status, string> = {
  not_seen: "text-status-grey-fg",
  planned: "text-status-blue-fg",
  seen: "text-status-green-fg",
  reviewed: "text-status-yellow-fg",
};

export const STATUS_BORDER: Record<Status, string> = {
  not_seen: "border-status-grey-fg/30",
  planned: "border-status-blue-fg/40",
  seen: "border-status-green-fg/40",
  reviewed: "border-status-yellow-fg/40",
};

export const STATUS_DOT: Record<Status, string> = {
  not_seen: "bg-status-grey-fg",
  planned: "bg-status-blue-fg",
  seen: "bg-status-green-fg",
  reviewed: "bg-status-yellow-fg",
};

export const STATUS_LABEL: Record<Status, string> = {
  not_seen: "Not seen",
  planned: "Planned",
  seen: "Seen",
  reviewed: "Reviewed",
};

export function statusBadgeClasses(status: Status): string {
  return `${STATUS_BG[status]} ${STATUS_FG[status]}`;
}
