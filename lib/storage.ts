"use client";

import { Capacitor } from "@capacitor/core";

const STORAGE_VERSION_KEY = "storageVersion";
const CURRENT_STORAGE_VERSION = 1;

export async function getStorageItem(key: string): Promise<string | null> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { Preferences } = await import("@capacitor/preferences");
      const { value } = await Preferences.get({ key });
      return value;
    }
    return localStorage.getItem(key);
  } catch {
    return localStorage.getItem(key);
  }
}

export async function setStorageItem(key: string, value: string): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { Preferences } = await import("@capacitor/preferences");
      await Preferences.set({ key, value });
      return;
    }
    localStorage.setItem(key, value);
  } catch {
    localStorage.setItem(key, value);
  }
}

export async function removeStorageItem(key: string): Promise<void> {
  try {
    if (Capacitor.isNativePlatform()) {
      const { Preferences } = await import("@capacitor/preferences");
      await Preferences.remove({ key });
      return;
    }
    localStorage.removeItem(key);
  } catch {
    localStorage.removeItem(key);
  }
}

export function migrateStorage(): void {
  try {
    const version = parseInt(localStorage.getItem(STORAGE_VERSION_KEY) || "0", 10);
    if (version < CURRENT_STORAGE_VERSION) {
      localStorage.setItem(STORAGE_VERSION_KEY, String(CURRENT_STORAGE_VERSION));
    }
  } catch {
    // storage not available
  }
}
