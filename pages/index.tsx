import Link from 'next/link'
import Layout from '../components/Layout'

const Index = () => (
  <Layout>
    <div className="px-3 px-lg-0">
      <h1>Home</h1>
      <ul>
        <li><Link href="/bingwallpapers"><a>Bing Wallpapers</a></Link></li>
        <li><a href="https://arai.dev" rel="me">Blog</a></li>
      </ul>
    </div>
  </Layout>
)

export default Index
