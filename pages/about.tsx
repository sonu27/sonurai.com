import Layout from '../components/Layout'

export default function About() {
  const pageTitle = `About - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <div className="about">
        <h1 className="text-3xl mb-2 text-white mx-2 md:mx-0">About</h1>
        <p>Built by <a href="https://amarjeet.dev" rel="me">Amarjeet Rai</a></p>
        <p>You can contact me on Twitter <a href="https://twitter.com/sonu27" rel="me">@sonu27</a></p>
        <p>
          <a href="https://arai.dev" rel="me">Blog</a><br />
          <a href="https://github.com/sonu27/" rel="me">GitHub</a><br />
          <a href="https://www.linkedin.com/in/amarjeetrai" rel="me">LinkedIn</a><br />
          <a href="https://twitter.com/sonu27" title="Twitter @sonu27" rel="me">Twitter</a>
        </p>
      </div>
    </Layout>
  )
}