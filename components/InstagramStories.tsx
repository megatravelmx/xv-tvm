"use client";

import { useState } from "react";
import { reels } from "@/data/reels";
import { cdnFile } from "@/lib/cdn";
import { IconPlay, IconX } from "./icons";

export default function InstagramStories() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = reels.find((r) => r.id === activeId) ?? null;

  return (
    <>
      <div className="flex justify-center gap-6 overflow-x-auto pb-2 sm:justify-start sm:gap-8">
        {reels.map((reel) => (
          <button
            key={reel.id}
            type="button"
            onClick={() => setActiveId(reel.id)}
            className="group flex flex-none flex-col items-center gap-2"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-gold-400 via-rose-500 to-blue-500 p-[3px] transition group-hover:scale-105 sm:h-24 sm:w-24">
              <span className="flex h-full w-full items-center justify-center rounded-full border-2 border-white bg-navy-950">
                <IconPlay className="h-7 w-7 text-white" />
              </span>
            </span>
            <p className="max-w-[6.5rem] text-center text-xs font-semibold text-navy-950">{reel.title}</p>
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-black/90 p-4"
          onClick={() => setActiveId(null)}
        >
          <button
            type="button"
            onClick={() => setActiveId(null)}
            aria-label="Cerrar video"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <IconX className="h-5 w-5" />
          </button>
          <video
            key={active.id}
            src={cdnFile(active.file)}
            controls
            autoPlay
            playsInline
            className="max-h-[90vh] max-w-full rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
