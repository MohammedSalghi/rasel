import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { brand } from "@/lib/brand";
import { Logo } from "@/components/app/logo";
import {
  MessagesSquare,
  Bot,
  ShieldCheck,
  BarChart3,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Play,
} from "lucide-react";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: `مرحباً بك في ${brand.name} — ${brand.productName}` },
      {
        name: "description",
        content: `${brand.name} — منصة موحدة لإدارة محادثات العملاء، الشكاوى، والذكاء الاصطناعي.`,
      },
      { property: "og:title", content: `${brand.name} — ${brand.productName}` },
      { property: "og:description", content: brand.description },
    ],
  }),
  component: OnboardingPage,
});

type Slide = {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  tint: string;
};

const SLIDES: Slide[] = [
  {
    icon: MessagesSquare,
    eyebrow: "صندوق موحد",
    title: "كل محادثات عملائك في مكان واحد",
    desc: "واتساب، فيسبوك، إنستغرام، الرسائل النصية، والبريد الإلكتروني — كلها في صندوق واحد ذكي بواجهة عربية سلسة.",
    bullets: [
      "توزيع تلقائي للمحادثات حسب الفريق",
      "بحث فوري داخل كل المحادثات",
      "قوالب ردود جاهزة وقابلة للتخصيص",
    ],
    tint: "from-info/20 to-accent/10",
  },
  {
    icon: Bot,
    eyebrow: "مساعد ذكي",
    title: "ذكاء اصطناعي يقترح ويجيب ويلخّص",
    desc: "مساعدك الذكي يقرأ سياق المحادثة، يقترح ردوداً، يلخص الشكاوى، ويصنّف المشاعر تلقائياً بدقة عالية.",
    bullets: [
      "اقتراحات ردود فورية باللغة العربية",
      "تلخيص طويل للمحادثات في ثوانٍ",
      "مصادر معرفة قابلة للتحديث والتدريب",
    ],
    tint: "from-accent/20 to-info/10",
  },
  {
    icon: BarChart3,
    eyebrow: "قرارات مدعومة بالبيانات",
    title: "تقارير لحظية وأداء فريقك بوضوح",
    desc: "لوحات معلومات جاهزة، مؤشرات أداء فورية، وتقارير جاهزة للتصدير — لتتخذ قراراً أسرع.",
    bullets: [
      "زمن الاستجابة ورضا العملاء لحظياً",
      "إدارة شكاوى شاملة ومنظمة",
      "تصدير تقارير PDF و Excel بنقرة",
    ],
    tint: "from-success/20 to-accent/10",
  },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  const markOnboarded = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("rasel:onboarded", "1");
    }
  };

  const finish = useCallback(() => {
    markOnboarded();
    navigate({ to: "/signup" });
  }, [navigate]);

  const skip = useCallback(() => {
    markOnboarded();
    navigate({ to: "/login" });
  }, [navigate]);

  const next = useCallback(
    () => setI((v) => Math.min(v + 1, SLIDES.length - 1)),
    [],
  );
  const prev = useCallback(() => setI((v) => Math.max(v - 1, 0)), []);

  // Keyboard navigation (RTL: Left = next, Right = previous)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") next();
      else if (e.key === "ArrowRight") prev();
      else if (e.key === "Enter" && i === SLIDES.length - 1) finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, finish, i]);

  const slide = SLIDES[i];
  const Icon = slide.icon;
  const isLast = i === SLIDES.length - 1;

  return (
    <div
      className="min-h-screen bg-background flex flex-col relative overflow-hidden"
      dir="rtl"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 -right-32 size-[28rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 size-[28rem] rounded-full bg-info/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 size-[24rem] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/60 bg-card/60 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo size={96} />
          <div className="flex items-center gap-4">
            <button
              onClick={skip}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              تخطي الجولة
            </button>
            <Link
              to="/login"
              className="text-xs font-semibold text-accent hover:underline"
            >
              تسجيل الدخول ←
            </Link>
          </div>
        </div>
      </header>


      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-2 gap-10 items-center">
          {/* Copy side */}
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300" key={i}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold ring-1 ring-accent/30 mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              {slide.eyebrow}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              {slide.title}
            </h1>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-lg">
              {slide.desc}
            </p>
            <ul className="mt-6 space-y-2.5">
              {slide.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>

            {/* Nav */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {!isLast ? (
                <>
                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-colors"
                  >
                    التالي
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  {i > 0 && (
                    <button
                      onClick={prev}
                      className="inline-flex items-center gap-1 h-11 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted/40 transition-colors"
                    >
                      <ArrowRight className="h-4 w-4" />
                      السابق
                    </button>
                  )}
                  <button
                    onClick={finish}
                    className="h-11 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ابدأ الآن
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={finish}
                    className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 shadow-sm transition-colors"
                  >
                    إنشاء حساب مجاناً
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={prev}
                    className="inline-flex items-center gap-1 h-11 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground border border-border/60 hover:bg-muted/40 transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    السابق
                  </button>
                  <button
                    onClick={skip}
                    className="h-11 px-4 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                  >
                    لدي حساب
                  </button>
                </>
              )}
            </div>


            {/* Dots */}
            <div className="mt-8 flex items-center gap-2">
              {SLIDES.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`الشريحة ${k + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    k === i ? "w-8 bg-accent" : "w-2 bg-muted hover:bg-muted-foreground/30"
                  }`}
                />
              ))}
              <span className="mr-2 text-[11px] text-muted-foreground font-mono">
                {i + 1} / {SLIDES.length}
              </span>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative">
            <div
              className={`relative aspect-[4/3] rounded-3xl border border-border bg-gradient-to-br ${slide.tint} overflow-hidden shadow-xl`}
            >
              {/* Mock UI card */}
              <div className="absolute inset-6 rounded-2xl bg-card/95 backdrop-blur ring-1 ring-border shadow-lg p-5 flex flex-col">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <div className="h-8 w-8 rounded-lg bg-accent/15 text-accent grid place-items-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold">{slide.eyebrow}</div>
                    <div className="text-[10px] text-muted-foreground">راسل · لقطة توضيحية</div>
                  </div>
                  <div className="flex gap-1">
                    <span className="size-2 rounded-full bg-destructive/60" />
                    <span className="size-2 rounded-full bg-warning/60" />
                    <span className="size-2 rounded-full bg-success/60" />
                  </div>
                </div>
                <div className="flex-1 mt-4 space-y-3">
                  {[0, 1, 2].map((k) => (
                    <div
                      key={k}
                      className="rounded-lg bg-muted/60 p-3 flex items-start gap-2"
                    >
                      <div className="size-7 rounded-full bg-accent/15 text-accent grid place-items-center text-[10px] font-bold">
                        ع{k + 1}
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="h-2 w-3/4 rounded bg-foreground/15" />
                        <div className="h-2 w-1/2 rounded bg-foreground/10" />
                      </div>
                      <div className="text-[10px] text-muted-foreground font-mono">
                        {String(10 + k)}:2{k}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border border-dashed border-accent/40 bg-accent/5 p-2 flex items-center gap-2">
                  <Bot className="h-4 w-4 text-accent shrink-0" />
                  <div className="h-2 flex-1 rounded bg-accent/20" />
                  <span className="text-[10px] text-accent font-semibold">AI</span>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute top-4 right-4 rounded-full bg-card/90 backdrop-blur ring-1 ring-border px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1 shadow">
                <ShieldCheck className="h-3 w-3 text-success" />
                آمن ومشفّر
              </div>
              <div className="absolute bottom-4 left-4 rounded-full bg-card/90 backdrop-blur ring-1 ring-border px-2.5 py-1 text-[10px] font-semibold flex items-center gap-1 shadow">
                <Play className="h-3 w-3 text-accent" />
                جاهز خلال دقائق
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "99.99%", v: "توفر النظام" },
                { k: "< 3 د", v: "متوسط الاستجابة" },
                { k: "24/7", v: "الدعم الفني" },
              ].map((s) => (
                <div
                  key={s.v}
                  className="rounded-lg border border-border bg-card/70 backdrop-blur p-3 text-center"
                >
                  <div className="text-base font-bold text-accent">{s.k}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/60 bg-card/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <span>{brand.copyright}</span>
          <span className="flex items-center gap-2">
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-card font-mono text-[10px]">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-card font-mono text-[10px]">→</kbd>
            <span>للتنقل بين الشرائح</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
