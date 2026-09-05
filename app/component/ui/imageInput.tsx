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
          className="input-wrapper pt-4 pb-1.5 cursor-pointer"
          onClick={handleButtonClick}
        >
          {label && (
            <label className="input-label pointer-events-none">
              {label}
            </label>
          )}
          {value ? (
            <div className="flex items-center gap-2 mt-0.5">
              <img
                src={value}
                width={32}
                height={32}
                className="h-8 w-auto rounded-md border border-border"
                alt="logo"
              />
              <span className="text-sm font-medium text-text-primary">File uploaded</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  localStorage.setItem(variableName, "");
                }}
                className="text-destructive hover:text-destructive-hover p-1 rounded-md hover:bg-destructive-light ml-auto"
                title="Remove logo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-0.5">
              <div className="w-8 h-8 rounded-md border border-dashed border-border flex items-center justify-center bg-surface-muted">
                <Plus className="w-4 h-4 text-text-muted" />
              </div>
              <span className="text-sm text-text-muted">Upload logo</span>
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
