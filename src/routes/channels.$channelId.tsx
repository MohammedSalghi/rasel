import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import {
  ArrowRight,
  Globe,
  Smartphone,
  Mail,
  MessageCircle,
  Facebook,
  PlayCircle,
  RefreshCw,
  Power,
  ShieldCheck,
  Webhook,
  KeyRound,
  Bell,
  Activity,
  AlertTriangle,
} from "lucide-react";

export const Route = createFileRoute("/channels/$channelId")({
  head: () => ({ meta: [{ title: "إدارة القناة — مصرف النوران" }] }),
  component: ChannelDetail,
});

type ChannelMeta = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  endpoint: string;
  auth: string;
  provider: string;
  webhook: string;
};

const meta: Record<string, ChannelMeta> = {
  web: { name: "الموقع الإلكتروني — Live Chat", icon: Globe, endpoint: "https://www.alnouran-bank.com/chat", auth: "Widget Key + JWT", provider: "Nouran Web SDK", webhook: "https://cx.alnouran-bank.local/hooks/web" },
  app: { name: "تطبيق مصرف النوران", icon: Smartphone, endpoint: "mobile://alnouran/chat", auth: "OAuth 2.0 (mobile)", provider: "Mobile Gateway", webhook: "https://cx.alnouran-bank.local/hooks/app" },
  email: { name: "البريد الإلكتروني", icon: Mail, endpoint: "care@alnouran-bank.com", auth: "IMAP/SMTP + STARTTLS", provider: "Exchange Online", webhook: "IMAP IDLE" },
  messenger: { name: "Facebook Messenger", icon: Facebook, endpoint: "graph.facebook.com/v20.0", auth: "Meta Page Access Token", provider: "Meta Graph API", webhook: "https://cx.alnouran-bank.local/hooks/messenger" },
  whatsapp: { name: "WhatsApp Business", icon: MessageCircle, endpoint: "graph.facebook.com/v20.0/whatsapp", auth: "WABA System User", provider: "Meta Cloud API", webhook: "https://cx.alnouran-bank.local/hooks/whatsapp" },
};

function ChannelDetail() {
  const { channelId } = Route.useParams();
  const m = meta[channelId] ?? meta.web;
  const Icon = m.icon;
  return (
    <AppShell title={m.name} subtitle="إعدادات الاتصال، سير العمل، والمراقبة اللحظية">
      <div className="mb-4 text-[11px] text-muted-foreground flex items-center gap-2">
        <Link to="/channels" className="hover:text-primary">قنوات التواصل</Link>
        <ArrowRight className="h-3 w-3" />
        <span className="text-foreground font-semibold">{m.name}</span>
      </div>

      <div className="bg-card border border-border rounded-lg p-5 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold">{m.name}</div>
            <div className="text-[11px] text-muted-foreground font-mono" dir="ltr">{m.endpoint}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <StatusPill tone="success">متصلة</StatusPill>
          <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold hover:bg-muted inline-flex items-center gap-1.5"><PlayCircle className="h-3.5 w-3.5" /> اختبار الاتصال</button>
          <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold hover:bg-muted inline-flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> إعادة المزامنة</button>
          <button className="h-8 px-3 rounded-md border border-destructive/40 text-destructive text-[11px] font-semibold hover:bg-destructive/10 inline-flex items-center gap-1.5"><Power className="h-3.5 w-3.5" /> إيقاف القناة</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4">
        <div className="space-y-4">
          <Section title="سير عمل القناة (End-to-End Workflow)">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2 text-center">
              {[
                { t: "استقبال الرسالة", d: "من مزود القناة عبر Webhook مؤمّن" },
                { t: "التحقق والتوثيق", d: "توقيع HMAC + إزالة البيانات الحساسة" },
                { t: "توحيد في Inbox", d: "بطاقة محادثة موحّدة بجميع القنوات" },
                { t: "توجيه ذكي", d: "AI أولاً، أو موظف حسب المهارة" },
                { t: "إغلاق ومتابعة", d: "تسجيل، تقييم CSAT، وأرشفة" },
              ].map((s, i) => (
                <div key={s.t} className="relative bg-muted/40 border border-border rounded-md p-3">
                  <div className="text-[10px] text-muted-foreground font-mono">الخطوة {i + 1}</div>
                  <div className="text-xs font-semibold mt-1">{s.t}</div>
                  <div className="text-[10px] text-muted-foreground mt-1 leading-relaxed">{s.d}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-[11px] text-muted-foreground leading-relaxed bg-info/5 border border-info/20 rounded-md p-3">
              في حال فشل أي خطوة يُسجَّل الحدث في «سجل الأخطاء» أدناه، وتُعاد المحاولة تلقائياً حتى 3 مرات، ثم تُصعَّد إلى مشرف القناة.
            </div>
          </Section>

          <Section title="إعدادات الاتصال">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="النقطة النهائية" value={m.endpoint} mono />
              <Field label="طريقة التوثيق" value={m.auth} />
              <Field label="المزوّد" value={m.provider} />
              <Field label="عنوان Webhook" value={m.webhook} mono />
              <Field label="المهلة القصوى" value="15 ثانية" />
              <Field label="عدد إعادة المحاولات" value="3" />
              <Field label="بيئة التشغيل" value="الإنتاج" />
              <Field label="مراقبة الحالة كل" value="60 ثانية" />
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button className="h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">حفظ التغييرات</button>
              <button className="h-9 px-3 rounded-md border border-border text-xs font-semibold hover:bg-muted">تدوير المفاتيح</button>
            </div>
          </Section>

          <Section title="سجل الأحداث الأخير">
            <table className="w-full text-sm">
              <thead className="text-[11px] text-muted-foreground text-right">
                <tr><th className="py-2">الوقت</th><th>النوع</th><th>الوصف</th><th>الحالة</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { t: "10:44", k: "webhook.received", d: "رسالة واردة #MSG-88213", ok: true },
                  { t: "10:41", k: "connection.retry", d: "إعادة اتصال بعد Timeout — نجحت", ok: true },
                  { t: "10:32", k: "auth.refresh", d: "تحديث Access Token", ok: true },
                  { t: "09:58", k: "webhook.failed", d: "توقيع HMAC غير صالح", ok: false },
                  { t: "09:41", k: "sync.completed", d: "مزامنة الرسائل غير المستلمة (24)", ok: true },
                ].map((e, i) => (
                  <tr key={i} className="hover:bg-muted/30">
                    <td className="py-2 text-[11px] font-mono">{e.t}</td>
                    <td className="text-[11px] font-mono text-muted-foreground" dir="ltr">{e.k}</td>
                    <td className="text-xs">{e.d}</td>
                    <td><StatusPill tone={e.ok ? "success" : "destructive"}>{e.ok ? "نجاح" : "فشل"}</StatusPill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </div>

        <div className="space-y-4">
          <SidePanel title="مراقبة الأداء" icon={Activity}>
            <Metric l="زمن استجابة القناة" v="182ms" />
            <Metric l="رسائل ناجحة (24س)" v="482" />
            <Metric l="رسائل فاشلة (24س)" v="0" />
            <Metric l="Uptime (30ي)" v="99.98%" />
          </SidePanel>

          <SidePanel title="الأمان والتوثيق" icon={ShieldCheck}>
            <Line l="توقيع HMAC" v="مفعّل" ok />
            <Line l="TLS 1.3" v="مفعّل" ok />
            <Line l="IP Allow-list" v="مطبّق" ok />
            <Line l="تدقيق كل رسالة" v="مفعّل" ok />
          </SidePanel>

          <SidePanel title="Webhook" icon={Webhook}>
            <div className="text-[10px] font-mono text-muted-foreground break-all" dir="ltr">{m.webhook}</div>
            <button className="mt-2 h-8 w-full rounded-md border border-border text-[11px] font-semibold hover:bg-muted">نسخ العنوان</button>
          </SidePanel>

          <SidePanel title="إعدادات الإشعارات" icon={Bell}>
            <Toggle l="عند فشل الاتصال" on />
            <Toggle l="عند تراكم الرسائل" on />
            <Toggle l="عند انتهاء صلاحية المفتاح" on />
            <Toggle l="تقرير أسبوعي" />
          </SidePanel>

          <SidePanel title="المفاتيح والشهادات" icon={KeyRound}>
            <Line l="آخر تدوير" v="قبل 12 يوم" />
            <Line l="انتهاء الصلاحية" v="بعد 78 يوم" />
            <button className="w-full mt-2 h-8 rounded-md border border-border text-[11px] font-semibold hover:bg-muted">إدارة الشهادات</button>
          </SidePanel>

          <div className="bg-warning/5 border border-warning/20 rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
            <div className="text-[11px] text-muted-foreground leading-relaxed">
              إيقاف القناة يوقف استقبال الرسائل الجديدة فقط؛ المحادثات المفتوحة تُغلَق يدوياً من قِبل الموظفين.
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="text-sm font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}
function SidePanel({ title, icon: Icon, children }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="text-xs font-semibold mb-3 flex items-center gap-2"><Icon className="h-3.5 w-3.5 text-primary" /> {title}</div>
      <div className="space-y-1.5 text-xs">{children}</div>
    </div>
  );
}
function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="p-2.5 rounded-md bg-muted/40 border border-border">
      <div className="text-[10px] text-muted-foreground">{label}</div>
      <div className={"text-xs mt-0.5 " + (mono ? "font-mono" : "font-semibold")} dir={mono ? "ltr" : undefined}>{value}</div>
    </div>
  );
}
function Metric({ l, v }: { l: string; v: string }) {
  return <div className="flex items-center justify-between p-2 rounded bg-muted/40"><span className="text-muted-foreground">{l}</span><span className="font-mono font-semibold">{v}</span></div>;
}
function Line({ l, v, ok }: { l: string; v: string; ok?: boolean }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{l}</span><span className={"font-mono " + (ok ? "text-success" : "")}>{v}</span></div>;
}
function Toggle({ l, on }: { l: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between p-1.5">
      <span className="text-muted-foreground">{l}</span>
      <div className={"relative w-8 h-4 rounded-full " + (on ? "bg-success" : "bg-muted")}>
        <div className={"absolute top-0.5 size-3 bg-white rounded-full " + (on ? "right-0.5" : "left-0.5")} />
      </div>
    </div>
  );
}