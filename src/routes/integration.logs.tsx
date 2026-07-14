import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { IntegrationTabs } from "@/components/app/integration-tabs";
import { Search, Download, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/integration/logs")({
  head: () => ({ meta: [{ title: "سجلات التكامل — مصرف النوران" }] }),
  component: LogsPage,
});

const logs = [
  { t: "10:44:12", m: "GET", ep: "/customers/1000123", s: 200, ms: 142, u: "أحمد ب.", trace: "trc_a91c" },
  { t: "10:44:03", m: "POST", ep: "/cards/reissue", s: 201, ms: 412, u: "منى ش.", trace: "trc_a91b" },
  { t: "10:43:58", m: "GET", ep: "/accounts?customerId=1000098", s: 200, ms: 218, u: "AI", trace: "trc_a91a" },
  { t: "10:43:41", m: "POST", ep: "/customers/1000456/contact", s: 500, ms: 30012, u: "بدر ف.", trace: "trc_a919" },
  { t: "10:43:22", m: "GET", ep: "/transactions?limit=10", s: 200, ms: 306, u: "AI", trace: "trc_a918" },
  { t: "10:43:04", m: "GET", ep: "/products?customerId=1000123", s: 200, ms: 184, u: "أحمد ب.", trace: "trc_a917" },
  { t: "10:42:51", m: "GET", ep: "/accounts?customerId=1000221", s: 401, ms: 88, u: "هدى ح.", trace: "trc_a916" },
];

function LogsPage() {
  return (
    <AppShell title="سجلات التكامل" subtitle="كل طلب واستجابة بين النظام والـ Core Banking قابل للتتبع">
      <IntegrationTabs />

      <div className="grid grid-cols-4 gap-3 mb-4">
        <Kpi l="طلبات (24س)" v="12,480" c="text-info" />
        <Kpi l="نجاح" v="99.71%" c="text-success" />
        <Kpi l="فشل" v="36" c="text-warning" />
        <Kpi l="متوسط الاستجابة" v="218ms" c="text-foreground" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="بحث بالـ Trace ID أو النقطة النهائية..." className="w-full h-10 pr-9 pl-3 rounded-md bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-accent/40" />
        </div>
        <select className="h-10 px-3 rounded-md bg-card border border-border text-xs"><option>كل الطرق</option><option>GET</option><option>POST</option><option>PUT</option><option>DELETE</option></select>
        <select className="h-10 px-3 rounded-md bg-card border border-border text-xs"><option>كل الحالات</option><option>2xx</option><option>4xx</option><option>5xx</option></select>
        <button className="h-10 px-3 rounded-md border border-border bg-card text-xs font-semibold inline-flex items-center gap-1.5"><Download className="h-3.5 w-3.5" /> تصدير</button>
        <button className="h-10 px-3 rounded-md border border-border bg-card text-xs font-semibold inline-flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> تحديث</button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-2 px-4">الوقت</th>
              <th className="font-medium py-2 px-4">الطريقة</th>
              <th className="font-medium py-2 px-4">النقطة النهائية</th>
              <th className="font-medium py-2 px-4">الحالة</th>
              <th className="font-medium py-2 px-4">المدة</th>
              <th className="font-medium py-2 px-4">المستخدم</th>
              <th className="font-medium py-2 px-4">Trace</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {logs.map((l) => (
              <tr key={l.trace} className="hover:bg-muted/30 cursor-pointer">
                <td className="py-2.5 px-4 text-[11px] font-mono">{l.t}</td>
                <td className="py-2.5 px-4">
                  <span className={"text-[10px] font-mono font-bold px-1.5 py-0.5 rounded " + (
                    l.m === "GET" ? "bg-info/10 text-info" : l.m === "POST" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  )}>{l.m}</span>
                </td>
                <td className="py-2.5 px-4 text-[11px] font-mono text-muted-foreground" dir="ltr">{l.ep}</td>
                <td className="py-2.5 px-4">
                  <StatusPill tone={l.s < 300 ? "success" : l.s < 500 ? "warning" : "destructive"}>{l.s}</StatusPill>
                </td>
                <td className="py-2.5 px-4 text-[11px] font-mono">{l.ms.toLocaleString()}ms</td>
                <td className="py-2.5 px-4 text-[11px]">{l.u}</td>
                <td className="py-2.5 px-4 text-[10px] font-mono text-primary" dir="ltr">{l.trace}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 border-t border-border bg-muted/40 flex items-center justify-between text-[11px] text-muted-foreground">
          <span>عرض 7 من 12,480 سجل</span>
          <Link to="/audit" className="text-primary hover:underline">عرض السجل الكامل في التدقيق ←</Link>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, c }: { l: string; v: string; c: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-[11px] text-muted-foreground">{l}</div>
      <div className={`text-2xl font-bold font-mono mt-1 ${c}`}>{v}</div>
    </div>
  );
}