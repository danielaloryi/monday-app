import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { IconArrowRight } from "@/lib/icons";

export function FinalCTA() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-16 text-center sm:px-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 60% at 12% 0%, rgba(97,97,255,0.45), transparent 60%), radial-gradient(45% 55% at 90% 100%, rgba(255,90,196,0.4), transparent 60%), radial-gradient(40% 50% at 60% 30%, rgba(0,200,117,0.25), transparent 60%)",
          }}
        />
        <div className="relative">
          <h2 className="font-display mx-auto max-w-2xl text-[clamp(2rem,4.5vw,3.4rem)] font-extrabold leading-tight tracking-tight text-white">
            Your team&apos;s next project starts on a better board.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">
            Set up your first workspace in minutes. No credit card, no sales
            call, no migration headache.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/product" size="lg">
              Get started free
              <IconArrowRight width={18} height={18} />
            </Button>
            <Button
              href="/product"
              size="lg"
              className="border border-white/25 bg-white/5 text-white hover:bg-white/10"
              variant="ghost"
            >
              Open a live demo board
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

const footerCols = [
  {
    title: "Product",
    links: ["Boards", "Automations", "Dashboards", "Workdocs", "Integrations"],
  },
  {
    title: "Solutions",
    links: ["Marketing", "Product teams", "Operations", "Software dev", "HR"],
  },
  {
    title: "Resources",
    links: ["Templates", "Help center", "Community", "Webinars", "API docs"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Security", "Contact"],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="max-w-xs">
            <Logo size={26} />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              One platform to plan, run, and track all of your team&apos;s work
              — beautifully.
            </p>
          </div>
          {footerCols.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="/product"
                      className="text-sm text-ink-soft hover:text-brand transition-colors"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
          <p className="text-sm text-ink-faint">
            © {new Date().getFullYear()} monday.app — Not
            affiliated with monday.com. Just a sample for review purposes
          </p>
          <div className="flex gap-6 text-sm text-ink-faint">
            <Link href="/product" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/product" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/product" className="hover:text-ink">
              Status
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
