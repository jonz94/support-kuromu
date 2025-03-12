'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Image {
  url: string
  height: number
  width: number
}

const images: Image[] = [
  { url: '/banners/庫庫-魔物獵人-雙刀-v2.gif', height: 1440, width: 1120 },
  { url: '/banners/新-庫庫2.5頭身人物-animation-Idle-v3.gif', height: 1440, width: 1120 },
  { url: '/banners/新-庫庫2.5頭身人物-animation-sleep-v3.gif', height: 1440, width: 1120 },
  { url: '/banners/新-庫庫2.5頭身人物-animation-walk-v7.gif', height: 1440, width: 1120 },
  { url: '/banners/新-庫庫2.5頭身人物-animation-餅乾-v4.gif', height: 1440, width: 1120 },
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

  return { image }
}

export function Banner() {
  const { image } = useSelectImage()

  if (!image) {
    // avoid layout shift by show an invisible div
    return <div className="invisible aspect-[9/7] h-auto w-full xs:w-72 sm:w-[38rem] md:w-[42rem]"></div>
  }

  const { url, height, width } = image

  return (
    <div className="relative aspect-[9/7] h-auto w-full overflow-hidden xs:w-72 sm:w-[38rem] md:w-[42rem]">
      <Image
        src={url}
        alt="banner"
        height={height}
        width={width}
        priority
        // animated images (gif) will not be optimized by next.js
        unoptimized
      />
    </div>
  )
}
