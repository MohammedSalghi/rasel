import { useEffect, useState } from "react";
import {
  MessagesSquare,
  Bot,
  BarChart3,
  Users2,
  Sparkles,
  X,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  cta?: { label: string; to: string };
};

const STEPS: Step[] = [
  {
    icon: Sparkles,
    title: "أهلاً بك في راسل 👋",
    desc: "دعنا نأخذك في جولة سريعة (30 ثانية) للتعرف على أهم ميزات المنصة.",
  },
  {
    icon: MessagesSquare,
    title: "صندوق المحادثات الموحد",
    desc: "كل محادثات عملائك من جميع القنوات في مكان واحد — رد، وزّع، وأغلق بضغطة زر.",
    cta: { label: "افتح الصندوق", to: "/inbox" },
  },
  {
    icon: Bot,
    title: "مساعدك الذكي",
    desc: "اقتراحات ردود ذكية، تلخيص المحادثات، وتصنيف تلقائي للمشاعر والنوايا.",
    cta: { label: "جرّب الذكاء الاصطناعي", to: "/ai" },
  },
  {
    icon: BarChart3,
    title: "تقارير لحظية",
    desc: "لوحات أداء وتقارير قابلة للتصدير تساعدك على اتخاذ قرارات أسرع.",
    cta: { label: "عرض التقارير", to: "/reports" },
  },
  {
    icon: Users2,
    title: "إدارة فريقك",
    desc: "أدوار، صلاحيات، وتوزيع ذكي للمحادثات على أعضاء الفريق.",
    cta: { label: "إدارة المستخدمين", to: "/users" },
  },
];

const KEY = "rasel:tour:done";

export function DiscoveryTour() {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(KEY)) {
      const t = setTimeout(() => setOpen(true), 400);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, "1");
    }
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        onClick={() => {
          setI(0);
          setOpen(true);
        }}
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 h-10 px-4 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-lg ring-1 ring-accent/40 hover:bg-accent/90"
        aria-label="إعادة تشغيل جولة التعريف"
      >
        <Sparkles className="h-3.5 w-3.5" />
        جولة تعريفية
      </button>
    );
  }

  const step = STEPS[i];
  const Icon = step.icon;
  const isLast = i === STEPS.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-background/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      dir="rtl"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-2xl bg-card border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-accent/15 via-info/10 to-transparent p-6 pb-8">
          <button
            onClick={close}
            className="absolute top-3 left-3 h-8 w-8 rounded-full grid place-items-center text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="mx-auto h-14 w-14 rounded-2xl bg-accent text-accent-foreground grid place-items-center shadow-lg ring-4 ring-accent/20">
            <Icon className="h-7 w-7" />
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-6 -mt-3 text-center">
          <h3 className="text-xl font-bold">{step.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            {step.desc}
          </p>

          {/* Dots */}
          <div className="mt-5 flex justify-center items-center gap-1.5">
            {STEPS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`الخطوة ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  k === i ? "w-6 bg-accent" : "w-1.5 bg-muted hover:bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center justify-between gap-2">
            <button
              onClick={() => setI(Math.max(0, i - 1))}
              disabled={i === 0}
              className="h-10 px-3 rounded-md text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 inline-flex items-center gap-1"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              السابق
            </button>

            <div className="flex items-center gap-2">
              {step.cta && (
                <Link
                  to={step.cta.to}
                  onClick={close}
                  className="h-10 px-4 rounded-md text-xs font-semibold text-accent hover:bg-accent/10"
                >
                  {step.cta.label}
                </Link>
              )}
              {isLast ? (
                <button
                  onClick={close}
                  className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 inline-flex items-center gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  ابدأ الاستخدام
                </button>
              ) : (
                <button
                  onClick={() => setI(i + 1)}
                  className="h-10 px-5 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 inline-flex items-center gap-1"
                >
                  التالي
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={close}
            className="mt-4 text-[11px] text-muted-foreground hover:text-foreground"
          >
            تخطي الجولة
          </button>
        </div>
      </div>
    </div>
  );
}
