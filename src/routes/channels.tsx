import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import {
  Globe,
  Smartphone,
  Mail,
  MessageCircle,
  Facebook,
  Plug,
  RefreshCw,
  Settings2,
  PlayCircle,
  AlertTriangle,
  Plus,
} from "lucide-react";

type Channel = {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "connected" | "disconnected" | "pending";
  enabled: boolean;
  lastSync: string;
  health: "healthy" | "degraded" | "down";
  msgs24h: number;
  errors: number;
};

const channels: Channel[] = [
  {
    id: "web",
    name: "الموقع الإلكتروني — Live Chat",
    desc: "ودجة الدردشة المضمّنة في موقع مصرف النوران",
    icon: Globe,
    status: "connected",
    enabled: true,
    lastSync: "قبل دقيقتين",
    health: "healthy",
    msgs24h: 482,
    errors: 0,
  },
  {
    id: "app",
    name: "تطبيق مصرف النوران",
    desc: "قناة الدردشة داخل تطبيق الهاتف الرسمي",
    icon: Smartphone,
    status: "connected",
    enabled: true,
    lastSync: "قبل 4 دقائق",
    health: "healthy",
    msgs24h: 317,
    errors: 1,
  },
  {
    id: "email",
    name: "البريد الإلكتروني",
    desc: "care@alnouran-bank.com",
    icon: Mail,
    status: "connected",
    enabled: true,
    lastSync: "قبل 12 دقيقة",
    health: "degraded",
    msgs24h: 96,
    errors: 3,
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    desc: "الصفحة الرسمية — مصرف النوران",
    icon: Facebook,
    status: "connected",
    enabled: true,
    lastSync: "قبل 8 دقائق",
    health: "healthy",
    msgs24h: 58,
    errors: 0,
  },
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    desc: "جاهز للتفعيل — بانتظار اعتماد Meta",
    icon: MessageCircle,
    status: "pending",
    enabled: false,
    lastSync: "لم تتم بعد",
    health: "down",
    msgs24h: 0,
    errors: 0,
  },
];

const healthTone: Record<Channel["health"], "success" | "warning" | "destructive"> = {
  healthy: "success",
  degraded: "warning",
  down: "destructive",
};
const healthLabel: Record<Channel["health"], string> = {
  healthy: "سليمة",
  degraded: "متذبذبة",
  down: "متوقفة",
};

export const Route = createFileRoute("/channels")({
  head: () => ({ meta: [{ title: "قنوات التواصل — مصرف النوران" }] }),
  component: ChannelsPage,
});

function ChannelsPage() {
  return (
    <AppShell
      title="قنوات التواصل"
      subtitle="ربط، مراقبة، وإدارة جميع قنوات خدمة العملاء"
      actions={
        <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" /> إضافة قناة
        </button>
      }
    >
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { l: "قنوات نشطة", v: "4 / 5", c: "text-success" },
          { l: "رسائل خلال 24 ساعة", v: "953", c: "text-info" },
          { l: "أخطاء اتصال", v: "4", c: "text-warning" },
          { l: "متوسط زمن المزامنة", v: "6 د", c: "text-foreground" },
        ].map((k) => (
          <div key={k.l} className="bg-card border border-border rounded-lg p-4">
            <div className="text-[11px] text-muted-foreground">{k.l}</div>
            <div className={`text-2xl font-bold font-mono mt-1 ${k.c}`}>{k.v}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div className="text-sm font-semibold">القنوات المتاحة</div>
          <div className="text-[11px] text-muted-foreground">
            التحديث التلقائي مفعّل — كل 60 ثانية
          </div>
        </div>
        <div className="divide-y divide-border">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <div key={ch.id} className="p-5 grid grid-cols-[auto_1fr_auto] gap-5 items-center hover:bg-muted/30">
                <div className="size-12 rounded-lg bg-primary/10 text-primary grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link to="/channels/$channelId" params={{ channelId: ch.id }} className="text-sm font-semibold hover:text-primary">{ch.name}</Link>
                    <StatusPill tone={healthTone[ch.health]}>{healthLabel[ch.health]}</StatusPill>
                    {ch.status === "pending" && <StatusPill tone="warning">قيد التفعيل</StatusPill>}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{ch.desc}</div>
                  <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <RefreshCw className="h-3 w-3" /> آخر مزامنة: {ch.lastSync}
                    </span>
                    <span>رسائل: <span className="font-mono text-foreground">{ch.msgs24h}</span></span>
                    <span className={ch.errors > 0 ? "text-warning" : ""}>
                      أخطاء: <span className="font-mono">{ch.errors}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="h-8 px-2.5 rounded-md border border-border text-[11px] font-semibold hover:bg-muted inline-flex items-center gap-1">
                    <PlayCircle className="h-3.5 w-3.5" /> اختبار
                  </button>
                  <button className="h-8 px-2.5 rounded-md border border-border text-[11px] font-semibold hover:bg-muted inline-flex items-center gap-1">
                    <AlertTriangle className="h-3.5 w-3.5" /> السجل
                  </button>
                  <Link to="/channels/$channelId" params={{ channelId: ch.id }} className="h-8 px-2.5 rounded-md border border-border text-[11px] font-semibold hover:bg-muted inline-flex items-center gap-1">
                    <Settings2 className="h-3.5 w-3.5" /> إدارة
                  </Link>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <div className={`relative w-10 h-5 rounded-full ${ch.enabled ? "bg-success" : "bg-muted"}`}>
                      <div className={`absolute top-0.5 size-4 bg-white rounded-full shadow ${ch.enabled ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </label>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-border bg-muted/40 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Plug className="h-3.5 w-3.5" />
          البنية جاهزة لإضافة قنوات مستقبلية (Twitter، Instagram، Telegram) دون تغيير في الشيفرة.
        </div>
      </div>
    </AppShell>
  );
}