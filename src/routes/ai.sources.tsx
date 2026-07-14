import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { AiTabs } from "@/components/app/ai-tabs";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { FileText, FileType, FileSpreadsheet, BookOpen, RefreshCw, Trash2, Eye, Upload, Folder } from "lucide-react";

export const Route = createFileRoute("/ai/sources")({
  head: () => ({ meta: [{ title: "مصادر المعرفة — الذكاء الاصطناعي" }] }),
  component: SourcesPage,
});

const categories = [
  { name: "الكل", count: 1842, active: true },
  { name: "السياسات والإجراءات", count: 312 },
  { name: "الأدلة التشغيلية", count: 248 },
  { name: "الأسئلة الشائعة", count: 176 },
  { name: "اللوائح والتعليمات", count: 194 },
  { name: "نماذج العمل", count: 132 },
  { name: "المستندات الداخلية", count: 780 },
];

const sources = [
  { n: "سياسة مكافحة غسل الأموال 2026", t: "PDF", cat: "السياسات والإجراءات", size: "1.2 MB", pages: 42, updated: "2026-07-02", status: "مفهرس", icon: FileText },
  { n: "دليل موظف خدمة العملاء", t: "DOCX", cat: "الأدلة التشغيلية", size: "3.8 MB", pages: 128, updated: "2026-07-01", status: "مفهرس", icon: FileType },
  { n: "شروط بطاقات الائتمان — النسخة العربية", t: "PDF", cat: "المستندات الداخلية", size: "820 KB", pages: 24, updated: "2026-06-28", status: "مفهرس", icon: FileText },
  { n: "قائمة الأسئلة الشائعة للعملاء الأفراد", t: "XLSX", cat: "الأسئلة الشائعة", size: "540 KB", pages: 6, updated: "2026-06-27", status: "جاري الفهرسة", icon: FileSpreadsheet },
  { n: "لائحة العمليات المشبوهة", t: "PDF", cat: "اللوائح والتعليمات", size: "2.1 MB", pages: 68, updated: "2026-06-20", status: "بحاجة مراجعة", icon: FileText },
  { n: "نموذج طلب تمويل الأفراد", t: "DOCX", cat: "نماذج العمل", size: "180 KB", pages: 4, updated: "2026-06-18", status: "مفهرس", icon: FileType },
  { n: "دليل تشغيل قناة الواتساب المصرفي", t: "PDF", cat: "الأدلة التشغيلية", size: "1.6 MB", pages: 58, updated: "2026-06-12", status: "مفهرس", icon: FileText },
  { n: "الأسئلة الشائعة للتحويلات الدولية", t: "DOCX", cat: "الأسئلة الشائعة", size: "310 KB", pages: 12, updated: "2026-06-08", status: "خطأ في المعالجة", icon: FileType },
];

const toneMap: Record<string, "success" | "info" | "warning" | "destructive"> = {
  "مفهرس": "success",
  "جاري الفهرسة": "info",
  "بحاجة مراجعة": "warning",
  "خطأ في المعالجة": "destructive",
};

function SourcesPage() {
  return (
    <AppShell title="مصادر المعرفة" subtitle="إدارة المستندات التي يعتمد عليها النموذج المحلي">
      <AiTabs />

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        <aside className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">التصنيفات</div>
            <div className="space-y-1">
              {categories.map((c) => (
                <button
                  key={c.name}
                  className={
                    "w-full flex items-center justify-between px-3 py-2 rounded-md text-xs " +
                    (c.active ? "bg-primary/10 text-primary font-semibold ring-1 ring-primary/15" : "hover:bg-muted text-muted-foreground")
                  }
                >
                  <span className="flex items-center gap-2"><Folder className={"h-3.5 w-3.5 " + (c.active ? "text-primary" : "")} /> {c.name}</span>
                  <span className="font-mono">{c.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">نظرة سريعة</div>
            <div className="space-y-2 text-xs">
              <Row l="حجم المصادر" v="2.4 GB" />
              <Row l="مفهرس بنجاح" v="1,798" />
              <Row l="بحاجة مراجعة" v="32" />
              <Row l="فشل الفهرسة" v="12" />
            </div>
          </div>
        </aside>

        <div>
          <PageToolbar
            onSearchPlaceholder="بحث بالاسم أو التصنيف..."
            primaryLabel="رفع مصدر جديد"
          />

          <div className="bg-card border border-border rounded-lg p-6 mb-4 border-dashed">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="size-11 rounded-md bg-primary/10 text-primary grid place-items-center">
                <Upload className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">اسحب ملفاتك هنا أو اختر من جهازك</div>
              <div className="text-[11px] text-muted-foreground">
                يقبل النظام PDF · Word · Excel · TXT · Markdown · حتى 50MB لكل ملف — تُخزّن داخل بيئة المصرف فقط
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button className="h-8 px-3 rounded-md bg-primary text-primary-foreground text-[11px] font-semibold">اختيار ملفات</button>
                <button className="h-8 px-3 rounded-md border border-border text-[11px] font-semibold">ربط مجلد مشترك</button>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
                <tr>
                  <th className="font-medium py-2 px-4">المستند</th>
                  <th className="font-medium py-2 px-4">التصنيف</th>
                  <th className="font-medium py-2 px-4">النوع</th>
                  <th className="font-medium py-2 px-4">الحجم</th>
                  <th className="font-medium py-2 px-4">آخر تحديث</th>
                  <th className="font-medium py-2 px-4">الحالة</th>
                  <th className="font-medium py-2 px-4">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sources.map((s) => {
                  const Icon = s.icon;
                  return (
                    <tr key={s.n} className="hover:bg-muted/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="size-8 rounded-md bg-muted grid place-items-center">
                            <Icon className="h-4 w-4 text-info" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold">{s.n}</div>
                            <div className="text-[10px] text-muted-foreground font-mono">{s.pages} صفحة</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[11px] text-muted-foreground">{s.cat}</td>
                      <td className="py-3 px-4 text-[11px] font-mono">{s.t}</td>
                      <td className="py-3 px-4 text-[11px] font-mono">{s.size}</td>
                      <td className="py-3 px-4 text-[11px] font-mono">{s.updated}</td>
                      <td className="py-3 px-4">
                        <StatusPill tone={toneMap[s.status]}>{s.status}</StatusPill>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <IconBtn title="معاينة" icon={Eye} />
                          <IconBtn title="إعادة فهرسة" icon={RefreshCw} />
                          <IconBtn title="حذف" icon={Trash2} tone="destructive" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-info/5 border border-info/20 rounded-lg p-4 flex items-start gap-3">
        <BookOpen className="h-4 w-4 text-info mt-0.5 shrink-0" />
        <div className="text-[11px] text-muted-foreground leading-relaxed">
          يعتمد المساعد على هذه المصادر فقط لبناء إجاباته. أي محتوى غير موجود هنا لن يظهر في الردود،
          والنظام لن يُخمّن أو يستنتج معلومات من خارج القاعدة الداخلية.
        </div>
      </div>
    </AppShell>
  );
}

function IconBtn({ icon: Icon, title, tone }: { icon: React.ComponentType<{ className?: string }>; title: string; tone?: "destructive" }) {
  return (
    <button title={title} className={"size-7 grid place-items-center rounded-md hover:bg-muted " + (tone === "destructive" ? "text-destructive" : "text-muted-foreground")}>
      <Icon className="h-3.5 w-3.5" />
    </button>
  );
}

function Row({ l, v }: { l: string; v: string }) {
  return (
    <div className="flex items-center justify-between p-2 rounded bg-muted/40">
      <span className="text-muted-foreground">{l}</span>
      <span className="font-mono font-semibold">{v}</span>
    </div>
  );
}