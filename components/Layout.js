import Head from 'next/head'
import Header from './Header'

const GA_TRACKING_ID = 'UA-83506-8'

const Footer = props => (
  <footer className="container-lg px-0">
    <div className="px-3 px-lg-0">&copy; {new Date().getFullYear()} Amarjeet Rai</div>
  </footer>
)

const Layout = props => (
  <div>
    <Head>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments)};gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}');`,
        }}
      />
      <title key="title">Sonu Rai</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous" />
      <link rel="stylesheet" href="/css/index.css" />
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

export default Layout
