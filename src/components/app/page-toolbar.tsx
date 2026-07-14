import type { ReactNode } from "react";
import { Search, SlidersHorizontal, Download, Plus } from "lucide-react";

export function PageToolbar({
  onSearchPlaceholder = "بحث...",
  primaryLabel,
  onPrimary,
  extra,
}: {
  onSearchPlaceholder?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <div className="relative flex-1 min-w-64 max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          placeholder={onSearchPlaceholder}
          className="w-full h-10 pr-9 pl-3 rounded-md bg-card border border-border text-sm outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>
      <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-border bg-card text-xs font-semibold hover:bg-muted">
        <SlidersHorizontal className="h-3.5 w-3.5" /> الفلاتر
      </button>
      <button className="inline-flex items-center gap-1.5 h-10 px-3 rounded-md border border-border bg-card text-xs font-semibold hover:bg-muted">
        <Download className="h-3.5 w-3.5" /> تصدير
      </button>
      {extra}
      {primaryLabel && (
        <button
          onClick={onPrimary}
          className="mr-auto inline-flex items-center gap-1.5 h-10 px-4 rounded-md bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" /> {primaryLabel}
        </button>
      )}
    </div>
  );
}

export function StatusPill({ tone, children }: { tone: "success" | "warning" | "info" | "destructive" | "muted"; children: ReactNode }) {
  const map = {
    success: "bg-success/10 text-success ring-success/25",
    warning: "bg-warning/15 text-warning ring-warning/30",
    info: "bg-info/10 text-info ring-info/25",
    destructive: "bg-destructive/10 text-destructive ring-destructive/25",
    muted: "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ring-1 ${map[tone]}`}>
      {children}
    </span>
  );
}