"use client";

import { useFormContext } from "react-hook-form";
import { pdfTemplates, defaultTemplateId } from "@/lib/pdfTemplates";
import { LayoutTemplate } from "lucide-react";

export const TemplateSelector = () => {
  const { register, watch } = useFormContext();
  const selectedId = watch("invoiceTemplate", defaultTemplateId);

  return (
    <div className="px-5 py-4 space-y-3">
      <div className="flex items-center gap-2">
        <LayoutTemplate className="w-4 h-4 text-[#64748B]" />
        <span className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
          PDF Template
        </span>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {pdfTemplates.map((t) => (
          <label
            key={t.id}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors ${
              selectedId === t.id
                ? "border-[#0F172A] bg-[#F8FAFC]"
                : "border-[#E2E8F0] hover:border-[#94A3B8]"
            }`}
          >
            <input
              type="radio"
              value={t.id}
              {...register("invoiceTemplate")}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedId === t.id
                  ? "border-[#0F172A]"
                  : "border-[#CBD5E1]"
              }`}
            >
              {selectedId === t.id && (
                <div className="w-2 h-2 rounded-full bg-[#0F172A]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-[#0F172A] truncate">
                {t.name}
              </div>
              <div className="text-xs text-[#64748B] truncate">
                {t.description}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
