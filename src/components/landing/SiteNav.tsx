"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import {
  IconChevronDown,
  IconBoard,
  IconAutomation,
  IconDashboard,
  IconDoc,
  IconMenu,
  IconX,
  IconArrowRight,
} from "@/lib/icons";

const products = [
  {
    icon: IconBoard,
    color: "#6161ff",
    title: "Work boards",
    desc: "Visual tables your team runs every day",
  },
  {
    icon: IconAutomation,
    color: "#00c875",
    title: "Automations",
    desc: "Replace busywork with no-code recipes",
  },
  {
    icon: IconDashboard,
    color: "#fdab3d",
    title: "Dashboards",
    desc: "Real-time insight across every board",
  },
  {
    icon: IconDoc,
    color: "#ff5ac4",
    title: "Workdocs",
    desc: "Docs that turn words into action items",
  },
];

const links = ["Product", "Solutions", "Resources", "Pricing"];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
      onMouseLeave={() => setOpenMenu(false)}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 lg:px-8">
        <Link href="/" aria-label="monday.work home">
          <Logo size={26} />
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <li
              key={l}
              onMouseEnter={() => setOpenMenu(l === "Product")}
            >
              <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium text-ink-soft hover:text-ink hover:bg-surface transition-colors">
                {l}
                {l === "Product" && (
                  <IconChevronDown width={15} height={15} />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden md:flex items-center gap-2">
          <Button href="/product" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/product" size="sm">
            Get started
            <IconArrowRight width={16} height={16} />
          </Button>
        </div>

        <button
          className="ml-auto md:hidden rounded-lg p-2 text-ink hover:bg-surface"
          aria-label="Open menu"
          onClick={() => setMobile(true)}
        >
          <IconMenu />
        </button>
      </nav>

      {/* Mega menu */}
      <div
        className={`absolute inset-x-0 top-16 origin-top transition-all duration-200 ${
          openMenu
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="rounded-2xl border border-line bg-white p-3 shadow-pop">
            <div className="grid grid-cols-2 gap-1">
              {products.map((p) => (
                <Link
                  key={p.title}
                  href="/product"
                  className="group flex items-start gap-3 rounded-xl p-3 hover:bg-surface transition-colors"
                >
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-lg text-white"
                    style={{ background: p.color }}
                  >
                    <p.icon width={20} height={20} />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      {p.title}
                    </span>
                    <span className="block text-sm text-ink-soft">
                      {p.desc}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setMobile(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-5 shadow-pop animate-pop">
            <div className="flex items-center justify-between">
              <Logo size={24} />
              <button
                className="rounded-lg p-2 hover:bg-surface"
                aria-label="Close menu"
                onClick={() => setMobile(false)}
              >
                <IconX />
              </button>
            </div>
            <ul className="mt-6 space-y-1">
              {links.map((l) => (
                <li key={l}>
                  <Link
                    href="/product"
                    onClick={() => setMobile(false)}
                    className="block rounded-xl px-3 py-3 text-lg font-medium text-ink hover:bg-surface"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3">
              <Button href="/product" variant="outline" className="w-full">
                Log in
              </Button>
              <Button href="/product" className="w-full">
                Get started free
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
