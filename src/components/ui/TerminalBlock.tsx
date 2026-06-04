"use client";

import { cn } from "@/lib/utils";

export default function TerminalBlock({
  lines,
  className,
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg bg-swamp-900/95 border border-swamp/20 p-4 font-mono text-xs leading-relaxed overflow-hidden",
        className
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-malachite/80" />
        <span className="ml-2 text-white/30 text-[10px]">tad.sr — zsh</span>
      </div>

      {/* Terminal content */}
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex">
            {line.startsWith(">") ? (
              <span className="text-malachite mr-2 shrink-0">{">"}</span>
            ) : line.startsWith("$") ? (
              <span className="text-spring mr-2 shrink-0">{"$"}</span>
            ) : (
              <span className="mr-2 shrink-0 w-2" />
            )}
            <span
              className={
                line.startsWith(">") || line.startsWith("$")
                  ? "text-white/80"
                  : line.includes("error") || line.includes("Error")
                  ? "text-red-400"
                  : line.includes("done") || line.includes("Done") || line.includes("success")
                  ? "text-malachite"
                  : "text-white/50"
              }
            >
              {line.replace(/^[>$]\s*/, "")}
            </span>
          </div>
        ))}
        <div className="flex items-center mt-2">
          <span className="text-spring mr-2">{"$"}</span>
          <span className="text-white/30 animate-blink">_</span>
        </div>
      </div>
    </div>
  );
}
