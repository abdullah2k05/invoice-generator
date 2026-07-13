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
        <div className="relative w-full bg-white border-b-2 border-[#E2E8F0] transition-all duration-200 focus-within:border-[#0F172A] pt-5 pb-1.5">
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild className="w-full">
              <button className="flex items-center justify-between w-full">
                <label className="block text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5">
                  {label}
                </label>
                <div className="flex gap-2 items-center text-sm">
                  {value ? (
                    <span className="text-sm font-medium text-[#0F172A]">
                      {format(value, "PPP")}
                    </span>
                  ) : (
                    <span className="text-[#94A3B8] text-sm">Pick a date</span>
                  )}
                  <CalendarIcon className="h-4 w-4 text-[#94A3B8] shrink-0" />
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
