import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: `About - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `About ${process.env.NEXT_PUBLIC_NAME} - A wallpaper site showcasing daily Bing wallpapers. Built by Amarjeet Rai.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/about`,
  },
};

export default function Page() {
  return (
    <div className="about mx-4 md:mx-0">
      <h1 className="text-3xl mb-2 text-white">About</h1>
      <p>This is a wallpaper site showcasing all the Bing wallpapers and it updated daily.</p>
      <p>Built by <a href="https://amarjeet.dev" rel="me">Amarjeet Rai</a></p>
      <p>You can email me on sonu [at] sonurai.com</p>
      <p>
        <a href="https://arai.dev" rel="me">My Notes</a><br />
        <a href="https://amarjeet.photos" rel="me">Amarjeet.photos (my photography)</a><br />
        <a href="https://github.com/sonu27/" rel="me">GitHub</a><br />
        <a href="https://www.linkedin.com/in/amarjeetrai" rel="me">LinkedIn</a><br />
      </p>
    </div>
  )
}
