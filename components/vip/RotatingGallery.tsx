'use client'

import { useState } from 'react'

interface GalleryImage {
  id: string
  url: string
  name: string
}

export default function RotatingGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [index, setIndex] = useState(0)

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files?.length) return
    const newImages: GalleryImage[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${file.name}`,
      url: URL.createObjectURL(file),
      name: file.name,
    }))
    setImages(prev => [...prev, ...newImages])
    e.target.value = ''
  }

  function advance() {
    if (images.length === 0) return
    setIndex(i => (i + 1) % images.length)
  }

  function removeCurrent() {
    if (images.length === 0) return
    setImages(prev => prev.filter((_, i) => i !== index))
    setIndex(i => Math.max(0, Math.min(i, images.length - 2)))
  }

  const current = images[index]

  return (
    <div className="max-w-2xl mx-auto">
      {current ? (
        <div
          className="relative overflow-hidden bg-vip-bg border border-vip-crimson/40 cursor-pointer"
          onClick={advance}
        >
          <div className="relative aspect-[16/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.id}
              src={current.url}
              alt={current.name}
              className="w-full h-full object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-vip-bg/70 border border-vip-amber/30 px-3 py-1.5 backdrop-blur-sm">
              <p className="text-[0.6rem] uppercase tracking-[0.35em] text-vip-amber/70">
                {index + 1} / {images.length}
              </p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-vip-bg/95 via-vip-bg/50 to-transparent pt-16 pb-5 px-6 pointer-events-none">
            <p className="text-vip-ivory text-sm">{current.name}</p>
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-5 right-6 flex items-center gap-1.5">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`rounded-full transition-all duration-300 ${
                    i === index ? 'w-5 h-1 bg-vip-amber' : 'w-1 h-1 bg-vip-ivory/25'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="aspect-[16/9] border border-dashed border-vip-crimson/30 flex items-center justify-center">
          <p className="text-vip-ivory/20 text-xs uppercase tracking-widest">No images yet — upload below</p>
        </div>
      )}

      <div className="flex items-center justify-between border border-t-0 border-vip-crimson/30 bg-vip-bg/60 px-6 py-3">
        <p className="text-[0.6rem] uppercase tracking-[0.35em] text-vip-ivory/35">
          {images.length} image{images.length === 1 ? '' : 's'} · click portrait to advance
        </p>
        <div className="flex items-center gap-4">
          {current && (
            <button
              onClick={removeCurrent}
              className="text-[0.6rem] uppercase tracking-[0.3em] text-vip-crimson hover:text-red-400 transition-colors"
            >
              Remove
            </button>
          )}
          <label className="text-[0.6rem] uppercase tracking-[0.3em] text-vip-amber/75 hover:text-vip-amber transition-colors cursor-pointer">
            Upload Images
            <input type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  )
}
