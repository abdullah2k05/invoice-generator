"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2, Copy, Clock } from "lucide-react";
import { getInvoiceHistory, deleteInvoice, type StoredInvoice } from "@/lib/localData";
import { useRouter } from "next/navigation";

export function RecentInvoices() {
  const [invoices, setInvoices] = useState<StoredInvoice[]>([]);
  const router = useRouter();

  useEffect(() => {
    getInvoiceHistory().then(setInvoices);
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

  const handleDelete = async (id: string) => {
    await deleteInvoice(id);
    getInvoiceHistory().then(setInvoices);
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

  const formatCurrency = (currency: string) => {
    const symbols: Record<string, string> = {
      USD: "$", PKR: "₨", EUR: "€", GBP: "£", CAD: "C$", AUD: "A$",
    };
    return symbols[currency] || "$";
  };

  return (
    <div className="max-w-5xl mx-auto px-5 py-12 md:py-16">
      <div className="flex items-center gap-2 mb-5">
        <Clock className="w-4 h-4 text-text-muted" />
        <h2 className="text-label-lg text-text-primary">
          Recent Invoices
        </h2>
        <span className="badge">{invoices.length}</span>
      </div>
      <div className="space-y-2">
        {invoices.map((inv) => (
          <div
            key={inv.id}
            className="group flex items-center justify-between p-4 bg-white rounded-card border border-border hover:shadow-soft hover:border-accent/20 transition-all duration-150"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                </div>
                <p className="text-[13px] font-medium text-text-primary truncate">
                  {inv.invoiceNumber}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-1 ml-9 text-[12px] text-text-secondary">
                <span>{inv.client}</span>
                <span className="text-text-muted">·</span>
                <span>{formatDate(inv.date)}</span>
                <span className="text-text-muted">·</span>
                <span className="font-medium text-text-primary">
                  {formatCurrency(inv.currency)}
                  {typeof inv.total === "number" ? inv.total.toFixed(2) : inv.total}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleDuplicate(inv)}
                title="Duplicate invoice"
                className="p-2 hover:bg-surface-muted rounded-button transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-text-secondary" />
              </button>
              <button
                onClick={() => handleDelete(inv.id)}
                title="Delete"
                className="p-2 hover:bg-destructive-light rounded-button transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5 text-destructive" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
