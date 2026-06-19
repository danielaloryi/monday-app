"use client";

import { AvatarStack, StatusPill } from "@/components/ui";
import { IconCheck, IconChevronDown } from "@/lib/icons";

const rows: {
  name: string;
  owners: string[];
  status: "Done" | "Working on it" | "Stuck" | "Not started";
  date: string;
  progress: number;
}[] = [
  {
    name: "Brand identity refresh",
    owners: ["ad", "mi"],
    status: "Done",
    date: "Apr 14",
    progress: 100,
  },
  {
    name: "Launch landing page",
    owners: ["le"],
    status: "Working on it",
    date: "May 02",
    progress: 60,
  },
  {
    name: "Pricing experiment",
    owners: ["na", "ko"],
    status: "Stuck",
    date: "May 09",
    progress: 25,
  },
  {
    name: "Customer onboarding flow",
    owners: ["ja"],
    status: "Not started",
    date: "May 22",
    progress: 0,
  },
];

const progressColor: Record<string, string> = {
  Done: "var(--color-status-done)",
  "Working on it": "var(--color-status-working)",
  Stuck: "var(--color-status-stuck)",
  "Not started": "var(--color-status-blank)",
};

export function BoardMockup({ floating = false }: { floating?: boolean }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-white ${
        floating ? "shadow-pop" : "shadow-card"
      }`}
    >
      {/* board top bar */}
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-sm font-semibold text-ink">
          Q2 Marketing plan
        </span>
        <span className="ml-auto hidden items-center gap-1 rounded-md bg-surface px-2.5 py-1 text-xs font-semibold text-ink-soft sm:inline-flex">
          Main table
          <IconChevronDown width={13} height={13} />
        </span>
      </div>

      {/* group header */}
      <div className="flex items-center gap-2 px-4 pt-3 pb-1">
        <IconChevronDown width={16} height={16} className="text-pulse-blue" />
        <span
          className="text-[15px] font-bold"
          style={{ color: "var(--color-pulse-blue)" }}
        >
          This sprint
        </span>
        <span className="text-xs text-ink-faint">4 items</span>
      </div>

      {/* column heads */}
      <div className="grid grid-cols-[1.6fr_0.7fr_1fr_0.7fr_0.9fr] items-center gap-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
        <span>Task</span>
        <span className="text-center">Owner</span>
        <span className="text-center">Status</span>
        <span className="text-center">Due</span>
        <span className="text-center">Progress</span>
      </div>

      {/* rows */}
      <ul className="px-2 pb-3">
        {rows.map((r, i) => (
          <li
            key={r.name}
            className="group grid grid-cols-[1.6fr_0.7fr_1fr_0.7fr_0.9fr] items-center gap-2 rounded-lg border-l-[3px] px-2 py-2 transition-colors hover:bg-surface animate-rise"
            style={{
              borderColor: "var(--color-pulse-blue)",
              animationDelay: `${0.15 + i * 0.09}s`,
            }}
          >
            <span className="flex items-center gap-2 truncate text-sm font-medium text-ink">
              <span className="grid h-4 w-4 place-items-center rounded-[5px] border border-line text-transparent group-hover:border-ink-faint">
                <IconCheck width={11} height={11} />
              </span>
              {r.name}
            </span>
            <span className="flex justify-center">
              <AvatarStack ids={r.owners} size={24} />
            </span>
            <span className="px-1">
              <StatusPill status={r.status} />
            </span>
            <span className="text-center text-[13px] font-medium text-ink-soft">
              {r.date}
            </span>
            <span className="px-1">
              <span className="block h-2.5 w-full overflow-hidden rounded-full bg-line">
                <span
                  className="block h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${r.progress}%`,
                    background: progressColor[r.status],
                  }}
                />
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
