export default async function Head({ params }: {
  params: { tag: string },
}) {
  const pageTitle = `Tagged "${params.tag}" - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <title key="title">{pageTitle}</title>
    </>
  )
}
