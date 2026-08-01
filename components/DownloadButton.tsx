"use client";

import { useState } from "react";

type DownloadButtonProps = {
  url: string;
  filename: string;
};

// Chrome and Safari can abort a download that is still starting if the object
// URL is revoked immediately after the click.
const REVOKE_DELAY = 60_000;

export default function DownloadButton({ url, filename }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch(url, { mode: "cors" });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), REVOKE_DELAY);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab if download fails
      window.open(url, "_blank", "noopener");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isDownloading}
      aria-label={isDownloading ? "Downloading wallpaper" : "Download wallpaper"}
      title="Download wallpaper"
      className="flex shrink-0 items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-md text-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDownloading ? (
        <span className="inline-block w-4 h-4 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin" />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      )}
    </button>
  );
}
