import Head from 'next/head'
import Link from 'next/link'

const Layout = (props) => (
  <div>
    <Head>
      <title key="title">Sonu Rai</title>
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
  <header className="navbar navbar-expand navbar-dark bg-dark">
    <nav className="container-lg">
      <div id="site-title">
        <Link href="/">
          <a className="navbar-brand">
            <span className="t">Sonu Rai</span>
            <span>ソヌライ</span>
          </a>
        </Link>
      </div>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link href="/"><a className="nav-item nav-link">Home</a></Link>
          <Link href="/about"><a className="nav-item nav-link">About</a></Link>
          <Link href="/contact"><a className="nav-item nav-link">Contact</a></Link>
        </div>
      </div>
    </nav>
  </header>
)

const Footer = () => (
  <footer className="container-lg px-0">
    <div className="px-3 px-lg-0">&copy; 2013-{new Date().getFullYear()} Amarjeet Rai</div>
  </footer>
)

export default Layout
