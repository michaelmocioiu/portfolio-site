import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const IN_VIEW_THRESHOLD = 0.2
const RISE_PX = 16

const Card = styled(motion.div)`
  padding: 16px 0 16px 16px;
  border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 12%, transparent);
  border-left: 3px solid transparent;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover,
  &:focus-within {
    border-left-color: ${({ theme }) => theme.colors.accent};
    transform: translateX(4px);
  }
`

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 16px;
  margin-bottom: 4px;
`

const Description = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 6px;
  line-height: 1.5;
`

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

const LinkRow = styled.div`
  display: flex;
  gap: 16px;
`

type ProjectCardProps = {
  title: string
  description?: string
  repoHref?: string
  websiteHref?: string
}

export function ProjectCard({ title, description, repoHref, websiteHref }: ProjectCardProps) {
  const [ref, hasEntered] = useInViewOnce<HTMLDivElement>(IN_VIEW_THRESHOLD)

  return (
    <Card
      ref={ref}
      initial={{ opacity: 0, y: RISE_PX }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE_PX }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {(repoHref || websiteHref) && (
        <LinkRow>
          {repoHref && (
            <Link href={repoHref} target="_blank" rel="noreferrer">
              view repo →
            </Link>
          )}
          {websiteHref && (
            <Link href={websiteHref} target="_blank" rel="noreferrer">
              view website →
            </Link>
          )}
        </LinkRow>
      )}
    </Card>
  )
}
