"use client";

export function useAnalytics() {
  const logEvent = async (_name: string, _params?: Record<string, string>) => {
    // Analytics disabled
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
