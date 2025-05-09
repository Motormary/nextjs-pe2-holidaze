import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="container grow px-4">
      <Skeleton className="mt-2 h-[33px] w-28" />
    </main>
  )
}
