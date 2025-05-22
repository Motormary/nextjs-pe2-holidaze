"use client"

import { cn } from "@/lib/utils"
import { memo, useState } from "react"
import { Button } from "../ui/button"

type props = {
  description: string
}

function Description({ description }: props) {
  console.log("🚀 ~ Description ~ description:", description)
  const [readMore, setReadMore] = useState(false)

  function handleChange() {
    setReadMore(!readMore)
  }

  return (
    <>
      <p
        className={cn(
          !readMore && "line-clamp-3",
          "text-secondary-foreground text-sm whitespace-pre-line",
        )}
      >
        {description}
      </p>
      <Button onClick={handleChange} className="w-full" variant="ghost">
        {readMore ? "View Less" : "View More"}
      </Button>
    </>
  )
}

export default memo(Description)
