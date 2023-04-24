import '../styles/globals.css'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME}`,
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#111827',
  icons: '/favicon.ico',
  manifest: '/manifest.json',
  twitter: {
    site: '@sonu27',
    creator: '@sonu27',
  },
};

export default function RootLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <head>
      <link rel="apple-touch-icon" href="/logo192.png" />
    </head>
    <body className="container mx-auto bg-gray-900">
      <Header />
      {children}
      <Footer />
    </body>
    </html>
  )
}

const Header = () => (
  <nav className="flex items-center h-16 mx-4 md:mx-0" aria-label="navigation">
    <Link href="/bingwallpapers" className="text-xl text-white">
      Sonu Rai
    </Link>
    <Link href="/bingwallpapers" className="ml-4 text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
      Wallpapers
    </Link>
    <Link href="/bingwallpapers/tags" className=" text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
      Tags
    </Link>
    <Link href="/about" className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
      About
    </Link>
  </nav>
)

const Footer = () => (
  <footer className="mt-4 mb-16 mx-4 md:mx-0 text-gray-400">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</footer>
)
