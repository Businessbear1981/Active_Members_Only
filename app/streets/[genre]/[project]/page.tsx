import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getSpace } from '@/lib/config'
import ProjectWorkspace from '@/components/streets/ProjectWorkspace'
import Collaborators from '@/components/streets/Collaborators'
import ProjectAssets from '@/components/streets/ProjectAssets'
import ReleasePipeline from '@/components/streets/ReleasePipeline'

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

      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <ProjectWorkspace />

        <section className="border border-white/10 rounded p-5 bg-black/10">
          <Collaborators />
        </section>

        <section className="border border-white/10 rounded p-5 bg-black/10">
          <ProjectAssets />
        </section>

        <section className="border border-white/10 rounded p-5 bg-black/10">
          <ReleasePipeline />
        </section>
      </div>

      <div className="text-center mt-14">
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
