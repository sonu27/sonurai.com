import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import { NotebookPen, Camera, Github, Instagram, Rss } from "lucide-react";
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
  <footer className="mt-8 mb-16 pt-8 content-margin border-t border-white/8 flex items-center justify-between">
    <span className="text-sm text-gray-600 tracking-wide">By <a href="https://amarjeet.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Amarjeet Rai</a></span>
    <div className="flex gap-x-5 text-gray-500">
      <a href="https://arai.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Notes">
        <NotebookPen size={18} />
      </a>
      <a href="https://amarjeet.photos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Photography">
        <Camera size={18} />
      </a>
      <a href="https://github.com/sonu27" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="GitHub">
        <Github size={18} />
      </a>
      <a href="https://www.instagram.com/amarjeet.photos" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" title="Instagram">
        <Instagram size={18} />
      </a>
      <a href="/bingwallpapers/rss.xml" className="hover:text-orange-500 transition-colors" title="RSS Feed">
        <Rss size={18} />
      </a>
    </div>
  </footer>
);
