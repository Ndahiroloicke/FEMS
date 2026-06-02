"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AlertTriangle,
  Bell,
  Flame,
  LayoutDashboard,
  ShieldAlert,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/extinguishers", label: "Extinguishers", icon: Flame },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/escalations", label: "Escalations", icon: ShieldAlert },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-white">
            <AlertTriangle className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">FEMS</p>
            <p className="text-xs text-muted">Fire Extinguisher Management</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted">Internal operations portal</p>
      </div>
    </aside>
  );
}
