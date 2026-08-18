import { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { SocialIcon } from '../atoms/SocialIcon'
import { PIN_DROP_DURATION } from '../../lib/heroIntro'

// Extra room past the text's measured width so sub-pixel rounding in the
// width transition never clips the last character.
const CLIP_WIDTH_BUFFER = 3

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 20px;
`

const Pin = styled(motion.span)`
  display: flex;
  color: ${({ theme }) => theme.colors.muted};
  flex: none;
`

const Clip = styled(motion.span)`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  vertical-align: middle;
`

const Text = styled.span`
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.muted};
  padding-left: 6px;
`

type LocationRevealProps = {
  label: string
  startDelay: number
}

// The pin drops in centered. Once it lands, the label's clip box widens from
// 0 to its measured width, so the text reads as growing out from directly
// under the pin — the pin shifts left only because the shared row widens
// around it, so the two stay visually attached the whole time.
export function LocationReveal({ label, startDelay }: LocationRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [targetWidth, setTargetWidth] = useState(0)

  useLayoutEffect(() => {
    if (textRef.current) setTargetWidth(textRef.current.scrollWidth + CLIP_WIDTH_BUFFER)
  }, [label])

  const revealDelay = startDelay + PIN_DROP_DURATION

  return (
    <Wrapper>
      <Pin
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: startDelay, duration: PIN_DROP_DURATION, type: 'spring', bounce: 0.55 }}
      >
        <SocialIcon name="location" size={15} />
      </Pin>
      <Clip
        initial={{ width: 0 }}
        animate={{ width: targetWidth }}
        transition={{ delay: revealDelay, duration: 0.5, ease: 'easeOut' }}
      >
        <Text ref={textRef}>{label}</Text>
      </Clip>
    </Wrapper>
  )
}
