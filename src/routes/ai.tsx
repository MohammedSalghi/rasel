import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { AiTabs } from "@/components/app/ai-tabs";
import { StatusPill } from "@/components/app/page-toolbar";
import {
  Cpu,
  ShieldCheck,
  Database,
  FileText,
  Activity,
  TrendingUp,
  UserRoundCheck,
  HelpCircle,
  AlertTriangle,
  History,
  Lock,
  WifiOff,
  Server,
  Quote,
  Layers,
  Gauge,
  Link2,
  Timer,
} from "lucide-react";

export const Route = createFileRoute("/ai")({
  head: () => ({ meta: [{ title: "الذكاء الاصطناعي — مصرف النوران" }] }),
  component: AiOverview,
});

function AiOverview() {
  return (
    <AppShell
      title="إدارة الذكاء الاصطناعي"
      subtitle="نظام استرجاع معزّز بالتوليد (RAG) يجيب حصرياً من قاعدة معرفة مصرف النوران"
    >
      <AiTabs />

      {/* Model banner */}
      <div className="bg-gradient-to-l from-primary/10 via-card to-card border border-border rounded-lg p-5 mb-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center ring-1 ring-primary/20">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="text-sm font-bold">Nouran-RAG · مساعد المعرفة الداخلي</div>
                <StatusPill tone="success">قيد التشغيل</StatusPill>
                <span className="text-[11px] font-mono text-muted-foreground">فهرس v2.4.1</span>
              </div>
              <div className="text-[11px] text-muted-foreground max-w-2xl leading-relaxed">
                يعمل النظام بالكامل داخل مركز بيانات المصرف — لا يستخدم أي واجهة سحابية
                (OpenAI · Gemini · Claude) ولا يتصل بالإنترنت. كل إجابة تُبنى من مقاطع
                مسترجَعة من قاعدة المعرفة الداخلية فقط، ومرتبطة بمصدرها الأصلي.
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Chip icon={Lock} label="بيانات لا تغادر المصرف" />
            <Chip icon={WifiOff} label="لا يتصل بالإنترنت" />
            <Chip icon={Server} label="نشر On-Premise" />
          </div>
        </div>
      </div>

      {/* Retrieval Quality KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <Kpi l="دقة الاسترجاع" v="94.2%" delta="+1.8%" i={TrendingUp} c="text-success" />
        <Kpi l="الإجابات المُسنَدة لمصدر" v="98.6%" delta="+0.4%" i={Link2} c="text-success" />
        <Kpi l="متوسط درجة التشابه" v="0.87" delta="+0.03" i={Gauge} c="text-primary" />
        <Kpi l="نسبة «لا توجد إجابة»" v="6.4%" delta="-1.1%" i={UserRoundCheck} c="text-info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          {/* Model & Retrieval Status */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm font-semibold">حالة النموذج والاسترجاع</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">تُدار الحقول التالية بواسطة فريق الذكاء الاصطناعي</div>
              </div>
              <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold hover:bg-muted">
                إعادة الفهرسة
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <ConfigField i={Cpu} l="نموذج التوليد" v="Nouran-LLM-Instruct" />
              <ConfigField i={Layers} l="نموذج التضمين" v="BGE-M3" />
              <Stat i={FileText} l="عدد المستندات المفهرسة" v="1,842" />
              <Stat i={Layers} l="عدد المقاطع (Chunks)" v="48,317" />
              <Stat i={Database} l="حجم قاعدة المعرفة" v="2.4 GB" />
              <Stat i={History} l="آخر فهرسة" v="أمس 22:00" />
              <Stat i={Server} l="المضيف" v="AI-Node-01 · النوران DC" />
              <Stat i={Gauge} l="حد التشابه الأدنى للاسترجاع" v="85%" />
              <Stat i={Timer} l="متوسط زمن الاسترجاع" v="142 مللي/ث" />
            </div>
          </div>

          {/* Citation / Grounding sample */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Link2 className="h-4 w-4 text-primary" /> الإسناد للمصادر (Grounding)
              </div>
              <StatusPill tone="success">كل إجابة مربوطة بمصدرها</StatusPill>
            </div>
            <div className="text-[11px] text-muted-foreground mb-3 leading-relaxed">
              لا يُسمح للنموذج بالإجابة من خارج قاعدة المعرفة. عند غياب مقطع مطابق فوق حد
              التشابه، تُعاد الاستفسار إلى موظف مختص بدل التخمين.
            </div>
            <div className="rounded-md border border-border bg-muted/30 p-3 space-y-3">
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">سؤال العميل</div>
                <div className="text-xs">ما هي الرسوم على التحويل الدولي بالدولار؟</div>
              </div>
              <div className="p-3 rounded-md bg-background border border-border">
                <div className="flex items-center gap-2 mb-1 text-[10px] text-muted-foreground">
                  <Quote className="h-3 w-3" /> إجابة النموذج
                </div>
                <div className="text-xs leading-relaxed">
                  تبلغ رسوم التحويل الدولي بالدولار الأمريكي <span className="font-mono">0.25%</span> بحد أدنى
                  <span className="font-mono"> 25 USD</span> وحد أعلى <span className="font-mono">200 USD</span>،
                  إضافة إلى رسوم البنك المراسل.
                </div>
              </div>
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-[10px] text-primary font-semibold flex items-center gap-1.5">
                    <FileText className="h-3 w-3" /> المصدر · دليل التحويلات الدولية 2026 — قسم 4.2
                  </div>
                  <span className="text-[10px] font-mono text-success">تشابه 0.93</span>
                </div>
                <div className="text-[11px] text-muted-foreground leading-relaxed">
                  «تُحتسب عمولة التحويل الدولي بواقع 0.25% من قيمة الحوالة، بحد أدنى 25 دولاراً وحد أقصى
                  200 دولار، مع إضافة رسوم البنوك المراسلة عند الاقتضاء…»
                </div>
              </div>
            </div>
          </div>

          {/* Top questions & unanswered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                <HelpCircle className="h-4 w-4 text-info" /> أكثر الأسئلة تكراراً
              </div>
              <ul className="space-y-2 text-xs">
                {[
                  { q: "كيف يمكنني إعادة تعيين الرقم السري؟", n: 428 },
                  { q: "ما هي أوقات دوام الفروع؟", n: 356 },
                  { q: "كيف أفعّل بطاقتي الائتمانية؟", n: 291 },
                  { q: "شروط تمويل الأفراد", n: 214 },
                  { q: "رسوم التحويل الدولي", n: 187 },
                ].map((r) => (
                  <li key={r.q} className="flex items-center justify-between p-2 rounded bg-muted/40">
                    <span className="truncate">{r.q}</span>
                    <span className="font-mono text-muted-foreground shrink-0 ms-2">{r.n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3 text-sm font-semibold">
                <AlertTriangle className="h-4 w-4 text-warning" /> استفسارات دون مقطع مطابق
              </div>
              <ul className="space-y-2 text-xs">
                {[
                  { q: "هل يدعم المصرف عملات رقمية؟", d: "قبل ساعة" },
                  { q: "ما هي شروط برنامج المكافآت 2026؟", d: "قبل 3 ساعات" },
                  { q: "طلب تحويل مليون دينار دولياً", d: "أمس" },
                  { q: "تفاصيل قرض تمويل SME جديد", d: "أمس" },
                ].map((r) => (
                  <li key={r.q} className="flex items-center justify-between p-2 rounded bg-warning/5 border border-warning/20">
                    <span className="truncate">{r.q}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0 ms-2">{r.d}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full mt-3 h-8 rounded-md border border-border text-[11px] font-semibold hover:bg-muted">
                إحالة إلى محرري المعرفة
              </button>
            </div>
          </div>

          {/* Indexing / KB operations log */}
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <div className="text-sm font-semibold">سجل عمليات الفهرسة وتحديث قاعدة المعرفة</div>
              <span className="text-[11px] text-muted-foreground">آخر 5 عمليات</span>
            </div>
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
                <tr>
                  <th className="font-medium py-2 px-4">إصدار الفهرس</th>
                  <th className="font-medium py-2 px-4">النوع</th>
                  <th className="font-medium py-2 px-4">التاريخ</th>
                  <th className="font-medium py-2 px-4">المدة</th>
                  <th className="font-medium py-2 px-4">المستندات</th>
                  <th className="font-medium py-2 px-4">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { v: "v2.4.1", t: "فهرسة تزايدية", d: "2026-07-04 22:00", dur: "18د", docs: 42, ok: true },
                  { v: "v2.4.0", t: "فهرسة كاملة", d: "2026-07-01 03:15", dur: "4س 12د", docs: 1842, ok: true },
                  { v: "v2.3.7", t: "فهرسة تزايدية", d: "2026-06-28 22:00", dur: "16د", docs: 12, ok: true },
                  { v: "v2.3.6", t: "تحديث سياسات", d: "2026-06-25 14:22", dur: "9د", docs: 8, ok: true },
                  { v: "v2.3.5", t: "تحديث نموذج الاسترجاع", d: "2026-06-20 02:00", dur: "1س 40د", docs: 214, ok: false },
                ].map((r) => (
                  <tr key={r.v} className="hover:bg-muted/30">
                    <td className="py-3 px-4 text-xs font-mono font-semibold text-primary">{r.v}</td>
                    <td className="py-3 px-4 text-xs">{r.t}</td>
                    <td className="py-3 px-4 text-[11px] font-mono text-muted-foreground">{r.d}</td>
                    <td className="py-3 px-4 text-xs font-mono">{r.dur}</td>
                    <td className="py-3 px-4 text-xs font-mono">{r.docs}</td>
                    <td className="py-3 px-4">
                      <StatusPill tone={r.ok ? "success" : "destructive"}>
                        {r.ok ? "ناجحة" : "فشل جزئي"}
                      </StatusPill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right sidebar policies */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-4">العتبات والسياسات</div>
            <div className="space-y-5">
              <SliderRow l="حد التشابه الأدنى لعرض إجابة" v={85} />
              <SliderRow l="حد التشابه للتحويل التلقائي لموظف" v={70} />
              <div className="h-px bg-border" />
              {[
                { l: "منع الإجابة من خارج قاعدة المعرفة", on: true },
                { l: "إلزام إظهار المصدر مع كل إجابة", on: true },
                { l: "تحويل تلقائي للمواضيع المالية الحساسة", on: true },
                { l: "طلب تأكيد الموظف قبل الإرسال", on: false },
                { l: "الرد التلقائي على الاستفسارات العامة", on: true },
              ].map((p) => (
                <div key={p.l} className="flex items-start justify-between gap-3">
                  <div className="text-xs flex-1">{p.l}</div>
                  <div className={`relative w-9 h-5 rounded-full ${p.on ? "bg-success" : "bg-muted"}`}>
                    <div className={`absolute top-0.5 size-4 bg-white rounded-full shadow ${p.on ? "right-0.5" : "left-0.5"}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">ضمانات الأمان والخصوصية</div>
            <ul className="space-y-2 text-[11px] text-muted-foreground">
              {[
                "النظام مستضاف بالكامل داخل مركز بيانات المصرف",
                "لا يتم إرسال أي بيانات إلى مزوّدين خارجيين",
                "كل إجابة مربوطة بمقطعها المصدر داخل قاعدة المعرفة",
                "تحديث قاعدة المعرفة يتم فقط بعد اعتماد المسؤولين",
                "سجل تدقيق كامل لكل عملية فهرسة أو تعديل",
              ].map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Chip({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background border border-border text-[11px] font-medium text-foreground">
      <Icon className="h-3.5 w-3.5 text-primary" />
      {label}
    </span>
  );
}

function Kpi({ l, v, delta, i: Icon, c }: { l: string; v: string; delta: string; i: React.ComponentType<{ className?: string }>; c: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground">{l}</div>
        <Icon className={`h-4 w-4 ${c}`} />
      </div>
      <div className="text-2xl font-bold font-mono mt-2">{v}</div>
      <div className={"text-[10px] font-mono mt-1 " + (delta.startsWith("-") ? "text-info" : "text-success")}>{delta} خلال 7 أيام</div>
    </div>
  );
}

function Stat({ i: Icon, l, v }: { i: React.ComponentType<{ className?: string }>; l: string; v: string }) {
  return (
    <div className="p-3 rounded-md bg-muted/40 border border-border">
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
        <Icon className="h-3.5 w-3.5" />
        {l}
      </div>
      <div className="text-sm font-bold font-mono">{v}</div>
    </div>
  );
}

function ConfigField({ i: Icon, l, v }: { i: React.ComponentType<{ className?: string }>; l: string; v: string }) {
  return (
    <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
        <div className="flex items-center gap-2">
          <Icon className="h-3.5 w-3.5 text-primary" />
          {l}
        </div>
        <span className="text-[9px] text-primary font-semibold">قابل للتعديل</span>
      </div>
      <input
        defaultValue={v}
        className="w-full bg-transparent text-sm font-bold font-mono focus:outline-none focus:ring-1 focus:ring-primary/40 rounded px-1"
      />
    </div>
  );
}

function SliderRow({ l, v }: { l: string; v: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-2">
        <span>{l}</span>
        <span className="font-mono font-semibold text-primary">{v}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        defaultValue={v}
        className="w-full h-1.5 accent-primary cursor-pointer"
      />
    </div>
  );
}