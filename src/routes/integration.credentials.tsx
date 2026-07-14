import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { IntegrationTabs } from "@/components/app/integration-tabs";
import { KeyRound, ShieldCheck, RefreshCw, Download, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/integration/credentials")({
  head: () => ({ meta: [{ title: "الشهادات والمفاتيح — التكامل" }] }),
  component: CredsPage,
});

const certs = [
  { n: "mTLS Client Cert — CoreGW-Prod", type: "X.509", issuer: "Nouran Internal CA", exp: "2027-04-12", days: 279, status: "سليمة" },
  { n: "OAuth2 Client Secret — CBS", type: "Secret", issuer: "CBS IAM", exp: "2026-09-01", days: 57, status: "قريبة الانتهاء" },
  { n: "Signing Key — Webhook HMAC", type: "HMAC-SHA256", issuer: "Nouran KMS", exp: "لا ينتهي", days: 9999, status: "سليمة" },
  { n: "JWT Signing Key — API Gateway", type: "RSA-2048", issuer: "Nouran KMS", exp: "2026-08-20", days: 45, status: "قريبة الانتهاء" },
  { n: "TLS Server Cert — cx.alnouran-bank.local", type: "X.509", issuer: "Sectigo", exp: "2026-07-08", days: 2, status: "عاجل" },
];

const tone = (s: string): "success" | "warning" | "destructive" =>
  s === "سليمة" ? "success" : s === "قريبة الانتهاء" ? "warning" : "destructive";

function CredsPage() {
  return (
    <AppShell title="الشهادات والمفاتيح" subtitle="إدارة اعتماد الاتصال الآمن مع الأنظمة المصرفية">
      <IntegrationTabs />

      <div className="grid grid-cols-4 gap-3 mb-4">
        <Kpi l="شهادات نشطة" v="5" c="text-foreground" />
        <Kpi l="سليمة" v="2" c="text-success" />
        <Kpi l="قريبة الانتهاء" v="2" c="text-warning" />
        <Kpi l="عاجل التدوير" v="1" c="text-destructive" />
      </div>

      <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3 mb-4 flex items-start gap-2">
        <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
        <div className="text-[11px] leading-relaxed">
          شهادة <span className="font-mono text-destructive">cx.alnouran-bank.local</span> تنتهي خلال يومين — يجب تدويرها فوراً لضمان استمرار استقبال Webhooks.
        </div>
        <button className="ms-auto h-7 px-3 rounded-md bg-destructive text-destructive-foreground text-[11px] font-semibold">تدوير الآن</button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-2 px-4">الاسم</th>
              <th className="font-medium py-2 px-4">النوع</th>
              <th className="font-medium py-2 px-4">جهة الإصدار</th>
              <th className="font-medium py-2 px-4">تاريخ الانتهاء</th>
              <th className="font-medium py-2 px-4">المتبقي</th>
              <th className="font-medium py-2 px-4">الحالة</th>
              <th className="font-medium py-2 px-4">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {certs.map((c) => (
              <tr key={c.n} className="hover:bg-muted/30">
                <td className="py-3 px-4 text-xs font-semibold flex items-center gap-2"><KeyRound className="h-3.5 w-3.5 text-primary" /> {c.n}</td>
                <td className="py-3 px-4 text-[11px] font-mono">{c.type}</td>
                <td className="py-3 px-4 text-[11px] text-muted-foreground">{c.issuer}</td>
                <td className="py-3 px-4 text-[11px] font-mono">{c.exp}</td>
                <td className="py-3 px-4 text-[11px] font-mono">{c.days > 999 ? "—" : `${c.days} يوم`}</td>
                <td className="py-3 px-4"><StatusPill tone={tone(c.status)}>{c.status}</StatusPill></td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <button title="تدوير" className="size-7 grid place-items-center rounded-md hover:bg-muted text-muted-foreground"><RefreshCw className="h-3.5 w-3.5" /></button>
                    <button title="تنزيل" className="size-7 grid place-items-center rounded-md hover:bg-muted text-muted-foreground"><Download className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-3 flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-success" /> سياسة إدارة المفاتيح</div>
          <ul className="space-y-1.5 text-[11px] text-muted-foreground">
            <li>• التدوير التلقائي كل 90 يوماً للأسرار</li>
            <li>• تنبيه مسبق قبل 30 يوماً من الانتهاء</li>
            <li>• الحفظ داخل Nouran KMS + HSM محلي</li>
            <li>• صلاحية القراءة لمستخدمي «إدارة التكامل» فقط</li>
            <li>• جميع عمليات التدوير مسجّلة في سجل التدقيق</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-3">استيراد شهادة أو مفتاح جديد</div>
          <div className="border border-dashed border-border rounded-md p-6 text-center text-[11px] text-muted-foreground">
            اسحب ملف .pem / .p12 / .key هنا — يتم تشفيره وتخزينه داخل KMS فوراً
          </div>
          <div className="flex items-center gap-2 mt-3">
            <button className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">اختيار ملف</button>
            <button className="h-9 px-3 rounded-md border border-border text-xs font-semibold hover:bg-muted">إنشاء زوج مفاتيح جديد</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, c }: { l: string; v: string; c: string }) {
  return <div className="bg-card border border-border rounded-lg p-4"><div className="text-[11px] text-muted-foreground">{l}</div><div className={`text-2xl font-bold font-mono mt-1 ${c}`}>{v}</div></div>;
}