import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="mx-auto min-h-[calc(100vh-142px)] w-full grow overflow-hidden md:container md:py-8">
      <div className="mx-auto max-h-[584px] min-h-[433px] grid-cols-4 grid-rows-2 justify-center gap-2 max-md:max-h-[375px] sm:grid md:container md:min-h-[584px] [&>*]:rounded-lg [&>*]:nth-1:col-span-2 [&>*]:nth-1:row-span-2">
        <Skeleton />
        <Skeleton className="max-md:hidden" />
        <Skeleton className="max-md:hidden" />
        <Skeleton className="max-md:hidden" />
        <Skeleton className="max-md:hidden" />
      </div>
    </main>
  )
}
