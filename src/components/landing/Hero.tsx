"use client";

import { Button } from "@/components/ui";
import { BoardMockup } from "./BoardMockup";
import { IconArrowRight, IconCheck, IconPlay } from "@/lib/icons";

const trust = ["No credit card needed", "Free 14-day trial", "Cancel anytime"];

const floaters: {
  label: string;
  color: string;
  top: string;
  left?: string;
  right?: string;
}[] = [
  { label: "Automation triggered", color: "#00c875", top: "8%", left: "-4%" },
  { label: "3 tasks marked Done", color: "#6161ff", top: "62%", left: "-6%" },
  { label: "Sprint on track", color: "#fdab3d", top: "30%", right: "-5%" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ambient color wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 8%, rgba(97,97,255,0.10), transparent 70%), radial-gradient(50% 45% at 92% 22%, rgba(255,90,196,0.10), transparent 70%), radial-gradient(55% 50% at 60% 100%, rgba(0,200,117,0.08), transparent 70%)",
        }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 grid-dots opacity-50" />

      <div className="mx-auto max-w-7xl px-5 pt-16 pb-20 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_1.1fr]">
          {/* copy */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink-soft shadow-sm animate-rise">
              <span className="h-2 w-2 rounded-full bg-status-done" />
              New · AI task drafting is live
            </span>

            <h1
              className="font-display mt-5 text-[clamp(2.6rem,6vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight text-ink animate-rise"
              style={{ animationDelay: "0.05s" }}
            >
              One platform,
              <br />
              <span className="text-gradient">better teamwork.</span>
            </h1>

            <p
              className="mt-5 text-lg leading-relaxed text-ink-soft animate-rise"
              style={{ animationDelay: "0.12s" }}
            >
              Plan, run, and track every project on a single visual workspace.
              Boards your team actually enjoys, automations that erase the
              busywork, and dashboards that tell you the truth in real time.
            </p>

            <div
              className="mt-7 flex flex-wrap items-center gap-3 animate-rise"
              style={{ animationDelay: "0.18s" }}
            >
              <Button href="/product" size="lg">
                Get started free
                <IconArrowRight width={18} height={18} />
              </Button>
              <Button href="#tour" variant="outline" size="lg">
                <IconPlay width={15} height={15} />
                Watch the 2-min tour
              </Button>
            </div>

            <ul
              className="mt-6 flex flex-wrap gap-x-5 gap-y-2 animate-rise"
              style={{ animationDelay: "0.24s" }}
            >
              {trust.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft"
                >
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-status-done text-white">
                    <IconCheck width={11} height={11} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* visual */}
          <div
            className="relative animate-pop"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative">
              <BoardMockup floating />

              {floaters.map((f) => (
                <span
                  key={f.label}
                  className="absolute hidden items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink shadow-pop md:inline-flex"
                  style={{
                    top: f.top,
                    left: f.left,
                    right: f.right,
                  }}
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: f.color }}
                  />
                  {f.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
