"use client";

type DownloadButtonProps = {
  url: string;
  filename: string;
};

export default function DownloadButton({ url, filename }: DownloadButtonProps) {
  const handleDownload = async () => {
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
      
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab if download fails
      window.open(url, "_blank");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex shrink-0 items-center justify-center w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-md text-white cursor-pointer"
      title="Download wallpaper"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
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
    </button>
  );
}
