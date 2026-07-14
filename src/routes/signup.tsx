import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { Logo } from "@/components/app/logo";
import { SocialAuthButtons } from "@/components/app/social-auth-buttons";
import {
  User,
  Mail,
  Phone,
  KeyRound,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: `إنشاء حساب — ${brand.name}` },
      {
        name: "description",
        content: `أنشئ حسابك المؤسسي على ${brand.productName}.`,
      },
      { property: "og:title", content: `إنشاء حساب — ${brand.name}` },
      {
        property: "og:description",
        content: `تسجيل موظفين جدد على ${brand.productName}.`,
      },
    ],
  }),
  component: SignupPage,
});

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  accept: boolean;
};

function SignupPage() {
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
    accept: false,
  });

  const strength = passwordStrength(form.password);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8)
      return setError("يجب أن تكون كلمة المرور 8 أحرف على الأقل.");
    if (form.password !== form.confirm)
      return setError("كلمتا المرور غير متطابقتين.");
    if (!form.accept)
      return setError("يجب الموافقة على الشروط والأحكام للمتابعة.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("rasel:authed", "1");
        window.localStorage.setItem("rasel:onboarded", "1");
        window.localStorage.removeItem("rasel:tour:done");
      }
      navigate({ to: "/dashboard" });
    }, 700);
  };

  return (
    <div
      className="min-h-screen w-full grid lg:grid-cols-[1.1fr_1fr] bg-background"
      dir="rtl"
    >
      {/* Brand side */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-sidebar text-sidebar-foreground relative overflow-hidden">
        <div className="relative z-10">
          <Logo size={96} />
        </div>
        <div className="relative z-10 max-w-md">
          <div className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-semibold ring-1 ring-accent/30 mb-6">
            انضم إلى فريق خدمة العملاء
          </div>
          <h2 className="text-4xl font-bold leading-snug text-white mb-4">
            حساب مؤسسي واحد لكل أدوات تجربة العميل المصرفي.
          </h2>
          <p className="text-sidebar-foreground/70 leading-relaxed">
            سجّل حسابك المؤسسي للوصول إلى الصندوق الموحد، المساعد الذكي، وإدارة
            الشكاوى والتقارير في واجهة واحدة آمنة.
          </p>
          <ul className="mt-10 space-y-3 text-sm">
            {[
              "مصادقة ثنائية إلزامية لكل الحسابات",
              "صلاحيات دقيقة حسب الدور الوظيفي",
              "توافق كامل مع سياسات حماية بيانات العملاء",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span className="text-sidebar-foreground/80">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative z-10 text-[11px] text-sidebar-foreground/50">
          {brand.copyright}
        </div>
        <div className="absolute -top-32 -left-32 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 size-96 rounded-full bg-info/10 blur-3xl" />
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Logo size={72} />
          </div>

          <h1 className="text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            سنستخدم هذه المعلومات لإعداد حسابك وربطك بفريقك.
          </p>

          {error && (
            <div className="mb-4 flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-xs ring-1 ring-destructive/20">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              label="الاسم الكامل"
              icon={<User className="h-4 w-4 text-muted-foreground" />}
            >
              <input
                required
                value={form.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                placeholder="مثال: أحمد محمود"
                className="w-full h-11 pr-10 pl-3 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </Field>

            <Field
              label="البريد المؤسسي"
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            >
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder={`you@${brand.emailDomain}`}
              className="w-full h-11 pr-10 pl-3 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
            />
            </Field>

            <Field
              label="رقم الهاتف"
              icon={<Phone className="h-4 w-4 text-muted-foreground" />}
            >
              <input
                required
                type="tel"
                dir="ltr"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder="+218 91 234 5678"
                className="w-full h-11 pr-10 pl-3 rounded-md border border-input bg-card text-sm text-right outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
            </Field>

            <Field
              label="كلمة المرور"
              icon={<KeyRound className="h-4 w-4 text-muted-foreground" />}
            >
              <input
                required
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
                className="w-full h-11 pr-10 pl-10 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPw((s) => !s)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPw ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            {form.password && (
              <div className="space-y-1.5" aria-live="polite">
                <div className="flex gap-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        i < strength.score
                          ? strength.color
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  قوة كلمة المرور:{" "}
                  <span className="font-medium text-foreground">{strength.label}</span>
                </div>
              </div>
            )}

            <Field
              label="تأكيد كلمة المرور"
              icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
            >
              <input
                required
                type={showPw2 ? "text" : "password"}
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
                className="w-full h-11 pr-10 pl-10 rounded-md border border-input bg-card text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
              />
              <button
                type="button"
                onClick={() => setShowPw2((s) => !s)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPw2 ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </Field>

            <label className="flex items-start gap-2 text-xs text-muted-foreground pt-1">
              <input
                type="checkbox"
                checked={form.accept}
                onChange={(e) => set("accept", e.target.checked)}
                className="mt-0.5 rounded border-input accent-accent"
              />
              <span>
                أوافق على{" "}
                <a href="#" className="text-accent hover:underline">
                  الشروط والأحكام
                </a>{" "}
                و
                <a href="#" className="text-accent hover:underline mr-1">
                  سياسة الخصوصية
                </a>{" "}
                ل{brand.name}.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              إنشاء الحساب
            </button>

            <p className="text-center text-xs text-muted-foreground pt-2">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="text-accent hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </form>

          <div className="mt-6">
            <SocialAuthButtons mode="signup" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-foreground">{label}</span>
      <div className="mt-1.5 relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</span>
        {children}
      </div>
    </label>
  );
}

function passwordStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "ضعيفة جداً", color: "bg-destructive" },
    { label: "ضعيفة", color: "bg-destructive" },
    { label: "متوسطة", color: "bg-warning" },
    { label: "قوية", color: "bg-info" },
    { label: "قوية جداً", color: "bg-success" },
  ];
  return { score, ...map[score] };
}
