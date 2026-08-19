import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
`

const Ghost = styled.span`
  visibility: hidden;
`

const Typed = styled.span`
  position: absolute;
  inset: 0;
  left: 0;
  white-space: nowrap;
`

const Cursor = styled.span`
  display: inline-block;
  animation: hero-name-cursor-blink 0.9s steps(1) infinite;

  @keyframes hero-name-cursor-blink {
    0%,
    49% {
      opacity: 1;
    }
    50%,
    100% {
      opacity: 0;
    }
  }
`

type TypedTextProps = {
  text: string
  startDelay: number
  charDelay: number
  className?: string
  /** Gate for scroll-triggered usage — the timer only begins once this is true. Defaults to true (starts on mount). */
  start?: boolean
}

/**
 * Renders characters one at a time (a real typewriter, not a reveal
 * animation) with a blinking trailing cursor. A hidden ghost copy of the
 * full text reserves the final box size up front, so the typed overlay is
 * left-aligned inside it from the first frame — the "M" never moves.
 */
export function TypedText({ text, startDelay, charDelay, className, start = true }: TypedTextProps) {
  const [count, setCount] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    let index = 0
    const startTimer = window.setTimeout(() => {
      const tick = () => {
        index += 1
        setCount(index)
        if (index < text.length) {
          timerRef.current = window.setTimeout(tick, charDelay * 1000)
        }
      }
      tick()
    }, startDelay * 1000)

    return () => {
      window.clearTimeout(startTimer)
      if (timerRef.current !== null) window.clearTimeout(timerRef.current)
    }
  }, [text, startDelay, charDelay, start])

  const done = count >= text.length

  return (
    <Wrapper className={className} aria-label={text}>
      <Ghost aria-hidden="true">{text}</Ghost>
      <Typed aria-hidden="true">
        {text.slice(0, count)}
        {!done && <Cursor>_</Cursor>}
      </Typed>
    </Wrapper>
  )
}
