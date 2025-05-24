import { useEffect, useState } from "react"

export function useScroll(threshold = 0) {
  const [scrolled, setScrolled] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setScrolled(window.scrollY > threshold)
  }, [threshold])

  useEffect(() => {
    if (!isClient) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY
          setScrolled(currentScrollY > threshold)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold, isClient])

  return { scrolled, isClient }
}
