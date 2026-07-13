"use client";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { getInitialValue } from "@/lib/getInitialValue";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

const DateInput = ({ label, variableName }: CustomNumberProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div className="relative w-full border border-gray-200 transition-all duration-200
          hover:border-gray-400
          focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]
          rounded-xl bg-white px-4 pt-5 pb-2 h-[60px]">
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild className="w-full">
              <button className="flex items-center justify-between w-full h-full">
                <label className="block text-xs font-medium text-gray-400 leading-tight">
                  {label}
                </label>
                <div className="flex gap-2 items-center text-sm text-gray-700">
                  {value ? (
                    <span className="text-sm font-semibold text-gray-900">
                      {format(value, "PPP")}
                    </span>
                  ) : (
                    <span className="text-neutral-400 text-sm">Pick a date</span>
                  )}
                  <CalendarIcon className="h-4 w-4 text-gray-400 shrink-0" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 mt-3" align="end">
              <Calendar
                mode="single"
                selected={new Date(value)}
                onSelect={(day: Date | undefined) => {
                  if (day?.toString()) {
                    const updatedValue = day.toString();
                    localStorage.setItem(variableName, updatedValue);
                    onChange(updatedValue);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default DateInput;
