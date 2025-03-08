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
  themeColor: "#111827",
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
        <Script defer src="https://abc.sonurai.com/script.js" data-website-id="a708a4bd-e0a6-4adb-8c0d-9573cc94a88f"></Script>
      </head>
      <body className="container mx-auto bg-gray-900">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

const Footer = () => (
  <footer className="mt-4 mb-16 mx-4 md:mx-0 text-gray-400">
    &copy; 2013-{new Date().getFullYear()} Amarjeet Rai
  </footer>
);
