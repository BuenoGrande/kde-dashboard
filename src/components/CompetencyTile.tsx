import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Status } from "../data/types";
import { Dot } from "./Badge";
import { STATUS_BORDER, STATUS_FG, STATUS_LABEL } from "../lib/status";

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
      className={`group relative flex min-h-44 flex-col overflow-hidden rounded-lg border bg-surface p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_-24px_rgba(36,44,39,0.55)] ${
        selected ? "border-ink shadow-[0_18px_36px_-26px_rgba(36,44,39,0.8)]" : STATUS_BORDER[status]
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {meta && <p className="mb-2 text-[0.68rem] font-semibold uppercase text-muted">{meta}</p>}
          <h2 className="text-base font-semibold leading-tight text-ink">{title}</h2>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md bg-canvas px-2 py-1 text-[0.68rem] font-semibold uppercase ${STATUS_FG[status]}`}
        >
          <Dot status={status} />
          {STATUS_LABEL[status]}
        </span>
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
      <div className="absolute inset-x-4 bottom-0 h-1 rounded-t-full bg-border">
        <div
          className={`h-full rounded-t-full ${STATUS_BORDER[status].replace("border-", "bg-").replace("/30", "").replace("/40", "")}`}
        />
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
