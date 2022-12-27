export default async function Head() {
  const pageTitle = `About - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <title key="title">{pageTitle}</title>
    </>
  )
}
