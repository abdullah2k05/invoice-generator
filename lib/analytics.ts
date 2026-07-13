"use client";

import { Capacitor } from "@capacitor/core";

export function useAnalytics() {
  const logEvent = async (name: string, params?: Record<string, string>) => {
    try {
      if (Capacitor.isNativePlatform()) {
        const { FirebaseAnalytics } = await import("@capacitor-firebase/analytics");
        await FirebaseAnalytics.logEvent({ name, params });
      }
    } catch {
      // silently fail
    }
  };

  return { logEvent };
}

export const AnalyticsEvents = {
  INVOICE_CREATED: "invoice_created",
  INVOICE_SHARED: "invoice_shared",
  INVOICE_PDF_DOWNLOADED: "invoice_pdf_downloaded",
  CURRENCY_CHANGED: "currency_changed",
  APP_CRASH: "app_crash",
} as const;
