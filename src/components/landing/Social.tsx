import { Eyebrow, Avatar } from "@/components/ui";
import { IconStar } from "@/lib/icons";

const stats = [
  { value: "225K+", label: "Teams onboarded", color: "#6161ff" },
  { value: "99.9%", label: "Uptime SLA", color: "#00c875" },
  { value: "200+", label: "Native integrations", color: "#fdab3d" },
  { value: "4.7/5", label: "Average G2 rating", color: "#ff5ac4" },
];

const quotes = [
  {
    body: "We replaced four tools with one board. Our launch cycle dropped from six weeks to nine days, and nobody asks 'where does this live?' anymore.",
    name: "Daniel Mawuli Aloryi",
    role: "Senior Software Engineer, XXX",
    id: "ad",
  },
  {
    body: "The automations alone gave each manager back about a day a week. It's the first tool the whole company actually adopted without a mandate.",
    name: "ABCDEF",
    role: "VP Product, YYY",
    id: "ko",
  },
  {
    body: "Leadership reads the dashboard, designers live in kanban, and finance gets the table. Same data, zero copy-paste. That's the magic.",
    name: "GHIJKL",
    role: "Program Lead, ZZZ",
    id: "na",
  },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
      <div className="grid grid-cols-2 gap-6 rounded-3xl border border-line bg-white p-8 sm:p-10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="mt-2 text-sm font-medium text-ink-soft">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow color="var(--color-status-working)">Loved by teams</Eyebrow>
        <h2 className="font-display mt-4 text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight tracking-tight text-ink">
          The workspace people don&apos;t fight against
        </h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="flex flex-col rounded-2xl border border-line bg-white p-7 transition-shadow hover:shadow-card"
          >
            <div className="flex gap-0.5 text-status-working">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar
                  key={i}
                  width={18}
                  height={18}
                  fill="currentColor"
                  stroke="none"
                />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
              “{q.body}”
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <Avatar id={q.id} size={40} ring={false} />
              <span>
                <span className="block text-sm font-bold text-ink">
                  {q.name}
                </span>
                <span className="block text-xs text-ink-soft">{q.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
