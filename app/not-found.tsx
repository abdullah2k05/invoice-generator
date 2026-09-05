import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-dvh bg-[#F8F9FA] p-8">
      <div className="text-center max-w-sm">
        <p className="text-6xl font-bold text-[#4F46E5] mb-4">404</p>
        <p className="text-lg font-semibold text-[#0F172A] mb-2">
          Page not found
        </p>
        <p className="text-sm text-[#64748B] mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#0F172A] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#1E293B] transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
