"use client";

import { useState } from "react";
import { Plus, Users, Trash2, X, Check } from "lucide-react";
import {
  getClients,
  saveClient,
  deleteClient,
  type SavedClient,
} from "@/lib/localData";

export function SavedClientsPanel({
  onSelect,
}: {
  onSelect: (client: SavedClient) => void;
}) {
  const [open, setOpen] = useState(false);
  const [clients, setClients] = useState(getClients);

  const refresh = () => setClients(getClients());

  const handleDelete = (id: string) => {
    deleteClient(id);
    refresh();
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex items-center gap-2 text-xs font-medium text-[#4F46E5] mb-2 hover:text-[#4338CA] transition-colors"
      >
        <Users className="w-3.5 h-3.5" />
        Saved Clients ({clients.length})
      </button>

      {open && (
        <div className="space-y-1.5 mb-3">
          {clients.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between group px-3 py-2 rounded-lg bg-white border border-gray-100 hover:border-[#4F46E5]/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => { onSelect(c); setOpen(false); }}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-gray-900">{c.companyName}</p>
                <p className="text-xs text-gray-500">{c.email || c.city}</p>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(c.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}
          {clients.length === 0 && (
            <p className="text-xs text-gray-400 italic px-1">No saved clients yet</p>
          )}
        </div>
      )}
    </div>
  );
}
