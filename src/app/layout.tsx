import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const figtree = localFont({
  variable: "--font-figtree",
  display: "swap",
  src: [
    { path: "./fonts/figtree-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/figtree-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/figtree-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/figtree-700.woff2", weight: "700", style: "normal" },
  ],
});

const poppins = localFont({
  variable: "--font-poppins",
  display: "swap",
  src: [
    { path: "./fonts/poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/poppins-800.woff2", weight: "800", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "monday work — One platform, better teamwork",
  description:
    "Plan, run, and track any workflow on a single visual platform. Boards, automations, dashboards, and docs your whole team will actually use.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${poppins.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-figtree)" }}
      >
        {children}
      </body>
    </html>
  );
}
