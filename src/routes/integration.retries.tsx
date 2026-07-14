import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { IntegrationTabs } from "@/components/app/integration-tabs";
import { RotateCw, PlayCircle, XCircle, Info } from "lucide-react";

export const Route = createFileRoute("/integration/retries")({
  head: () => ({ meta: [{ title: "قائمة إعادة الإرسال — التكامل" }] }),
  component: RetriesPage,
});

const rows = [
  { r: "TXN-77812", op: "تحديث رقم الهاتف", ep: "POST /customers/1000456/contact", user: "بدر الورفلي", when: "10:42", err: "Timeout — 30s", attempts: 3, next: "بعد 5 د" },
  { r: "TXN-77809", op: "استعلام رصيد", ep: "GET /accounts?customerId=1000221", user: "منى المسلاتي", when: "10:31", err: "5xx — Core Banking", attempts: 2, next: "بعد 12 د" },
  { r: "TXN-77802", op: "طلب كشف حساب", ep: "POST /statements/generate", user: "هدى المصراتي", when: "10:14", err: "401 — انتهاء الجلسة", attempts: 1, next: "متوقفة" },
  { r: "TXN-77791", op: "تفعيل بطاقة جديدة", ep: "POST /cards/activate", user: "AI", when: "09:52", err: "409 — Duplicate", attempts: 3, next: "تحويل يدوي" },
];

function RetriesPage() {
  return (
    <AppShell title="قائمة إعادة الإرسال" subtitle="متابعة ومعالجة العمليات الفاشلة قبل تصعيدها">
      <IntegrationTabs />

      <div className="grid grid-cols-4 gap-3 mb-4">
        <Kpi l="بانتظار إعادة" v="12" c="text-warning" />
        <Kpi l="نجحت تلقائياً (24س)" v="184" c="text-success" />
        <Kpi l="فشل نهائي" v="6" c="text-destructive" />
        <Kpi l="متوسط زمن الحل" v="4د 22ث" c="text-foreground" />
      </div>

      <div className="bg-info/5 border border-info/20 rounded-lg p-3 mb-4 flex items-start gap-2">
        <Info className="h-4 w-4 text-info mt-0.5" />
        <div className="text-[11px] text-muted-foreground leading-relaxed">
          يتم تنفيذ إعادة المحاولات بشكل تلقائي وفق سياسة Exponential Backoff (5د → 15د → 45د). بعد 3 محاولات فاشلة تُصعَّد العملية إلى مشرف التكامل مع إشعار فوري.
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div className="text-sm font-semibold">العمليات الفاشلة</div>
          <div className="flex items-center gap-2">
            <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold hover:bg-muted">تصدير CSV</button>
            <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold inline-flex items-center gap-1.5"><RotateCw className="h-3.5 w-3.5" /> إعادة إرسال الكل</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-2 px-4">المرجع</th>
              <th className="font-medium py-2 px-4">العملية</th>
              <th className="font-medium py-2 px-4">النقطة</th>
              <th className="font-medium py-2 px-4">المستخدم</th>
              <th className="font-medium py-2 px-4">الخطأ</th>
              <th className="font-medium py-2 px-4">المحاولات</th>
              <th className="font-medium py-2 px-4">المحاولة التالية</th>
              <th className="font-medium py-2 px-4">إجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r) => (
              <tr key={r.r} className="hover:bg-muted/30">
                <td className="py-3 px-4 text-xs font-mono text-primary">{r.r}</td>
                <td className="py-3 px-4 text-xs">{r.op}</td>
                <td className="py-3 px-4 text-[11px] font-mono text-muted-foreground" dir="ltr">{r.ep}</td>
                <td className="py-3 px-4 text-[11px]">{r.user}</td>
                <td className="py-3 px-4"><StatusPill tone="destructive">{r.err}</StatusPill></td>
                <td className="py-3 px-4 text-[11px] font-mono">{r.attempts}/3</td>
                <td className="py-3 px-4 text-[11px] text-muted-foreground">{r.next}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button title="إعادة الآن" className="size-7 grid place-items-center rounded-md text-success hover:bg-success/10"><PlayCircle className="h-3.5 w-3.5" /></button>
                    <button title="إلغاء" className="size-7 grid place-items-center rounded-md text-destructive hover:bg-destructive/10"><XCircle className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, c }: { l: string; v: string; c: string }) {
  return <div className="bg-card border border-border rounded-lg p-4"><div className="text-[11px] text-muted-foreground">{l}</div><div className={`text-2xl font-bold font-mono mt-1 ${c}`}>{v}</div></div>;
}