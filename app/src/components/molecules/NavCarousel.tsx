import { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { NavButton } from './NavButton'
import { NAV_ITEMS } from '../../lib/heroIntro'

const Viewport = styled.div<{ $docked: boolean }>`
  overflow: ${({ $docked }) => ($docked ? 'hidden' : 'visible')};
  padding: 0 24px;
`

const Track = styled.div<{ $docked: boolean }>`
  position: relative;
  display: flex;
  gap: 24px;
  flex-wrap: ${({ $docked }) => ($docked ? 'nowrap' : 'wrap')};
  justify-content: center;
  /* Always full width (never shrink-to-fit) so justify-content keeps the row
     centered as its own baseline — docking only adds a small nudge on top
     of that via translateX, instead of jumping from a flush-left start. */
  width: 100%;
  transition: transform 0.35s ease;
`

type NavCarouselProps = {
  docked: boolean
  activeIndex: number
  itemStartDelay?: (index: number) => number | undefined
}

// When docked, the track shifts so the active item's own center lands on the
// viewport's center — item 0 centered leaves the rest trailing off to the
// right, the last item centered leaves everything trailing off to the left.
export function NavCarousel({ docked, activeIndex, itemStartDelay }: NavCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [offset, setOffset] = useState(0)

  useLayoutEffect(() => {
    if (!docked) {
      setOffset(0)
      return
    }
    const viewport = trackRef.current?.parentElement
    const item = itemRefs.current[activeIndex]
    if (!viewport || !item) return

    // offsetLeft is transform-independent, so this holds regardless of the
    // translateX already applied from a previous active section. Anchor to
    // the viewport's own left edge (not the track's) so its padding is
    // accounted for.
    const viewportLeft = viewport.getBoundingClientRect().left
    const trackLeft = viewport.clientLeft + parseFloat(getComputedStyle(viewport).paddingLeft || '0')
    const itemCenter = trackLeft + item.offsetLeft + item.offsetWidth / 2
    setOffset(window.innerWidth / 2 - viewportLeft - itemCenter)
  }, [docked, activeIndex])

  return (
    <Viewport $docked={docked}>
      <Track
        ref={trackRef}
        $docked={docked}
        style={{ transform: docked ? `translateX(${offset}px)` : 'none' }}
      >
        {NAV_ITEMS.map((item, index) => (
          <div
            key={item.href}
            ref={(el) => {
              itemRefs.current[index] = el
            }}
          >
            <NavButton
              href={item.href}
              label={item.label}
              active={docked && index === activeIndex}
              dimmed={docked && index !== activeIndex}
              startDelay={itemStartDelay?.(index)}
            />
          </div>
        ))}
      </Track>
    </Viewport>
  )
}
