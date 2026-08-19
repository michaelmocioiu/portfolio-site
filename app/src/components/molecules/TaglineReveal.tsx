import styled from 'styled-components'
import { motion } from 'framer-motion'
import { LABEL_FADE_DURATION, LABEL_STAGGER, TAGLINE_LABELS } from '../../lib/heroIntro'

const Row = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 14px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0;
`

const Label = styled(motion.span)`
  display: inline-block;
`

const Dot = styled(motion.span)`
  display: inline-block;
  padding: 0 8px;
`

type TaglineRevealProps = {
  startDelay: number
}

// Labels fade in downward one at a time; each dot separator fades in
// rightward alongside the label that follows it.
export function TaglineReveal({ startDelay }: TaglineRevealProps) {
  return (
    <Row>
      {TAGLINE_LABELS.map((label, index) => {
        const labelDelay = startDelay + index * LABEL_STAGGER
        return (
          <span key={label} style={{ display: 'inline-flex' }}>
            {index > 0 && (
              <Dot
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: labelDelay, duration: LABEL_FADE_DURATION, ease: 'easeOut' }}
              >
                ·
              </Dot>
            )}
            <Label
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: labelDelay, duration: LABEL_FADE_DURATION, ease: 'easeOut' }}
            >
              {label}
            </Label>
          </span>
        )
      })}
    </Row>
  )
}
