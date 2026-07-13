"use client";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { currencyList } from "@/lib/currency";
import { CurrencyFlag } from "@/app/component/ui/currencyFlag";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

const CurrencyInput = () => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => {
        const currencyDetails = currencyList.find(
          (currency) => currency.value.toLowerCase() === value.toLowerCase()
        )?.details;

        return (
          <div className="relative w-full bg-white border-b-2 border-[#E2E8F0] transition-all duration-200 focus-within:border-[#0F172A] pt-5 pb-1.5">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <button className="flex items-center justify-between w-full">
                  <label className="block text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5">
                    Currency
                  </label>
                  <div className="flex gap-1.5 bg-[#F1F5F9] text-sm pl-2 pr-2.5 rounded-md py-0.5 items-center">
                    {currencyDetails && (
                      <CurrencyFlag iconName={currencyDetails.iconName} className="w-4 h-4 rounded-full" />
                    )}
                    <p className="font-medium text-sm text-[#0F172A]">
                      {currencyDetails?.currencyShortForm}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 PopoverContent mt-3">
                <Command className="w-full">
                  <CommandInput
                    placeholder="Search currency..."
                    className="peer block w-full border-0 py-1.5 text-[#0F172A] focus:ring-0 sm:text-sm sm:leading-6 placeholder:text-[#94A3B8] placeholder:font-normal caret-[#0F172A]"
                  />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup className="max-h-96 overflow-y-auto scrollbar-hide">
                    {currencyList.map((currency) => (
                      <CommandItem
                        key={currency.value}
                        value={currency.value}
                        onSelect={(currentValue) => {
                            const updatedValue =
                              currentValue === value ? "USD" : currentValue;
                          localStorage.setItem("currency", updatedValue);
                          onChange(updatedValue);
                          setOpen(false);
                        }}
                        className="w-full cursor-pointer my-2"
                      >
                        <div className="flex gap-2 justify-between items-center w-full">
                          <div className="flex gap-2 items-center">
                            <currency.details.icon className="w-6 h-6 rounded-full border" />
                            <p className="font-medium">
                              {currency.details.currencyName}
                            </p>
                            <p className="font-medium text-[#94A3B8]">
                              {currency.details.currencyShortForm}
                            </p>
                          </div>
                          <CheckCircle2
                            className={cn(
                              "h-6 w-6 rounded-full",
                              value.toLowerCase() ===
                                currency.value.toLowerCase()
                                ? "opacity-100 bg-[#0F172A] text-white"
                                : "opacity-0"
                            )}
                          />
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
      name="currency"
      defaultValue={getInitialValue("currency", "USD")}
    />
  );
};

export default CurrencyInput;
