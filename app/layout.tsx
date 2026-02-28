import type { Metadata, Viewport } from "next";
import Script from 'next/script';
import { PenLine, Code, Camera, Instagram, Rss } from "lucide-react";
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

const FOOTER_ACTIONS = [
  {
    href: "https://amarjeet.photos",
    label: "Amarjeet Photos (My photography)",
    icon: Camera,
  },
  {
    href: "https://arai.dev",
    label: "Rai Notes (My writing and blog)",
    icon: PenLine,
  },
  {
    href: "https://raitech.co",
    label: "Rai Tech (My software consultancy)",
    icon: Code,
  },
  {
    href: "https://www.instagram.com/amarjeet.photos",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "/bingwallpapers/rss.xml",
    label: "RSS Feed",
    icon: Rss,
    hoverColor: "hover:text-orange-500",
  },
] as const;

const Footer = () => (
  <footer className="mt-8 mb-16 pt-8 content-margin border-t border-white/8 flex items-center justify-between">
    <span className="text-sm text-gray-600 tracking-wide">By <a href="https://amarjeet.dev" target="_blank" rel="me" className="text-gray-400 hover:text-white transition-colors">Amarjeet Rai</a></span>
    <nav aria-label="Footer links">
      <ul className="flex items-center gap-1.5 text-gray-500 sm:gap-2">
        {FOOTER_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <li key={action.label}>
              <a
                href={action.href}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors ${"hoverColor" in action ? action.hoverColor : "hover:text-white"}`}
                target="_blank"
                rel="me"
                aria-label={action.label}
                title={action.label}
              >
                <Icon size={18} strokeWidth={1.9} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  </footer>
);
