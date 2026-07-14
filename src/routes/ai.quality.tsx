import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { AiTabs } from "@/components/app/ai-tabs";
import { StatusPill } from "@/components/app/page-toolbar";
import { ThumbsUp, ThumbsDown, Check, X, Pencil, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/ai/quality")({
  head: () => ({ meta: [{ title: "جودة الإجابات — الذكاء الاصطناعي" }] }),
  component: QualityPage,
});

const answers = [
  { r: "AN-88301", q: "كيف أفعّل بطاقتي الائتمانية؟", conf: 0.94, src: 3, status: "بانتظار المراجعة" },
  { r: "AN-88298", q: "شروط تمويل الأفراد الجديد؟", conf: 0.72, src: 2, status: "بانتظار المراجعة" },
  { r: "AN-88295", q: "رسوم التحويل الدولي بالدولار", conf: 0.88, src: 4, status: "معتمدة" },
  { r: "AN-88291", q: "هل يدعم المصرف عملات رقمية؟", conf: 0.31, src: 0, status: "مرفوضة" },
  { r: "AN-88287", q: "أوقات دوام فرع طرابلس", conf: 0.99, src: 1, status: "معتمدة" },
];

const toneMap: Record<string, "success" | "warning" | "destructive"> = {
  "معتمدة": "success",
  "بانتظار المراجعة": "warning",
  "مرفوضة": "destructive",
};

function QualityPage() {
  return (
    <AppShell title="جودة الإجابات" subtitle="مراجعة واعتماد الردود قبل تعلّم النموذج منها">
      <AiTabs />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi l="إجابات بانتظار المراجعة" v="42" tone="warning" />
        <Kpi l="معتمدة (7 أيام)" v="386" tone="success" />
        <Kpi l="مرفوضة (7 أيام)" v="24" tone="destructive" />
        <Kpi l="متوسط تقييم العملاء" v="4.6/5" tone="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <div className="text-sm font-semibold">قائمة الإجابات للمراجعة</div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold hover:bg-muted">تصدير CSV</button>
              <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold">اعتماد الكل</button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
              <tr>
                <th className="font-medium py-2 px-4">المرجع</th>
                <th className="font-medium py-2 px-4">السؤال</th>
                <th className="font-medium py-2 px-4">الثقة</th>
                <th className="font-medium py-2 px-4">المصادر</th>
                <th className="font-medium py-2 px-4">الحالة</th>
                <th className="font-medium py-2 px-4">إجراء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {answers.map((a) => (
                <tr key={a.r} className="hover:bg-muted/30">
                  <td className="py-3 px-4 text-xs font-mono text-primary">{a.r}</td>
                  <td className="py-3 px-4 text-xs">{a.q}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={"h-full " + (a.conf >= 0.85 ? "bg-success" : a.conf >= 0.6 ? "bg-warning" : "bg-destructive")}
                          style={{ width: `${a.conf * 100}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono">{a.conf.toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono">{a.src}</td>
                  <td className="py-3 px-4">
                    <StatusPill tone={toneMap[a.status]}>{a.status}</StatusPill>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <IconBtn icon={Check} title="اعتماد" tone="success" />
                      <IconBtn icon={Pencil} title="تعديل" />
                      <IconBtn icon={X} title="رفض" tone="destructive" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">تقييم العملاء الأخير</div>
            <div className="space-y-2 text-xs">
              {[
                { s: "إجابة سريعة ومفيدة جداً", ok: true },
                { s: "لم يفهم السؤال بالضبط", ok: false },
                { s: "معلومات دقيقة عن الرسوم", ok: true },
                { s: "احتجت لموظف بشري", ok: false },
              ].map((r) => (
                <div key={r.s} className="flex items-start gap-2 p-2 rounded bg-muted/40">
                  {r.ok ? <ThumbsUp className="h-3.5 w-3.5 text-success mt-0.5" /> : <ThumbsDown className="h-3.5 w-3.5 text-warning mt-0.5" />}
                  <span className="text-[11px]">{r.s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-success/5 border border-success/20 rounded-lg p-4 flex items-start gap-2">
            <ShieldCheck className="h-4 w-4 text-success mt-0.5" />
            <div className="text-[11px] text-muted-foreground leading-relaxed">
              لا يتم إدخال أي إجابة إلى قاعدة تعلّم النموذج قبل اعتمادها من مشرف مؤهل،
              مع تسجيل الاعتماد في سجل التدقيق.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, tone }: { l: string; v: string; tone: "success" | "warning" | "destructive" }) {
  const colorMap = { success: "text-success", warning: "text-warning", destructive: "text-destructive" };
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-[11px] text-muted-foreground">{l}</div>
      <div className={"text-2xl font-bold font-mono mt-2 " + colorMap[tone]}>{v}</div>
    </div>
  );
}

function IconBtn({ icon: Icon, title, tone }: { icon: React.ComponentType<{ className?: string }>; title: string; tone?: "success" | "destructive" }) {
  const c = tone === "success" ? "text-success hover:bg-success/10" : tone === "destructive" ? "text-destructive hover:bg-destructive/10" : "text-muted-foreground hover:bg-muted";
  return (
    <button title={title} className={"size-7 grid place-items-center rounded-md " + c}>
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}