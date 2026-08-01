import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace, getChildSpaces } from '@/lib/config'

export default async function GenreRoomPage({ params }: { params: Promise<{ genre: string }> }) {
  const { genre } = await params
  const space = getSpace(genre)
  if (!space || space.tier !== 'streets') notFound()

  const projects = getChildSpaces(genre)

  return (
    <main className="min-h-screen bg-streets-bg px-6 py-20">
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center gap-6 mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">GENRE ROOM</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white">{space.title}</h1>
        <p className="text-sm text-ivory/60 max-w-md">{space.tagline}</p>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 gap-4">
        {projects.map(project => (
          <Link
            key={project.slug}
            href={`/streets/${genre}/${project.slug}`}
            className="px-6 py-5 border border-streets-purple/40 text-left hover:border-streets-cyan hover:bg-white/[0.02] transition-colors"
          >
            <p className="text-streets-purple text-xs tracking-widest uppercase">{project.title}</p>
            <p className="text-ivory/40 text-xs mt-2">{project.tagline}</p>
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="text-ivory/30 text-xs tracking-widest uppercase text-center">No project rooms yet.</p>
        )}
      </div>

      <div className="text-center mt-14">
        <Link
          href="/streets"
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
        >
          ← All genre rooms
        </Link>
      </div>
    </main>
  )
}
