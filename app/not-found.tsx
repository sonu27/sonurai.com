import Layout from './layout'

export default function Custom404() {
  const pageTitle = `404 - Page Not Found`
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-white text-2xl mx-4 md:mx-0">{pageTitle}</h1>
    </Layout>
  )
}
