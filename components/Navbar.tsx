"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/student", label: "Students" },
  { href: "/lesson", label: "Lessons" },
  { href: "/summarize", label: "Summarize" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    router.push("/login");
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          <span className="text-emerald-400">Mentorship Platform</span>{" "}
          
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  "rounded-md px-3 py-1.5 transition " +
                  (active
                    ? "bg-slate-800 text-slate-50"
                    : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50")
                }
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-md border border-light-green-700 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-slate-800/80 hover:text-slate-50 transition"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

