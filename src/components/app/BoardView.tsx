"use client";

import { useMemo, useState } from "react";
import {
  board as seed,
  statusColor,
  priorityColor,
} from "@/lib/data";
import type { Group, Status, Task } from "@/lib/data";
import { AvatarStack } from "@/components/ui";
import {
  IconChevronDown,
  IconPlus,
  IconCheck,
  IconGrid,
  IconKanban,
  IconTimeline,
  IconFilter,
  IconSort,
  IconUser,
  IconSearch,
} from "@/lib/icons";

const STATUS_CYCLE: Status[] = [
  "Not started",
  "Working on it",
  "Stuck",
  "Done",
];

const views = [
  { id: "table", label: "Main table", icon: IconGrid },
  { id: "kanban", label: "Kanban", icon: IconKanban },
  { id: "timeline", label: "Timeline", icon: IconTimeline },
];

let idCounter = 100;

export function BoardView() {
  const [groups, setGroups] = useState<Group[]>(seed);
  const [view, setView] = useState("table");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const summary = useMemo(() => {
    const all = groups.flatMap((g) => g.tasks);
    const by = (s: Status) => all.filter((t) => t.status === s).length;
    return {
      total: all.length,
      done: by("Done"),
      working: by("Working on it"),
      stuck: by("Stuck"),
      notStarted: by("Not started"),
      progress: all.length
        ? Math.round(
            all.reduce((a, t) => a + t.progress, 0) / all.length
          )
        : 0,
    };
  }, [groups]);

  function cycleStatus(gid: string, tid: string) {
    setGroups((prev) =>
      prev.map((g) =>
        g.id !== gid
          ? g
          : {
              ...g,
              tasks: g.tasks.map((t) => {
                if (t.id !== tid) return t;
                const next =
                  STATUS_CYCLE[
                    (STATUS_CYCLE.indexOf(t.status) + 1) %
                      STATUS_CYCLE.length
                  ];
                const progress =
                  next === "Done"
                    ? 100
                    : next === "Not started"
                      ? 0
                      : t.progress || 35;
                return { ...t, status: next, progress };
              }),
            }
      )
    );
  }

  function addTask(gid: string, name: string) {
    if (!name.trim()) return;
    const t: Task = {
      id: `n${idCounter++}`,
      name: name.trim(),
      owners: ["ad"],
      status: "Not started",
      priority: "Medium",
      due: "—",
      timeline: [50, 10],
      progress: 0,
      budget: "$0",
    };
    setGroups((prev) =>
      prev.map((g) => (g.id === gid ? { ...g, tasks: [...g.tasks, t] } : g))
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* board header */}
      <div className="border-b border-line bg-white px-5 pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink">
            Q2 Marketing plan
          </h1>
          <button className="grid h-7 w-7 place-items-center rounded-md text-ink-faint hover:bg-surface hover:text-status-working">
            <IconStarSmall />
          </button>
          <div className="ml-auto">
            <AvatarStack ids={["ad", "mi", "le", "ko", "na"]} size={30} />
          </div>
        </div>

        {/* view tabs */}
        <div className="mt-3 flex items-center gap-1">
          {views.map((v) => {
            const active = v.id === view;
            return (
              <button
                key={v.id}
                onClick={() => setView(v.id)}
                className={`inline-flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "border-brand text-brand"
                    : "border-transparent text-ink-soft hover:text-ink"
                }`}
              >
                <v.icon width={17} height={17} />
                {v.label}
              </button>
            );
          })}
          <button className="ml-1 inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-ink-faint hover:bg-surface">
            <IconPlus width={15} height={15} />
            Add view
          </button>
        </div>
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-line bg-white px-5 py-2.5">
        <button className="inline-flex items-center gap-2 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
          <IconPlus width={16} height={16} />
          New task
        </button>
        <ToolbarBtn icon={IconSearch} label="Search" />
        <ToolbarBtn icon={IconUser} label="Person" />
        <ToolbarBtn icon={IconFilter} label="Filter" />
        <ToolbarBtn icon={IconSort} label="Sort" />

        <div className="ml-auto hidden items-center gap-3 text-xs font-semibold text-ink-soft sm:flex">
          <Legend color={statusColor.Done} label={`${summary.done} done`} />
          <Legend
            color={statusColor["Working on it"]}
            label={`${summary.working} active`}
          />
          <Legend
            color={statusColor.Stuck}
            label={`${summary.stuck} stuck`}
          />
        </div>
      </div>

      {/* scroll area */}
      <div className="flex-1 overflow-auto scroll-thin bg-surface px-3 py-4 sm:px-5">
        {view === "table" && (
          <TableBoard
            groups={groups}
            collapsed={collapsed}
            onToggle={(id) =>
              setCollapsed((c) => ({ ...c, [id]: !c[id] }))
            }
            onCycle={cycleStatus}
            onAdd={addTask}
          />
        )}
        {view === "kanban" && <KanbanBoard groups={groups} />}
        {view === "timeline" && <TimelineBoard groups={groups} />}
      </div>
    </div>
  );
}

/* ---------------- Table ---------------- */
function TableBoard({
  groups,
  collapsed,
  onToggle,
  onCycle,
  onAdd,
}: {
  groups: Group[];
  collapsed: Record<string, boolean>;
  onToggle: (id: string) => void;
  onCycle: (gid: string, tid: string) => void;
  onAdd: (gid: string, name: string) => void;
}) {
  return (
    <div className="space-y-6">
      {groups.map((g) => (
        <GroupBlock
          key={g.id}
          group={g}
          collapsed={!!collapsed[g.id]}
          onToggle={() => onToggle(g.id)}
          onCycle={onCycle}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}

function GroupBlock({
  group,
  collapsed,
  onToggle,
  onCycle,
  onAdd,
}: {
  group: Group;
  collapsed: boolean;
  onToggle: () => void;
  onCycle: (gid: string, tid: string) => void;
  onAdd: (gid: string, name: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const cols =
    "grid grid-cols-[28px_minmax(180px,2fr)_110px_150px_120px_92px_minmax(120px,1fr)] items-center";

  return (
    <section>
      <button
        onClick={onToggle}
        className="mb-1 flex items-center gap-2"
        style={{ color: group.color }}
      >
        <IconChevronDown
          width={18}
          height={18}
          className={`transition-transform ${collapsed ? "-rotate-90" : ""}`}
        />
        <span className="text-[15px] font-bold">{group.title}</span>
        <span className="text-xs font-medium text-ink-faint">
          {group.tasks.length} items
        </span>
      </button>

      {!collapsed && (
        <div className="overflow-hidden rounded-lg border border-line bg-white">
          <div className="overflow-x-auto scroll-thin">
            <div className="min-w-[760px]">
              {/* head */}
              <div
                className={`${cols} border-b border-line bg-surface/60 text-[11px] font-bold uppercase tracking-wide text-ink-faint`}
              >
                <span />
                <span className="py-2 pl-1">Task</span>
                <span className="px-2 py-2 text-center">Owner</span>
                <span className="px-2 py-2 text-center">Status</span>
                <span className="px-2 py-2 text-center">Priority</span>
                <span className="px-2 py-2 text-center">Due</span>
                <span className="px-2 py-2 text-center">Progress</span>
              </div>

              {/* rows */}
              {group.tasks.map((t) => (
                <div
                  key={t.id}
                  className={`${cols} group border-b border-line-soft last:border-b-0 hover:bg-surface/50`}
                >
                  <span
                    className="h-full"
                    style={{
                      borderLeft: `4px solid ${group.color}`,
                    }}
                  />
                  <span className="flex items-center gap-2 py-2.5 pl-1 pr-2 text-sm font-medium text-ink">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[5px] border border-line text-transparent group-hover:border-ink-faint">
                      <IconCheck width={11} height={11} />
                    </span>
                    <span className="truncate">{t.name}</span>
                  </span>
                  <span className="flex justify-center px-2 py-2">
                    <AvatarStack ids={t.owners} size={26} />
                  </span>
                  <span className="px-2 py-2">
                    <button
                      onClick={() => onCycle(group.id, t.id)}
                      className="flex h-9 w-full items-center justify-center rounded-md text-[13px] font-semibold text-white transition-transform active:scale-95"
                      style={{ background: statusColor[t.status] }}
                      title="Click to change status"
                    >
                      {t.status}
                    </button>
                  </span>
                  <span className="px-2 py-2">
                    <span
                      className="flex h-9 w-full items-center justify-center rounded-md text-[13px] font-semibold text-white"
                      style={{ background: priorityColor[t.priority] }}
                    >
                      {t.priority}
                    </span>
                  </span>
                  <span className="px-2 py-2 text-center text-[13px] font-medium text-ink-soft">
                    {t.due}
                  </span>
                  <span className="px-3 py-2">
                    <span className="flex items-center gap-2">
                      <span className="block h-2 flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className="block h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${t.progress}%`,
                            background: statusColor[t.status],
                          }}
                        />
                      </span>
                      <span className="w-8 text-right text-[11px] font-semibold text-ink-faint">
                        {t.progress}%
                      </span>
                    </span>
                  </span>
                </div>
              ))}

              {/* add row */}
              <div className={`${cols} border-t border-line-soft`}>
                <span
                  className="h-full"
                  style={{ borderLeft: `4px solid ${group.color}` }}
                />
                <span className="col-span-6 py-1.5 pl-1 pr-2">
                  <input
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onAdd(group.id, draft);
                        setDraft("");
                      }
                    }}
                    placeholder="+ Add task"
                    className="h-8 w-full rounded-md bg-transparent px-2 text-sm text-ink outline-none placeholder:text-ink-faint focus:bg-surface"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Kanban ---------------- */
function KanbanBoard({ groups }: { groups: Group[] }) {
  const all = groups.flatMap((g) =>
    g.tasks.map((t) => ({ ...t, color: g.color, group: g.title }))
  );
  const cols: Status[] = [
    "Not started",
    "Working on it",
    "Stuck",
    "Done",
  ];
  return (
    <div className="flex gap-4 overflow-x-auto scroll-thin pb-2">
      {cols.map((c) => {
        const items = all.filter((t) => t.status === c);
        return (
          <div key={c} className="w-72 shrink-0">
            <div
              className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white"
              style={{ background: statusColor[c] }}
            >
              {c}
              <span className="ml-auto rounded-full bg-white/25 px-2 text-xs">
                {items.length}
              </span>
            </div>
            <div className="space-y-2">
              {items.map((t) => (
                <div
                  key={t.id}
                  className="rounded-xl border border-line bg-white p-3 shadow-sm"
                >
                  <span
                    className="mb-2 inline-block h-1.5 w-9 rounded-full"
                    style={{ background: t.color }}
                  />
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="mt-0.5 text-xs text-ink-faint">{t.group}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <AvatarStack ids={t.owners} size={24} />
                    <span className="text-xs font-medium text-ink-soft">
                      {t.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Timeline ---------------- */
function TimelineBoard({ groups }: { groups: Group[] }) {
  return (
    <div className="rounded-lg border border-line bg-white p-4 sm:p-6">
      <div className="mb-3 grid grid-cols-3 overflow-hidden rounded-md border border-line text-center text-xs font-bold uppercase tracking-wide text-ink-soft">
        {["April", "May", "June"].map((q) => (
          <span key={q} className="border-r border-line py-2 last:border-r-0">
            {q}
          </span>
        ))}
      </div>
      <div className="space-y-5">
        {groups.map((g) => (
          <div key={g.id}>
            <p
              className="mb-2 text-sm font-bold"
              style={{ color: g.color }}
            >
              {g.title}
            </p>
            <div className="space-y-2">
              {g.tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3">
                  <span className="w-44 shrink-0 truncate text-sm font-medium text-ink">
                    {t.name}
                  </span>
                  <div className="relative h-7 flex-1 rounded-md bg-surface">
                    <span
                      className="absolute top-1/2 flex h-5 -translate-y-1/2 items-center rounded-full px-2 text-[11px] font-semibold text-white"
                      style={{
                        left: `${t.timeline[0]}%`,
                        width: `${t.timeline[1]}%`,
                        minWidth: 46,
                        background: g.color,
                      }}
                    >
                      {t.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- small bits ---------------- */
function ToolbarBtn({
  icon: Icon,
  label,
}: {
  icon: (p: { width: number; height: number }) => React.ReactElement;
  label: string;
}) {
  return (
    <button className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink-soft hover:bg-surface hover:text-ink">
      <Icon width={16} height={16} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function IconStarSmall() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none">
      <path
        d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
