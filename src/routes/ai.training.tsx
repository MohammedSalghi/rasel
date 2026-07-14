import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { AiTabs } from "@/components/app/ai-tabs";
import { StatusPill } from "@/components/app/page-toolbar";
import { PlayCircle, GitBranch, RotateCcw, CheckCircle2, GraduationCap, Timer, Layers } from "lucide-react";

export const Route = createFileRoute("/ai/training")({
  head: () => ({ meta: [{ title: "التدريب والإصدارات — الذكاء الاصطناعي" }] }),
  component: TrainingPage,
});

const versions = [
  { v: "v2.4.1", date: "2026-07-04 22:00", docs: 1842, size: "2.4 GB", acc: "94.2%", active: true, note: "إعادة فهرسة بعد إضافة سياسات AML الجديدة" },
  { v: "v2.4.0", date: "2026-07-01 03:15", docs: 1800, size: "2.3 GB", acc: "93.8%", active: false, note: "تدريب كامل ربع سنوي" },
  { v: "v2.3.7", date: "2026-06-28 22:00", docs: 1788, size: "2.3 GB", acc: "93.1%", active: false, note: "تحديث دليل خدمة العملاء" },
  { v: "v2.3.6", date: "2026-06-25 14:22", docs: 1776, size: "2.3 GB", acc: "92.9%", active: false, note: "تعديل سياسات التحويلات" },
  { v: "v2.3.5", date: "2026-06-20 02:00", docs: 1768, size: "2.3 GB", acc: "91.4%", active: false, note: "فشل جزئي — 12 مستند" },
];

function TrainingPage() {
  return (
    <AppShell title="التدريب وإدارة الإصدارات" subtitle="إعادة تدريب النموذج المحلي ومراقبة جودة كل إصدار">
      <AiTabs />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          {/* Live training */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" /> جلسة التدريب الحالية
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">v2.4.2-rc · تدريب تدريجي على 24 مستنداً جديداً</div>
              </div>
              <StatusPill tone="info">قيد التنفيذ</StatusPill>
            </div>
            <div className="space-y-3">
              <Phase name="استخراج النص من المستندات" pct={100} done />
              <Phase name="تقسيم المحتوى (Chunking)" pct={100} done />
              <Phase name="توليد التضمينات (Embeddings)" pct={72} />
              <Phase name="بناء فهرس البحث المتجهي" pct={0} />
              <Phase name="اختبار جودة الاسترجاع" pct={0} />
            </div>
            <div className="grid grid-cols-4 gap-3 mt-5">
              <Mini l="المدة المنقضية" v="12د 40ث" />
              <Mini l="الوقت المتبقي" v="~7د" />
              <Mini l="مستندات معالجة" v="17 / 24" />
              <Mini l="نسبة الإنجاز" v="58%" />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <button className="h-9 px-4 rounded-md border border-border text-xs font-semibold hover:bg-muted">إيقاف مؤقت</button>
              <button className="h-9 px-4 rounded-md border border-destructive/40 text-destructive text-xs font-semibold hover:bg-destructive/5">إلغاء الجلسة</button>
            </div>
          </div>

          {/* Versions */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-info" /> إصدارات النموذج
              </div>
              <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold inline-flex items-center gap-1.5">
                <PlayCircle className="h-3.5 w-3.5" /> بدء تدريب جديد
              </button>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
                <tr>
                  <th className="font-medium py-2 px-4">الإصدار</th>
                  <th className="font-medium py-2 px-4">التاريخ</th>
                  <th className="font-medium py-2 px-4">المستندات</th>
                  <th className="font-medium py-2 px-4">الحجم</th>
                  <th className="font-medium py-2 px-4">دقة الاختبار</th>
                  <th className="font-medium py-2 px-4">الحالة</th>
                  <th className="font-medium py-2 px-4">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {versions.map((v) => (
                  <tr key={v.v} className="hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <div className="text-xs font-mono font-bold text-primary">{v.v}</div>
                      <div className="text-[10px] text-muted-foreground truncate max-w-[220px]">{v.note}</div>
                    </td>
                    <td className="py-3 px-4 text-[11px] font-mono text-muted-foreground">{v.date}</td>
                    <td className="py-3 px-4 text-xs font-mono">{v.docs}</td>
                    <td className="py-3 px-4 text-xs font-mono">{v.size}</td>
                    <td className="py-3 px-4 text-xs font-mono">{v.acc}</td>
                    <td className="py-3 px-4">
                      <StatusPill tone={v.active ? "success" : "muted"}>{v.active ? "نشط" : "أرشيف"}</StatusPill>
                    </td>
                    <td className="py-3 px-4">
                      {v.active ? (
                        <span className="text-[10px] text-muted-foreground">الإصدار الحالي</span>
                      ) : (
                        <button className="h-7 px-2 rounded border border-border text-[10px] font-semibold hover:bg-muted inline-flex items-center gap-1">
                          <RotateCcw className="h-3 w-3" /> تفعيل
                        </button>
                      )}
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
              <Layers className="h-4 w-4 text-primary" /> خيارات التدريب
            </div>
            <div className="space-y-3 text-xs">
              <Opt label="نوع التدريب" value="تدريجي (المستجدات فقط)" />
              <Opt label="حجم التقسيم" value="512 رمزاً" />
              <Opt label="نموذج التضمين" value="Nouran-Embed v3" />
              <Opt label="محرك الفهرسة" value="FAISS محلي" />
              <Opt label="مراجعة قبل النشر" value="مفعّلة" />
            </div>
            <button className="w-full mt-4 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">تعديل الإعدادات</button>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Timer className="h-4 w-4 text-info" /> الجدولة التلقائية
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between p-2 rounded bg-muted/40"><span>إعادة الفهرسة</span><span className="font-mono">يومياً 22:00</span></div>
              <div className="flex justify-between p-2 rounded bg-muted/40"><span>تدريب كامل</span><span className="font-mono">شهرياً — أول أحد</span></div>
              <div className="flex justify-between p-2 rounded bg-muted/40"><span>تقرير الجودة</span><span className="font-mono">أسبوعياً</span></div>
            </div>
          </div>

          <div className="bg-success/5 border border-success/20 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
              <div className="text-[11px] text-muted-foreground leading-relaxed">
                إعادة التدريب لا توقف تشغيل النظام — يستمر الإصدار النشط في خدمة العملاء
                حتى يتم اعتماد الإصدار الجديد.
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Phase({ name, pct, done }: { name: string; pct: number; done?: boolean }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] mb-1">
        <span className={done ? "text-success font-semibold" : ""}>{name}</span>
        <span className="font-mono text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={"h-full " + (done ? "bg-success" : "bg-primary")} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Mini({ l, v }: { l: string; v: string }) {
  return (
    <div className="p-2.5 rounded-md bg-muted/40 border border-border">
      <div className="text-[10px] text-muted-foreground">{l}</div>
      <div className="text-sm font-bold font-mono mt-0.5">{v}</div>
    </div>
  );
}

function Opt({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/40">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}