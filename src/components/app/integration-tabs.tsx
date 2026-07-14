import { Link, useRouterState } from "@tanstack/react-router";
import { Server, ScrollText, KeyRound, RotateCw } from "lucide-react";

type Tab = { to: "/integration" | "/integration/logs" | "/integration/credentials" | "/integration/retries"; label: string; icon: typeof Server; exact?: boolean };
const tabs: Tab[] = [
  { to: "/integration", label: "نظرة عامة", icon: Server, exact: true },
  { to: "/integration/logs", label: "سجلات الطلبات", icon: ScrollText },
  { to: "/integration/credentials", label: "الشهادات والمفاتيح", icon: KeyRound },
  { to: "/integration/retries", label: "قائمة إعادة الإرسال", icon: RotateCw },
];

export function IntegrationTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="mb-4 bg-card border border-border rounded-lg p-1 flex items-center gap-1 overflow-x-auto">
      {tabs.map((t) => {
        const active = t.exact ? pathname === t.to : pathname === t.to || pathname.startsWith(t.to + "/");
        const Icon = t.icon;
        return (
          <Link
            key={t.to}
            to={t.to}
            className={
              "inline-flex items-center gap-2 px-3.5 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors " +
              (active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground")
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {t.label}
          </Link>
        );
      })}
      <div className="ms-auto flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 text-success text-[11px] font-semibold ring-1 ring-success/20">
        <span className="size-1.5 rounded-full bg-success animate-pulse" />
        Adapter — Core Banking متصل
      </div>
    </div>
  );
}