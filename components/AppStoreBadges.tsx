import Link from "next/link";
import { Smartphone } from "lucide-react";

export function AppStoreBadges({ variant = "badge", showHeading = true }: { variant?: "badge" | "premium" | "subtle"; showHeading?: boolean }) {
  const classes = {
    badge: "inline-flex items-center justify-center rounded-lg border border-[#CBD5E1] bg-white text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] px-3 py-1.5 text-xs font-medium transition-colors gap-1.5 shadow-sm",
    premium: "inline-flex items-center justify-center rounded-xl border-2 border-[#CBD5E1] bg-white text-[#0F172A] px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold transition-all hover:border-[#94A3B8] hover:shadow-lg gap-3",
    subtle: "inline-flex items-center justify-center gap-1.5 text-xs text-[#94A3B8] hover:text-[#0F172A] transition-colors",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {showHeading && variant !== "subtle" && (
        <p className="text-xs md:text-sm text-[#64748B] font-medium">
          Available for Android
        </p>
      )}
      <Link href="/download" className={classes[variant]}>
        <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
        Download APK
      </Link>
    </div>
  );
}
