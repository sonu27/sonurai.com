export default async function Head() {
  const pageTitle = `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <title key="title">{pageTitle}</title>
    </>
  )
}
