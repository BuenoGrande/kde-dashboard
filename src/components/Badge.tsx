import type { Status } from "../data/types";
import { STATUS_DOT, STATUS_LABEL, statusBadgeClasses } from "../lib/status";

export function Badge({ status, children }: { status: Status; children?: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium tracking-wide uppercase ${statusBadgeClasses(status)}`}
    >
      {children ?? STATUS_LABEL[status]}
    </span>
  );
}

export function Dot({ status }: { status: Status }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${STATUS_DOT[status]}`} />;
}
