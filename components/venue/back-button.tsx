"use client"

import { ArrowLeft } from "lucide-react"
import { memo } from "react"

function BackButton() {
  function handleReturn() {
    window.history.back()
  }
  return (
    <div className="flex items-center p-2 md:hidden">
      <button onClick={handleReturn}>
        <ArrowLeft className="text-muted-foreground" />
        <p className="sr-only">Return</p>
      </button>
    </div>
  )
}

export default memo(BackButton)
