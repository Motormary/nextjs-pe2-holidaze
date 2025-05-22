"use client"

import { ArrowLeft } from "lucide-react"
import { memo } from "react"

function BackButton() {
  function handleReturn() {
    window.history.back()
  }
  return (
    <button onClick={handleReturn}>
      <ArrowLeft className="text-muted-foreground" />
    </button>
  )
}

export default memo(BackButton)
