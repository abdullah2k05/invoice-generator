"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, Copy, Clock, ExternalLink } from "lucide-react";
import { getInvoiceHistory, deleteInvoice, type StoredInvoice } from "@/lib/localData";
import { useRouter } from "next/navigation";

export function RecentInvoices() {
  const [invoices, setInvoices] = useState<StoredInvoice[]>([]);
  const router = useRouter();

  useEffect(() => {
    setInvoices(getInvoiceHistory());
  }, []);

  if (invoices.length === 0) return null;

  const handleDuplicate = (inv: StoredInvoice) => {
    Object.entries(inv.data).forEach(([key, val]) => {
      localStorage.setItem(key, val);
    });
    if (inv.items) {
      localStorage.setItem("items", JSON.stringify(inv.items));
    }
    localStorage.setItem("invoiceTemplate", inv.templateId);
    localStorage.removeItem("invoiceNo");
    router.push("/new");
  };

  const handleDelete = (id: string) => {
    deleteInvoice(id);
    setInvoices(getInvoiceHistory());
  };

  const formatDate = (d: string) => {
    try {
      return new Date(d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      });
    } catch {
      return d;
    }
  };

  return (
    <div className="border-t border-[#E2E8F0] w-full max-w-4xl mx-auto px-4 md:px-7 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-4 h-4 text-[#64748B]" />
        <h2 className="text-base md:text-lg font-semibold text-[#0F172A]">
          Recent Invoices
        </h2>
        <span className="text-xs text-[#94A3B8]">({invoices.length})</span>
      </div>
      <div className="space-y-2">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="flex items-center justify-between px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg hover:border-[#4F46E5]/30 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#4F46E5] shrink-0" />
                <p className="text-sm font-medium text-[#0F172A] truncate">
                  {inv.invoiceNumber}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-xs text-[#64748B]">
                <span>{inv.client}</span>
                <span>•</span>
                <span>{formatDate(inv.date)}</span>
                <span>•</span>
                <span className="font-medium">
                  {inv.currency === "USD" ? "$" : inv.currency === "PKR" ? "₨" : inv.currency === "EUR" ? "€" : inv.currency === "GBP" ? "£" : "$"}
                  {typeof inv.total === "number" ? inv.total.toFixed(2) : inv.total}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDuplicate(inv)}
                title="Duplicate invoice"
                className="p-2 hover:bg-[#F1F5F9] rounded-lg transition-colors"
              >
                <Copy className="w-4 h-4 text-[#64748B]" />
              </button>
              <button
                onClick={() => handleDelete(inv.id)}
                title="Delete"
                className="p-2 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
