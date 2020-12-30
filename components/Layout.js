import Head from 'next/head'
import Link from 'next/link'
import ActiveLink from './ActiveLink'

const Layout = (props) => (
  <div>
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
    <div className="container-lg px-0">{props.children}</div>
    <Footer />
  </div>
)

const Header = () => (
  <nav className="navbar navbar-expand navbar-dark bg-dark" aria-label="navigation">
    <div className="navbar-nav container-lg px-3 px-lg-0">
      <Link href="/">
        <a className="navbar-brand">Sonu Rai</a>
      </Link>
      <div className="navbar-nav w-100">
        <ActiveLink href="/">
          <a className="nav-item nav-link">Home</a>
        </ActiveLink>
        <ActiveLink href="/about">
          <a className="nav-item nav-link">About</a>
        </ActiveLink>
        <ActiveLink href="/contact">
          <a className="nav-item nav-link">Contact</a>
        </ActiveLink>
      </div>
    </div>
  </nav>
)

const Footer = () => (
  <footer className="container-lg px-0">
    <div className="px-3 px-lg-0">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</div>
  </footer>
)

export default Layout
