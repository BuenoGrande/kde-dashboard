import type { Status } from "../data/types";

// One status vocabulary, one color each, used everywhere: domains, writing
// tasks, speaking checklist items. No separate "color" concept to map.

export const STATUS_BG: Record<Status, string> = {
  not_covered: "bg-status-grey-bg",
  started: "bg-status-green-bg",
  needs_review: "bg-status-green-bg",
  ready: "bg-status-green-bg",
  planned: "bg-status-grey-bg",
};

export const STATUS_FG: Record<Status, string> = {
  not_covered: "text-status-grey-fg",
  started: "text-status-green-fg",
  needs_review: "text-status-green-fg",
  ready: "text-status-green-fg",
  planned: "text-status-grey-fg",
};

export const STATUS_BORDER: Record<Status, string> = {
  not_covered: "border-status-grey-fg/35",
  started: "border-status-green-fg/45",
  needs_review: "border-status-green-fg/45",
  ready: "border-status-green-fg/45",
  planned: "border-status-grey-fg/35",
};

export const STATUS_TILE: Record<Status, string> = {
  not_covered: "border-status-grey-fg/35 bg-status-grey-bg/90",
  started: "border-status-green-fg/45 bg-status-green-bg/95",
  needs_review: "border-status-green-fg/45 bg-status-green-bg/95",
  ready: "border-status-green-fg/45 bg-status-green-bg/95",
  planned: "border-status-grey-fg/35 bg-status-grey-bg/90",
};

export const STATUS_LABEL: Record<Status, string> = {
  not_covered: "To cover",
  started: "Covered",
  needs_review: "Covered",
  ready: "Covered",
  planned: "To cover",
};

export const STATUS_COUNT_LABEL: Record<Status, string> = {
  not_covered: "to cover",
  started: "covered",
  needs_review: "covered",
  ready: "covered",
  planned: "to cover",
};

export const STATUS_ORDER: Status[] = [
  "ready",
  "needs_review",
  "started",
  "planned",
  "not_covered",
];

export const STATUS_SCORE: Record<Status, number> = {
  not_covered: 0,
  planned: 0,
  started: 1,
  needs_review: 1,
  ready: 1,
};

export function coveredStatus(status: Status): Status {
  return STATUS_SCORE[status] > 0 ? "ready" : "not_covered";
}

export function coverageCounts<T extends { status: Status }>(items: T[]) {
  return items.reduce(
    (counts, item) => {
      if (STATUS_SCORE[item.status] > 0) counts.covered += 1;
      else counts.toCover += 1;
      return counts;
    },
    { covered: 0, toCover: 0 },
  );
}

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
