import { Eyebrow } from "@/components/ui";
import {
  IconBoard,
  IconAutomation,
  IconDashboard,
  IconDoc,
  IconInbox,
  IconGlobe,
} from "@/lib/icons";

const features = [
  {
    icon: IconBoard,
    color: "#6161ff",
    title: "Boards built for any workflow",
    body: "Start from a blank table or pick from 200+ templates. Columns for status, people, timelines, formulas, files — bend the board to fit how your team really works.",
    span: "lg:col-span-2",
  },
  {
    icon: IconAutomation,
    color: "#00c875",
    title: "Automations that do the chasing",
    body: "When status changes to Done, notify the owner and move the item. No code, just recipes.",
  },
  {
    icon: IconDashboard,
    color: "#fdab3d",
    title: "Dashboards in real time",
    body: "Pull live numbers from every board into charts, workloads, and burndown — no spreadsheets to babysit.",
  },
  {
    icon: IconDoc,
    color: "#ff5ac4",
    title: "Docs that become tasks",
    body: "Draft a plan, drop in a live board, and turn any line into a tracked item without leaving the page.",
    span: "lg:col-span-2",
  },
  {
    icon: IconInbox,
    color: "#a25ddc",
    title: "One shared inbox",
    body: "Mentions, updates, and approvals land in a single feed so nothing slips between the cracks.",
  },
  {
    icon: IconGlobe,
    color: "#009eb5",
    title: "Connects to your stack",
    body: "Two-way sync with Slack, GitHub, Drive, Salesforce, and 200+ tools your team already lives in.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Everything in one place</Eyebrow>
        <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
          The building blocks of a workspace your team won&apos;t abandon
        </h2>
        <p className="mt-4 text-lg text-ink-soft">
          Six core pieces that snap together. Run a product launch, a hiring
          pipeline, or a content calendar on the very same foundation.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <article
            key={f.title}
            className={`group relative overflow-hidden rounded-2xl border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-card ${
              f.span ?? ""
            }`}
          >
            <span
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20"
              style={{ background: f.color }}
            />
            <span
              className="grid h-12 w-12 place-items-center rounded-xl text-white"
              style={{ background: f.color }}
            >
              <f.icon width={24} height={24} />
            </span>
            <h3 className="font-display mt-5 text-xl font-bold text-ink">
              {f.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              {f.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
