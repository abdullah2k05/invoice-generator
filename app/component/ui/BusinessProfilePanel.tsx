"use client";

import { useState } from "react";
import { Building2, Check, Upload, Download } from "lucide-react";
import {
  getBusinessProfile,
  saveBusinessProfile,
  exportAllData,
  importAllData,
  type BusinessProfile,
} from "@/lib/localData";

export function BusinessProfilePanel({
  onLoad,
}: {
  onLoad: (profile: BusinessProfile) => void;
}) {
  const [open, setOpen] = useState(false);
  const profile = getBusinessProfile();
  const hasProfile = !!profile.yourName;

  const handleSaveCurrent = () => {
    const p: BusinessProfile = {
      yourName: localStorage.getItem("yourName") || "",
      yourEmail: localStorage.getItem("yourEmail") || "",
      yourAddress: localStorage.getItem("yourAddress") || "",
      yourCity: localStorage.getItem("yourCity") || "",
      yourState: localStorage.getItem("yourState") || "",
      yourCountry: localStorage.getItem("yourCountry") || "",
      yourZip: localStorage.getItem("yourZip") || "",
      yourTaxId: localStorage.getItem("yourTaxId") || "",
      yourLogo: localStorage.getItem("yourLogo") || "",
    };
    saveBusinessProfile(p);
    setOpen(false);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const ok = importAllData(reader.result as string);
        if (ok) alert("Backup restored successfully!");
        else alert("Invalid backup file.");
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExport = () => {
    const data = exportAllData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "invoice-generator-backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="flex items-center gap-2 text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
        >
          <Building2 className="w-3.5 h-3.5" />
          Business Profile
          {hasProfile && <Check className="w-3 h-3 text-emerald-500" />}
        </button>
      </div>

      {open && (
        <div className="space-y-2 px-1">
          {hasProfile && (
            <button
              type="button"
              onClick={() => { onLoad(profile); setOpen(false); }}
              className="w-full text-left text-sm font-medium text-gray-900 px-3 py-2 rounded-lg bg-white border border-gray-100 hover:border-[#4F46E5]/30 transition-colors"
            >
              <p>{profile.yourName || "Unnamed Business"}</p>
              <p className="text-xs text-gray-500">{profile.yourEmail || profile.yourCity}</p>
            </button>
          )}

          <button
            type="button"
            onClick={handleSaveCurrent}
            className="w-full flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#4F46E5] hover:bg-[#4338CA] py-2.5 px-4 rounded-lg transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Save as Profile
          </button>

          <div className="border-t border-gray-100 pt-2 mt-1">
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1.5">Backup</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] py-1 px-2 rounded hover:bg-gray-50 transition-colors"
              >
                <Download className="w-3 h-3" />
                Export
              </button>
              <button
                type="button"
                onClick={handleImport}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] py-1 px-2 rounded hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-3 h-3" />
                Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
