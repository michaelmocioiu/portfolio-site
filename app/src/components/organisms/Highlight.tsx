import { lazy, Suspense, useState } from 'react'
import styled from 'styled-components'
import { motion, type Transition } from 'framer-motion'
import { MediaTile } from '../molecules/MediaTile'
import { Lightbox } from '../molecules/Lightbox'
import { HoverTextButton } from '../molecules/HoverTextButton'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useInViewOnce } from '../../hooks/useInViewOnce'

// three.js is a heavy dependency (~270kb gzipped) only needed for the
// desktop phone mockup — code-split so mobile never downloads it.
const PhoneStage = lazy(() => import('./PhoneStage').then((m) => ({ default: m.PhoneStage })))

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Desktop shows these on the rendered phone via hover; mobile falls back to
// a plain image carousel (no phone, no hover — see DESKTOP_BREAKPOINT below).
const WSH_MEDIA = [
  {
    src: asset('images/wsh-feed.PNG'),
    alt: 'WSH Network feed screenshot',
    label: 'School Wide Chronological Feed',
    description: 'The home feed — real-time posts from your university community.',
  },
  {
    src: asset('images/wsh-comp.png'),
    alt: 'WSH Network post composer screenshot',
    label: 'Rich Post Composer',
    description: 'Composing a post under a handle, alias, or fully anonymous.',
  },
  {
    src: asset('images/wsh-dm.PNG'),
    alt: 'WSH Network direct messaging screenshot',
    label: 'Comfortable Direct Messaging',
    description: 'A sleek and familiar DM interface for one-on-one and group chats.',
  },
]

const DESKTOP_BREAKPOINT = '(min-width: 721px)'

// --- Entry animation (matches About's fade/rise + stagger) ---
const IN_VIEW_THRESHOLD = 0.3
const STAGGER_S = 0.12
const RISE_PX = 18

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

const CheckItOutButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 8px 14px;
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.accent} 40%, transparent);
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  white-space: nowrap;

  &:hover,
  &:focus-visible {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent);
  }
`

const Intro = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 28px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 6px;
`

const Title = styled.h3`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0 0 12px;
`

const Body = styled.p`
  font-size: 14px;
  line-height: 1.7;
  margin: 0;
`

const Bullets = styled.ul`
  margin: 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.7;
`

const DesktopLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  align-items: center;
  gap: 48px;
`

const LeftColumn = styled.div`
  display: grid;
  gap: 24px;
  align-content: start;
`

const ButtonList = styled.div`
  display: grid;
  gap: 4px;
`

const PhoneFrame = styled.div`
  height: 620px;
  width: 100%;
`

const Carousel = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 4px;

  > * {
    flex: 0 0 78%;
    scroll-snap-align: start;
  }
`

export function Highlight() {
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT)
  const [hoveredSrc, setHoveredSrc] = useState<string | null>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [ref, hasEntered] = useInViewOnce<HTMLDivElement>(IN_VIEW_THRESHOLD)

  const activeSrc = hoveredSrc ?? WSH_MEDIA[0].src
  const openMedia = openIndex !== null ? WSH_MEDIA[openIndex] : null

  const header = (
    <div>
      <Kicker>Currently building</Kicker>
      <HeaderRow>
        <Title>WSH Network</Title>
        <CheckItOutButton href="https://wshnetwork.com" target="_blank" rel="noreferrer">
          Go
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CheckItOutButton>
      </HeaderRow>
      <Body>
        An early-stage social media startup operating in Toronto and Paris. We provide a platform for post-secondary students to connect in an exclusive schoolwide network. As the technical founder, I own and oversee all technical aspects of the business.
      </Body>
    </div>
  )

  const bullets = (
    <Bullets>
      <li>Architecting backend infrastructure, APIs, and cloud-native data on Google Cloud &amp; Firebase.</li>
      <li>Driving product strategy and roadmap alongside day-to-day engineering.</li>
      <li>Owning UX/UI design and brand consistency across the product.</li>
    </Bullets>
  )

  const fadeRise = (delay: number) => ({
    initial: { opacity: 0, y: RISE_PX },
    animate: hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE_PX },
    transition: { duration: 0.5, ease: 'easeOut', delay } satisfies Transition,
  })

  const leftColumn = (
    <LeftColumn>
      <motion.div {...fadeRise(0)}>{header}</motion.div>
      <motion.div {...fadeRise(STAGGER_S)}>{bullets}</motion.div>
      <motion.div {...fadeRise(STAGGER_S * 2)}>
        <ButtonList>
          {WSH_MEDIA.map((media) => (
            <HoverTextButton
              key={media.src}
              label={media.label}
              description={media.description}
              active={activeSrc === media.src}
              onHoverStart={() => setHoveredSrc(media.src)}
              onHoverEnd={() => setHoveredSrc(null)}
            />
          ))}
        </ButtonList>
      </motion.div>
    </LeftColumn>
  )

  return (
    <Wrapper ref={ref}>
      {isDesktop ? (
        <DesktopLayout>
          {leftColumn}
          <PhoneFrame>
            <motion.div style={{ width: '100%', height: '100%' }} {...fadeRise(STAGGER_S)}>
              <Suspense fallback={null}>
                <PhoneStage image={activeSrc} active={hasEntered} />
              </Suspense>
            </motion.div>
          </PhoneFrame>
        </DesktopLayout>
      ) : (
        <>
          <Intro>
            <motion.div {...fadeRise(0)}>{header}</motion.div>
            <motion.div {...fadeRise(STAGGER_S)}>{bullets}</motion.div>
          </Intro>
          <motion.div {...fadeRise(STAGGER_S * 2)}>
            <Carousel>
              {WSH_MEDIA.map((media, index) => (
                <MediaTile key={media.src} src={media.src} alt={media.alt} onClick={() => setOpenIndex(index)} />
              ))}
            </Carousel>
          </motion.div>
        </>
      )}

      {openMedia && <Lightbox src={openMedia.src} alt={openMedia.alt} onClose={() => setOpenIndex(null)} />}
    </Wrapper>
  )
}
