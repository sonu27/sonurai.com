import Link from 'next/link'

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

export default Header
