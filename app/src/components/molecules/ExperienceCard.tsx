import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useInViewOnce } from '../../hooks/useInViewOnce'

const IN_VIEW_THRESHOLD = 0.2
const RISE_PX = 16

const Row = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 0 16px 16px;
  border-left: 3px solid transparent;
  transition: border-color 0.25s ease, transform 0.25s ease;

  &:hover,
  &:focus-within {
    border-left-color: ${({ theme }) => theme.colors.accent};
    transform: translateX(4px);
  }
`

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 17px;
  margin-bottom: 4px;
`

const CompanyLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

const LinkIcon = styled.svg`
  flex-shrink: 0;
  width: 12px;
  height: 12px;
`

const Meta = styled.div`
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

const Bullets = styled.ul`
  margin: 8px 0 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
`

type ExperienceCardProps = {
  company: string
  role?: string
  meta: string
  bullets?: string[]
  href?: string
}

export function ExperienceCard({ company, role, meta, bullets, href }: ExperienceCardProps) {
  const [ref, hasEntered] = useInViewOnce<HTMLDivElement>(IN_VIEW_THRESHOLD)

  const companyNode = href ? (
    <CompanyLink href={href} target="_blank" rel="noreferrer">
      {company}
      <LinkIcon viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7 17 17 7M9 7h8v8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </LinkIcon>
    </CompanyLink>
  ) : (
    company
  )

  return (
    <Row
      ref={ref}
      initial={{ opacity: 0, y: RISE_PX }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: RISE_PX }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div>
        <Title>
          {companyNode}
          {role && ` — ${role}`}
        </Title>
        <Meta>{meta}</Meta>
        {bullets && (
          <Bullets>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </Bullets>
        )}
      </div>
    </Row>
  )
}
