"use client";
import CustomTextInput from "@/app/component/ui/customTextInput";
import CurrencyInput from "@/app/component/ui/currencyInput";
import { currencyList } from "@/lib/currency";
import { Input } from "@/app/component/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { SavedProductsPanel } from "@/app/component/ui/SavedProductsPanel";
import type { SavedProduct } from "@/lib/localData";
import CustomNumberInput from "@/app/component/ui/customNumberInput";
import { useGetValue } from "@/app/hooks/useGetValue";
import { Controller } from "react-hook-form";
import { getItemValue } from "@/lib/getInitialValue";

export const InvoiceDetailsForm = ({ compact }: { compact?: boolean }) => {
  const value = useGetValue("currency", "USD");
  const currencyDetails = currencyList.find(
    (currency) => currency.value.toLowerCase() === value.toLowerCase()
  )?.details;

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div>
          {!compact && <p className="text-xl md:text-2xl font-semibold pb-3">Invoice Details</p>}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2">Line Items</p>

              {/* Desktop: table layout */}
              <div className="max-md:hidden">
                {value.map(
                  ({ itemDescription, amount, qty }: Item, index: number) => (
                    <div
                      className="flex relative items-center group -ml-8"
                      key={index}
                    >
                      <div className={`w-9 h-7 ${value.length === 1 && "invisible"}`}>
                        <button
                          onClick={() => {
                            const newList = [...value];
                            newList.splice(index, 1);
                            localStorage.setItem("items", JSON.stringify(newList));
                            onChange(newList);
                          }}
                          type="button"
                          className="flex-shrink-0 rounded-md p-1.5 group-hover:bg-gray-50 hidden group-hover:block"
                        >
                          <Trash2 className="w-4 text-gray-500 h-4 group-hover:text-red-400" />
                        </button>
                      </div>
                      <div className="w-full flex-1">
                        <Input
                          placeholder="Item name"
                          value={itemDescription}
                          type="text"
                          inputMode="text"
                          onChange={(e) => {
                            const updatedArray = [...value];
                            updatedArray[index] = {
                              itemDescription: e.target.value,
                              amount,
                              qty,
                            };
                            localStorage.setItem("items", JSON.stringify(updatedArray));
                            onChange(updatedArray);
                          }}
                        />
                      </div>
                      <div className="w-14">
                        <Input
                          placeholder="Qty"
                          value={`${qty || ""}`}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="numeric"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                              const updatedArray = [...value];
                              updatedArray[index] = { itemDescription, amount, qty: +inputValue };
                              localStorage.setItem("items", JSON.stringify(updatedArray));
                              onChange(updatedArray);
                            }
                          }}
                        />
                      </div>
                      <div className="w-14">
                        <Input
                          placeholder="Price"
                          value={`${amount || ""}`}
                          type="text"
                          pattern="[0-9]*"
                          inputMode="decimal"
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            if (/^-?\d*\.?\d*$/.test(inputValue) || inputValue === "") {
                              const updatedArray = [...value];
                              updatedArray[index] = { itemDescription, amount: +inputValue, qty };
                              localStorage.setItem("items", JSON.stringify(updatedArray));
                              onChange(updatedArray);
                            }
                          }}
                        />
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Mobile: stacked card layout */}
              <div className="hidden max-md:flex max-md:flex-col max-md:gap-3">
                {value.map(
                  ({ itemDescription, amount, qty }: Item, index: number) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl p-3 relative"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
                          Item {index + 1}
                        </span>
                        {value.length > 1 && (
                          <button
                            onClick={() => {
                              const newList = [...value];
                              newList.splice(index, 1);
                              localStorage.setItem("items", JSON.stringify(newList));
                              onChange(newList);
                            }}
                            type="button"
                            className="flex items-center gap-1 text-xs text-red-400 active:text-red-600 px-2 py-1 rounded-lg active:bg-red-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        placeholder="Item name"
                        value={itemDescription}
                        type="text"
                        onChange={(e) => {
                          const updatedArray = [...value];
                          updatedArray[index] = { itemDescription: e.target.value, amount, qty };
                          localStorage.setItem("items", JSON.stringify(updatedArray));
                          onChange(updatedArray);
                        }}
                        className="w-full text-sm font-semibold text-gray-900 bg-transparent border-0 p-0 mb-3 focus:outline-none placeholder:text-neutral-400"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-medium text-gray-400 block mb-1">
                            Quantity
                          </label>
                          <input
                            placeholder="0"
                            value={`${qty || ""}`}
                            type="text"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            onChange={(e) => {
                              const v = e.target.value;
                              if (/^-?\d*\.?\d*$/.test(v) || v === "") {
                                const arr = [...value];
                                arr[index] = { itemDescription, amount, qty: +v };
                                localStorage.setItem("items", JSON.stringify(arr));
                                onChange(arr);
                              }
                            }}
                            className="w-full h-10 px-3 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] placeholder:text-neutral-400"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-medium text-gray-400 block mb-1">
                            Price ({currencyDetails?.currencySymbol || "$"})
                          </label>
                          <input
                            placeholder="0"
                            value={`${amount || ""}`}
                            type="text"
                            pattern="[0-9]*"
                            inputMode="decimal"
                            onChange={(e) => {
                              const v = e.target.value;
                              if (/^-?\d*\.?\d*$/.test(v) || v === "") {
                                const arr = [...value];
                                arr[index] = { itemDescription, amount: +v, qty };
                                localStorage.setItem("items", JSON.stringify(arr));
                                onChange(arr);
                              }
                            }}
                            className="w-full h-10 px-3 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4F46E5] focus:ring-1 focus:ring-[#4F46E5] placeholder:text-neutral-400"
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>

              <div className="py-3 border-b border-gray-200">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "items",
                      JSON.stringify([...value, { itemDescription: "" }])
                    );
                    onChange([...value, { itemDescription: "" }]);
                  }}
                  type="button"
                  className="flex justify-center items-center text-[#4F46E5] font-medium text-sm gap-2 w-full py-3 active:bg-[#F1F5F9] rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <p>Add Item</p>
                </button>
              </div>
              <SavedProductsPanel
                onSelect={(product: SavedProduct) => {
                  const newItem = {
                    itemDescription: product.name,
                    amount: product.price,
                    qty: 1,
                  };
                  const updated = [...value, newItem];
                  localStorage.setItem("items", JSON.stringify(updated));
                  onChange(updated);
                }}
              />
            </div>
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                Note
              </p>
              <CustomTextInput placeholder="Add a note" variableName="note" />
            </div>
            <div>
              <p className="pt-3 font-medium text-sm text-neutral-500 pb-5">
                More options
              </p>
              <CustomNumberInput
                label="Discount"
                placeholder={`${currencyDetails?.currencySymbol}0`}
                variableName="discount"
              />
              <CustomNumberInput
                label="Taxes"
                placeholder="0%"
                variableName="tax"
              />
            </div>
          </div>
        </div>
      )}
      name="items"
      defaultValue={getItemValue()}
    />
  );
};
