"use client";

import { Button, AvatarStack } from "@/components/ui";
import {
  IconMenu,
  IconSearch,
  IconBell,
  IconSparkle,
  IconPlus,
} from "@/lib/icons";

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md">
      <button
        className="grid h-9 w-9 place-items-center rounded-lg text-ink hover:bg-surface lg:hidden"
        aria-label="Open sidebar"
        onClick={onMenu}
      >
        <IconMenu />
      </button>

      <div className="relative hidden max-w-md flex-1 sm:block">
        <IconSearch
          width={17}
          height={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="search"
          placeholder="Search this board…"
          className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-brand focus:bg-white"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <button className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-ink hover:bg-surface sm:inline-flex">
          <IconSparkle width={16} height={16} className="text-pulse-purple" />
          AI assist
        </button>
        <button
          className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-surface"
          aria-label="Notifications"
        >
          <span className="relative">
            <IconBell />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-status-stuck ring-2 ring-white" />
          </span>
        </button>

        <div className="mx-1 hidden items-center md:flex">
          <AvatarStack ids={["ad", "mi", "le", "ko"]} size={30} />
        </div>

        <Button size="sm" className="hidden sm:inline-flex">
          <IconPlus width={16} height={16} />
          Invite
        </Button>
      </div>
    </header>
  );
}
