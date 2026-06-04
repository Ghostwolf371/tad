"use client";

import { useEffect } from "react";

/**
 * Dev-only safeguard against stale localhost service workers/caches
 * causing hydration mismatches with old bundles.
 */
export default function DevServiceWorkerCleanup() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    if (typeof window === "undefined") return;
    if (window.location.hostname !== "localhost") return;
    if (!("serviceWorker" in navigator)) return;

    const cleanup = async () => {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map((registration) => registration.unregister()));

      if ("caches" in window) {
        const names = await caches.keys();
        await Promise.all(names.map((name) => caches.delete(name)));
      }
    };

    void cleanup();
  }, []);

  return null;
}
