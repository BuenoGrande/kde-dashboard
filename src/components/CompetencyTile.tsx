import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Status } from "../data/types";
import { STATUS_BG, STATUS_FG, STATUS_LABEL, STATUS_TILE } from "../lib/status";

interface CompetencyTileProps {
  title: string;
  status: Status;
  meta?: string;
  detail?: string;
  to?: string;
  selected?: boolean;
  index?: number;
  onClick?: () => void;
  actionLabel?: string;
  children?: ReactNode;
}

function TileBody({
  title,
  status,
  meta,
  detail,
  selected,
  actionLabel,
  children,
}: Omit<CompetencyTileProps, "to" | "index" | "onClick">) {
  return (
    <div
      className={`group relative flex min-h-44 flex-col overflow-hidden rounded-lg border p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-24px_rgba(36,44,39,0.55)] ${
        selected ? "border-ink bg-surface shadow-[0_18px_36px_-26px_rgba(36,44,39,0.8)]" : STATUS_TILE[status]
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          {meta && <p className="text-[0.68rem] font-semibold uppercase leading-snug text-muted">{meta}</p>}
          <span
            className={`inline-flex max-w-full justify-center rounded-md px-2 py-1 text-center text-[0.68rem] font-semibold uppercase leading-tight shadow-[inset_0_0_0_1px_rgba(32,37,31,0.08)] ${STATUS_BG[status]} ${STATUS_FG[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
        <h2 className="text-balance text-base font-semibold leading-tight text-ink">{title}</h2>
      </div>

      {detail && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">{detail}</p>}

      <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
        <div>{children}</div>
        {actionLabel && (
          <span className={`text-xs font-semibold uppercase ${selected ? "text-ink" : "text-muted"}`}>
            {selected ? "Selected" : actionLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function CompetencyTile(props: CompetencyTileProps) {
  const style = { animationDelay: `${(props.index ?? 0) * 35}ms` };
  const actionLabel = props.actionLabel ?? (props.to ? "Open plan" : props.onClick ? "Show task" : undefined);
  const body = <TileBody {...props} actionLabel={actionLabel} />;

  if (props.to) {
    return (
      <Link to={props.to} className="tile-enter block focus:outline-none focus-visible:ring-2 focus-visible:ring-ink" style={style}>
        {body}
      </Link>
    );
  }

  if (props.onClick) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        aria-pressed={props.selected}
        className="tile-enter block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
        style={style}
      >
        {body}
      </button>
    );
  }

  return (
    <div className="tile-enter" style={style}>
      {body}
    </div>
  );
}
