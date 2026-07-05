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
  not_covered: "border-status-grey-fg/20",
  started: "border-status-yellow-fg/25",
  needs_review: "border-status-orange-fg/25",
  ready: "border-status-green-fg/25",
  planned: "border-status-blue-fg/25",
};

export const STATUS_TILE: Record<Status, string> = {
  not_covered: "border-status-grey-fg/20 bg-status-grey-bg/45",
  started: "border-status-yellow-fg/25 bg-status-yellow-bg/42",
  needs_review: "border-status-orange-fg/25 bg-status-orange-bg/35",
  ready: "border-status-green-fg/25 bg-status-green-bg/38",
  planned: "border-status-blue-fg/25 bg-status-blue-bg/42",
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
