"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => console.error(error), [error])

  return (
    <main className="flex w-full grow items-center justify-center gap-6">
      <h2>404</h2>
      <Separator decorative orientation="vertical" className="h-16" />
      <div className="flex flex-col items-center gap-2">
        <p>{error.message}</p>
        <Button
          size="sm"
          variant="destructive"
          className="w-fit"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </main>
  )
}
