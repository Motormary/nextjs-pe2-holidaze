"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_MEDIA } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { memo, useState } from "react"
import altImage from "public/alt.svg"

type props = {
  media: TYPE_MEDIA[]
}

function getGridRows(mediaLength: number): string {
  switch (mediaLength) {
    case 1:
      return "grid grid-cols-1 grid-rows-1 [&>*]:row-span-1"
    case 2:
      return "grid grid-cols-2 grid-rows-1"
    case 3:
      return "grid grid-cols-2 grid-rows-2 [&>*]:nth-1:row-span-2"
    case 4:
      return "grid grid-cols-4 grid-rows-2 [&>*]:nth-1:row-span-2 [&>*]:nth-1:col-span-2 [&>*]:nth-2:col-span-2"
    default:
      return "grid grid-cols-4 grid-rows-2 [&>*]:nth-1:col-span-2 [&>*]:nth-1:row-span-2"
  }
}

function MediaGallery({ media }: props) {
  const [index, setIndex] = useState(0)
  const [swipeStartX, setSwipeStartX] = useState<number | null>(null)
  const [currentSwipeX, setCurrentSwipeX] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setSwipeStartX(e.touches[0].clientX)
    setCurrentSwipeX(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setCurrentSwipeX(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (swipeStartX === null || currentSwipeX === null) return

    const swipeDistance = swipeStartX - currentSwipeX
    const minSwipeDistance = 50

    if (swipeDistance > minSwipeDistance && index < media.length - 1) {
      setIndex(index + 1)
    } else if (swipeDistance < -minSwipeDistance && index > 0) {
      setIndex(index - 1)
    }

    setSwipeStartX(null)
    setCurrentSwipeX(null)
  }

  const isDesktop = useMediaQuery("(min-width:768px)")

  if (isDesktop)
    return (
      <div
        className={cn(
          getGridRows(media.length),
          "mx-auto max-h-[584px] justify-center gap-2 md:container md:min-h-[300px]",
        )}
      >
        {media.length > 1 ? (
          media.slice(0, 5).map((media, index) => {
            return (
              <Image
                key={media?.url + index}
                className="h-full w-full rounded-lg object-cover"
                height={600}
                width={600}
                src={media?.url ?? "/placeholder.svg"}
                alt={media?.alt ?? "Alternative image"}
              />
            )
          })
        ) : (
          <Image
            src={media[0]?.url ?? altImage.src}
            alt={media[0]?.alt ?? "Image missing"}
            width={1024}
            height={584}
            className="bg-muted mx-auto max-h-[584px] rounded-lg object-contain"
          />
        )}
      </div>
    )

  return (
    <div
      className="relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Image
        src={media[index]?.url ?? "/placeholder.svg"}
        alt={media[index]?.alt ?? "Alt image"}
        width={400}
        height={400}
        draggable={false}
        className="bg-muted aspect-square max-h-[375px] w-full object-cover object-center sm:object-contain"
      />
      <div className="absolute right-2 bottom-2 w-fit rounded-md bg-black/60 px-1.5 py-1 text-xs text-white">
        {index + 1}/{media.length}
      </div>
    </div>
  )
}

export default memo(MediaGallery)
