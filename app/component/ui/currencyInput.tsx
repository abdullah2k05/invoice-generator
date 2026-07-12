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
          <div className="relative w-full border border-gray-200 transition-all
            hover:border-gray-400
            focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500
            max-md:rounded-xl max-md:bg-white max-md:px-4 max-md:pt-5 max-md:pb-2 max-md:h-[60px]
            md:flex md:items-center md:rounded-lg md:px-3 md:h-[52px]">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="w-full">
                <button className="flex items-center justify-between w-full h-full">
                  <label className="text-xs font-medium text-gray-400 md:text-sm md:font-medium md:leading-6 md:text-gray-700 md:whitespace-nowrap md:mr-2 md:block leading-tight">
                    Currency
                  </label>
                  <div className="flex gap-1.5 bg-gray-100 text-sm pl-2 pr-2.5 rounded-full py-0.5 items-center">
                    {currencyDetails && (
                      <CurrencyFlag iconName={currencyDetails.iconName} className="w-4 h-4 rounded-full" />
                    )}
                    <p className="font-medium text-sm text-gray-800">
                      {currencyDetails?.currencyShortForm}
                    </p>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0 PopoverContent mt-3">
                <Command className="w-full">
                  <CommandInput
                    placeholder="Search currency..."
                    className="peer block w-full border-0 py-1.5 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 placeholder:text-neutral-400 placeholder:font-normal caret-orange-500"
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
                            <p className="font-medium text-neutral-500">
                              {currency.details.currencyShortForm}
                            </p>
                          </div>
                          <CheckCircle2
                            className={cn(
                              "h-6 w-6 rounded-full",
                              value.toLowerCase() ===
                                currency.value.toLowerCase()
                                ? "opacity-100 bg-orange-500 text-white"
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
