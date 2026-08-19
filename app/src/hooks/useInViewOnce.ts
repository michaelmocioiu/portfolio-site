import { useEffect, useRef, useState } from 'react'

/** Tracks whether an element has ever intersected the viewport, and keeps that true once it has. */
export function useInViewOnce<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null)
  const [hasBeenInView, setHasBeenInView] = useState(false)

  useEffect(() => {
    if (hasBeenInView) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setHasBeenInView(true)
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasBeenInView, threshold])

  return [ref, hasBeenInView] as const
}
