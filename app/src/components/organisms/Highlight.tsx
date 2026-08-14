import { lazy, Suspense, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
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
    label: 'Feed',
    description: 'The home feed — real-time posts from your university community.',
  },
  {
    src: asset('images/wsh-post.PNG'),
    alt: 'WSH Network post composer screenshot',
    label: 'Post',
    description: 'Composing a post under a handle, alias, or fully anonymous.',
  },
  {
    src: asset('images/wsh-brand.png'),
    alt: 'WSH Network brand mark',
    label: 'Brand',
    description: 'Visual identity — mark, type, and color system.',
  },
]

const DESKTOP_BREAKPOINT = '(min-width: 721px)'

// --- Phone entry animation ---
const PHONE_IN_VIEW_THRESHOLD = 0.3
const PHONE_ENTRY_START_X = 780
const PHONE_ENTRY_START_OPACITY = 1
const PHONE_ENTRY_END_X = 0
const PHONE_ENTRY_END_OPACITY = 1
const PHONE_ENTRY_DURATION_S = 0.4
const PHONE_ENTRY_EASE = 'circIn'

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
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
  font-size: 22px;
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
  const [phoneAnchorRef, phoneHasEntered] = useInViewOnce<HTMLDivElement>(PHONE_IN_VIEW_THRESHOLD)

  const activeSrc = hoveredSrc ?? WSH_MEDIA[0].src
  const openMedia = openIndex !== null ? WSH_MEDIA[openIndex] : null

  const header = (
    <div>
      <Kicker>Currently building</Kicker>
      <Title>WSH Network</Title>
      <Body>
        An early-stage social platform I founded and lead as sole engineer — backend, infrastructure, and
        product, end to end.
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

  const leftColumn = (
    <LeftColumn>
      {header}
      {bullets}
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
    </LeftColumn>
  )

  return (
    <Wrapper>
      {isDesktop ? (
        <DesktopLayout>
          {leftColumn}
          <PhoneFrame ref={phoneAnchorRef}>
            <motion.div
              style={{ width: '100%', height: '100%' }}
              initial={{ x: PHONE_ENTRY_START_X, opacity: PHONE_ENTRY_START_OPACITY }}
              animate={
                phoneHasEntered
                  ? { x: PHONE_ENTRY_END_X, opacity: PHONE_ENTRY_END_OPACITY }
                  : { x: PHONE_ENTRY_START_X, opacity: PHONE_ENTRY_START_OPACITY }
              }
              transition={{ duration: PHONE_ENTRY_DURATION_S, ease: PHONE_ENTRY_EASE }}
            >
              <Suspense fallback={null}>
                <PhoneStage image={activeSrc} active={phoneHasEntered} />
              </Suspense>
            </motion.div>
          </PhoneFrame>
        </DesktopLayout>
      ) : (
        <>
          <Intro>
            {header}
            {bullets}
          </Intro>
          <Carousel>
            {WSH_MEDIA.map((media, index) => (
              <MediaTile key={media.src} src={media.src} alt={media.alt} onClick={() => setOpenIndex(index)} />
            ))}
          </Carousel>
        </>
      )}

      {openMedia && <Lightbox src={openMedia.src} alt={openMedia.alt} onClose={() => setOpenIndex(null)} />}
    </Wrapper>
  )
}
