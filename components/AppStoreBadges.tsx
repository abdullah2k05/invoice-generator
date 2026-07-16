import Link from "next/link";
import { Smartphone } from "lucide-react";

const AMAZON_URL = "https://www.amazon.com/dp/B0H8ZT83M2";

export function AppStoreBadges({ size = "sm", showHeading = true }: { size?: "sm" | "lg"; showHeading?: boolean }) {
  const badgeClass = size === "lg"
    ? "inline-flex items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors gap-2"
    : "inline-flex items-center justify-center rounded-md border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:bg-[#F1F5F9] transition-colors gap-1.5";

  return (
    <div className="flex flex-col items-center gap-2">
      {showHeading && (
        <p className="text-xs md:text-sm text-[#64748B] font-medium">
          Available for Android
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <a
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={badgeClass}
        >
          <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Amazon Appstore
        </a>
        <Link
          href="/download"
          className={badgeClass}
        >
          <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Download APK
        </Link>
      </div>
    </div>
  );
}
