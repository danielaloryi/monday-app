"use client";

import { useState } from "react";
import { Sidebar } from "@/components/app/Sidebar";
import { Topbar } from "@/components/app/Topbar";
import { BoardView } from "@/components/app/BoardView";

export function AppShell() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <Sidebar open={sidebar} onClose={() => setSidebar(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setSidebar(true)} />
        <BoardView />
      </div>
    </div>
  );
}
