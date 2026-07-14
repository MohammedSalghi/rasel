import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { complaints } from "@/lib/mock-data";

const statusTone = {
  "مفتوحة": "info",
  "قيد المعالجة": "warning",
  "بانتظار العميل": "muted",
  "محلولة": "success",
  "مغلقة": "muted",
} as const;

export const Route = createFileRoute("/complaints")({
  head: () => ({ meta: [{ title: "الشكاوى والطلبات — مصرف النوران" }] }),
  component: () => (
    <AppShell title="الشكاوى والطلبات" subtitle="إدارة وتصعيد شكاوى العملاء">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { l: "مفتوحة", v: "17", c: "info" },
          { l: "قيد المعالجة", v: "24", c: "warning" },
          { l: "بانتظار العميل", v: "8", c: "muted" },
          { l: "محلولة اليوم", v: "12", c: "success" },
          { l: "تجاوزت SLA", v: "3", c: "destructive" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-lg p-4">
            <div className="text-[11px] text-muted-foreground">{s.l}</div>
            <div className={`text-2xl font-bold font-mono mt-1 text-${s.c === "muted" ? "foreground" : s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <PageToolbar onSearchPlaceholder="بحث برقم الشكوى أو اسم العميل..." primaryLabel="شكوى جديدة" />

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-3 px-4">المرجع</th>
              <th className="font-medium py-3 px-4">العميل</th>
              <th className="font-medium py-3 px-4">الموضوع</th>
              <th className="font-medium py-3 px-4">التصنيف</th>
              <th className="font-medium py-3 px-4">الأولوية</th>
              <th className="font-medium py-3 px-4">الحالة</th>
              <th className="font-medium py-3 px-4">الموظف</th>
              <th className="font-medium py-3 px-4">SLA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {complaints.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 cursor-pointer">
                <td className="py-3 px-4 text-xs font-mono font-semibold text-accent">{c.ref}</td>
                <td className="py-3 px-4 text-xs font-medium">{c.customer}</td>
                <td className="py-3 px-4 text-xs max-w-xs truncate">{c.subject}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{c.category}</td>
                <td className="py-3 px-4">
                  <StatusPill tone={c.priority === "high" ? "destructive" : c.priority === "medium" ? "warning" : "muted"}>
                    {c.priority === "high" ? "عالية" : c.priority === "medium" ? "متوسطة" : "منخفضة"}
                  </StatusPill>
                </td>
                <td className="py-3 px-4">
                  <StatusPill tone={statusTone[c.status]}>{c.status}</StatusPill>
                </td>
                <td className="py-3 px-4 text-xs">{c.agent}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{c.sla}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  ),
});