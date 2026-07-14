import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { IntegrationTabs } from "@/components/app/integration-tabs";
import {
  Server,
  Activity,
  RefreshCw,
  AlertOctagon,
  Gauge,
  Database,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/integration")({
  head: () => ({ meta: [{ title: "التكامل المصرفي — مصرف النوران" }] }),
  component: IntegrationPage,
});

const services = [
  { s: "بيانات العميل (KYC)", ep: "/customers/{id}", ok: true, avg: "142ms", calls: "12,480" },
  { s: "الحسابات والأرصدة", ep: "/accounts", ok: true, avg: "218ms", calls: "9,102" },
  { s: "العمليات الأخيرة", ep: "/transactions", ok: true, avg: "306ms", calls: "6,745" },
  { s: "المنتجات المرتبطة", ep: "/products", ok: true, avg: "184ms", calls: "3,821" },
  { s: "تحديث بيانات الاتصال", ep: "/customers/{id}/contact", ok: false, avg: "—", calls: "48 فشل" },
  { s: "طلب إعادة إصدار البطاقة", ep: "/cards/reissue", ok: true, avg: "412ms", calls: "162" },
];

const failedOps = [
  { r: "TXN-77812", op: "تحديث رقم الهاتف", user: "بدر الورفلي", time: "10:42", err: "Timeout — 30s" },
  { r: "TXN-77809", op: "استعلام رصيد", user: "منى المسلاتي", time: "10:31", err: "5xx — Core Banking" },
  { r: "TXN-77802", op: "طلب كشف حساب", user: "هدى المصراتي", time: "10:14", err: "401 — انتهاء الجلسة" },
];

export function IntegrationPage() {
  return (
    <AppShell title="التكامل مع النظام المصرفي" subtitle="المراقبة، الخدمات، السجلات، وإعادة تنفيذ العمليات الفاشلة">
      <IntegrationTabs />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-11 rounded-md bg-success/10 text-success grid place-items-center">
                  <Server className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">حالة الاتصال بالنظام المصرفي</div>
                  <div className="text-[11px] text-muted-foreground">
                    النقطة النهائية: <span className="font-mono">core-banking-gw.alnouran-bank.local</span>
                  </div>
                </div>
              </div>
              <StatusPill tone="success">متصل — Uptime 99.94%</StatusPill>
            </div>
            <div className="grid grid-cols-4 gap-3 mt-5">
              <Kpi l="زمن الاستجابة" v="218ms" i={Gauge} c="text-info" />
              <Kpi l="طلبات ناجحة" v="99.71%" i={Activity} c="text-success" />
              <Kpi l="طلبات فاشلة" v="0.29%" i={AlertOctagon} c="text-warning" />
              <Kpi l="آخر مزامنة" v="قبل 14ث" i={RefreshCw} c="text-foreground" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">الخدمات المتاحة</div>
              <div className="text-[11px] text-muted-foreground">حسب Contract مصرف النوران</div>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
                <tr>
                  <th className="font-medium py-2 px-4">الخدمة</th>
                  <th className="font-medium py-2 px-4">النقطة</th>
                  <th className="font-medium py-2 px-4">متوسط الاستجابة</th>
                  <th className="font-medium py-2 px-4">الاستدعاءات (24س)</th>
                  <th className="font-medium py-2 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {services.map((r) => (
                  <tr key={r.s} className="hover:bg-muted/30">
                    <td className="py-3 px-4 text-xs font-semibold">{r.s}</td>
                    <td className="py-3 px-4 text-[11px] font-mono text-muted-foreground" dir="ltr">
                      {r.ep}
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">{r.avg}</td>
                    <td className="py-3 px-4 text-xs font-mono">{r.calls}</td>
                    <td className="py-3 px-4">
                      <StatusPill tone={r.ok ? "success" : "destructive"}>
                        {r.ok ? "فعّالة" : "متعطلة"}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">العمليات الفاشلة</div>
                <div className="text-[11px] text-muted-foreground">قابلة لإعادة الإرسال يدوياً أو تلقائياً</div>
              </div>
              <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold inline-flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5" /> إعادة إرسال الكل
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
                <tr>
                  <th className="font-medium py-2 px-4">المرجع</th>
                  <th className="font-medium py-2 px-4">العملية</th>
                  <th className="font-medium py-2 px-4">العميل</th>
                  <th className="font-medium py-2 px-4">الوقت</th>
                  <th className="font-medium py-2 px-4">الخطأ</th>
                  <th className="font-medium py-2 px-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {failedOps.map((f) => (
                  <tr key={f.r} className="hover:bg-muted/30">
                    <td className="py-3 px-4 text-xs font-mono text-primary">{f.r}</td>
                    <td className="py-3 px-4 text-xs">{f.op}</td>
                    <td className="py-3 px-4 text-xs text-muted-foreground">{f.user}</td>
                    <td className="py-3 px-4 text-xs font-mono">{f.time}</td>
                    <td className="py-3 px-4 text-[11px] text-destructive">{f.err}</td>
                    <td className="py-3 px-4">
                      <button className="h-7 px-2 rounded border border-border text-[10px] font-semibold hover:bg-muted">
                        إعادة
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" /> إعدادات الاتصال
            </div>
            <div className="space-y-3 text-xs">
              <Field label="نوع الاتصال" value="REST / OAuth 2.0" />
              <Field label="البيئة" value="الإنتاج" />
              <Field label="المهلة القصوى" value="30 ثانية" />
              <Field label="عدد المحاولات" value="3" />
              <Field label="التشفير" value="mTLS + AES-256" />
            </div>
            <button className="w-full mt-4 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">
              تعديل الإعدادات
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Database className="h-4 w-4 text-info" /> البيانات المتاحة للعميل
            </div>
            <ul className="space-y-1.5 text-[11px] text-muted-foreground">
              {[
                "البيانات الأساسية (KYC)",
                "قائمة الحسابات وأرصدتها",
                "نوع العميل والتصنيف",
                "حالة الحساب",
                "المنتجات المرتبطة",
                "الخدمات المتاحة",
                "آخر العمليات المصرفية",
              ].map((x) => (
                <li key={x} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-primary" /> {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-2">جاهزية التكامل</div>
            <div className="text-[11px] text-muted-foreground mb-3">
              الطبقة الوسيطة (Adapter) مصممة بشكل مستقل عن أي Core Banking معيّن، ويمكن ربطها بأي مزوّد مستقبلاً.
            </div>
            <StatusPill tone="info">Adapter-based Architecture</StatusPill>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, i: Icon, c }: { l: string; v: string; i: React.ComponentType<{ className?: string }>; c: string }) {
  return (
    <div className="bg-muted/40 rounded-md p-3 border border-border">
      <div className="flex items-center justify-between">
        <div className="text-[10px] text-muted-foreground">{l}</div>
        <Icon className={`h-4 w-4 ${c}`} />
      </div>
      <div className="text-xl font-bold font-mono mt-1">{v}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/40">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}