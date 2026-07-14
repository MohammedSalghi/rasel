import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { AiTabs } from "@/components/app/ai-tabs";
import { StatusPill } from "@/components/app/page-toolbar";
import { Send, FileText, Sparkles, Quote, ExternalLink, Info } from "lucide-react";

export const Route = createFileRoute("/ai/playground")({
  head: () => ({ meta: [{ title: "اختبار النموذج — الذكاء الاصطناعي" }] }),
  component: PlaygroundPage,
});

const sources = [
  { title: "شروط بطاقات الائتمان — القسم 4.2", cat: "المستندات الداخلية", score: 0.94, snippet: "يمكن للعميل تفعيل بطاقته الائتمانية عبر تطبيق النوران الرقمي بإدخال آخر 6 أرقام من البطاقة ورقم التحقق..." },
  { title: "دليل موظف خدمة العملاء — فصل التفعيل", cat: "الأدلة التشغيلية", score: 0.88, snippet: "خطوات تفعيل البطاقة تبدأ من تسجيل الدخول إلى التطبيق ثم اختيار قسم البطاقات ثم تفعيل بطاقة جديدة..." },
  { title: "الأسئلة الشائعة — البطاقات", cat: "الأسئلة الشائعة", score: 0.81, snippet: "س: كيف أفعّل بطاقتي؟ ج: يمكنك التفعيل عبر التطبيق أو الاتصال بمركز الاتصال 800-6262..." },
];

function PlaygroundPage() {
  return (
    <AppShell title="اختبار النموذج" subtitle="محاكاة أسئلة العملاء ومعاينة المصادر التي يعتمد عليها النموذج">
      <AiTabs />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          {/* Query */}
          <div className="bg-card border border-border rounded-lg p-5">
            <label className="text-[11px] font-semibold text-muted-foreground">اكتب سؤال العميل التجريبي</label>
            <div className="mt-2 flex items-start gap-2">
              <textarea
                rows={3}
                defaultValue="كيف يمكنني تفعيل بطاقتي الائتمانية الجديدة؟"
                className="flex-1 rounded-md border border-border bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <button className="h-11 px-4 rounded-md bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1.5 shrink-0">
                <Send className="h-3.5 w-3.5" /> اختبار
              </button>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] text-muted-foreground">إصدار النموذج:</span>
              <select className="text-[11px] font-mono bg-muted rounded px-2 py-1 border border-border">
                <option>v2.4.1 (نشط)</option>
                <option>v2.4.0</option>
                <option>v2.3.7</option>
              </select>
              <span className="text-[10px] text-muted-foreground mr-3">حد الثقة:</span>
              <select className="text-[11px] font-mono bg-muted rounded px-2 py-1 border border-border">
                <option>0.85</option>
                <option>0.75</option>
                <option>0.60</option>
              </select>
            </div>
          </div>

          {/* Answer */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" /> الإجابة المقترحة
              </div>
              <div className="flex items-center gap-2">
                <StatusPill tone="success">ثقة عالية · 0.91</StatusPill>
                <span className="text-[10px] text-muted-foreground">زمن الاستجابة 812ms</span>
              </div>
            </div>
            <div className="bg-muted/40 rounded-md p-4 text-sm leading-7 text-foreground border border-border">
              يمكنك تفعيل بطاقتك الائتمانية الجديدة من مصرف النوران عبر إحدى الطريقتين:
              <br />
              ١. من خلال تطبيق النوران الرقمي: سجّل الدخول ثم اذهب إلى قسم «البطاقات» واختر
              «تفعيل بطاقة جديدة»، ثم أدخل آخر 6 أرقام من البطاقة ورمز التحقق المرسل إلى جوالك المسجّل.
              <br />
              ٢. عبر مركز الاتصال على الرقم 800-6262 مع تجهيز رقم البطاقة وبيانات الهوية الوطنية.
              <br />
              <br />
              <span className="text-[11px] text-muted-foreground">
                لتغيير الرقم السري بعد التفعيل، راجع «إدارة البطاقات» في التطبيق.
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2 mt-4 text-[11px]">
              <Metric l="التطابق الدلالي" v="0.94" />
              <Metric l="التغطية" v="98%" />
              <Metric l="عدد المصادر" v="3" />
              <Metric l="سياسة الحد الأدنى" v="متجاوزة ✓" tone="success" />
            </div>
          </div>

          {/* Sources */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Quote className="h-4 w-4 text-info" /> المصادر التي اعتمد عليها النموذج
            </div>
            <div className="space-y-2">
              {sources.map((s) => (
                <div key={s.title} className="p-3 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-info mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate">{s.title}</div>
                        <div className="text-[10px] text-muted-foreground">{s.cat}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary font-bold">
                        {s.score.toFixed(2)}
                      </span>
                      <button className="text-muted-foreground hover:text-foreground" title="فتح المصدر">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-2 leading-6 border-r-2 border-primary/30 pr-3">
                    {s.snippet}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">تفسير القرار</div>
            <ol className="space-y-2 text-[11px] text-muted-foreground list-decimal pr-4">
              <li>تم فهم السؤال كاستفسار عن «تفعيل بطاقة ائتمان».</li>
              <li>بحث في 1,842 مستنداً — عاد 12 نتيجة مطابقة.</li>
              <li>تم اختيار أعلى 3 نتائج بمتوسط تطابق 0.88.</li>
              <li>تم بناء الرد من المقاطع المسترجعة فقط.</li>
              <li>تجاوز الحد الأدنى للثقة (0.85) — سيتم إرسال الرد للعميل.</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-3">أسئلة تجريبية جاهزة</div>
            <div className="space-y-1.5">
              {[
                "شروط تمويل الأفراد الجديد",
                "أوقات دوام فرع طرابلس الرئيسي",
                "طريقة إعادة تعيين الرقم السري",
                "رسوم التحويل الدولي بالدولار",
                "كيفية الاعتراض على عملية مصرفية",
              ].map((q) => (
                <button key={q} className="w-full text-right text-xs px-3 py-2 rounded-md hover:bg-muted border border-transparent hover:border-border">
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-info/5 border border-info/20 rounded-lg p-4 flex items-start gap-2">
            <Info className="h-4 w-4 text-info mt-0.5" />
            <div className="text-[11px] text-muted-foreground leading-relaxed">
              الاختبار لا يؤثر على قاعدة المعرفة أو على العملاء — يستخدم لمراجعة جودة الردود
              قبل النشر أو بعد التدريب.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Metric({ l, v, tone }: { l: string; v: string; tone?: "success" }) {
  return (
    <div className="p-2 rounded-md bg-muted/40 border border-border">
      <div className="text-[10px] text-muted-foreground">{l}</div>
      <div className={"text-xs font-bold font-mono mt-0.5 " + (tone === "success" ? "text-success" : "")}>{v}</div>
    </div>
  );
}