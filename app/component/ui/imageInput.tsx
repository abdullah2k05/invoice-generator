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
          className="relative w-full border border-gray-200 transition-all duration-200 cursor-pointer
            hover:border-gray-400
            focus-within:border-orange-500 focus-within:shadow-[0_0_0_3px_rgba(249,115,22,0.1)]
            rounded-xl bg-white px-4 pt-5 pb-2 h-[60px]"
          onClick={handleButtonClick}
        >
          {label && (
            <label className="block text-xs font-medium text-gray-400 leading-tight">
              {label}
            </label>
          )}
          {value ? (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  localStorage.setItem(variableName, "");
                }}
                className="text-red-400 hover:text-red-600 p-0.5 rounded-full hover:bg-red-50"
                title="Remove logo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <img
                src={value}
                width={32}
                height={32}
                className="h-8 w-auto rounded-md p-1 hover:bg-neutral-200"
                alt="company logo"
              />
            </div>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <button
                type="button"
                className="text-neutral-400 border border-gray-300 rounded-full p-1.5"
              >
                <Plus className="w-4 h-4" />
              </button>
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
