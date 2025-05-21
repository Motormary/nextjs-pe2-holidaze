import getVenue from "@/app/actions/venue/get"
import { Skeleton } from "@/components/ui/skeleton"
import MediaGallery from "@/components/venue/desktop-grid"
import { Suspense } from "react"

type props = {
  params: Promise<{ id: string }>
}

export default async function VenuePage({ params }: props) {
  const { id } = await params
  const res = getVenue(id)

  return (
    <main className="min-h-[calc(100vh-142px)] w-full grow overflow-hidden md:py-8">
      <Suspense fallback={<Loading />}>
        <MediaGallery gallery={res} />
      </Suspense>
    </main>
  )
}

function Loading() {
  return (
    <div className="mx-auto grid max-h-[584px] min-h-[433px] grid-cols-4 grid-rows-2 justify-center gap-2 md:container md:min-h-[584px] [&>*]:rounded-lg [&>*]:nth-1:col-span-2 [&>*]:nth-1:row-span-2">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  )
}
