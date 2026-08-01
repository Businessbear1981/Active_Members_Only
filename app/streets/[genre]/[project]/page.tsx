import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace } from '@/lib/config'
import Arranger from '@/components/streets/Arranger'

export default async function ProjectRoomPage({
  params,
}: {
  params: Promise<{ genre: string; project: string }>
}) {
  const { genre, project } = await params
  const space = getSpace(project)
  if (!space || space.tier !== 'streets' || space.parentSlug !== genre) notFound()

  return (
    <main className="min-h-screen bg-streets-bg px-6 py-20">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center mb-10">
        <p className="text-xs tracking-[0.4em] uppercase text-streets-cyan opacity-80">PROJECT ROOM</p>
        <h1 className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white mt-3">{space.title}</h1>
        <p className="text-sm text-ivory/60 max-w-md mt-4">{space.tagline}</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Arranger />
      </div>

      <div className="text-center mt-10">
        <Link
          href={`/streets/${genre}`}
          className="text-xs tracking-widest uppercase text-ivory/40 hover:text-streets-cyan transition-colors"
        >
          ← {genre}
        </Link>
      </div>
    </main>
  )
}
