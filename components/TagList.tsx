"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function TagList({ tags }: { tags: [string, number][] }) {
  const [expanded, setExpanded] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setHasOverflow(
          containerRef.current.scrollHeight > containerRef.current.clientHeight
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [tags]);

  return (
    <div className="mt-2 content-margin">
      <div
        ref={containerRef}
        className={`flex flex-wrap gap-2 overflow-hidden transition-[max-height] duration-300 ${
          expanded ? "max-h-[500px]" : "max-h-[88px]"
        }`}
      >
        {tags.map(([tag]) => (
          <Link
            key={tag}
            prefetch={false}
            href={`/bingwallpapers/tags/${tag}`}
            className="whitespace-nowrap px-3 py-2 rounded-md bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
          >
            {tag}
          </Link>
        ))}
      </div>
      {(hasOverflow || expanded) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-gray-400 hover:text-white"
        >
          {expanded ? "Show less" : "More"}
        </button>
      )}
    </div>
  );
}
