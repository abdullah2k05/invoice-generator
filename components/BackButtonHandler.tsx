"use client";

import { useEffect, useRef } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export const BackButtonHandler = () => {
  const lastBackPress = useRef(0);
  const toastRef = useRef<HTMLDivElement | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const handler = App.addListener("backButton", () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        const now = Date.now();
        if (now - lastBackPress.current < 2000) {
          App.minimizeApp();
        } else {
          lastBackPress.current = now;
          if (toastRef.current) toastRef.current.remove();
          if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

          const el = document.createElement("div");
          el.className = "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300";
          el.textContent = "Press back again to exit";
          document.body.appendChild(el);
          toastRef.current = el;

          toastTimeoutRef.current = setTimeout(() => {
            el.style.opacity = "0";
            const removeTimeout = setTimeout(() => el.remove(), 300);
            toastTimeoutRef.current = removeTimeout;
          }, 1500);
        }
      }
    });

    return () => {
      handler.then((h) => h.remove());
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
      if (toastRef.current) toastRef.current.remove();
    };
  }, []);

  return null;
};
