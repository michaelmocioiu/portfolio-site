import { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { useHeroHandoff } from '../../context/ScrollProgressContext'
import { useActiveSection } from '../../hooks/useActiveSection'
import { NavCarousel } from '../molecules/NavCarousel'
import { BUTTONS_START, BUTTON_STAGGER, NAV_HEIGHT, NAV_ITEMS } from '../../lib/heroIntro'

export const HEADER_HEIGHT = 72

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''))

const Bar = styled.div<{ $docked: boolean }>`
  position: fixed;
  inset: 0 0 auto 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 20;
  pointer-events: none;
  background: ${({ theme }) => `linear-gradient(to bottom, ${theme.colors.background} 0%, ${theme.colors.background}D0 80%, ${theme.colors.background}00 100%)`};
  backdrop-filter: blur(16px);
  -webkit-mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.82) 80%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0.82) 80%, transparent 100%);
  opacity: ${({ $docked }) => ($docked ? 1 : 0)};
  transition: opacity 0.3s ease;

  /* Backdrop blur is one of the most expensive compositor effects and this
     bar sits fixed for the entire scroll session — drop it on touch devices,
     where it's both least visually necessary and most likely to be a
     lower-end GPU. The gradient background alone still separates the bar
     from page content underneath. */
  @media (pointer: coarse) {
    backdrop-filter: none;
  }
`

// translate3d instead of top/left so the fall-into-place ride is compositor-
// only (no per-frame layout/reflow) — critical on mobile where a `top`-driven
// version visibly janks.
const NavSlot = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 21;
  width: 100%;
  will-change: transform;
`

// The nav rides the page up as you scroll (top = its natural document
// position minus scrollY) until it reaches headerPaddingTop — the same
// offset the docked header holds it at — then holds there. Because the
// clamp floor and the docked resting spot are the same value, the handoff
// is a continuous fall into place rather than a fall-then-jump.
export function Header() {
  const { navOrigin, subscribeScroll } = useHeroHandoff()
  const activeIndex = useActiveSection(SECTION_IDS)
  const navContentRef = useRef<HTMLDivElement>(null)
  const navSlotRef = useRef<HTMLDivElement>(null)
  const [navContentHeight, setNavContentHeight] = useState(NAV_HEIGHT)
  const [docked, setDocked] = useState(false)
  const dockedRef = useRef(false)

  // Measure the nav row's real rendered height rather than assuming
  // NAV_HEIGHT — that constant is only a layout-spacer estimate for Hero,
  // and using it here left an uneven gap below the (shorter) actual text.
  // A ResizeObserver (not a window 'resize' listener) is required here:
  // the row's height also changes when NavCarousel's Track flips between
  // `flex-wrap: wrap` (undocked, can spill to two lines on narrow mobile
  // viewports) and `nowrap` (docked, forced single line) — a height change
  // with no window resize event to catch it.
  useLayoutEffect(() => {
    const node = navContentRef.current
    if (!node) return
    const measure = () => setNavContentHeight(node.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const headerPaddingTop = Math.max(0, (HEADER_HEIGHT - navContentHeight) / 2)

  // Position writes go straight to the DOM via ref on every scroll frame —
  // `docked` is the only piece that flows back into React state, and only
  // when it actually flips, so Header/NavCarousel don't re-render 60x/sec.
  useLayoutEffect(() => {
    return subscribeScroll(({ scrollY }) => {
      const naturalTop = navOrigin ? navOrigin.docTop - scrollY : headerPaddingTop
      const top = Math.max(headerPaddingTop, naturalTop)
      const isDocked = navOrigin !== null && top <= headerPaddingTop + 0.5

      if (navSlotRef.current) {
        navSlotRef.current.style.transform = `translate3d(0, ${top}px, 0)`
      }
      if (isDocked !== dockedRef.current) {
        dockedRef.current = isDocked
        setDocked(isDocked)
      }
    })
  }, [subscribeScroll, navOrigin, headerPaddingTop])

  return (
    <>
      <Bar $docked={docked} />
      <NavSlot ref={navSlotRef}>
        <div ref={navContentRef}>
          <NavCarousel
            docked={docked}
            activeIndex={activeIndex}
            itemStartDelay={(index) => BUTTONS_START + index * BUTTON_STAGGER}
          />
        </div>
      </NavSlot>
    </>
  )
}
