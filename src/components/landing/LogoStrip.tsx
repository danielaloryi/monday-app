const brands = [
  "Heliograph",
  "Northwind",
  "Lumen Labs",
  "Vantage",
  "Cobalt",
  "Meridian",
  "Fernweh",
  "Quartz",
];

export function LogoStrip() {
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-line bg-white py-10">
      <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-ink-faint">
        Trusted by 225,000+ teams in 200 industries
      </p>
      <div className="relative mt-7 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-12 px-6">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-xl font-bold text-ink-faint/70 whitespace-nowrap"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
