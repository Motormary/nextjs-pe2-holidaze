import { useEffect, useState } from "react"

export function useScrolledFromTop(threshold = 0) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Run on mount to set initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}
