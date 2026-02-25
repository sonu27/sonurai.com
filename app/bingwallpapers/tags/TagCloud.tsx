"use client";

import { useState } from "react";
import Link from "next/link";

const INITIAL_COUNT = 60;

export default function TagCloud({ tags }: { tags: [string, number][] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? tags : tags.slice(0, INITIAL_COUNT);
  const hasMore = tags.length > INITIAL_COUNT;

  return (
    <div className="content-margin">
      <div className="flex flex-wrap gap-2">
        {visible.map(([tag, count]) => (
          <Link
            key={tag}
            prefetch={false}
            href={`/bingwallpapers/tags/${tag}`}
            className="px-3 py-1.5 rounded-md bg-white/5 text-gray-300 text-sm hover:bg-white/10 hover:text-white transition-colors"
          >
            {tag}
            <span className="ml-1.5 text-gray-600">{count}</span>
          </Link>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-sm text-gray-500 hover:text-white transition-colors"
        >
          {showAll ? "Show less" : `Show all ${tags.length} tags`}
        </button>
      )}
    </div>
  );
}
