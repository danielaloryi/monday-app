export function Logo({
  size = 28,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size * 0.62}
        viewBox="0 0 64 40"
        fill="none"
        aria-hidden
      >
        <ellipse cx="11" cy="20" rx="11" ry="11" fill="#ff5ac4" />
        <ellipse cx="32" cy="20" rx="11" ry="11" fill="#fdab3d" />
        <ellipse cx="53" cy="20" rx="11" ry="11" fill="#00c875" />
      </svg>
      {showWordmark && (
        <span
          className="font-display font-extrabold tracking-tight text-ink leading-none"
          style={{ fontSize: size * 0.74 }}
        >
          monday
          <span className="text-ink-soft font-semibold">.work</span>
        </span>
      )}
    </span>
  );
}
