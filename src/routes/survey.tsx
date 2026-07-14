import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { Star, TrendingUp, MessageSquare, Smile } from "lucide-react";

export const Route = createFileRoute("/survey")({
  head: () => ({ meta: [{ title: "استبيان رضا العملاء — مصرف النوران" }] }),
  component: SurveyPage,
});

const distribution = [
  { rating: 5, count: 842, pct: 68 },
  { rating: 4, count: 246, pct: 20 },
  { rating: 3, count: 84, pct: 7 },
  { rating: 2, count: 38, pct: 3 },
  { rating: 1, count: 24, pct: 2 },
];

const feedback = [
  { c: "سارة المسلاتي", r: 5, ch: "التطبيق", note: "خدمة سريعة ومختصرة وحلّت مشكلتي فوراً.", agent: "أحمد بن حليم", time: "قبل 12د" },
  { c: "خالد القمودي", r: 4, ch: "الموقع", note: "تجربة جيدة، وأتمنى إضافة خيار المكالمة الصوتية.", agent: "منال المقريف", time: "قبل 34د" },
  { c: "نورة المصراتي", r: 5, ch: "Messenger", note: "الموظفة كانت متعاونة ولطيفة جداً.", agent: "منى المسلاتي", time: "قبل ساعة" },
  { c: "بدر الورفلي", r: 2, ch: "البريد", note: "استغرق الرد وقتاً طويلاً وكان الحل جزئياً.", agent: "طارق البرغثي", time: "قبل 3س" },
];

function SurveyPage() {
  return (
    <AppShell title="استبيان رضا العملاء" subtitle="CSAT، NPS، ومراجعة التغذية الراجعة">
      <div className="grid grid-cols-4 gap-3 mb-5">
        <Kpi l="CSAT" v="4.6 / 5" i={Smile} c="text-success" />
        <Kpi l="NPS" v="+62" i={TrendingUp} c="text-info" />
        <Kpi l="عدد الردود" v="1,234" i={MessageSquare} c="text-foreground" />
        <Kpi l="معدل الاستجابة" v="47%" i={Star} c="text-warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="text-sm font-semibold mb-4">توزيع التقييمات</div>
          <div className="space-y-2">
            {distribution.map((d) => (
              <div key={d.rating} className="flex items-center gap-3">
                <div className="w-12 flex items-center gap-0.5">
                  {Array.from({ length: d.rating }).map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-warning text-warning" />
                  ))}
                </div>
                <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${d.pct}%` }} />
                </div>
                <div className="w-20 text-left text-[11px] font-mono text-muted-foreground">
                  {d.count} ({d.pct}%)
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <div className="text-xs font-semibold mb-3">إعدادات الاستبيان</div>
            <div className="space-y-2 text-[11px]">
              <Row k="إرسال بعد إغلاق المحادثة" v="نعم" />
              <Row k="التذكير بعد" v="24 ساعة" />
              <Row k="مدة الصلاحية" v="7 أيام" />
              <Row k="عدد الأسئلة" v="3 (تقييم + قناة + تعليق)" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-border flex items-center justify-between">
            <div className="text-sm font-semibold">آخر التعليقات</div>
            <StatusPill tone="info">مباشر</StatusPill>
          </div>
          <div className="divide-y divide-border">
            {feedback.map((f, i) => (
              <div key={i} className="p-4 hover:bg-muted/30">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-semibold">{f.c}</div>
                    <StatusPill tone="muted">{f.ch}</StatusPill>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < f.r ? "fill-warning text-warning" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="text-[11px] text-foreground/80 leading-relaxed">{f.note}</div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>الموظف: {f.agent}</span>
                  <span>{f.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ l, v, i: Icon, c }: { l: string; v: string; i: React.ComponentType<{ className?: string }>; c: string }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="text-[11px] text-muted-foreground">{l}</div>
        <Icon className={`h-4 w-4 ${c}`} />
      </div>
      <div className={`text-2xl font-bold font-mono mt-2 ${c}`}>{v}</div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/40">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold">{v}</span>
    </div>
  );
}