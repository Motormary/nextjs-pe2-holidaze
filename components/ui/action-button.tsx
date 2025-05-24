"use client"

import { RefreshCw } from "lucide-react"
import { Button, buttonVariants } from "./button"
import { cn } from "@/lib/utils"
import { VariantProps } from "class-variance-authority"

interface props
  extends React.ButtonHTMLAttributes<Partial<HTMLButtonElement>>,
    VariantProps<typeof buttonVariants> {
  loadingText?: string
  isPending: boolean
}

// Accessible action button with pending state
// Keeps it's original size when pending with the help of grid stacking
export default function ActionButton({
  children,
  isPending,
  className,
  loadingText,
  ...props
}: props) {
  return (
    <Button
      {...props}
      className={cn(
        className,
        "inline-grid place-items-center [grid-template-areas:'stack']",
      )}
    >
      <span
        aria-label="submit"
        className={cn(
          isPending && "invisible",
          "flex items-center gap-2 [grid-area:stack]",
        )}
      >
        {children}
      </span>
      <span
        aria-label="Submitting"
        className={cn(
          isPending ? "visible" : "invisible",
          "transition-opacity [grid-area:stack]",
        )}
      >
        {loadingText}
        <RefreshCw className="inline size-4 animate-spin" />
      </span>
    </Button>
  )
}
