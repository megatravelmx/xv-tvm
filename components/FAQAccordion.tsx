"use client";

import { useState } from "react";

export default function FAQAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-rose-100 rounded-3xl border border-rose-100 bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-navy-950">{item.q}</span>
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full bg-rose-100 text-rose-600 transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-sm leading-relaxed text-navy-900/75 sm:px-6">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
