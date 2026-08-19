import styled from 'styled-components'
import { TypedText } from '../atoms/TypedText'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const IN_VIEW_THRESHOLD = 0.6

// Same typewriter effect as the hero name, just quicker — these appear
// mid-scroll rather than on first paint, so a long type-in would read as lag.
const CHAR_DELAY = 0.04

const Heading = styled.h3`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px;
`

type SectionHeadingProps = {
  text: string
  className?: string
}

export function SectionHeading({ text, className }: SectionHeadingProps) {
  const [ref, hasEntered] = useInViewOnce<HTMLHeadingElement>(IN_VIEW_THRESHOLD)

  return (
    <Heading ref={ref} className={className}>
      <TypedText text={text} startDelay={0} charDelay={CHAR_DELAY} start={hasEntered} />
    </Heading>
  )
}
