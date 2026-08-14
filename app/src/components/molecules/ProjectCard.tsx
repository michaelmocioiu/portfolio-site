import styled from 'styled-components'

const Card = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 12%, transparent);

  &:last-child {
    border-bottom: none;
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

type ProjectCardProps = {
  title: string
  description?: string
  href?: string
  linkLabel?: string
}

export function ProjectCard({ title, description, href, linkLabel = 'view repo →' }: ProjectCardProps) {
  return (
    <Card>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {href && (
        <Link href={href} target="_blank" rel="noreferrer">
          {linkLabel}
        </Link>
      )}
    </Card>
  )
}
