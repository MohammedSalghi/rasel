import { createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { AppShell } from "@/components/app/app-shell";
import { StatusPill } from "@/components/app/page-toolbar";
import { ShieldCheck, Check, X, Plus } from "lucide-react";

export const Route = createFileRoute("/permissions")({
  head: () => ({ meta: [{ title: "الأدوار والصلاحيات — مصرف النوران" }] }),
  component: PermissionsPage,
});

const roles = ["مدير النظام", "مشرف خدمة", "موظف خدمة", "محلل تقارير", "مدقق"];
const groups = [
  {
    g: "المحادثات",
    perms: [
      { p: "عرض المحادثات", v: [true, true, true, true, true] },
      { p: "الرد على العملاء", v: [true, true, true, false, false] },
      { p: "تحويل لموظف آخر", v: [true, true, true, false, false] },
      { p: "إغلاق المحادثة", v: [true, true, true, false, false] },
    ],
  },
  {
    g: "الشكاوى",
    perms: [
      { p: "استلام الشكوى", v: [true, true, true, false, false] },
      { p: "تصعيد الشكوى", v: [true, true, false, false, false] },
      { p: "إغلاق الشكوى", v: [true, true, false, false, false] },
    ],
  },
  {
    g: "الذكاء الاصطناعي",
    perms: [
      { p: "تعديل السياسات", v: [true, false, false, false, false] },
      { p: "إعادة التدريب", v: [true, true, false, false, false] },
      { p: "مراجعة الاقتراحات", v: [true, true, true, false, true] },
    ],
  },
  {
    g: "قاعدة المعرفة",
    perms: [
      { p: "إنشاء / تعديل مقال", v: [true, true, false, false, false] },
      { p: "نشر مقال", v: [true, true, false, false, false] },
      { p: "حذف مقال", v: [true, false, false, false, false] },
    ],
  },
  {
    g: "التقارير والتدقيق",
    perms: [
      { p: "عرض التقارير", v: [true, true, false, true, true] },
      { p: "تصدير التقارير", v: [true, true, false, true, true] },
      { p: "عرض سجل العمليات", v: [true, false, false, false, true] },
    ],
  },
  {
    g: "الإدارة",
    perms: [
      { p: "إدارة المستخدمين", v: [true, false, false, false, false] },
      { p: "إدارة القنوات", v: [true, false, false, false, false] },
      { p: "النسخ الاحتياطي", v: [true, false, false, false, false] },
    ],
  },
];

function PermissionsPage() {
  return (
    <AppShell
      title="الأدوار والصلاحيات"
      subtitle="مصفوفة صلاحيات دقيقة لكل دور وظيفي"
      actions={
        <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md bg-primary text-primary-foreground text-xs font-semibold">
          <Plus className="h-3.5 w-3.5" /> دور جديد
        </button>
      }
    >
      <div className="grid grid-cols-5 gap-3 mb-5">
        {roles.map((r, i) => (
          <div key={r} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="size-9 rounded-md bg-primary/10 text-primary grid place-items-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">{r}</div>
                <div className="text-[10px] text-muted-foreground">
                  {[3, 8, 42, 4, 2][i]} مستخدم
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <div className="text-sm font-semibold">مصفوفة الصلاحيات</div>
          <StatusPill tone="info">آخر تعديل: أمس 14:22 — بواسطة أحمد بن حليم</StatusPill>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
            <tr>
              <th className="font-medium py-2 px-4 w-[280px]">الصلاحية</th>
              {roles.map((r) => (
                <th key={r} className="font-medium py-2 px-4 text-center">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((grp) => (
              <Fragment key={grp.g}>
                <tr className="bg-muted/30">
                  <td colSpan={roles.length + 1} className="py-2 px-4 text-[11px] font-bold uppercase tracking-wider text-primary">
                    {grp.g}
                  </td>
                </tr>
                {grp.perms.map((p) => (
                  <tr key={p.p} className="border-t border-border hover:bg-muted/20">
                    <td className="py-2.5 px-4 text-xs">{p.p}</td>
                    {p.v.map((v, i) => (
                      <td key={i} className="py-2.5 px-4 text-center">
                        {v ? (
                          <Check className="h-4 w-4 mx-auto text-success" />
                        ) : (
                          <X className="h-4 w-4 mx-auto text-muted-foreground/40" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}