"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ClipboardCheck,
  Flame,
  LayoutDashboard,
  type LucideIcon,
  ShieldCheck,
  UserCircle,
  Users,
  Wrench,
  FileBarChart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api, type Role } from "@/lib/api";
import { useAuth } from "@/components/providers/auth-provider";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
  showUnread?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/extinguishers", label: "Extinguishers", icon: Flame },
  { href: "/inspections", label: "Inspections", icon: ClipboardCheck },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/reports", label: "Reports", icon: FileBarChart },
  { href: "/notifications", label: "Notifications", icon: Bell, showUnread: true },
  { href: "/users", label: "Users", icon: Users, roles: ["ADMIN"] },
  { href: "/profile", label: "Profile", icon: UserCircle },
];

export const NOTIFICATIONS_UPDATED_EVENT = "fems:notifications-updated";

function useUnreadCount(enabled: boolean) {
  const [count, setCount] = useState(0);

  const refresh = useCallback(() => {
    if (!enabled) return;
    api.notifications
      .list({ isRead: false, limit: 1, page: 1 })
      .then((res) => setCount(res.meta.total))
      .catch(() => {
        /* ignore */
      });
  }, [enabled]);

  useEffect(() => {
    refresh();
    if (!enabled) return;
    window.addEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      window.removeEventListener(NOTIFICATIONS_UPDATED_EVENT, refresh);
      window.clearInterval(interval);
    };
  }, [enabled, refresh]);

  return count;
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { role, isAuthenticated } = useAuth();
  const unread = useUnreadCount(isAuthenticated);

  const visibleItems = navItems.filter(
    (item) => !item.roles || (role && item.roles.includes(role)),
  );

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-white">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">FEMS</p>
            <p className="text-xs text-muted">Fire Extinguisher Management</p>
          </div>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        {visibleItems.map(({ href, label, icon: Icon, showUnread }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{label}</span>
              {showUnread && unread > 0 && (
                <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-6 py-4">
        <p className="text-xs text-muted">Fire safety compliance portal</p>
      </div>
    </aside>
  );
}
