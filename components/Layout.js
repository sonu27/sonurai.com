import Head from 'next/head'
import Header from './Header'
import './index.css';

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD'
}

const Footer = props => (
  <footer className="container-lg px-0">
    <div className="px-3 px-lg-0">&copy; {new Date().getFullYear()} Amarjeet Rai</div>
  </footer>
)

const Layout = props => (
  <div>
    <Head>
      <title key="title">Sonu Rai</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
      <meta name="twitter:site" content="@sonu27" />
      <meta name="twitter:creator" content="@sonu27" />
    </Head>
    <Header />
    <div className="container-lg px-0">{props.children}</div>
    <Footer />
  </div>
)

export default Layout
