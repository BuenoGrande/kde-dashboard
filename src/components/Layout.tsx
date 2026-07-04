import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/domains", label: "Vocabulary" },
  { to: "/exam", label: "Exam practice" },
  { to: "/teachers", label: "Teachers" },
  { to: "/logs", label: "Lesson logs" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-canvas">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink to="/" className="shrink-0">
            <span className="text-base font-semibold tracking-tight text-ink">
              KDE Prep
            </span>
            <span className="ml-2 hidden text-sm text-muted sm:inline">
              student and teacher command center
            </span>
          </NavLink>
          <nav className="-mx-1 flex gap-1 overflow-x-auto text-sm">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `shrink-0 rounded-md px-3 py-2 font-semibold transition duration-200 active:scale-[0.98] ${
                    isActive
                      ? "bg-ink text-white shadow-[0_10px_24px_-18px_rgba(36,44,39,0.9)]"
                      : "text-ink-soft hover:bg-canvas hover:text-ink"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
      <footer className="mx-auto max-w-7xl px-4 py-8 text-xs text-muted sm:px-6">
        KDE — Kantonaler Deutschtest für die Einbürgerung, Kanton Zürich. This
        is a private study coordination tool, not an official exam resource.
      </footer>
    </div>
  );
}
