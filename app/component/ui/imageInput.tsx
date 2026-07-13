/* eslint-disable @next/next/no-img-element */
"use client";

import { getInitialValue } from "@/lib/getInitialValue";
import { Plus, X } from "lucide-react";
import { useRef } from "react";
import { Controller } from "react-hook-form";

type CustomNumberProps = {
  label: string;
  variableName: string;
};

export const ImageInput = ({ label, variableName }: CustomNumberProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const isAcceptedFileType = (file: File) => {
    return ["image/png", "image/jpeg", "image/svg+xml"].includes(file.type);
  };

  return (
    <Controller
      render={({ field: { onChange, value } }) => (
        <div
          className="relative w-full bg-white border-b-2 border-[#E2E8F0] transition-all duration-200 cursor-pointer focus-within:border-[#0F172A] pt-5 pb-1.5"
          onClick={handleButtonClick}
        >
          {label && (
            <label className="block text-[11px] font-medium text-[#94A3B8] uppercase tracking-wider leading-none mb-0.5">
              {label}
            </label>
          )}
          {value ? (
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-sm font-medium text-[#0F172A]">File uploaded</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  localStorage.setItem(variableName, "");
                }}
                className="text-red-400 hover:text-red-600 p-0.5 rounded-full hover:bg-red-50 ml-auto"
                title="Remove logo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <img
                src={value}
                width={32}
                height={32}
                className="h-8 w-auto rounded-md"
                alt="company logo"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1 mt-0.5">
              <button
                type="button"
                className="text-[#94A3B8] border border-[#E2E8F0] rounded-md p-1.5 hover:bg-[#F8F9FA]"
              >
                <Plus className="w-4 h-4" />
              </button>
              <span className="text-sm text-[#94A3B8]">Upload logo</span>
            </div>
          )}
          <input
            accept=".png, .jpg, .jpeg, .svg, .svg+xml"
            ref={inputRef}
            type="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];
              if (file && isAcceptedFileType(file)) {
                const reader = new FileReader();
                reader.onload = () => {
                  const url = reader.result as string;
                  onChange(url);
                  localStorage.setItem(variableName, url);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="hidden"
          />
        </div>
      )}
      name={variableName}
      defaultValue={getInitialValue(variableName)}
    />
  );
};

export default ImageInput;
