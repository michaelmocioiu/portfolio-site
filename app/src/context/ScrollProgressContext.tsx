import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

export type NavOrigin = {
  /** Document-relative (scroll-independent) top offset of the in-flow nav, in px. */
  docTop: number
}

export type ScrollState = {
  scrollY: number
  /** 0 at page top, 1 once one viewport height has been scrolled. */
  progress: number
}

type HeroHandoff = {
  navOrigin: NavOrigin | null
  setNavOrigin: (origin: NavOrigin | null) => void
  /** Latest scroll state without subscribing to it — read inside effects/handlers. */
  getScroll: () => ScrollState
  /**
   * Registers a callback invoked with the current ScrollState on every scroll
   * frame (and once immediately on subscribe). Returns an unsubscribe fn.
   * Scroll position is intentionally NOT React state — it changes up to 60x/sec,
   * and routing it through setState would re-render the whole Hero/Header
   * subtree every frame. Consumers should write directly to DOM refs from
   * inside the callback instead of storing it in component state.
   */
  subscribeScroll: (callback: (state: ScrollState) => void) => () => void
}

const HeroHandoffContext = createContext<HeroHandoff | null>(null)

/**
 * Central source of truth for the hero -> sticky header handoff. Hero
 * reports where its in-flow nav naturally sits (navOrigin); Header reads
 * that plus scroll position to decide when the nav has "docked" at the top.
 */
export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [navOrigin, setNavOriginState] = useState<NavOrigin | null>(null)
  const setNavOrigin = useCallback((origin: NavOrigin | null) => setNavOriginState(origin), [])

  const scrollRef = useRef<ScrollState>({ scrollY: 0, progress: 0 })
  const listenersRef = useRef(new Set<(state: ScrollState) => void>())

  useEffect(() => {
    const distance = window.innerHeight
    const clamp = (value: number) => Math.min(1, Math.max(0, value))
    let frame: number | null = null

    const measure = () => {
      const scrollY = window.scrollY
      const state = { scrollY, progress: clamp(scrollY / distance) }
      scrollRef.current = state
      listenersRef.current.forEach((callback) => callback(state))
      frame = null
    }

    const onScroll = () => {
      if (frame !== null) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  const subscribeScroll = useCallback((callback: (state: ScrollState) => void) => {
    listenersRef.current.add(callback)
    callback(scrollRef.current)
    return () => {
      listenersRef.current.delete(callback)
    }
  }, [])

  const getScroll = useCallback(() => scrollRef.current, [])

  const value = useMemo(
    () => ({ navOrigin, setNavOrigin, getScroll, subscribeScroll }),
    [navOrigin, setNavOrigin, getScroll, subscribeScroll],
  )

  return <HeroHandoffContext.Provider value={value}>{children}</HeroHandoffContext.Provider>
}

function useHeroHandoff(): HeroHandoff {
  const ctx = useContext(HeroHandoffContext)
  if (!ctx) throw new Error('useHeroHandoff must be used within a ScrollProgressProvider')
  return ctx
}

export { useHeroHandoff }
