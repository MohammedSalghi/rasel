import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { auditLogs } from "@/lib/mock-data";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "سجل العمليات — مصرف النوران" }] }),
  component: () => (
    <AppShell title="سجل العمليات" subtitle="تتبع كامل لجميع الأنشطة داخل النظام">
      <PageToolbar onSearchPlaceholder="بحث بالمستخدم أو نوع العملية..." />

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-3 px-4">التوقيت</th>
              <th className="font-medium py-3 px-4">المستخدم</th>
              <th className="font-medium py-3 px-4">العملية</th>
              <th className="font-medium py-3 px-4">الهدف</th>
              <th className="font-medium py-3 px-4">IP</th>
              <th className="font-medium py-3 px-4">المستوى</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {auditLogs.map((l) => (
              <tr key={l.id} className="hover:bg-muted/30">
                <td className="py-3 px-4 text-xs font-mono text-muted-foreground">{l.time}</td>
                <td className="py-3 px-4 text-xs font-medium">{l.user}</td>
                <td className="py-3 px-4 text-xs">{l.action}</td>
                <td className="py-3 px-4 text-xs font-mono text-accent">{l.target}</td>
                <td className="py-3 px-4 text-xs font-mono text-muted-foreground">{l.ip}</td>
                <td className="py-3 px-4">
                  <StatusPill tone={l.severity === "critical" ? "destructive" : l.severity === "warning" ? "warning" : "muted"}>
                    {l.severity === "critical" ? "حرج" : l.severity === "warning" ? "تحذير" : "معلومة"}
                  </StatusPill>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-border text-[11px] text-muted-foreground">
          <div>عرض {auditLogs.length} من إجمالي 1,842 عملية</div>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded border border-border">السابق</button>
            <button className="px-2 py-1 rounded bg-primary text-primary-foreground">1</button>
            <button className="px-2 py-1 rounded border border-border">2</button>
            <button className="px-2 py-1 rounded border border-border">3</button>
            <button className="px-2 py-1 rounded border border-border">التالي</button>
          </div>
        </div>
      </div>
    </AppShell>
  ),
});