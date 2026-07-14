import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { notifications } from "@/lib/mock-data";
import { AlertTriangle, MessageSquare, Clock, Info } from "lucide-react";

const iconMap = {
  alert: { i: AlertTriangle, c: "text-destructive bg-destructive/10 ring-destructive/20" },
  message: { i: MessageSquare, c: "text-info bg-info/10 ring-info/20" },
  reminder: { i: Clock, c: "text-warning bg-warning/10 ring-warning/25" },
  admin: { i: Info, c: "text-accent bg-accent/10 ring-accent/25" },
} as const;

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "الإشعارات — مصرف النوران" }] }),
  component: () => (
    <AppShell title="الإشعارات" subtitle={`${notifications.filter((n) => !n.read).length} غير مقروءة`}>
      <div className="max-w-3xl">
        <div className="flex gap-2 mb-4 border-b border-border">
          {["الكل", "غير مقروءة", "تنبيهات", "رسائل", "إدارية"].map((t, i) => (
            <button
              key={t}
              className={
                "px-4 py-2 text-xs font-semibold -mb-px border-b-2 " +
                (i === 0 ? "border-accent text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")
              }
            >
              {t}
            </button>
          ))}
          <button className="mr-auto text-xs text-accent hover:underline">وضع علامة كمقروءة للكل</button>
        </div>

        <div className="space-y-2">
          {notifications.map((n) => {
            const { i: Icon, c } = iconMap[n.kind];
            return (
              <div
                key={n.id}
                className={
                  "flex gap-3 p-4 rounded-lg border transition-colors cursor-pointer " +
                  (n.read ? "bg-card border-border" : "bg-accent/5 border-accent/20")
                }
              >
                <div className={`size-10 rounded-md grid place-items-center shrink-0 ring-1 ${c}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-sm font-semibold">{n.title}</div>
                    <div className="text-[10px] text-muted-foreground font-mono shrink-0">{n.time}</div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{n.body}</div>
                </div>
                {!n.read && <div className="size-2 rounded-full bg-accent mt-2 shrink-0" />}
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  ),
});