"use client";

import { useState } from "react";
import { Plus, Package, Trash2, X } from "lucide-react";
import {
  getProducts,
  saveProduct,
  deleteProduct,
  type SavedProduct,
} from "@/lib/localData";

export function SavedProductsPanel({
  onSelect,
}: {
  onSelect: (product: SavedProduct) => void;
}) {
  const [open, setOpen] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState(getProducts);

  const refresh = () => setProducts(getProducts());

  const handleAdd = () => {
    if (!name.trim()) return;
    const p: SavedProduct = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price) || 0,
    };
    saveProduct(p);
    setName("");
    setPrice("");
    setShowAdd(false);
    refresh();
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    refresh();
  };

  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="flex items-center gap-2 text-xs font-medium text-[#4F46E5] py-2 hover:text-[#4338CA] transition-colors"
      >
        <Package className="w-3.5 h-3.5" />
        Saved Products & Services ({products.length})
      </button>

      {open && (
        <div className="space-y-1.5 mt-1">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between group px-3 py-2 rounded-lg bg-white border border-gray-100 hover:border-[#4F46E5]/30 transition-colors"
            >
              <button
                type="button"
                onClick={() => { onSelect(p); setOpen(false); }}
                className="flex-1 text-left"
              >
                <p className="text-sm font-medium text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500">${p.price.toFixed(2)}</p>
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-50 rounded transition-all"
              >
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          ))}

          {showAdd ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
              <input
                placeholder="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 text-sm bg-transparent border-0 p-0 focus:outline-none placeholder:text-gray-400"
                autoFocus
              />
              <input
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                step="0.01"
                className="w-20 text-sm bg-transparent border-0 p-0 focus:outline-none placeholder:text-gray-400 text-right"
              />
              <button
                type="button"
                onClick={handleAdd}
                className="text-xs font-medium text-emerald-600 hover:text-emerald-700 px-2 py-1"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#4F46E5] py-1.5 px-1 transition-colors"
            >
              <Plus className="w-3 h-3" />
              Add product
            </button>
          )}
        </div>
      )}
    </div>
  );
}
