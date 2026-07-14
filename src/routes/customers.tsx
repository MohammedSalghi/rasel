import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { customers } from "@/lib/mock-data";
import { Star } from "lucide-react";

export const Route = createFileRoute("/customers")({
  head: () => ({ meta: [{ title: "العملاء — مصرف النوران" }] }),
  component: () => (
    <AppShell title="العملاء" subtitle={`${customers.length} عميل مسجّل`}>
      <PageToolbar onSearchPlaceholder="بحث بالاسم أو رقم الجوال أو رقم الحساب..." primaryLabel="عميل جديد" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        {[
          { l: "بلاتيني", v: "1,240", c: "text-accent" },
          { l: "ذهبي", v: "3,802", c: "text-warning" },
          { l: "فضي", v: "8,120", c: "text-info" },
          { l: "عادي", v: "24,540", c: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.l} className="bg-card border border-border rounded-lg p-4">
            <div className="text-[11px] text-muted-foreground">تصنيف {s.l}</div>
            <div className={`text-2xl font-bold font-mono mt-1 ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-3 px-4">العميل</th>
              <th className="font-medium py-3 px-4">التصنيف</th>
              <th className="font-medium py-3 px-4">الجوال</th>
              <th className="font-medium py-3 px-4">المدينة</th>
              <th className="font-medium py-3 px-4">عميل منذ</th>
              <th className="font-medium py-3 px-4">المحادثات</th>
              <th className="font-medium py-3 px-4">الشكاوى</th>
              <th className="font-medium py-3 px-4">الرضا</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-full bg-primary/10 text-primary text-[10px] font-bold grid place-items-center">
                      {c.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <div className="text-xs font-semibold">{c.name}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">CUS-{c.id.padStart(5, "0")}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <StatusPill tone={c.segment === "بلاتيني" ? "info" : c.segment === "ذهبي" ? "warning" : "muted"}>
                    {c.segment}
                  </StatusPill>
                </td>
                <td className="py-3 px-4 text-xs font-mono">{c.phone}</td>
                <td className="py-3 px-4 text-xs">{c.city}</td>
                <td className="py-3 px-4 text-xs text-muted-foreground">{c.since}</td>
                <td className="py-3 px-4 text-xs font-mono">{c.conversations}</td>
                <td className="py-3 px-4 text-xs font-mono">{c.complaints}</td>
                <td className="py-3 px-4">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold">
                    <Star className="h-3 w-3 fill-accent text-accent" />
                    {c.satisfaction}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  ),
});