import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 16px 0;
`

const Title = styled.div`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 17px;
  margin-bottom: 4px;
`

const Meta = styled.div`
  font-size: 11px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`

const Arrow = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 700;
  font-size: 13px;
  align-self: center;
  text-decoration: none;

  &:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`

type ExperienceCardProps = {
  title: string
  meta: string
  href?: string
  linkLabel?: string
}

export function ExperienceCard({
  title,
  meta,
  href,
  linkLabel = 'read more →',
}: ExperienceCardProps) {
  return (
    <Row>
      <div>
        <Title>{title}</Title>
        <Meta>{meta}</Meta>
      </div>
      {href && <Arrow href={href}>{linkLabel}</Arrow>}
    </Row>
  )
}
