"use client";

import { useEffect } from "react";
import { migrateStorage } from "@/lib/storage";

export const AppInit = () => {
  useEffect(() => {
    migrateStorage();
  }, []);

  return null;
};
