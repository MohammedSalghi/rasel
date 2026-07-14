import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { GitBranch, MessageSquare, Bot, User, Server, ShieldCheck, Bell, CheckCircle2, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/workflows")({
  head: () => ({ meta: [{ title: "سير العمل — مصرف النوران" }] }),
  component: WorkflowsPage,
});

type Node = { label: string; sub: string; icon: React.ComponentType<{ className?: string }>; tone: "primary" | "info" | "success" | "warning" };

const conversationFlow: Node[] = [
  { label: "استقبال الرسالة", sub: "من قناة (Web/App/WhatsApp/…)", icon: MessageSquare, tone: "primary" },
  { label: "توحيد وإثراء", sub: "ربطها بالعميل من CRM", icon: GitBranch, tone: "info" },
  { label: "تحليل الذكاء الاصطناعي", sub: "نية + بحث محلي في المعرفة", icon: Bot, tone: "info" },
  { label: "إجابة أو تصعيد", sub: "حسب نسبة الثقة (≥ 85%)", icon: ShieldCheck, tone: "success" },
  { label: "موظف مختص", sub: "تحويل مع ملخص كامل", icon: User, tone: "warning" },
  { label: "إغلاق + تقييم", sub: "CSAT + أرشفة + تدقيق", icon: CheckCircle2, tone: "success" },
];

const bankingFlow: Node[] = [
  { label: "طلب داخل المحادثة", sub: "مثال: استعلام رصيد", icon: MessageSquare, tone: "primary" },
  { label: "التحقق من الهوية", sub: "حسب سياسات المصرف", icon: ShieldCheck, tone: "warning" },
  { label: "استدعاء Core Banking", sub: "عبر Adapter مؤمّن (mTLS)", icon: Server, tone: "info" },
  { label: "استلام + تحقق", sub: "تصفية الحقول حسب الصلاحية", icon: GitBranch, tone: "info" },
  { label: "عرض للعميل", sub: "داخل المحادثة أو للموظف", icon: User, tone: "success" },
  { label: "تسجيل في التدقيق", sub: "Trace كامل قابل للاسترجاع", icon: CheckCircle2, tone: "success" },
];

const failureFlow: Node[] = [
  { label: "فشل الاتصال", sub: "Timeout / 5xx / 401", icon: Server, tone: "warning" },
  { label: "إعادة تلقائية", sub: "Backoff 5د → 15د → 45د", icon: GitBranch, tone: "info" },
  { label: "إشعار المشرف", sub: "بعد 3 محاولات فاشلة", icon: Bell, tone: "warning" },
  { label: "معالجة يدوية", sub: "من قائمة إعادة الإرسال", icon: User, tone: "primary" },
  { label: "إبلاغ العميل", sub: "برسالة اعتذار مؤتمتة", icon: MessageSquare, tone: "success" },
];

function WorkflowsPage() {
  return (
    <AppShell title="سير العمل — نظرة شاملة" subtitle="كيف تتدفق البيانات بين جميع وحدات المنصة">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-6">
        <Kpi l="سير عمل نشط" v="14" tone="info" />
        <Kpi l="عمليات مكتملة (24س)" v="8,412" tone="success" />
        <Kpi l="تحتاج تدخّل بشري" v="42" tone="warning" />
      </div>

      <FlowSection title="1 · دورة حياة المحادثة (Conversation Lifecycle)" subtitle="من وصول الرسالة إلى إغلاقها" nodes={conversationFlow} />
      <FlowSection title="2 · التكامل مع النظام المصرفي (Core Banking)" subtitle="عند طلب بيانات أو عملية بنكية" nodes={bankingFlow} />
      <FlowSection title="3 · معالجة حالات الفشل (Failure Handling)" subtitle="سياسة استعادة العمليات دون فقد بيانات" nodes={failureFlow} />

      <div className="bg-card border border-border rounded-lg p-5 mt-4">
        <div className="text-sm font-semibold mb-4">قواعد الترابط بين الوحدات</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px]">
          {[
            { a: "قنوات التواصل", b: "المحادثات الموحّدة", d: "كل رسالة تُطبَع بمعرف قناتها ومصدرها، وتُدمج في Inbox واحد." },
            { a: "المحادثات", b: "الذكاء الاصطناعي", d: "أي محادثة جديدة تمرّ على النموذج المحلي أولاً لتحديد نية العميل." },
            { a: "الذكاء الاصطناعي", b: "قاعدة المعرفة", d: "الإجابات تُبنى حصراً من المصادر الداخلية المفهرسة، مع ذِكر المصدر." },
            { a: "الذكاء الاصطناعي", b: "الموظف", d: "عند ثقة < 85% يتم التحويل الفوري مع تسليم ملخص السياق." },
            { a: "المحادثات", b: "التكامل المصرفي", d: "أي طلب بيانات يمرّ عبر Adapter، مع تسجيل Trace كامل." },
            { a: "التكامل المصرفي", b: "سجل التدقيق", d: "كل طلب/استجابة يُخزَّن مع الوقت والمستخدم لمدة 7 سنوات." },
            { a: "الشكاوى", b: "التقارير", d: "SLA ومصادر الشكاوى تُغذّي التقارير التنفيذية آلياً." },
            { a: "الصلاحيات", b: "جميع الوحدات", d: "أي إجراء يُفحَص مقابل مصفوفة الأدوار قبل التنفيذ." },
          ].map((r, i) => (
            <div key={i} className="p-3 rounded-md bg-muted/40 border border-border">
              <div className="flex items-center gap-1.5 text-xs font-semibold">
                <span className="text-primary">{r.a}</span>
                <ArrowLeft className="h-3 w-3 text-muted-foreground" />
                <span>{r.b}</span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

function FlowSection({ title, subtitle, nodes }: { title: string; subtitle: string; nodes: Node[] }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-[11px] text-muted-foreground">{subtitle}</div>
        </div>
        <StatusPill tone="info">{nodes.length} خطوات</StatusPill>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-stretch">
        {nodes.map((n, i) => {
          const Icon = n.icon;
          const toneMap = {
            primary: "bg-primary/10 text-primary ring-primary/20",
            info: "bg-info/10 text-info ring-info/20",
            success: "bg-success/10 text-success ring-success/20",
            warning: "bg-warning/10 text-warning ring-warning/20",
          } as const;
          return (
            <div key={i} className="relative flex-1 rounded-md border border-border bg-muted/30 p-3">
              <div className={"size-8 rounded-md grid place-items-center ring-1 " + toneMap[n.tone]}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="text-[10px] text-muted-foreground font-mono mt-2">الخطوة {i + 1}</div>
              <div className="text-xs font-semibold mt-0.5">{n.label}</div>
              <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{n.sub}</div>
              {i < nodes.length - 1 && (
                <div className="hidden md:block absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-px bg-border" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Kpi({ l, v, tone }: { l: string; v: string; tone: "info" | "success" | "warning" }) {
  const c = { info: "text-info", success: "text-success", warning: "text-warning" }[tone];
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-[11px] text-muted-foreground">{l}</div>
      <div className={"text-2xl font-bold font-mono mt-1 " + c}>{v}</div>
    </div>
  );
}