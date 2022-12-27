export default async function Head() {
  const pageTitle = `Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <title key="title">{pageTitle}</title>
      <meta name="description" content="Bing Wallpapers" />
    </>
  )
}
