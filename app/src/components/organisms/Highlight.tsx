import { useState } from 'react'
import styled from 'styled-components'
import { motion, type Transition } from 'framer-motion'
import { MediaTile } from '../molecules/MediaTile'
import { Lightbox } from '../molecules/Lightbox'
import { HoverTextButton } from '../molecules/HoverTextButton'
import { PhoneStage } from './PhoneStage'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

// Desktop shows these on the rendered phone via hover; mobile falls back to
// a plain image carousel (no phone, no hover — see DESKTOP_BREAKPOINT below).
// Mobile uses the "-B" screenshot variants (tighter crops around the actual
// screen content) with each tile's aspect ratio matched to the image so the
// carousel has no side letterboxing.
const WSH_MEDIA = [
  {
    src: asset('images/wsh-feed.jpg'),
    mobileSrc: asset('images/wsh-feed-B.jpg'),
    aspectRatio: 1179 / 2311,
    alt: 'WSH Network feed screenshot',
    label: 'School Wide Chronological Feed',
    description: 'The home feed — real-time posts from your university community.',
  },
  {
    src: asset('images/wsh-comp.jpg'),
    mobileSrc: asset('images/wsh-comp-B.jpg'),
    aspectRatio: 1179 / 2210,
    alt: 'WSH Network post composer screenshot',
    label: 'Rich Post Composer',
    description: 'Composing a post under a handle, alias, or fully anonymous.',
  },
  {
    src: asset('images/wsh-dm.jpg'),
    mobileSrc: asset('images/wsh-dm-B.jpg'),
    aspectRatio: 1179 / 2214,
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
  grid-template-columns: 1fr 1fr;
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
    flex: 0 0 68%;
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
  const openMediaSrc = openMedia ? (isDesktop ? openMedia.src : openMedia.mobileSrc) : null

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
        Before WSH, student conversation had nowhere to live — scattered across mainstream social feeds and ad hoc Discord servers, with no space built for a campus. As founder and tech lead, I built one from scratch, betting on three fixed principles: optional anonymity, moderation strong enough to make that anonymity safe, and platform independence. Rather than expand fast, we deliberately proved the model at one school first — ~600 active users in, with a wider multi-school push planned for this fall.
      </Body>
    </div>
  )

  const bullets = (
    <Bullets>
      <li>Architect and Tech Lead for the product.</li>
      <li>Built and shipped the full backend, APIs, and data architecture on Google Cloud and Firebase.</li>
      <li>Owned product strategy, UX/UI, and brand — validated at one school before scaling, now preparing for expansion.</li>
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
              <PhoneStage image={activeSrc} active={hasEntered} />
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
                <MediaTile
                  key={media.src}
                  src={media.mobileSrc}
                  alt={media.alt}
                  aspectRatio={media.aspectRatio}
                  onClick={() => setOpenIndex(index)}
                />
              ))}
            </Carousel>
          </motion.div>
        </>
      )}

      {openMedia && <Lightbox src={openMediaSrc!} alt={openMedia.alt} onClose={() => setOpenIndex(null)} />}
    </Wrapper>
  )
}
