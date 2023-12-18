import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

export default function RootLayout ({ pageTitle, children }: any) {
  return (
    <>
      <Head>
        <title key="title">{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#111827" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:site" content="@sonu27" />
        <meta name="twitter:creator" content="@sonu27" />
        <meta name="description" content={pageTitle} />
        <meta property="og:title" content={pageTitle} />
      </Head>
      <Header />
      {children}
      <Footer />
    </>
  )
}

const Header = () => {
  const router = useRouter()
  return (
    <nav className="flex items-center h-16 mx-4 md:mx-0" aria-label="navigation">
      <Link href="/bingwallpapers" className="text-xl text-white">
        Sonu Rai
      </Link>
      <ActiveLink href="/about" className="ml-4 text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
        About
      </ActiveLink>
      <ActiveLink href="/bingwallpapers/tags" className=" text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
        Tags
      </ActiveLink>
      <ActiveLink href="/bingwallpapers/search" className=" text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">
        Search
      </ActiveLink>
    </nav>
  )
}

interface ActiveLinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

function ActiveLink({ children, href, className }: ActiveLinkProps) {
  const router = useRouter()
  className = router.asPath === href ? `${className} bg-gray-800` : className

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

const Footer = () => (
  <footer className="mt-4 mb-16 mx-4 md:mx-0 text-gray-400">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</footer>
)
