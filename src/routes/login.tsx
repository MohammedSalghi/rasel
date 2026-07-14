import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { Logo } from "@/components/app/logo";
import { SocialAuthButtons } from "@/components/app/social-auth-buttons";
import { ShieldCheck, KeyRound, Mail, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: `تسجيل الدخول — ${brand.name}` },
      { name: "description", content: `الدخول إلى ${brand.productName}.` },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const submitCreds = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 700);
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-[1.1fr_1fr] bg-background" dir="rtl">
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground relative overflow-hidden">
        <div className="relative z-10">
          <Logo size={96} />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-semibold ring-1 ring-accent/30 mb-6">
            منصة خدمة العملاء الذكية
          </div>
          <h2 className="text-4xl font-bold leading-snug text-white mb-4">
            منصة موحدة لإدارة تجربة العميل المصرفي بذكاء وأمان.
          </h2>
          <p className="text-sidebar-foreground/70 leading-relaxed">
            صندوق موحد للمحادثات، ذكاء اصطناعي مساعد، إدارة شكاوى، وتقارير أداء لحظية — كل ذلك في واجهة واحدة.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              { k: "99.99%", v: "توفر النظام" },
              { k: "< 3 د", v: "متوسط الاستجابة" },
              { k: "24/7", v: "الدعم الفني" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-bold text-accent">{s.k}</div>
                <div className="text-[11px] text-sidebar-foreground/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-[11px] text-sidebar-foreground/50">
          {brand.copyright}
        </div>
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 size-96 rounded-full bg-info/10 blur-3xl" />
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size={72} />
          </div>

          {step === "credentials" ? (
            <>
              <h1 className="text-2xl font-bold">تسجيل الدخول</h1>
              <p className="text-sm text-muted-foreground mt-1 mb-8">
                أدخل بيانات حسابك المؤسسي للوصول إلى المنصة.
              </p>

              {error && (
                <div className="mb-4 flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-xs ring-1 ring-destructive/20">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={submitCreds} className="space-y-4">
                <label className="block">
                  <span className="text-xs font-medium text-foreground">البريد المؤسسي</span>
                  <div className="mt-1.5 relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      defaultValue={`ahmed@${brand.emailDomain}`}
                      className="w-full h-11 pr-10 pl-3 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                      placeholder={`you@${brand.emailDomain}`}
                    />
                  </div>
                </label>
                <label className="block">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-foreground">كلمة المرور</span>
                    <button type="button" className="text-[11px] text-accent hover:underline">
                      نسيت كلمة المرور؟
                    </button>
                  </div>
                  <div className="mt-1.5 relative">
                    <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type={showPw ? "text" : "password"}
                      required
                      defaultValue="demopassword"
                      className="w-full h-11 pr-10 pl-10 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </label>
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                  <input type="checkbox" className="rounded border-input accent-accent" />
                  تذكرني على هذا الجهاز
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  متابعة
                </button>
                <button
                  type="button"
                  onClick={() => setError("بيانات الدخول غير صحيحة. حاول مرة أخرى أو تواصل مع مسؤول النظام.")}
                  className="w-full text-[11px] text-muted-foreground hover:text-foreground"
                >
                  عرض حالة خطأ (توضيحية)
                </button>
              </form>

              <div className="mt-6">
                <SocialAuthButtons mode="login" />
              </div>

              <p className="text-center text-xs text-muted-foreground mt-6">
                لا تملك حساباً؟{" "}
                <Link to="/signup" className="text-accent hover:underline font-medium">
                  أنشئ حساباً جديداً
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-semibold ring-1 ring-accent/30 mb-4">
                <ShieldCheck className="h-3.5 w-3.5" />
                تحقق ثنائي مطلوب
              </div>
              <h1 className="text-2xl font-bold">أدخل رمز التحقق</h1>
              <p className="text-sm text-muted-foreground mt-1 mb-8">
                أرسلنا رمزاً مكوناً من 6 أرقام إلى تطبيق المصادقة الخاص بك.
              </p>
              <div className="flex gap-2 justify-between mb-6" dir="ltr">
                {otp.map((v, i) => (
                  <input
                    key={i}
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => {
                      const next = [...otp];
                      next[i] = e.target.value.replace(/\D/, "");
                      setOtp(next);
                    }}
                    className="h-14 w-full rounded-md border border-input bg-card text-center text-xl font-bold font-mono outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
                  />
                ))}
              </div>
              <Link
                to="/dashboard"
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.localStorage.setItem("rasel:authed", "1");
                    window.localStorage.setItem("rasel:onboarded", "1");
                  }
                }}
                className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 flex items-center justify-center"
              >
                تحقق ودخول
              </Link>
              <button
                onClick={() => setStep("credentials")}
                className="w-full mt-3 text-xs text-muted-foreground hover:text-foreground"
              >
                → العودة إلى تسجيل الدخول
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}