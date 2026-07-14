import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { HardDrive, Download, Upload, Clock, Database, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/backup")({
  head: () => ({ meta: [{ title: "النسخ الاحتياطي — مصرف النوران" }] }),
  component: BackupPage,
});

const backups = [
  { id: "BK-2026-07-05-02", type: "تلقائي", date: "05/07/2026 02:00", size: "12.4 GB", status: "success" as const, retention: "90 يوم" },
  { id: "BK-2026-07-04-02", type: "تلقائي", date: "04/07/2026 02:00", size: "12.3 GB", status: "success" as const, retention: "90 يوم" },
  { id: "BK-2026-07-03-14", type: "يدوي", date: "03/07/2026 14:22", size: "12.3 GB", status: "success" as const, retention: "دائم" },
  { id: "BK-2026-07-03-02", type: "تلقائي", date: "03/07/2026 02:00", size: "12.2 GB", status: "warning" as const, retention: "90 يوم" },
  { id: "BK-2026-07-02-02", type: "تلقائي", date: "02/07/2026 02:00", size: "12.2 GB", status: "success" as const, retention: "90 يوم" },
];

function BackupPage() {
  return (
    <AppShell
      title="النسخ الاحتياطي والاسترجاع"
      subtitle="نسخ آلية يومية مشفّرة مع إمكانية الاسترجاع النقطي"
      actions={
        <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
          <Database className="h-3.5 w-3.5" /> إنشاء نسخة الآن
        </button>
      }
    >
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { l: "آخر نسخة ناجحة", v: "قبل 8 ساعات", i: Clock, c: "text-success" },
          { l: "إجمالي النسخ المحفوظة", v: "142", i: HardDrive, c: "text-info" },
          { l: "المساحة المستخدمة", v: "1.7 TB", i: Database, c: "text-foreground" },
          { l: "التشفير", v: "AES-256", i: ShieldCheck, c: "text-success" },
        ].map((k) => {
          const Icon = k.i;
          return (
            <div key={k.l} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-[11px] text-muted-foreground">{k.l}</div>
                <Icon className={`h-4 w-4 ${k.c}`} />
              </div>
              <div className={`text-xl font-bold font-mono mt-2 ${k.c}`}>{k.v}</div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-border text-sm font-semibold">سجل النسخ الاحتياطية</div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
              <tr>
                <th className="font-medium py-2 px-4">المرجع</th>
                <th className="font-medium py-2 px-4">النوع</th>
                <th className="font-medium py-2 px-4">التاريخ</th>
                <th className="font-medium py-2 px-4">الحجم</th>
                <th className="font-medium py-2 px-4">الاحتفاظ</th>
                <th className="font-medium py-2 px-4">الحالة</th>
                <th className="font-medium py-2 px-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {backups.map((b) => (
                <tr key={b.id} className="hover:bg-muted/30">
                  <td className="py-3 px-4 text-xs font-mono text-primary">{b.id}</td>
                  <td className="py-3 px-4 text-xs">{b.type}</td>
                  <td className="py-3 px-4 text-xs font-mono">{b.date}</td>
                  <td className="py-3 px-4 text-xs font-mono">{b.size}</td>
                  <td className="py-3 px-4 text-[11px] text-muted-foreground">{b.retention}</td>
                  <td className="py-3 px-4">
                    <StatusPill tone={b.status === "success" ? "success" : "warning"}>
                      {b.status === "success" ? "مكتملة" : "تحقّق مطلوب"}
                    </StatusPill>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="h-7 w-7 grid place-items-center rounded border border-border hover:bg-muted" title="تنزيل">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                      <button className="h-7 w-7 grid place-items-center rounded border border-border hover:bg-muted" title="استرجاع">
                        <Upload className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">جدولة النسخ</div>
            <div className="space-y-2 text-xs">
              <Row k="النسخ اليومي" v="02:00 صباحاً" />
              <Row k="النسخ الأسبوعي" v="الأحد — 03:00" />
              <Row k="النسخ الشهري" v="اليوم الأول — 04:00" />
              <Row k="الاحتفاظ الافتراضي" v="90 يوماً" />
            </div>
            <button className="w-full mt-4 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">
              تعديل الجدولة
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-2">مواقع التخزين</div>
            <ul className="space-y-2 text-[11px]">
              <li className="flex items-center justify-between p-2 rounded bg-muted/40">
                <span>مركز البيانات الرئيسي</span>
                <StatusPill tone="success">نشط</StatusPill>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-muted/40">
                <span>مركز البيانات الاحتياطي (DR)</span>
                <StatusPill tone="success">مزامنة حية</StatusPill>
              </li>
              <li className="flex items-center justify-between p-2 rounded bg-muted/40">
                <span>الأرشيف البارد</span>
                <StatusPill tone="info">شهرياً</StatusPill>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/40">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-mono font-semibold">{v}</span>
    </div>
  );
}