import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { PageToolbar, StatusPill } from "@/components/app/page-toolbar";
import { staffUsers } from "@/lib/mock-data";
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/users")({
  head: () => ({ meta: [{ title: "إدارة المستخدمين — مصرف النوران" }] }),
  component: () => (
    <AppShell title="إدارة المستخدمين" subtitle="الموظفون والصلاحيات والأدوار">
      <PageToolbar onSearchPlaceholder="بحث عن مستخدم..." primaryLabel="إضافة مستخدم" />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-[11px] text-muted-foreground text-right">
              <tr>
                <th className="font-medium py-3 px-4">المستخدم</th>
                <th className="font-medium py-3 px-4">الدور</th>
                <th className="font-medium py-3 px-4">القسم</th>
                <th className="font-medium py-3 px-4">الحالة</th>
                <th className="font-medium py-3 px-4">آخر نشاط</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {staffUsers.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30 cursor-pointer">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-full bg-primary/10 text-primary text-[10px] font-bold grid place-items-center">
                        {u.name.split(" ").map(w=>w[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="text-xs font-semibold">{u.name}</div>
                        <div className="text-[10px] text-muted-foreground">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4"><StatusPill tone={u.role === "مدير النظام" ? "destructive" : u.role === "مشرف" ? "info" : "muted"}>{u.role}</StatusPill></td>
                  <td className="py-3 px-4 text-xs">{u.department}</td>
                  <td className="py-3 px-4">
                    <StatusPill tone={u.status === "متصل" ? "success" : u.status === "مشغول" ? "warning" : "muted"}>
                      {u.status}
                    </StatusPill>
                  </td>
                  <td className="py-3 px-4 text-xs text-muted-foreground">{u.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="text-sm font-semibold mb-4">الأدوار والصلاحيات</div>
            <div className="space-y-3">
              {[
                { r: "مدير النظام", d: "صلاحيات كاملة", n: 2, i: ShieldAlert, c: "text-destructive bg-destructive/10" },
                { r: "مشرف", d: "إدارة الفريق والتقارير", n: 5, i: ShieldCheck, c: "text-info bg-info/10" },
                { r: "موظف خدمة", d: "الرد على المحادثات", n: 24, i: Shield, c: "text-muted-foreground bg-muted" },
                { r: "محلل بيانات", d: "قراءة التقارير فقط", n: 4, i: Shield, c: "text-accent bg-accent/10" },
              ].map((r) => {
                const Icon = r.i;
                return (
                  <div key={r.r} className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/50">
                    <div className={`size-9 rounded-md grid place-items-center ${r.c}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold">{r.r}</div>
                      <div className="text-[10px] text-muted-foreground">{r.d}</div>
                    </div>
                    <div className="text-xs font-bold font-mono">{r.n}</div>
                  </div>
                );
              })}
            </div>
            <button className="w-full mt-4 h-9 rounded-md border border-border text-xs font-semibold hover:bg-muted">
              إدارة الصلاحيات
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  ),
});