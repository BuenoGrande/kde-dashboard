import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/domains", label: "Domains" },
  { to: "/trainer", label: "Trainer" },
  { to: "/writing", label: "Writing" },
  { to: "/speaking", label: "Speaking" },
  { to: "/teachers", label: "Teachers" },
  { to: "/logs", label: "Lesson logs" },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-10 border-b border-border bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <NavLink to="/" className="shrink-0">
            <span className="text-sm font-semibold tracking-tight text-ink">
              KDE Prep
            </span>
            <span className="ml-2 text-sm text-muted">
              Pierre's command center
            </span>
          </NavLink>
          <nav className="-mx-1 flex gap-1 overflow-x-auto text-sm">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `shrink-0 rounded-md px-2.5 py-1.5 font-medium transition-colors ${
                    isActive
                      ? "bg-ink text-white"
                      : "text-ink-soft hover:bg-canvas"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-4 py-8 text-xs text-muted sm:px-6">
        KDE — Kantonaler Deutschtest für die Einbürgerung, Kanton Zürich. This
        is a private study coordination tool, not an official exam resource.
      </footer>
    </div>
  );
}
