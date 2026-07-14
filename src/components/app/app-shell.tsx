import { Link, useRouterState } from "@tanstack/react-router";
import { brand } from "@/lib/brand";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  MessagesSquare,
  Users,
  AlertOctagon,
  BookOpen,
  BarChart3,
  Bell,
  UserCog,
  Bot,
  ScrollText,
  Settings,
  Search,
  LogOut,
  ChevronDown,
  Radio,
  Server,
  ShieldCheck,
  HardDrive,
  Smile,
  GitBranch,
} from "lucide-react";
import { Logo } from "./logo";

const navGroups = [
  {
    label: "الرئيسية",
    items: [
      { to: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
      { to: "/inbox", label: "المحادثات", icon: MessagesSquare, badge: 12 },
      { to: "/customers", label: "العملاء", icon: Users },
      { to: "/complaints", label: "الشكاوى والطلبات", icon: AlertOctagon, badge: 5 },
    ],
  },
  {
    label: "المعرفة والتحليل",
    items: [
      { to: "/knowledge", label: "قاعدة المعرفة", icon: BookOpen },
      { to: "/reports", label: "التقارير", icon: BarChart3 },
      { to: "/survey", label: "استبيانات الرضا", icon: Smile },
      { to: "/notifications", label: "الإشعارات", icon: Bell, badge: 3 },
    ],
  },
  {
    label: "التكامل والقنوات",
    items: [
      { to: "/channels", label: "قنوات التواصل", icon: Radio },
      { to: "/integration", label: "التكامل المصرفي", icon: Server },
      { to: "/workflows", label: "سير العمل", icon: GitBranch },
    ],
  },
  {
    label: "الإدارة",
    items: [
      { to: "/users", label: "إدارة المستخدمين", icon: UserCog },
      { to: "/permissions", label: "الأدوار والصلاحيات", icon: ShieldCheck },
      { to: "/ai", label: "الذكاء الاصطناعي", icon: Bot },
      { to: "/audit", label: "سجل العمليات", icon: ScrollText },
      { to: "/backup", label: "النسخ الاحتياطي", icon: HardDrive },
      { to: "/settings", label: "الإعدادات", icon: Settings },
    ],
  },
] as const;

export function AppShell({
  title,
  subtitle,
  actions,
  children,
  contentClassName,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex w-full bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col sticky top-0 h-screen border-l border-sidebar-border">
        <div className="px-5 py-5 border-b border-sidebar-border">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="px-3 mb-2 text-[10px] uppercase tracking-widest text-sidebar-foreground/40 font-semibold">
                {group.label}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.to || (item.to !== "/dashboard" && pathname.startsWith(item.to));
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={
                        "flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors " +
                        (active
                          ? "bg-primary/10 text-primary ring-1 ring-primary/15"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground")
                      }
                    >
                      <Icon className={"h-4 w-4 shrink-0 " + (active ? "text-primary" : "")} />
                      <span className="flex-1 truncate">{item.label}</span>
                      {"badge" in item && item.badge ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary text-primary-foreground">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer">
            <div className="size-9 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-bold ring-1 ring-primary/20">
              {brand.demoUser.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-foreground truncate">{brand.demoUser.fullName}</div>
              <div className="text-[10px] text-muted-foreground truncate">{brand.demoUser.role}</div>
            </div>
            <Link to="/login" className="text-muted-foreground hover:text-foreground" title="تسجيل الخروج">
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-0.5">
              <span>{brand.name}</span>
              <span>/</span>
              <span className="text-foreground font-medium">{title}</span>
            </div>
            <h1 className="text-lg font-bold text-foreground truncate">
              {title}
              {subtitle ? <span className="mr-2 text-sm font-normal text-muted-foreground">— {subtitle}</span> : null}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-muted/70 rounded-md px-3 py-1.5 w-72 ring-1 ring-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="بحث في النظام..."
              className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
            />
            <kbd className="text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">
              Ctrl K
            </kbd>
          </div>
          <div className="flex items-center gap-3">
            {actions}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-success/10 text-success text-[11px] font-medium ring-1 ring-success/20">
              <span className="size-1.5 rounded-full bg-success animate-pulse" />
              النظام متصل
            </div>
            <Link to="/notifications" className="relative p-2 rounded-md hover:bg-muted transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1 left-1 size-1.5 bg-destructive rounded-full" />
            </Link>
            <button className="flex items-center gap-2 pr-2 pl-3 py-1 rounded-md hover:bg-muted">
              <div className="size-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-[10px] font-bold">
                {brand.demoUser.initials}
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        </header>
        <main className={"flex-1 min-w-0 " + (contentClassName ?? "p-6")}>{children}</main>
      </div>
    </div>
  );
}