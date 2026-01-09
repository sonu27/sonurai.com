import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import Header from "./header";
import "./globals.css";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME}`,
  icons: "/favicon.ico",
  manifest: "/manifest.json",
  openGraph: {
    siteName: process.env.NEXT_PUBLIC_NAME,
  },
  twitter: {
    site: "@sonu27",
    creator: "@sonu27",
  },
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
  }
};

export const viewport: Viewport = {
  themeColor: "#0d1014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="alternate" type="application/rss+xml" title="Bing Wallpapers RSS Feed" href="/bingwallpapers/rss.xml" />
        <Script defer src="https://abc.sonurai.com/script.js" data-website-id="a708a4bd-e0a6-4adb-8c0d-9573cc94a88f"></Script>
      </head>
      <body className="container mx-auto">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

const Footer = () => (
  <footer className="mt-4 mb-16 mx-4 md:mx-0 text-gray-400 flex items-center justify-between">
    <span>&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</span>
    <a
      href="/bingwallpapers/rss.xml"
      className="text-gray-500 hover:text-orange-500 transition-colors"
      title="RSS Feed"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M3.75 3a.75.75 0 0 0-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 0 0 .75-.75V16C17 8.82 11.18 3 4 3h-.25Z" />
        <path d="M3 8.75A.75.75 0 0 1 3.75 8H4a8 8 0 0 1 8 8v.25a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75V16a6 6 0 0 0-6-6h-.25A.75.75 0 0 1 3 9.25v-.5ZM7 15a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      </svg>
    </a>
  </footer>
);
