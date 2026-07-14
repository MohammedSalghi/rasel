import { brand } from "@/lib/brand";
import raselLogo from "@/assets/rasel-logo.png.asset.json";

export function Logo({ size = 72, showWordmark = false }: { size?: number; showWordmark?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={raselLogo.url}
        alt={`${brand.name} — ${brand.nameEn}`}
        style={{ height: size, width: "auto" }}
        className="object-contain drop-shadow-sm"
        loading="eager"
        decoding="sync"
      />
      {showWordmark && (
        <span className="font-bold text-lg tracking-tight">
          {brand.name} <span className="text-muted-foreground font-medium">· {brand.nameEn}</span>
        </span>
      )}
      <span className="sr-only">{brand.name} — {brand.productName}</span>
    </div>
  );
}
