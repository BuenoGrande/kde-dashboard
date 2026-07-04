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

export const STATUS_ORDER: Status[] = [
  "not_covered",
  "started",
  "needs_review",
  "ready",
  "planned",
];

export const STATUS_SCORE: Record<Status, number> = {
  not_covered: 0,
  planned: 0.15,
  started: 0.4,
  needs_review: 0.7,
  ready: 1,
};

export function statusBadgeClasses(status: Status): string {
  return `${STATUS_BG[status]} ${STATUS_FG[status]}`;
}

export function statusCounts<T extends { status: Status }>(items: T[]) {
  const counts: Record<Status, number> = {
    not_covered: 0,
    started: 0,
    needs_review: 0,
    ready: 0,
    planned: 0,
  };

  for (const item of items) counts[item.status] += 1;
  return counts;
}

export function readinessFromStatuses<T extends { status: Status }>(items: T[]) {
  if (items.length === 0) return 0;
  return Math.round(
    (items.reduce((sum, item) => sum + STATUS_SCORE[item.status], 0) / items.length) * 100,
  );
}
