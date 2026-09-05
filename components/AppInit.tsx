"use client";

import { useEffect } from "react";
import { migrateStorage } from "@/lib/storage";

export const AppInit = () => {
  useEffect(() => {
    try {
      migrateStorage();
    } catch {
      // storage migration failed silently
    }
  }, []);

  return null;
};
