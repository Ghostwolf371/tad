"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function CountdownTimer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const target = new Date(Date.now() + 2 * 60 * 60 * 1000);
      const hours = String(target.getHours()).padStart(2, "0");
      const minutes = String(target.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-malachite/20 bg-malachite/5 px-5 py-2.5 font-mono text-sm text-malachite-700">
      <Clock className="h-4 w-4" />
      <span>Next slot available in:</span>
      <span className="font-bold tracking-normalr">
        {time ?? "--:--"}
      </span>
    </div>
  );
}
