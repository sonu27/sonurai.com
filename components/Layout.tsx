import Head from 'next/head'
import Link from 'next/link'
import ActiveLink from '../components/ActiveLink'

const Layout = (props: any) => (
  <div className="container mx-auto">
    <Head>
      <title key="title">{process.env.NEXT_PUBLIC_NAME}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo192.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="twitter:site" content="@sonu27" />
      <meta name="twitter:creator" content="@sonu27" />
    </Head>
    <Header />
    {props.children}
    <Footer />
  </div>
)

const Header = () => (
  <nav className="flex items-center h-16 mx-2 md:mx-0" aria-label="navigation">
    <div className="">
      <Link href="/bingwallpapers">
        <a className="text-xl text-white">Sonu Rai</a>
      </Link>
      <ActiveLink href="/bingwallpapers">
        <a className="ml-4 text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">Wallpapers</a>
      </ActiveLink>
      <ActiveLink href="/about">
        <a className="text-gray-300 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md">About</a>
      </ActiveLink>
    </div>
  </nav>
)

const Footer = () => (
  <footer className="mt-4 mb-16 mx-2 md:mx-0 text-gray-400">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</footer>
)

export default Layout
