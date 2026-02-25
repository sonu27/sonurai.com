import type { Metadata } from 'next'
import { Mail, NotebookPen, Camera, Github, Linkedin } from "lucide-react";

export const metadata: Metadata = {
  title: `About - ${process.env.NEXT_PUBLIC_NAME}`,
  description: `About ${process.env.NEXT_PUBLIC_NAME} - Discover stunning daily Bing wallpapers from around the world. Built by Amarjeet Rai.`,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL}/about`,
  },
};

export default function Page() {
  return (
    <div className="about content-margin max-w-2xl">
      <h1 className="text-3xl mb-6 text-white">About</h1>

      <section className="mb-8">
        <p>Every day, Bing features a stunning photograph from somewhere around the world. This site captures and archives each one so you can browse, search, and download them whenever you like.</p>
        <p>Images are tagged and searchable, making it easy to find wallpapers by location, subject, or season.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg mb-3 text-white">Made by Amarjeet Rai</h2>
        <p>Software engineer and occasional photographer. I built this site because I kept missing the daily images and wanted a simple way to revisit them.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg mb-3 text-white">Elsewhere</h2>
        <div className="flex flex-col gap-3 text-sm">
          <a href="https://arai.dev" rel="me" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
            <NotebookPen size={16} /> Notes
          </a>
          <a href="https://amarjeet.photos" rel="me" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
            <Camera size={16} /> Photography
          </a>
          <a href="https://github.com/sonu27/" rel="me" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
            <Github size={16} /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/amarjeetrai" rel="me" className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-lg mb-3 text-white">Contact</h2>
        <a href="mailto:sonu@sonurai.com" className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors">
          <Mail size={16} /> sonu@sonurai.com
        </a>
      </section>
    </div>
  )
}
