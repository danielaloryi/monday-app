"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { people, statusColor, priorityColor } from "@/lib/data";
import type { Status, Priority } from "@/lib/data";

/* ---------------- Button ---------------- */
type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  type = "button",
  ...rest
}: ButtonProps) {
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-5 text-[15px]",
    lg: "h-14 px-7 text-base",
  };
  const variants = {
    primary:
      "bg-brand text-white hover:bg-brand-dark shadow-[0_6px_18px_-6px_rgba(97,97,255,0.7)]",
    dark: "bg-ink text-white hover:bg-black",
    outline:
      "bg-white text-ink border border-line hover:border-ink-faint hover:bg-surface",
    ghost: "bg-transparent text-ink hover:bg-surface",
  };
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-150 active:scale-[0.97] ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls} {...rest}>
      {children}
    </button>
  );
}

/* ---------------- Avatar ---------------- */
export function Avatar({
  id,
  size = 28,
  ring = true,
}: {
  id: string;
  size?: number;
  ring?: boolean;
}) {
  const p = people.find((x) => x.id === id);
  if (!p) return null;
  const initials = p.name
    .split(" ")
    .map((s) => s[0])
    .join("");
  return (
    <span
      title={p.name}
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white select-none ${
        ring ? "ring-2 ring-white" : ""
      }`}
      style={{
        width: size,
        height: size,
        background: p.color,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({
  ids,
  size = 28,
}: {
  ids: string[];
  size?: number;
}) {
  return (
    <span className="inline-flex items-center">
      {ids.map((id, i) => (
        <span key={id} style={{ marginLeft: i === 0 ? 0 : -size * 0.32 }}>
          <Avatar id={id} size={size} />
        </span>
      ))}
    </span>
  );
}

/* ---------------- Status / Priority pills ---------------- */
export function StatusPill({
  status,
  full = true,
}: {
  status: Status;
  full?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center font-semibold text-white text-[13px] leading-none ${
        full ? "w-full h-8 rounded-md" : "px-3 py-1.5 rounded-md"
      }`}
      style={{ background: statusColor[status] }}
    >
      {status}
    </span>
  );
}

export function PriorityPill({ priority }: { priority: Priority }) {
  return (
    <span
      className="inline-flex items-center justify-center w-full h-8 rounded-md font-semibold text-white text-[13px] leading-none"
      style={{ background: priorityColor[priority] }}
    >
      {priority}
    </span>
  );
}

/* ---------------- Section eyebrow ---------------- */
export function Eyebrow({
  children,
  color = "var(--color-brand)",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]"
      style={{ color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: color }}
      />
      {children}
    </span>
  );
}
