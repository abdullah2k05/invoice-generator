import { useFormContext } from "react-hook-form";

export const useGetValue = (
  variableName: string,
  defaultValue?: string
): string => {
  const ctx = useFormContext();
  if (!ctx) return defaultValue || "";
  const { watch } = ctx;
  const value = watch(variableName, defaultValue);
  return value ?? defaultValue ?? "";
};

export const useItemParams = (): Item[] => {
  const ctx = useFormContext();
  if (!ctx) return [];
  const { watch } = ctx;
  const value = watch("items", []);
  return value;
};
