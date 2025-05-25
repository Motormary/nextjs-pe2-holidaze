import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <main className="container mx-auto w-full grow space-y-6 p-4">
      <div className="space-y-6">
        <div
          className={`flex flex-col items-center gap-4 rounded-lg bg-center bg-no-repeat py-4`}
        >
          <div className="bg-muted-foreground rounded-full shadow-lg md:size-52">
            <Skeleton className="size-[220px] rounded-full" />
          </div>
          <div className="flex w-fit flex-col items-center gap-2 md:items-start">
            <Skeleton className="h-16 w-48 rounded-full px-4 text-white text-shadow-lg" />
          </div>
        </div>
      </div>
    </main>
  )
}
