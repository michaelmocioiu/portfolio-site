import styled from 'styled-components'
import { VerticalRule } from '../atoms/VerticalRule'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3px 1.3fr 1fr;
  gap: 0 28px;
  align-items: end;

  @media (max-width: 640px) {
    grid-template-columns: 3px 1fr;

    > :last-child {
      grid-column: 2;
    }
  }
`

const Headline = styled.h2`
  font-weight: 700;
  font-size: clamp(32px, 4.8vw, 50px);
  line-height: 1.02;
  letter-spacing: -0.01em;
  margin: 0;
  text-wrap: balance;
`

const Role = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0;
`

const RoleLabel = styled.b`
  color: ${({ theme }) => theme.colors.accent};
  display: block;
  font-size: 13px;
  margin-bottom: 4px;
`

type HeroProps = {
  headline: string
  roleLabel: string
  roleDescription: string
}

export function Hero({ headline, roleLabel, roleDescription }: HeroProps) {
  return (
    <Grid>
      <VerticalRule />
      <Headline>{headline}</Headline>
      <Role>
        <RoleLabel>{roleLabel}</RoleLabel>
        {roleDescription}
      </Role>
    </Grid>
  )
}
