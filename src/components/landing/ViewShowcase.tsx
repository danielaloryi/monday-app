"use client";

import { useState } from "react";
import { Eyebrow, AvatarStack, StatusPill } from "@/components/ui";
import {
  IconGrid,
  IconKanban,
  IconTimeline,
  IconCalendar,
} from "@/lib/icons";
import { board, quarters, statusColor } from "@/lib/data";

const tabs = [
  { id: "table", label: "Table", icon: IconGrid },
  { id: "kanban", label: "Kanban", icon: IconKanban },
  { id: "timeline", label: "Timeline", icon: IconTimeline },
  { id: "calendar", label: "Calendar", icon: IconCalendar },
] as const;

type TabId = (typeof tabs)[number]["id"];

const allTasks = board.flatMap((g) =>
  g.tasks.map((t) => ({ ...t, groupColor: g.color, group: g.title }))
);

export function ViewShowcase() {
  const [tab, setTab] = useState<TabId>("table");

  return (
    <section className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow color="var(--color-pulse-purple)">
            See work your way
          </Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
            Same data. Six perspectives. One click.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Switch how a board looks without copying anything. Planners love the
            timeline, builders live in kanban, leadership reads the table.
          </p>
        </div>

        {/* tab bar */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Board views"
            className="inline-flex flex-wrap items-center gap-1 rounded-2xl border border-line bg-white p-1.5 shadow-sm"
          >
            {tabs.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(t.id)}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition-all ${
                    active
                      ? "bg-brand text-white shadow-[0_6px_18px_-8px_rgba(97,97,255,0.8)]"
                      : "text-ink-soft hover:bg-surface"
                  }`}
                >
                  <t.icon width={18} height={18} />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* panel */}
        <div className="mx-auto mt-8 max-w-5xl overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {tab === "table" && <TableView />}
          {tab === "kanban" && <KanbanView />}
          {tab === "timeline" && <TimelineView />}
          {tab === "calendar" && <CalendarView />}
        </div>
      </div>
    </section>
  );
}

/* ---------- Table ---------- */
function TableView() {
  return (
    <div className="animate-pop p-2 sm:p-4">
      {board.map((g) => (
        <div key={g.id} className="mb-4">
          <div className="flex items-center gap-2 px-2 py-2">
            <span
              className="text-[15px] font-bold"
              style={{ color: g.color }}
            >
              {g.title}
            </span>
            <span className="text-xs text-ink-faint">
              {g.tasks.length} items
            </span>
          </div>
          <div className="overflow-x-auto scroll-thin">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <tbody>
                {g.tasks.map((t) => (
                  <tr
                    key={t.id}
                    className="group border-l-[3px]"
                    style={{ borderColor: g.color }}
                  >
                    <td className="py-2 pl-3 pr-4 font-medium text-ink group-hover:bg-surface">
                      {t.name}
                    </td>
                    <td className="px-2 py-2 group-hover:bg-surface">
                      <AvatarStack ids={t.owners} size={24} />
                    </td>
                    <td className="w-40 px-2 py-2 group-hover:bg-surface">
                      <StatusPill status={t.status} />
                    </td>
                    <td className="px-3 py-2 text-right text-[13px] font-medium text-ink-soft group-hover:bg-surface">
                      {t.due}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Kanban ---------- */
function KanbanView() {
  const cols: { label: string; key: string }[] = [
    { label: "Not started", key: "Not started" },
    { label: "Working on it", key: "Working on it" },
    { label: "Stuck", key: "Stuck" },
    { label: "Done", key: "Done" },
  ];
  return (
    <div className="animate-pop overflow-x-auto scroll-thin p-4">
      <div className="flex min-w-[760px] gap-4">
        {cols.map((c) => {
          const items = allTasks.filter((t) => t.status === c.key);
          return (
            <div key={c.key} className="flex-1">
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{
                    background:
                      statusColor[c.key as keyof typeof statusColor],
                  }}
                />
                <span className="text-sm font-bold text-ink">{c.label}</span>
                <span className="text-xs text-ink-faint">{items.length}</span>
              </div>
              <div className="space-y-3">
                {items.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-xl border border-line bg-white p-3 shadow-sm transition-transform hover:-translate-y-0.5"
                  >
                    <span
                      className="mb-2 inline-block h-1.5 w-9 rounded-full"
                      style={{ background: t.groupColor }}
                    />
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="mt-1 text-xs text-ink-faint">{t.group}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <AvatarStack ids={t.owners} size={22} />
                      <span className="text-xs font-medium text-ink-soft">
                        {t.due}
                      </span>
                    </div>
                  </div>
                ))}
                {items.length === 0 && (
                  <div className="rounded-xl border border-dashed border-line py-8 text-center text-xs text-ink-faint">
                    Drop items here
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Timeline ---------- */
function TimelineView() {
  return (
    <div className="animate-pop p-4 sm:p-6">
      <div className="mb-3 grid grid-cols-3 overflow-hidden rounded-lg border border-line">
        {quarters.map((q) => (
          <div
            key={q}
            className="border-r border-line py-2 text-center text-xs font-bold uppercase tracking-wide text-ink-soft last:border-r-0"
          >
            {q}
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {allTasks.map((t) => (
          <div key={t.id} className="flex items-center gap-3">
            <span className="w-40 shrink-0 truncate text-sm font-medium text-ink">
              {t.name}
            </span>
            <div className="relative h-7 flex-1 rounded-md bg-surface">
              <span
                className="absolute top-1/2 flex h-5 -translate-y-1/2 items-center rounded-full px-2 text-[11px] font-semibold text-white"
                style={{
                  left: `${t.timeline[0]}%`,
                  width: `${t.timeline[1]}%`,
                  minWidth: 44,
                  background: t.groupColor,
                }}
              >
                {t.due}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Calendar ---------- */
function CalendarView() {
  const days = Array.from({ length: 35 }, (_, i) => i - 2); // offset start
  const events: Record<number, { name: string; color: string }> = {
    12: { name: "Interviews", color: "#a25ddc" },
    18: { name: "Teardown", color: "#a25ddc" },
    21: { name: "Wireframes", color: "#579bfc" },
    26: { name: "Insights", color: "#a25ddc" },
    29: { name: "Component lib", color: "#579bfc" },
  };
  return (
    <div className="animate-pop p-4 sm:p-6">
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wide text-ink-faint">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d) => {
          const valid = d > 0 && d <= 30;
          const ev = events[d];
          return (
            <div
              key={d}
              className={`min-h-[64px] rounded-lg border p-1.5 text-left ${
                valid ? "border-line bg-white" : "border-transparent bg-surface/50"
              }`}
            >
              {valid && (
                <span className="text-[11px] font-semibold text-ink-faint">
                  {d}
                </span>
              )}
              {ev && (
                <span
                  className="mt-1 block truncate rounded px-1.5 py-1 text-[10px] font-semibold text-white"
                  style={{ background: ev.color }}
                >
                  {ev.name}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
