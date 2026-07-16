import Link from "next/link";
import { Smartphone } from "lucide-react";

export function AppStoreBadges({ premium = false, showHeading = true }: { premium?: boolean; showHeading?: boolean }) {
  const badgeClass = premium
    ? "inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white px-6 md:px-8 py-3.5 md:py-4 text-sm md:text-base font-semibold transition-all transform hover:scale-[1.03] active:scale-95 shadow-xl hover:shadow-2xl gap-3 border border-[#334155]"
    : "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white px-4 py-2.5 text-sm font-medium transition-all hover:shadow-lg gap-2 shadow-md";

  return (
    <div className="flex flex-col items-center gap-2">
      {showHeading && (
        <p className="text-xs md:text-sm text-[#64748B] font-medium">
          Available for Android
        </p>
      )}
      <Link
        href="/download"
        className={badgeClass}
      >
        <Smartphone className="w-4 h-4 md:w-5 md:h-5" />
        Download APK
      </Link>
    </div>
  );
}
