import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace } from '@/lib/config'

export default async function ProjectRoomPage({
  params,
}: {
  params: Promise<{ genre: string; project: string }>
}) {
  const { genre, project } = await params
  const space = getSpace(project)
  if (!space || space.tier !== 'streets' || space.parentSlug !== genre) notFound()

  return (
    <main className="min-h-screen bg-streets-bg px-6 py-20 flex flex-col items-center text-center">
      <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">PROJECT ROOM</p>
      <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mt-3">{space.title}</h1>
      <p className="text-sm text-ivory/60 max-w-md mt-4">{space.tagline}</p>

      <div className="border border-streets-purple/40 px-6 py-4 mt-10 text-xs tracking-widest uppercase text-streets-purple/80 max-w-md">
        The drag-and-drop arranger, asset library, and A&amp;R submission flow are the next real build
        item for this room — not live yet.
      </div>

      <Link
        href={`/streets/${genre}`}
        className="mt-10 text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
      >
        ← {genre}
      </Link>
    </main>
  )
}
