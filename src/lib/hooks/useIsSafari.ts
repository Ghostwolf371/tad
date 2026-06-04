"use client";

import { useSyncExternalStore } from "react";

function subscribeNoop() {
  return () => {};
}

function getSafariSnapshot() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return (
    /Safari/i.test(ua) &&
    !/Chrome|Chromium|CriOS|FxiOS|EdgiOS|OPR|Android/i.test(ua)
  );
}

/** WebKit desktop/iOS Safari — avoid transform-heavy hero effects that jitter text. */
export function useIsSafari() {
  return useSyncExternalStore(subscribeNoop, getSafariSnapshot, () => false);
}
