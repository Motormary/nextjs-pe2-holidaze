"use client"

import { cn } from "@/lib/utils"
import { memo, useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"

type props = {
  description: string
}

function Description({ description }: props) {
  console.log("🚀 ~ Description ~ description:", description)
  const [readMore, setReadMore] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const paragraph = paragraphRef.current
    if (paragraph) {
      const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight)
      const maxHeight = lineHeight * 3

      if (paragraph.scrollHeight > maxHeight) {
        setShowButton(true)
      }
    }
  }, [description])

  function handleChange() {
    setReadMore(!readMore)
  }

  return (
    <>
      <p
        ref={paragraphRef}
        className={cn(
          !readMore && "line-clamp-3",
          "text-secondary-foreground text-sm whitespace-pre-line",
        )}
      >
        {description}
      </p>
      {showButton ? (
        <Button onClick={handleChange} className="w-full" variant="ghost">
          {readMore ? "View Less" : "View More"}
        </Button>
      ) : null}
    </>
  )
}

export default memo(Description)
