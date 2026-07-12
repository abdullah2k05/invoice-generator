"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface MobilePreviewSheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const MobilePreviewSheet = ({ open, onClose, children }: MobilePreviewSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = sheetRef.current;
    if (!el || !open) return;
    const handler = (e: TouchEvent) => {
      if (e.target === el) onClose();
    };
    el.addEventListener("touchstart", handler);
    return () => el.removeEventListener("touchstart", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={sheetRef}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 animate-in fade-in duration-200"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full max-h-[90dvh] bg-white rounded-t-2xl shadow-xl overflow-y-auto animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-700">Invoice Preview</p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-3 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};
