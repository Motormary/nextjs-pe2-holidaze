import { Skeleton } from "../ui/skeleton"

export default function VenuesLoading() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex h-[334px] flex-col gap-2.5 overflow-hidden [&_p]:mr-1 [&_p]:line-clamp-1"
        >
          <div className="bg-muted relative overflow-hidden rounded-t-lg border">
            <Skeleton className="h-[236px] w-full" />
          </div>
          <Skeleton className="h-6 w-40" />

          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-5 w-20" />
        </div>
      ))}
    </div>
  )
}
