'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Image {
  url: string
  height: number
  width: number
}

const images: Image[] = [
  { url: '/gifs/新-庫庫2.5頭身人物-animation-sit-v1.gif', height: 1440, width: 1280 },
  { url: '/gifs/新-庫庫2.5頭身人物-animation-sleep-v2.gif', height: 1440, width: 1280 },
  { url: '/gifs/新-庫庫2.5頭身人物-animation-v1.gif', height: 1440, width: 1280 },
  { url: '/gifs/新-庫庫2.5頭身人物-animation-walk-v9.gif', height: 1440, width: 1120 },
  { url: '/gifs/新-庫庫2.5頭身人物-animation-餅乾-v5-e.gif', height: 1440, width: 1120 },
  { url: '/gifs/新-庫庫2.5頭身人物-新年-v6-比愛心-nbg.gif', height: 1440, width: 1120 },
  { url: '/gifs/新-庫庫2.5頭身人物-芋頭.gif', height: 1440, width: 1280 },
]

function random() {
  return Math.floor(Math.random() * images.length)
}

function useSelectImage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // NOTE: use `useEffect()` to fix the "server prop did not match client prop" issue
  // credits: https://stackoverflow.com/a/66374800/9979122
  useEffect(() => {
    const index = random()
    setSelectedIndex(index)
  }, [])

  const image = selectedIndex !== null ? images[selectedIndex] : null

  return { image, selectedIndex }
}

export function Kuromu() {
  const { image, selectedIndex } = useSelectImage()

  if (!image) {
    return null
  }

  const { url, height, width } = image

  return (
    <div className="relative bottom-20 left-0">
      <Image
        src={url}
        alt="kuromu"
        height={height}
        width={width}
        className={cn(
          'max-w-40 scale-[2] object-cover',
          selectedIndex === 0 && '-translate-x-8 -translate-y-4',
          selectedIndex === 1 && '-translate-y-8',
          selectedIndex === 2 && '-translate-x-8 -translate-y-2',
          selectedIndex === 3 && '-translate-x-8 -translate-y-4',
          selectedIndex === 4 && '-translate-x-8 -translate-y-6',
          selectedIndex === 5 && '-translate-x-8 -translate-y-4',
          selectedIndex === 6 && '-translate-x-8 -translate-y-8',
        )}
      />
      <Link
        href="https://x.com/hibikii_pixel"
        target="_blank"
        rel="noopener"
        prefetch={false}
        className={cn(
          'relative text-xs transition-colors hover:text-primary',
          selectedIndex === 1 && 'bottom-4',
          selectedIndex === 3 && 'top-6',
          selectedIndex === 4 && 'top-4',
          selectedIndex === 5 && 'top-6',
          selectedIndex === 6 && 'top-2',
        )}
      >
        <p>繪師：響響hibikii</p>
      </Link>
    </div>
  )
}
