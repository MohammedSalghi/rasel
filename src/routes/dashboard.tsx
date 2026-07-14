import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { DiscoveryTour } from "@/components/app/discovery-tour";
import { conversations, notifications, auditLogs, channelLabels } from "@/lib/mock-data";
import {
  MessagesSquare,
  Clock,
  Users2,
  Timer,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bot,
  AlertTriangle,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "لوحة التحكم — مصرف النوران" }] }),
  component: DashboardPage,
});

const kpis = [
  { label: "المحادثات النشطة", value: "48", delta: "+12%", up: true, icon: MessagesSquare, tone: "text-info bg-info/10 ring-info/20" },
  { label: "قيد الانتظار", value: "12", delta: "-8%", up: true, icon: Clock, tone: "text-warning bg-warning/10 ring-warning/20" },
  { label: "الموظفون المتاحون", value: "8 / 14", delta: "57%", up: true, icon: Users2, tone: "text-success bg-success/10 ring-success/20" },
  { label: "متوسط زمن الاستجابة", value: "02:45", delta: "-14%", up: true, icon: Timer, tone: "text-accent bg-accent/10 ring-accent/20" },
];

const sparklineDays = [12, 18, 14, 22, 19, 26, 24, 30, 27, 34, 31, 38, 42, 48];

function DashboardPage() {
  const max = Math.max(...sparklineDays);
  const recent = conversations.slice(0, 5);

  return (
    <AppShell title="لوحة التحكم" subtitle="نظرة شاملة على أداء اليوم">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {kpis.map((k) => {
          const Icon = k.icon;
          const Trend = k.up ? TrendingUp : TrendingDown;
          return (
            <div key={k.label} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">{k.label}</div>
                  <div className="text-3xl font-bold mt-2 font-mono tracking-tight">{k.value}</div>
                </div>
                <div className={`size-9 rounded-md grid place-items-center ring-1 ${k.tone}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className={`inline-flex items-center gap-1 font-semibold ${k.up ? "text-success" : "text-destructive"}`}>
                  <Trend className="h-3 w-3" /> {k.delta}
                </span>
                <span className="text-muted-foreground">مقارنة بالأمس</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <div className="xl:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm font-semibold">حجم المحادثات — آخر 14 يوم</div>
              <div className="text-xs text-muted-foreground mt-0.5">إجمالي 428 محادثة، بمعدل نمو +18%</div>
            </div>
            <div className="flex gap-1 text-[11px] bg-muted rounded-md p-1">
              {["يوم", "أسبوع", "شهر"].map((t, i) => (
                <button
                  key={t}
                  className={
                    "px-3 py-1 rounded " + (i === 1 ? "bg-card font-semibold ring-1 ring-border" : "text-muted-foreground")
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="h-56 flex items-stretch gap-2">
            {sparklineDays.map((v, i) => (
              <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-primary to-primary/50 hover:from-accent hover:to-accent/60 transition-colors"
                  style={{ height: `${(v / max) * 100}%`, minHeight: 6 }}
                />
                <div className="text-[9px] text-muted-foreground font-mono">{i + 1}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            {[
              { l: "معدل الحل من أول تواصل", v: "78%", c: "text-success" },
              { l: "معدل تحويل الذكاء الاصطناعي", v: "22%", c: "text-info" },
              { l: "متوسط رضا العملاء", v: "4.6 / 5", c: "text-accent" },
              { l: "شكاوى مفتوحة", v: "17", c: "text-destructive" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-[11px] text-muted-foreground">{s.l}</div>
                <div className={`text-xl font-bold mt-1 ${s.c}`}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-semibold">التنبيهات الحرجة</div>
            <Link to="/notifications" className="text-[11px] text-accent hover:underline">عرض الكل</Link>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => {
              const iconTone = n.kind === "alert" ? "text-destructive bg-destructive/10" : n.kind === "reminder" ? "text-warning bg-warning/10" : n.kind === "admin" ? "text-info bg-info/10" : "text-accent bg-accent/10";
              return (
                <div key={n.id} className="flex gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors">
                  <div className={`size-8 rounded-md grid place-items-center shrink-0 ${iconTone}`}>
                    {n.kind === "alert" ? <AlertTriangle className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">{n.title}</div>
                    <div className="text-[11px] text-muted-foreground truncate mt-0.5">{n.body}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between">
            <div className="text-sm font-semibold">أحدث المحادثات</div>
            <Link to="/inbox" className="text-[11px] text-accent hover:underline inline-flex items-center gap-1">
              فتح الصندوق الموحد <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-right text-[11px] text-muted-foreground">
                <th className="font-medium py-2 px-4">العميل</th>
                <th className="font-medium py-2 px-4">القناة</th>
                <th className="font-medium py-2 px-4">الحالة</th>
                <th className="font-medium py-2 px-4">الموظف</th>
                <th className="font-medium py-2 px-4">الوقت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recent.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-full bg-primary/10 text-primary text-[10px] font-bold grid place-items-center">
                        {c.initials}
                      </div>
                      <div>
                        <div className="text-xs font-medium">{c.customer}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{c.ref}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">{channelLabels[c.channel]}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="py-3 px-4 text-xs">{c.agent}</td>
                  <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{c.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold">أداء الذكاء الاصطناعي</div>
              <div className="size-8 rounded-md bg-info/10 text-info grid place-items-center">
                <Bot className="h-4 w-4" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono">94.2%</div>
            <div className="text-[11px] text-muted-foreground mt-1">دقة الاقتراحات المقبولة</div>
            <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-gradient-to-l from-accent to-info" style={{ width: "94%" }} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="bg-muted/50 rounded-md p-2">
                <div className="text-sm font-bold">1,284</div>
                <div className="text-[10px] text-muted-foreground">اقتراح</div>
              </div>
              <div className="bg-muted/50 rounded-md p-2">
                <div className="text-sm font-bold">17%</div>
                <div className="text-[10px] text-muted-foreground">محوّل يدوياً</div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-4">آخر الأنشطة</div>
            <ol className="relative border-r border-border pr-4 space-y-4">
              {auditLogs.slice(0, 4).map((l) => (
                <li key={l.id} className="relative">
                  <span className="absolute -right-[21px] top-1 size-2.5 rounded-full bg-accent ring-2 ring-card" />
                  <div className="text-xs font-medium">{l.action}</div>
                  <div className="text-[10px] text-muted-foreground">
                    {l.user} • {l.time}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <DiscoveryTour />
    </AppShell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success/10 text-success ring-success/20",
    waiting: "bg-warning/15 text-warning ring-warning/25",
    resolved: "bg-muted text-muted-foreground ring-border",
    ai: "bg-info/10 text-info ring-info/20",
  };
  const label: Record<string, string> = { active: "نشطة", waiting: "انتظار", resolved: "محلولة", ai: "ذكاء اصطناعي" };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ring-1 ${map[status]}`}>
      {label[status]}
    </span>
  );
}