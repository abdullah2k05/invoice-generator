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
          className="flex items-center relative justify-between h-[52px] cursor-pointer border border-gray-200 rounded-lg px-3 hover:border-gray-400 transition-all"
          onClick={handleButtonClick}
        >
          {label && (
            <label
              htmlFor={label}
              className="block text-sm font-medium leading-6 text-gray-700 whitespace-nowrap"
            >
              {label}
            </label>
          )}
          {value ? (
            <div className="flex items-center gap-1">
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
                className="h-8 w-auto mr-3 rounded-md p-1 hover:bg-neutral-200"
                alt="company logo"
              />
            </div>
          ) : (
            <button className="text-neutral-400 border border-gray-300 rounded-full p-1.5">
              <Plus className="w-4 h-4" />
            </button>
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
