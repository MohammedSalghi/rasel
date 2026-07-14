import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { articles } from "@/lib/mock-data";
import { FileText, Folder } from "lucide-react";

const categories = [
  { name: "البطاقات", count: 24 },
  { name: "الحسابات", count: 31 },
  { name: "التحويلات", count: 18 },
  { name: "القروض", count: 22 },
  { name: "الاستثمار", count: 12 },
  { name: "الأمان", count: 15 },
  { name: "الخدمات الرقمية", count: 20 },
];

export const Route = createFileRoute("/knowledge")({
  head: () => ({ meta: [{ title: "قاعدة المعرفة — مصرف النوران" }] }),
  component: () => (
    <AppShell title="قاعدة المعرفة" subtitle="مقالات وأدلة لخدمة الموظفين والذكاء الاصطناعي">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">
        <aside className="bg-card border border-border rounded-lg p-4 h-fit">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">التصنيفات</div>
          <div className="space-y-1">
            <button className="w-full flex items-center justify-between px-3 py-2 rounded-md bg-accent/10 text-foreground text-xs font-semibold">
              <span className="flex items-center gap-2"><Folder className="h-3.5 w-3.5 text-accent" /> الكل</span>
              <span className="font-mono text-muted-foreground">142</span>
            </button>
            {categories.map((cat) => (
              <button key={cat.name} className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-muted text-xs">
                <span className="flex items-center gap-2 text-muted-foreground"><Folder className="h-3.5 w-3.5" /> {cat.name}</span>
                <span className="font-mono text-muted-foreground">{cat.count}</span>
              </button>
            ))}
          </div>
        </aside>

        <div>
          <PageToolbar onSearchPlaceholder="بحث في المقالات..." primaryLabel="مقال جديد" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {articles.map((a) => (
              <div key={a.id} className="bg-card border border-border rounded-lg p-5 hover:border-accent/40 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-9 rounded-md bg-info/10 text-info grid place-items-center">
                    <FileText className="h-4 w-4" />
                  </div>
                  <StatusPill tone={a.status === "منشور" ? "success" : a.status === "مسودة" ? "muted" : "warning"}>
                    {a.status}
                  </StatusPill>
                </div>
                <div className="text-sm font-semibold mb-2 text-balance">{a.title}</div>
                <div className="text-[11px] text-muted-foreground">{a.category}</div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-[11px] text-muted-foreground">
                  <span>{a.views.toLocaleString()} مشاهدة</span>
                  <span>حُدّث {a.updated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  ),
});