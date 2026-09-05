"use client";

import { useFormContext } from "react-hook-form";
import { pdfTemplates, defaultTemplateId } from "@/lib/pdfTemplates";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TemplateThumbnail = ({ templateId }: { templateId: string }) => {
  const configs: Record<string, { bg: string; accent: string; border: string }> = {
    stripe: { bg: "#ffffff", accent: "#10b981", border: "#f4f4f5" },
    editorial: { bg: "#faf9f6", accent: "#09090b", border: "#e4e4e7" },
    executive: { bg: "#ffffff", accent: "#312e81", border: "#e0e7ff" },
    tokyo: { bg: "#fafaf9", accent: "#ea580c", border: "#e7e5e4" },
  };
  const config = configs[templateId] || configs.stripe;

  return (
    <div
      className="w-full aspect-[8.5/11] rounded-[4px] border border-border/50 overflow-hidden p-2 flex flex-col"
      style={{ backgroundColor: config.bg }}
    >
      {/* Header area */}
      <div className="flex justify-between items-start mb-2">
        <div className="space-y-1">
          <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: config.accent }} />
          <div className="h-1 w-12 rounded-full bg-text-muted/20" />
        </div>
        <div className="h-1 w-6 rounded-full bg-text-muted/20" />
      </div>

      {/* Divider */}
      <div className="h-px w-full mb-2" style={{ backgroundColor: config.border }} />

      {/* Client info */}
      <div className="space-y-1 mb-2">
        <div className="h-1 w-10 rounded-full bg-text-muted/30" />
        <div className="h-0.5 w-14 rounded-full bg-text-muted/15" />
        <div className="h-0.5 w-12 rounded-full bg-text-muted/15" />
      </div>

      {/* Table header */}
      <div className="flex gap-1 mb-1">
        <div className="h-0.5 flex-1 rounded-full bg-text-muted/20" />
        <div className="h-0.5 w-4 rounded-full bg-text-muted/20" />
        <div className="h-0.5 w-4 rounded-full bg-text-muted/20" />
      </div>

      {/* Table rows */}
      <div className="space-y-0.5 flex-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-1">
            <div className="h-0.5 flex-1 rounded-full bg-text-muted/10" />
            <div className="h-0.5 w-3 rounded-full bg-text-muted/10" />
            <div className="h-0.5 w-3 rounded-full bg-text-muted/10" />
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-end mt-1">
        <div className="h-1.5 w-8 rounded-full" style={{ backgroundColor: config.accent, opacity: 0.3 }} />
      </div>
    </div>
  );
};

export const TemplateSelector = () => {
  const { register, watch } = useFormContext();
  const selectedId = watch("invoiceTemplate", defaultTemplateId);

  return (
    <div className="space-y-3">
      <p className="text-label-sm text-text-secondary">
        Choose a template for your PDF
      </p>
      <div className="grid grid-cols-2 gap-2">
        {pdfTemplates.map((t) => (
          <label
            key={t.id}
            className={cn(
              "relative flex flex-col rounded-card border-2 cursor-pointer transition-all duration-150 p-2",
              selectedId === t.id
                ? "border-accent bg-accent-light/50 shadow-accent"
                : "border-border hover:border-text-muted/30 bg-white"
            )}
          >
            <input
              type="radio"
              value={t.id}
              {...register("invoiceTemplate")}
              className="sr-only"
            />
            <TemplateThumbnail templateId={t.id} />
            <div className="mt-2 px-0.5">
              <div className="flex items-center gap-1.5">
                <span className={cn(
                  "text-[11px] font-medium truncate",
                  selectedId === t.id ? "text-accent" : "text-text-primary"
                )}>
                  {t.name}
                </span>
                {selectedId === t.id && (
                  <Check className="w-3 h-3 text-accent shrink-0" />
                )}
              </div>
              <span className="text-[10px] text-text-muted leading-tight line-clamp-1">
                {t.description}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
