import type { ReactNode } from "react";

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.3 12 2.3 6.9 2.3 2.7 6.5 2.7 11.6S6.9 20.9 12 20.9c6.9 0 9.4-4.8 9.4-9 0-.6-.1-1.1-.2-1.7H12z" />
    </svg>
  );
}

function MicrosoftGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function AppleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <path d="M16.7 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.6-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.6.9-.7 0-1.9-.9-3.2-.8C7 7.4 5.5 8.4 4.7 10c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1-.1-2.6-1-2.6-4zM14.2 5.3c.7-.8 1.1-2 1-3.1-1 .1-2.1.7-2.8 1.5-.6.7-1.2 1.9-1 3 1.1.1 2.2-.6 2.8-1.4z" />
    </svg>
  );
}

function ProviderButton({
  label,
  icon,
  onClick,
}: {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 w-full inline-flex items-center justify-center gap-2 rounded-md border border-input bg-card text-xs font-semibold text-foreground hover:bg-muted transition-colors"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function SocialAuthButtons({ mode = "login" }: { mode?: "login" | "signup" }) {
  const verb = mode === "signup" ? "التسجيل" : "المتابعة";
  return (
    <div className="space-y-3">
      <div className="relative flex items-center py-2">
        <div className="flex-1 h-px bg-border" />
        <span className="mx-3 text-[11px] text-muted-foreground">
          أو {verb} عبر
        </span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        <ProviderButton label="Google" icon={<GoogleGlyph />} />
        <ProviderButton label="Microsoft" icon={<MicrosoftGlyph />} />
        <ProviderButton label="Apple" icon={<AppleGlyph />} />
      </div>
    </div>
  );
}