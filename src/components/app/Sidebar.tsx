"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  IconBoard,
  IconDashboard,
  IconDoc,
  IconInbox,
  IconPlus,
  IconChevronDown,
  IconSearch,
  IconStar,
  IconUser,
} from "@/lib/icons";

const nav = [
  { icon: IconInbox, label: "Inbox", badge: 3 },
  { icon: IconStar, label: "Favorites" },
  { icon: IconDoc, label: "Workdocs" },
  { icon: IconDashboard, label: "Dashboards" },
];

const boards = [
  { name: "Q2 Marketing plan", color: "#6161ff", active: true },
  { name: "Product roadmap", color: "#00c875" },
  { name: "Hiring pipeline", color: "#fdab3d" },
  { name: "Content calendar", color: "#ff5ac4" },
  { name: "Bug tracker", color: "#e2445c" },
];

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [wsOpen, setWsOpen] = useState(true);

  return (
    <>
      {/* mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 flex h-screen w-64 flex-col border-r border-line bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 items-center px-4">
          <Link href="/">
            <Logo size={24} />
          </Link>
        </div>

        <div className="px-3">
          <button className="flex w-full items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm text-ink-faint hover:border-ink-faint">
            <IconSearch width={16} height={16} />
            Search
            <span className="ml-auto rounded border border-line px-1.5 py-0.5 text-[11px] font-semibold">
              ⌘K
            </span>
          </button>
        </div>

        <nav className="mt-3 px-2">
          {nav.map((n) => (
            <button
              key={n.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
            >
              <n.icon width={19} height={19} />
              {n.label}
              {n.badge && (
                <span className="ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-status-stuck px-1.5 text-[11px] font-bold text-white">
                  {n.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="mx-3 my-3 border-t border-line" />

        {/* workspace */}
        <div className="px-3">
          <div className="flex items-center gap-2 px-1">
            <button
              onClick={() => setWsOpen((v) => !v)}
              className="flex flex-1 items-center gap-2 text-left"
              aria-expanded={wsOpen}
            >
              <IconChevronDown
                width={16}
                height={16}
                className={`text-ink-faint transition-transform ${
                  wsOpen ? "" : "-rotate-90"
                }`}
              />
              <span className="grid h-6 w-6 place-items-center rounded-md bg-brand text-[11px] font-bold text-white">
                AC
              </span>
              <span className="text-sm font-bold text-ink">Acme Co.</span>
            </button>
            <button
              className="grid h-7 w-7 place-items-center rounded-md text-ink-faint hover:bg-surface hover:text-ink"
              aria-label="Add board"
            >
              <IconPlus width={16} height={16} />
            </button>
          </div>
        </div>

        {wsOpen && (
          <div className="mt-1 flex-1 space-y-0.5 overflow-y-auto scroll-thin px-2">
            {boards.map((b) => (
              <button
                key={b.name}
                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                  b.active
                    ? "bg-brand-soft text-brand"
                    : "text-ink-soft hover:bg-surface hover:text-ink"
                }`}
              >
                <IconBoard
                  width={17}
                  height={17}
                  style={{ color: b.color }}
                />
                <span className="truncate">{b.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* user */}
        <div className="mt-auto border-t border-line p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-surface">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-pulse-purple text-white">
              <IconUser width={18} height={18} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-ink">
                Ada Levin
              </span>
              <span className="block truncate text-xs text-ink-faint">
                ada@acme.co
              </span>
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
