import styled from 'styled-components'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { CHAR_DELAY } from '../../lib/heroIntro'

const Span = styled(motion.span)`
  display: inline-block;
  will-change: clip-path;
`

type TypeRevealProps = {
  text: string
  startDelay: number
  as?: 'span'
  className?: string
  children?: ReactNode
}

/**
 * Reveals `text` left-to-right via an animated clip-path rather than adding
 * characters to the DOM. The element occupies its final width from the very
 * first frame, so nothing re-centers or reflows as it "types" — it just
 * uncovers left to right in place.
 */
export function TypeReveal({ text, startDelay, className }: TypeRevealProps) {
  const duration = Math.max(text.length, 1) * CHAR_DELAY
  return (
    <Span
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={{ clipPath: 'inset(0 0% 0 0)' }}
      transition={{ delay: startDelay, duration, ease: 'linear' }}
    >
      {text}
    </Span>
  )
}
