import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "TrialFind — Find Clinical Trials",
  description:
    "Search ClinicalTrials.gov in plain English. Find clinical trials for any condition, anywhere.",
};

const NAV_LINKS = [
  { href: "/results", label: "Browse" },
  { href: "#", label: "For Patients" },
  { href: "#", label: "For Researchers" },
  { href: "/about", label: "About" },
];

// Runs before hydration to prevent flash of wrong theme
const themeScript = `
(function(){
  try {
    var t = localStorage.getItem('trialfind-theme');
    var dark = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme:dark)').matches);
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Flash-prevention: runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
        className="min-h-screen"
      >
        <ThemeProvider>
          {/* Sticky frosted nav */}
          <nav className="glass-nav sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 h-[52px] flex items-center gap-8">
              {/* Logo */}
              <Link
                href="/"
                className="text-[15px] font-semibold tracking-tight shrink-0"
                style={{ color: "var(--accent)" }}
              >
                TrialFind
              </Link>

              {/* Primary nav */}
              <div className="hidden md:flex items-center gap-6 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-[13px] font-light transition-colors duration-150 hover:[color:var(--text)]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Right: saved + theme toggle */}
              <div className="ml-auto flex items-center gap-3">
                <Link
                  href="/saved"
                  className="text-[13px] font-light transition-colors duration-150"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Saved trials
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </nav>

          {children}

          {/* Footer */}
          <footer
            className="border-t mt-24"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: "var(--accent)" }}
                >
                  TrialFind
                </span>
                <p className="text-[12px] mt-1" style={{ color: "var(--text-tertiary)" }}>
                  Data sourced from{" "}
                  <a
                    href="https://clinicaltrials.gov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    ClinicalTrials.gov
                  </a>
                  . Always consult a healthcare provider before enrolling.
                </p>
              </div>
              <div className="flex items-center gap-5">
                {["Privacy", "Data sources", "Regulatory info", "Contact"].map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-[12px] font-light transition-colors duration-150"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
