import { lazy, Suspense } from "react";
import type { ComponentType } from "react";

const flagLoaders: Record<string, () => Promise<{ default: ComponentType<{ className?: string }> }>> = {
  US: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.US })),
  PK: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.PK })),
  IN: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.IN })),
  EU: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.EU })),
  GB: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.GB })),
  JP: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.JP })),
  KR: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.KR })),
  IL: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.IL })),
  VN: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.VN })),
  BD: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.BD })),
  RU: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.RU })),
  BR: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.BR })),
  UA: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.UA })),
  KZ: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.KZ })),
  TW: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.TW })),
  ID: () => import("country-flag-icons/react/1x1").then((m) => ({ default: m.ID })),
};

const flagComponents: Record<string, ReturnType<typeof lazy>> = {};
for (const [key, loader] of Object.entries(flagLoaders)) {
  flagComponents[key] = lazy(loader);
}

interface CurrencyFlagProps {
  iconName: string;
  className?: string;
}

export const CurrencyFlag = ({ iconName, className }: CurrencyFlagProps) => {
  const Flag = flagComponents[iconName];
  if (!Flag) return null;
  return (
    <Suspense fallback={<div className={`rounded-full bg-gray-200 ${className || ""}`} />}>
      <Flag className={className} />
    </Suspense>
  );
};
