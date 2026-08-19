import { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { AvatarIntro } from '../molecules/AvatarIntro'
import { TaglineReveal } from '../molecules/TaglineReveal'
import { LocationReveal } from '../molecules/LocationReveal'
import { SocialLinks } from '../molecules/SocialLinks'
import { TypedText } from '../atoms/TypedText'
import { useHeroHandoff } from '../../context/ScrollProgressContext'
import { NAME, NAME_CHAR_DELAY, NAV_HEIGHT, SOCIAL_LINKS_START, TAGLINE_START } from '../../lib/heroIntro'

// min-height (not height) + a fixed vertical rhythm so nothing here reflows
// as intro animations run — every animated child changes opacity/transform/
// clip-path only, never box size, keeping the whole hero layout-stable.
const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  text-align: center;
  padding: 40px 24px;
`

const Name = styled.h1`
  font-size: clamp(38px, 7vw, 64px);
  line-height: 1;
  margin: 0;
`

// Reserves the space the docked-out nav used to occupy so the hero's layout
// height doesn't jump once Header takes over rendering the nav itself.
const NavSpacer = styled.div`
  height: ${NAV_HEIGHT}px;
  margin-top: 12px;
`

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`

// Scroll-driven opacity/scale are written directly to these refs' inline
// style (see the subscribeScroll effect below) rather than passed as styled-
// component props — that avoids a React re-render of the whole Hero subtree
// on every scroll frame, which is what caused the mobile jank.
const FadeOut = styled.div`
  will-change: opacity;
`

const ScaleOut = styled.div`
  transform-origin: center;
  will-change: transform, opacity;
`

export function Hero() {
  const { setNavOrigin, subscribeScroll } = useHeroHandoff()
  const spacerRef = useRef<HTMLDivElement>(null)
  const avatarRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const measure = () => {
      if (!spacerRef.current) return
      const rect = spacerRef.current.getBoundingClientRect()
      setNavOrigin({ docTop: rect.top + window.scrollY })
    }
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      setNavOrigin(null)
    }
  }, [setNavOrigin])

  useLayoutEffect(() => {
    return subscribeScroll(({ progress }) => {
      const avatarScale = Math.max(0, 1 - progress)
      const nameOpacity = Math.max(0, 1 - progress * 2)
      const taglineOpacity = Math.max(0, 1 - progress / 0.7)

      if (avatarRef.current) {
        avatarRef.current.style.transform = `scale(${avatarScale})`
        avatarRef.current.style.opacity = String(avatarScale)
      }
      if (nameRef.current) nameRef.current.style.opacity = String(nameOpacity)
      if (taglineRef.current) taglineRef.current.style.opacity = String(taglineOpacity)
      if (locationRef.current) locationRef.current.style.opacity = String(taglineOpacity)
    })
  }, [subscribeScroll])

  return (
    <Wrapper>
      <ScaleOut ref={avatarRef}>
        <AvatarIntro src={`${import.meta.env.BASE_URL}images/headshot.jpg`} alt="Michael Mocioiu" />
      </ScaleOut>
      <div>
        <FadeOut ref={nameRef}>
          <Name>
            <TypedText text={NAME} startDelay={0} charDelay={NAME_CHAR_DELAY} />
          </Name>
        </FadeOut>
        <FadeOut ref={taglineRef}>
          <TaglineReveal startDelay={TAGLINE_START} />
        </FadeOut>
      </div>
      <FadeOut ref={locationRef}>
        <LocationRow>
          <LocationReveal label="Toronto, Canada" startDelay={TAGLINE_START} />
          <SocialLinks startDelay={SOCIAL_LINKS_START} />
        </LocationRow>
      </FadeOut>
      <NavSpacer ref={spacerRef} />
    </Wrapper>
  )
}
