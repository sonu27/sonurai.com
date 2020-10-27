import App from 'next/app'
import Router from 'next/router'
import * as gtag from 'libs/gtag'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'css/index.css'

Router.events.on('routeChangeComplete', url => gtag.pageview(url))

export default App
