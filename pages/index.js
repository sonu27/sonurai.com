import Link from 'next/link'
import Layout from 'components/Layout'

const Index = () => (
  <Layout>
    <div className="px-3 px-lg-0">
      <h1>Home</h1>
      <ul>
        <li><Link href="/bingwallpapers"><a>Bing Wallpapers</a></Link></li>
        <li><a href="https://blog.sonurai.com" rel="me">Tumblr Blog</a></li>
      </ul>
    </div>
  </Layout>
)

export default Index
