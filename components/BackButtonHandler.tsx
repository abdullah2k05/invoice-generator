"use client";

import { useEffect, useRef } from "react";
import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";

export const BackButtonHandler = () => {
  const lastBackPress = useRef(0);

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
          const el = document.createElement("div");
          el.className = "fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300";
          el.textContent = "Press back again to exit";
          document.body.appendChild(el);
          setTimeout(() => {
            el.style.opacity = "0";
            setTimeout(() => el.remove(), 300);
          }, 1500);
        }
      }
    });

    return () => {
      handler.then((h) => h.remove());
    };
  }, []);

  return null;
};
