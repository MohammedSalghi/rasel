import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { User, Bell, Languages, Palette, Lock, Building2 } from "lucide-react";

const sections = [
  { i: User, t: "الملف الشخصي", d: "معلوماتك، صورتك، وتوقيعك" },
  { i: Lock, t: "الأمان", d: "كلمة المرور والتحقق الثنائي" },
  { i: Bell, t: "الإشعارات", d: "قنوات الاستلام والتفضيلات" },
  { i: Languages, t: "اللغة والمنطقة", d: "العربية / الإنجليزية، المنطقة الزمنية" },
  { i: Palette, t: "المظهر", d: "الوضع الفاتح / الداكن، الكثافة" },
  { i: Building2, t: "بيانات المؤسسة", d: "لمديري النظام فقط" },
];

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "الإعدادات — مصرف النوران" }] }),
  component: () => (
    <AppShell title="الإعدادات" subtitle="تفضيلات المستخدم وإعدادات النظام">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 max-w-5xl">
        <aside className="space-y-1">
          {sections.map((s, i) => {
            const Icon = s.i;
            return (
              <button
                key={s.t}
                className={
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors " +
                  (i === 0 ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-muted")
                }
              >
                <Icon className="h-4 w-4" />
                {s.t}
              </button>
            );
          })}
        </aside>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-lg font-bold mb-1">الملف الشخصي</div>
          <div className="text-xs text-muted-foreground mb-6">هذه المعلومات تظهر لباقي أعضاء الفريق.</div>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
            <div className="size-16 rounded-full bg-primary text-primary-foreground text-lg font-bold grid place-items-center">أ.م</div>
            <div>
              <button className="px-3 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">تغيير الصورة</button>
              <div className="text-[11px] text-muted-foreground mt-2">JPG أو PNG بحد أقصى 2MB</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="الاسم الأول" value="أحمد" />
            <Field label="الاسم الأخير" value="محمود" />
            <Field label="البريد المؤسسي" value="a.mahmoud@alnouran.ly" />
            <Field label="رقم الموظف" value="EMP-01245" />
            <Field label="القسم" value="خدمة الأفراد" />
            <Field label="المسمى الوظيفي" value="مشرف خدمة العملاء" />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button className="px-4 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">إلغاء</button>
            <button className="px-4 h-9 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90">حفظ التغييرات</button>
          </div>
        </div>
      </div>
    </AppShell>
  ),
});

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium">{label}</span>
      <input
        defaultValue={value}
        className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent"
      />
    </label>
  );
}