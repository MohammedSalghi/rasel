import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/app/app-shell";
import { brand } from "@/lib/brand";
import {
  conversations as seedConversations,
  activeMessages as seedActiveMessages,
  channelLabels,
  priorityLabels,
  statusLabels,
  staffUsers,
  type Conversation,
  type Message,
  type ChannelKey,
} from "@/lib/mock-data";
import {
  Search,
  Filter,
  Paperclip,
  Send,
  Sparkles,
  UserPlus,
  X,
  MoreVertical,
  StickyNote,
  Reply,
  MessageSquare,
  Phone,
  Mail as MailIcon,
  Smartphone,
  Globe,
  Zap,
  Instagram,
  Facebook,
  Twitter,
  Send as TelegramIcon,
  Check,
  CheckCheck,
} from "lucide-react";

export const Route = createFileRoute("/inbox")({
  head: () => ({ meta: [{ title: "الصندوق الموحد — مصرف النوران" }] }),
  component: InboxPage,
});

const channelIcons: Record<ChannelKey, typeof MessageSquare> = {
  whatsapp: MessageSquare,
  web: Globe,
  email: MailIcon,
  app: Smartphone,
  phone: Phone,
  instagram: Instagram,
  messenger: Facebook,
  twitter: Twitter,
  telegram: TelegramIcon,
};

const channelBrand: Record<ChannelKey, { bg: string; fg: string }> = {
  whatsapp: { bg: "bg-[#25D366]", fg: "text-white" },
  instagram: {
    bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
    fg: "text-white",
  },
  messenger: {
    bg: "bg-gradient-to-tr from-[#00B2FF] to-[#006AFF]",
    fg: "text-white",
  },
  twitter: { bg: "bg-[#0F172A]", fg: "text-white" },
  telegram: { bg: "bg-[#229ED9]", fg: "text-white" },
  web: { bg: "bg-muted", fg: "text-foreground" },
  email: { bg: "bg-[#EA4335]", fg: "text-white" },
  app: { bg: "bg-primary", fg: "text-primary-foreground" },
  phone: { bg: "bg-success", fg: "text-white" },
};

const priorityColor = {
  high: "bg-destructive/10 text-destructive ring-destructive/20",
  medium: "bg-warning/15 text-warning ring-warning/25",
  low: "bg-muted text-muted-foreground ring-border",
} as const;

const statusColor = {
  active: "bg-success/10 text-success ring-success/20",
  waiting: "bg-warning/15 text-warning ring-warning/25",
  resolved: "bg-muted text-muted-foreground ring-border",
  ai: "bg-info/10 text-info ring-info/20",
} as const;

// Quick reply presets
const quickReplies: Record<string, string> = {
  "#تحية": "السلام عليكم ورحمة الله وبركاته، أهلاً بكم في خدمة عملاء مصرف النوران. كيف يمكنني مساعدتكم اليوم؟",
  "#المستندات_المطلوبة":
    "تفضلوا قائمة المستندات المطلوبة:\n• صورة من الهوية الوطنية سارية المفعول\n• إثبات عنوان حديث (لا يتجاوز 3 أشهر)\n• آخر كشف حساب راتب",
  "#ساعات_العمل": "ساعات عمل خدمة العملاء: من الأحد إلى الخميس، من الساعة 8:00 صباحاً حتى 4:00 عصراً. الجمعة والسبت إجازة.",
  "#شكراً": "شكراً جزيلاً لتواصلكم مع مصرف النوران. سعدنا بخدمتكم، ونتمنى لكم يوماً موفقاً.",
};

// Simple canned auto-replies from the "customer" so the chat feels alive
const autoReplies = [
  "شكراً على الرد السريع.",
  "تمام، سأجرب ذلك الآن.",
  "هل تحتاج معلومات أخرى مني؟",
  "ممتاز، بارك الله فيك.",
  "طيب، بانتظار التحديث منكم.",
];

function nowHHMM(): string {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function InboxPage() {
  // ---- State ---------------------------------------------------------------
  const [convs, setConvs] = useState<Conversation[]>(() => seedConversations.map((c) => ({ ...c })));
  const [messagesById, setMessagesById] = useState<Record<string, Message[]>>(() => {
    const map: Record<string, Message[]> = {};
    map[seedConversations[0].id] = seedActiveMessages.map((m) => ({ ...m }));
    // Seed a first "customer" message for each other convo so the pane is never empty
    for (const c of seedConversations.slice(1)) {
      map[c.id] = [
        { id: `${c.id}-m1`, role: "customer", text: c.preview, time: c.time },
      ];
    }
    return map;
  });
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string>(seedConversations[0].id);
  const [filter, setFilter] = useState<"all" | "mine" | "unassigned">("all");
  const [channelFilter, setChannelFilter] = useState<"all" | ChannelKey>("all");
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"reply" | "note">("reply");
  const [showTransfer, setShowTransfer] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const selected = convs.find((c) => c.id === selectedId) ?? convs[0];
  const messages = messagesById[selected.id] ?? [];
  const draft = drafts[selected.id] ?? "";

  // ---- Derived list --------------------------------------------------------
  const visibleConversations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return convs.filter((c) => {
      if (channelFilter !== "all" && c.channel !== channelFilter) return false;
      if (filter === "mine" && c.agent !== brand.demoUser.fullName) return false;
      if (filter === "unassigned" && c.agent !== "غير معين") return false;
      if (!q) return true;
      return (
        c.customer.toLowerCase().includes(q) ||
        c.ref.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.tag.toLowerCase().includes(q)
      );
    });
  }, [convs, channelFilter, filter, query]);

  const SelectedChannelIcon = channelIcons[selected.channel];
  const selectedBrand = channelBrand[selected.channel];

  // ---- Effects -------------------------------------------------------------
  // Clear unread when selecting a conversation
  useEffect(() => {
    setConvs((prev) =>
      prev.map((c) => (c.id === selectedId && c.unread ? { ...c, unread: 0 } : c)),
    );
  }, [selectedId]);

  // Auto-scroll to newest message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, typing, selectedId]);

  // ---- Actions -------------------------------------------------------------
  function updateConv(id: string, patch: Partial<Conversation>) {
    setConvs((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }

  function appendMessage(convId: string, msg: Message) {
    setMessagesById((prev) => ({
      ...prev,
      [convId]: [...(prev[convId] ?? []), msg],
    }));
  }

  function handleSend() {
    const text = draft.trim();
    if (!text) return;

    const convId = selected.id;
    const time = nowHHMM();
    const isNote = tab === "note";

    const msg: Message = {
      id: `${convId}-${Date.now()}`,
      role: isNote ? "note" : "agent",
      text,
      time,
    };
    appendMessage(convId, msg);
    setDrafts((prev) => ({ ...prev, [convId]: "" }));

    if (!isNote) {
      updateConv(convId, {
        preview: text.slice(0, 80),
        time,
        status: selected.status === "resolved" ? "active" : selected.status,
        agent: selected.agent === "غير معين" ? brand.demoUser.fullName : selected.agent,
      });

      // Simulate a customer reply
      setTyping(true);
      const delay = 1000 + Math.random() * 1200;
      window.setTimeout(() => {
        const reply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
        const rTime = nowHHMM();
        appendMessage(convId, {
          id: `${convId}-${Date.now()}-r`,
          role: "customer",
          text: reply,
          time: rTime,
        });
        // Only update preview if this conv is not being viewed — otherwise keep last agent line as recent context.
        setConvs((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  preview: reply.slice(0, 80),
                  time: rTime,
                  unread: c.id === selectedId ? 0 : (c.unread ?? 0) + 1,
                }
              : c,
          ),
        );
        setTyping(false);
      }, delay);
    }

    // Refocus textarea
    textareaRef.current?.focus();
  }

  function handleQuickReply(key: string) {
    const text = quickReplies[key] ?? key;
    setTab("reply");
    setDrafts((prev) => ({
      ...prev,
      [selected.id]: (prev[selected.id] ? prev[selected.id] + "\n" : "") + text,
    }));
    textareaRef.current?.focus();
  }

  function handleUseAiSuggestion(text: string) {
    setTab("reply");
    setDrafts((prev) => ({ ...prev, [selected.id]: text }));
    textareaRef.current?.focus();
  }

  function handleCloseRequest() {
    updateConv(selected.id, { status: "resolved" });
    appendMessage(selected.id, {
      id: `${selected.id}-${Date.now()}-c`,
      role: "note",
      text: `تم إغلاق الطلب بواسطة ${brand.demoUser.fullName}.`,
      time: nowHHMM(),
    });
  }

  function handleTransfer(agent: string, reason: string) {
    updateConv(selected.id, { agent, status: "waiting" });
    appendMessage(selected.id, {
      id: `${selected.id}-${Date.now()}-t`,
      role: "note",
      text: `تم تحويل المحادثة إلى ${agent}${reason ? ` — ${reason}` : ""}.`,
      time: nowHHMM(),
    });
    setShowTransfer(false);
  }

  // ---- Render --------------------------------------------------------------
  return (
    <AppShell title="الصندوق الموحد" subtitle="جميع محادثات العملاء عبر القنوات" contentClassName="p-0">
      <div className="grid grid-cols-[380px_1fr_320px] h-[calc(100vh-4rem)]">
        {/* Conversation list */}
        <aside className="border-l border-border bg-card flex flex-col min-h-0">
          <div className="p-4 border-b border-border space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold">
                المحادثات ({visibleConversations.length}/{convs.length})
              </h2>
              <button className="p-1.5 rounded hover:bg-muted text-muted-foreground" title="فلاتر متقدمة">
                <Filter className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="بحث عن عميل أو رقم مرجعي..."
                className="w-full h-9 pr-9 pl-3 rounded-md bg-muted/60 border border-border text-xs outline-none focus:ring-2 focus:ring-accent/40"
              />
            </div>
            <div className="flex gap-1 text-[11px] bg-muted rounded-md p-1">
              {[
                { k: "all", l: "الكل" },
                { k: "mine", l: "المسندة إليّ" },
                { k: "unassigned", l: "غير المسندة" },
              ].map((t) => (
                <button
                  key={t.k}
                  onClick={() => setFilter(t.k as typeof filter)}
                  className={
                    "flex-1 px-2 py-1 rounded transition-colors " +
                    (filter === t.k ? "bg-card font-semibold ring-1 ring-border" : "text-muted-foreground")
                  }
                >
                  {t.l}
                </button>
              ))}
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
              <button
                onClick={() => setChannelFilter("all")}
                className={
                  "shrink-0 h-7 px-2.5 rounded-full text-[10px] font-semibold ring-1 transition-colors " +
                  (channelFilter === "all"
                    ? "bg-foreground text-background ring-foreground"
                    : "bg-card text-muted-foreground ring-border hover:bg-muted")
                }
              >
                كل القنوات
              </button>
              {(Object.keys(channelBrand) as ChannelKey[]).map((ch) => {
                const Icon = channelIcons[ch];
                const b = channelBrand[ch];
                const active = channelFilter === ch;
                return (
                  <button
                    key={ch}
                    onClick={() => setChannelFilter(ch)}
                    title={channelLabels[ch]}
                    className={
                      "shrink-0 h-7 w-7 rounded-full grid place-items-center ring-1 transition-transform " +
                      b.bg +
                      " " +
                      (active ? "ring-foreground/60 scale-110" : "ring-transparent hover:scale-105")
                    }
                  >
                    <Icon className={"h-3.5 w-3.5 " + b.fg} />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="overflow-y-auto flex-1 divide-y divide-border">
            {visibleConversations.map((c) => (
              <ConversationRow
                key={c.id}
                c={c}
                active={c.id === selectedId}
                onClick={() => setSelectedId(c.id)}
              />
            ))}
            {visibleConversations.length === 0 && (
              <div className="p-6 text-center text-xs text-muted-foreground">
                لا توجد محادثات مطابقة.
              </div>
            )}
          </div>
        </aside>

        {/* Chat pane */}
        <section className="flex flex-col bg-background min-h-0">
          <div className="h-16 px-6 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="size-10 rounded-full bg-primary/10 text-primary text-xs font-bold grid place-items-center">
                  {selected.initials}
                </div>
                <div
                  className={
                    "absolute -bottom-1 -left-1 size-5 rounded-full ring-2 ring-card grid place-items-center " +
                    selectedBrand.bg
                  }
                  title={channelLabels[selected.channel]}
                >
                  <SelectedChannelIcon className={"h-2.5 w-2.5 " + selectedBrand.fg} />
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">{selected.customer}</div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  {selected.ref} • {channelLabels[selected.channel]} • {statusLabels[selected.status]} • {selected.agent}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTransfer(true)}
                className="inline-flex items-center gap-1.5 px-3 h-9 text-xs font-semibold rounded-md border border-border hover:bg-muted"
              >
                <UserPlus className="h-3.5 w-3.5" /> تحويل
              </button>
              <button
                onClick={handleCloseRequest}
                disabled={selected.status === "resolved"}
                className="inline-flex items-center gap-1.5 px-3 h-9 text-xs font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selected.status === "resolved" ? "تم الإغلاق" : "إغلاق الطلب"}
              </button>
              <button className="p-2 rounded hover:bg-muted">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-5">
            {messages.map((m) => {
              if (m.role === "note") {
                return (
                  <div key={m.id} className="max-w-[75%] mx-auto flex gap-2 items-start p-3 rounded-md bg-warning/10 border border-warning/25 text-xs">
                    <StickyNote className="h-3.5 w-3.5 text-warning shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-warning mb-0.5">ملاحظة داخلية</div>
                      <div className="text-foreground/80 leading-relaxed whitespace-pre-wrap">{m.text}</div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-1">{m.time}</div>
                    </div>
                  </div>
                );
              }
              if (m.role === "ai") {
                return (
                  <div key={m.id} className="max-w-[80%] rounded-lg border-2 border-dashed border-info/40 bg-info/5 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-info">
                        <Sparkles className="h-3.5 w-3.5" /> اقتراح الذكاء الاصطناعي
                      </div>
                      <div className="text-[11px] font-mono text-info">ثقة {m.confidence}%</div>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{m.text}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleUseAiSuggestion(m.text)}
                        className="px-3 py-1.5 text-[11px] font-semibold rounded bg-info text-white hover:bg-info/90 inline-flex items-center gap-1"
                      >
                        <Zap className="h-3 w-3" /> استخدام الرد
                      </button>
                      <button
                        onClick={() => handleUseAiSuggestion(m.text)}
                        className="px-3 py-1.5 text-[11px] font-semibold rounded border border-info/40 text-info hover:bg-info/10"
                      >
                        تعديل
                      </button>
                      <button className="px-3 py-1.5 text-[11px] font-semibold rounded text-muted-foreground hover:bg-muted">
                        رفض
                      </button>
                    </div>
                  </div>
                );
              }
              const isAgent = m.role === "agent";
              return (
                <div key={m.id} className={"flex " + (isAgent ? "justify-end" : "justify-start")}>
                  <div className={"max-w-[70%] " + (isAgent ? "items-end" : "items-start") + " flex flex-col gap-1"}>
                    <div
                      className={
                        "px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap " +
                        (isAgent
                          ? "bg-primary text-primary-foreground rounded-tl-sm"
                          : "bg-card border border-border rounded-tr-sm")
                      }
                    >
                      {m.text}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono px-2 flex items-center gap-1">
                      <span>{m.time}</span>
                      {isAgent && <CheckCheck className="h-3 w-3 text-info" />}
                    </div>
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl bg-card border border-border rounded-tr-sm inline-flex items-center gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot [animation-delay:150ms]" />
                  <span className="typing-dot [animation-delay:300ms]" />
                </div>
              </div>
            )}
            {messages.length === 0 && (
              <div className="h-full grid place-items-center text-xs text-muted-foreground">
                لا رسائل بعد. ابدأ المحادثة أدناه.
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card p-4">
            <div className="flex gap-4 border-b border-border mb-3">
              <button
                onClick={() => setTab("reply")}
                className={
                  "text-xs font-semibold pb-2 border-b-2 -mb-px flex items-center gap-1.5 " +
                  (tab === "reply" ? "border-accent text-foreground" : "border-transparent text-muted-foreground")
                }
              >
                <Reply className="h-3.5 w-3.5" /> رد على العميل
              </button>
              <button
                onClick={() => setTab("note")}
                className={
                  "text-xs font-semibold pb-2 border-b-2 -mb-px flex items-center gap-1.5 " +
                  (tab === "note" ? "border-warning text-foreground" : "border-transparent text-muted-foreground")
                }
              >
                <StickyNote className="h-3.5 w-3.5" /> ملاحظة داخلية
              </button>
            </div>

            <div className="flex gap-2 flex-wrap mb-3">
              {Object.keys(quickReplies).map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuickReply(q)}
                  className="text-[11px] px-2 py-1 rounded bg-muted hover:bg-muted/70 text-muted-foreground"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className={"rounded-md border " + (tab === "note" ? "border-warning/40 bg-warning/5" : "border-input bg-background")}>
              <textarea
                ref={textareaRef}
                rows={3}
                value={draft}
                onChange={(e) => setDrafts((prev) => ({ ...prev, [selected.id]: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={
                  tab === "reply"
                    ? "اكتب ردك للعميل... (Ctrl+Enter للإرسال)"
                    : "اكتب ملاحظة داخلية (لن يراها العميل)..."
                }
                className="w-full p-3 bg-transparent text-sm outline-none resize-none"
              />
              <div className="flex items-center justify-between px-3 py-2 border-t border-border/60">
                <div className="flex gap-1 text-muted-foreground">
                  <button className="p-1.5 rounded hover:bg-muted" title="مرفق">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      handleUseAiSuggestion(
                        "بناءً على سجل العميل، أنصح بمراجعة آخر عملية على الحساب والتأكد من تحديث بيانات الاتصال قبل المتابعة.",
                      )
                    }
                    className="p-1.5 rounded hover:bg-muted"
                    title="اقتراح ذكي"
                  >
                    <Sparkles className="h-4 w-4 text-info" />
                  </button>
                </div>
                <button
                  onClick={handleSend}
                  disabled={!draft.trim()}
                  className="inline-flex items-center gap-2 px-4 h-9 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-3.5 w-3.5" /> {tab === "note" ? "حفظ الملاحظة" : "إرسال"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer 360 */}
        <aside className="border-r border-border bg-card overflow-y-auto">
          <CustomerCard c={selected} />
        </aside>
      </div>

      {showTransfer && (
        <TransferDialog
          onClose={() => setShowTransfer(false)}
          onConfirm={handleTransfer}
          currentAgent={selected.agent}
        />
      )}

      <style>{`
        .typing-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: hsl(var(--muted-foreground) / 0.6);
          animation: typing-bounce 1.2s infinite ease-in-out;
        }
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </AppShell>
  );
}

function ConversationRow({ c, active, onClick }: { c: Conversation; active: boolean; onClick: () => void }) {
  const Icon = channelIcons[c.channel];
  const b = channelBrand[c.channel];
  return (
    <button
      onClick={onClick}
      className={
        "w-full text-right p-4 transition-colors " +
        (active ? "bg-accent/5 border-r-2 border-accent" : "hover:bg-muted/40 border-r-2 border-transparent")
      }
    >
      <div className="flex items-start gap-3">
        <div className="relative shrink-0">
          <div className="size-10 rounded-full bg-primary/10 text-primary text-xs font-bold grid place-items-center">
            {c.initials}
          </div>
          <div
            className={
              "absolute -bottom-1 -left-1 size-5 rounded-full ring-2 ring-card grid place-items-center " +
              b.bg
            }
            title={channelLabels[c.channel]}
          >
            <Icon className={"h-2.5 w-2.5 " + b.fg} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold truncate">{c.customer}</span>
            <span className="text-[10px] text-muted-foreground font-mono shrink-0">{c.time}</span>
          </div>
          <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{c.preview}</p>
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ring-1 ${priorityColor[c.priority]}`}>
              {priorityLabels[c.priority]}
            </span>
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ring-1 ${statusColor[c.status]}`}>
              {statusLabels[c.status]}
            </span>
            <span className="text-[10px] text-muted-foreground">• {c.tag}</span>
            {c.unread ? (
              <span className="mr-auto text-[10px] font-bold bg-accent text-primary rounded-full size-4 grid place-items-center">
                {c.unread}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </button>
  );
}

function CustomerCard({ c }: { c: Conversation }) {
  return (
    <div className="p-5 space-y-6">
      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">ملف العميل</div>
        <div className="flex items-center gap-3">
          <div className="size-14 rounded-full bg-primary/10 text-primary text-sm font-bold grid place-items-center">
            {c.initials}
          </div>
          <div>
            <div className="text-sm font-semibold">{c.customer}</div>
            <span className="text-[10px] mt-1 inline-block px-2 py-0.5 rounded-full bg-accent/15 text-accent ring-1 ring-accent/30 font-bold">
              عميل بلاتيني
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <StatBox label="محادثات" value="42" />
        <StatBox label="شكاوى" value="3" />
        <StatBox label="رضا" value="4.8" />
        <StatBox label="منذ" value="2019" />
      </div>

      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">بيانات الاتصال</div>
        <div className="space-y-1.5 text-xs">
          <Row k="الجوال" v="+218 50 123 4567" mono />
          <Row k="البريد" v={`${c.customer.split(" ")[0].toLowerCase()}@mail.com`} />
          <Row k="المدينة" v="طرابلس" />
          <Row k="رقم الحساب" v="SA03 8000 0000 6080" mono />
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">آخر الطلبات</div>
        <div className="space-y-2">
          {[
            { t: "تفعيل بطاقة ائتمانية", s: "مكتمل", c: "text-success", I: Check },
            { t: "اعتراض عملية دولية", s: "قيد المعالجة", c: "text-warning", I: Zap },
            { t: "تحديث بيانات هوية", s: "مكتمل", c: "text-success", I: Check },
          ].map((r) => (
            <div key={r.t} className="p-2.5 border border-border rounded-md flex justify-between items-center text-xs">
              <span>{r.t}</span>
              <span className={`font-semibold inline-flex items-center gap-1 ${r.c}`}>
                <r.I className="h-3 w-3" /> {r.s}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">
        عرض الملف الكامل
      </button>
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-md p-2.5 text-center">
      <div className="text-sm font-bold font-mono">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-2">
      <span className="text-muted-foreground">{k}</span>
      <span className={"font-medium truncate " + (mono ? "font-mono text-[11px]" : "")}>{v}</span>
    </div>
  );
}

function TransferDialog({
  onClose,
  onConfirm,
  currentAgent,
}: {
  onClose: () => void;
  onConfirm: (agent: string, reason: string) => void;
  currentAgent: string;
}) {
  const options = staffUsers.filter((u) => u.name !== currentAgent);
  const [agent, setAgent] = useState(options[0]?.name ?? "");
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-card border border-border rounded-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">تحويل المحادثة</h3>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          <label className="block">
            <span className="text-xs font-medium">الموظف / القسم</span>
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {options.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name} — {u.department}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-medium">سبب التحويل (اختياري)</span>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background p-2 text-sm"
            />
          </label>
          <div className="flex gap-2 justify-end pt-2">
            <button onClick={onClose} className="px-4 h-9 rounded-md border border-border text-xs font-semibold">
              إلغاء
            </button>
            <button
              onClick={() => agent && onConfirm(agent, reason)}
              className="px-4 h-9 rounded-md bg-primary text-primary-foreground text-xs font-semibold"
            >
              تأكيد التحويل
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
