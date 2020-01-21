import Link from 'next/link'
import Layout from '../components/Layout'

const Index = () => (
  <Layout>
    <div className="px-3 px-lg-0">
      <h2>Home</h2>
      <ul>
        <li><Link href="/bingwallpapers/page/[...p]" as="/bingwallpapers/page/1"><a>Bing Wallpapers</a></Link></li>
        <li><a href="http://blog.sonurai.com/" rel="me">Tumblr Blog</a></li>
      </ul>
    </div>
  </Layout>
)

export default Index
