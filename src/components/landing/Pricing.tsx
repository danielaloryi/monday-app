"use client";

import { useState } from "react";
import { Eyebrow, Button } from "@/components/ui";
import { IconCheck } from "@/lib/icons";

const tiers = [
  {
    name: "Free",
    tagline: "For individuals getting organized",
    monthly: 0,
    yearly: 0,
    cta: "Start for free",
    accent: "#9699a6",
    features: [
      "Up to 3 boards",
      "Unlimited docs",
      "200+ templates",
      "iOS & Android apps",
    ],
  },
  {
    name: "Pro",
    tagline: "For teams that need to move faster",
    monthly: 12,
    yearly: 10,
    cta: "Start free trial",
    accent: "#6161ff",
    popular: true,
    features: [
      "Everything in Free",
      "Unlimited boards & automations",
      "Timeline, calendar & kanban views",
      "Private boards & guests",
      "Advanced dashboards (10 boards)",
    ],
  },
  {
    name: "Enterprise",
    tagline: "For organizations operating at scale",
    monthly: null,
    yearly: null,
    cta: "Talk to sales",
    accent: "#00c875",
    features: [
      "Everything in Pro",
      "Enterprise-grade security & SSO",
      "Multi-level permissions",
      "Tailored onboarding",
      "99.9% uptime SLA",
    ],
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section id="pricing" className="bg-surface py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow color="var(--color-status-done)">Pricing</Eyebrow>
          <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
            Start free. Upgrade when it pays for itself.
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            No credit card to begin. Per seat, billed how you prefer.
          </p>

          {/* toggle */}
          <div className="mt-7 inline-flex items-center gap-3 rounded-full border border-line bg-white p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                !yearly ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                yearly ? "bg-ink text-white" : "text-ink-soft"
              }`}
            >
              Yearly
              <span className="rounded-full bg-status-done px-2 py-0.5 text-[11px] font-bold text-white">
                -18%
              </span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((t) => {
            const price = yearly ? t.yearly : t.monthly;
            return (
              <div
                key={t.name}
                className={`relative flex flex-col rounded-3xl border bg-white p-8 transition-transform ${
                  t.popular
                    ? "border-brand shadow-pop lg:-translate-y-3"
                    : "border-line shadow-sm"
                }`}
              >
                {t.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </span>
                )}
                <h3
                  className="font-display text-lg font-bold"
                  style={{ color: t.accent }}
                >
                  {t.name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{t.tagline}</p>

                <div className="mt-6 flex items-end gap-1">
                  {price === null ? (
                    <span className="font-display text-4xl font-extrabold text-ink">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-5xl font-extrabold text-ink">
                        ${price}
                      </span>
                      <span className="mb-1.5 text-sm text-ink-soft">
                        /seat/mo
                      </span>
                    </>
                  )}
                </div>
                {price !== null && yearly && price > 0 && (
                  <p className="mt-1 text-xs text-ink-faint">
                    billed annually
                  </p>
                )}

                <Button
                  href="/product"
                  variant={t.popular ? "primary" : "outline"}
                  className="mt-6 w-full"
                >
                  {t.cta}
                </Button>

                <ul className="mt-7 space-y-3">
                  {t.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[15px] text-ink"
                    >
                      <span
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-white"
                        style={{ background: t.accent }}
                      >
                        <IconCheck width={12} height={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
