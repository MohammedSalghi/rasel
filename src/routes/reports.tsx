import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/reports")({
  head: () => ({ meta: [{ title: "التقارير — مصرف النوران" }] }),
  component: ReportsPage,
});

const barData = [
  { l: "الأحد", v: 42 },
  { l: "الاثنين", v: 58 },
  { l: "الثلاثاء", v: 51 },
  { l: "الأربعاء", v: 74 },
  { l: "الخميس", v: 63 },
  { l: "الجمعة", v: 38 },
  { l: "السبت", v: 44 },
];

const agents = [
  { n: "أحمد بن حليم", h: 128, s: "01:42", r: 4.9 },
  { n: "منى المسلاتي", h: 96, s: "02:18", r: 4.8 },
  { n: "سعد البرغثي", h: 74, s: "03:04", r: 4.6 },
  { n: "ليلى الترهوني", h: 63, s: "02:52", r: 4.7 },
];

const topics = [
  { t: "مشاكل تفعيل البطاقات", n: 187, p: 24 },
  { t: "استفسارات الرسوم", n: 142, p: 18 },
  { t: "التحويلات الدولية", n: 118, p: 15 },
  { t: "إعادة تعيين كلمات المرور", n: 96, p: 12 },
  { t: "استفسارات القروض", n: 74, p: 9 },
];

function ReportsPage() {
  const max = Math.max(...barData.map((b) => b.v));
  return (
    <AppShell title="التقارير" subtitle="مؤشرات الأداء وتحليل جودة الخدمة">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {[
          { l: "إجمالي المحادثات", v: "3,428", d: "+18%" },
          { l: "متوسط الاستجابة", v: "02:12", d: "-14%" },
          { l: "زمن الحل", v: "18:40", d: "-6%" },
          { l: "رضا العملاء", v: "4.7 / 5", d: "+3%" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-lg p-4">
            <div className="text-[11px] text-muted-foreground">{s.l}</div>
            <div className="text-2xl font-bold font-mono mt-1">{s.v}</div>
            <div className="text-[11px] text-success mt-1">{s.d} هذا الأسبوع</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-6">المحادثات حسب أيام الأسبوع</div>
          <div className="h-64 flex items-stretch gap-3">
            {barData.map((b) => (
              <div key={b.l} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
                <div className="text-[10px] font-mono font-bold">{b.v}</div>
                <div className="w-full rounded-t bg-gradient-to-t from-primary to-accent/70" style={{ height: `${(b.v / max) * 100}%`, minHeight: 6 }} />
                <div className="text-[10px] text-muted-foreground">{b.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-4">أداء الذكاء الاصطناعي</div>
          <div className="relative size-40 mx-auto grid place-items-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-muted)" strokeWidth="10" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-info)" strokeWidth="10" strokeDasharray={`${94 * 2.638} 999`} strokeLinecap="round" />
            </svg>
            <div className="text-center">
              <div className="text-3xl font-bold font-mono">94%</div>
              <div className="text-[10px] text-muted-foreground">دقة</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6 text-center">
            <div><div className="text-lg font-bold font-mono">1,284</div><div className="text-[10px] text-muted-foreground">اقتراح</div></div>
            <div><div className="text-lg font-bold font-mono">78%</div><div className="text-[10px] text-muted-foreground">حل من أول مرة</div></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-5 border-b border-border text-sm font-semibold">أداء الموظفين</div>
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
              <tr>
                <th className="font-medium py-2 px-4">الموظف</th>
                <th className="font-medium py-2 px-4">محادثات</th>
                <th className="font-medium py-2 px-4">متوسط الاستجابة</th>
                <th className="font-medium py-2 px-4">التقييم</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {agents.map((a) => (
                <tr key={a.n}>
                  <td className="py-3 px-4 text-xs font-medium">{a.n}</td>
                  <td className="py-3 px-4 text-xs font-mono">{a.h}</td>
                  <td className="py-3 px-4 text-xs font-mono">{a.s}</td>
                  <td className="py-3 px-4 text-xs font-mono text-accent font-bold">{a.r}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-4">أكثر الشكاوى تكراراً</div>
          <div className="space-y-3">
            {topics.map((t) => (
              <div key={t.t}>
                <div className="flex justify-between text-xs mb-1">
                  <span>{t.t}</span>
                  <span className="font-mono text-muted-foreground">{t.n} ({t.p}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-l from-destructive to-warning" style={{ width: `${t.p * 3}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}