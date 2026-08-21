import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'
import { Skills } from './Skills'

const IN_VIEW_THRESHOLD = 0.4
const STAGGER_S = 0.12
const RISE_PX = 18

const Root = styled.div`
  display: grid;
  gap: 40px;
`

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 40px;
  align-items: center;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const TextColumn = styled.div`
  position: relative;
`

const Intro = styled(motion.p)`
  font-size: 15px;
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
  position: relative;
`

const RingStage = styled.div`
  justify-self: center;

  @media (max-width: 640px) {
    display: none;
  }
`

const Ring = styled(motion.div)`
  position: relative;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.accent};
`

const Orbit = styled(motion.div)`
  position: absolute;
  inset: 0;
`

const OrbitDot = styled.span`
  position: absolute;
  top: -3px;
  left: 50%;
  width: 6px;
  height: 6px;
  margin-left: -3px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
`

const ExpertiseKicker = styled(motion.h4)`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 16px;
`

export function About() {
  const [ref, hasEntered] = useInViewOnce<HTMLDivElement>(IN_VIEW_THRESHOLD)

  return (
    <Root ref={ref}>
      <Wrapper>
        <TextColumn>
          <Intro
            initial={{ opacity: 0, y: RISE_PX }}
            animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE_PX }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Hi! I'm Michael, a software developer based in Toronto. I've been fascinated by computers for as long as I can remember. When I'm not coding, I enjoy reading about philosophy and politics, playing guitar and producing music, and working with a variety of creative media (drawing, digital paint, and sculpting are my go-tos). 
          </Intro>
        </TextColumn>
        <RingStage>
          <Ring
            aria-hidden
            initial={{ opacity: 0, scale: 0.7 }}
            animate={hasEntered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: STAGGER_S }}
          >
            {hasEntered && (
              <Orbit animate={{ rotate: 360 }} transition={{ duration: 12, ease: 'linear', repeat: Infinity }}>
                <OrbitDot />
              </Orbit>
            )}
          </Ring>
        </RingStage>
      </Wrapper>
      <div>
        <ExpertiseKicker
          initial={{ opacity: 0, y: 8 }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: STAGGER_S }}
        >
          Technical Expertise
        </ExpertiseKicker>
        <motion.div
          initial={{ opacity: 0, y: RISE_PX }}
          animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE_PX }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: STAGGER_S + 0.06 }}
        >
          <Skills />
        </motion.div>
      </div>
    </Root>
  )
}
