import styled from 'styled-components'
import { SocialIcon } from '../atoms/SocialIcon'
import { SOCIAL_LINKS } from '../../data/content'

const Root = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.text};
  padding: 24px 0;
`

const Row = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
`

const Signature = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0;
`

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const IconLink = styled.a`
  display: flex;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <Root>
      <Row>
        <Signature>&copy; {year} Michael Mocioiu</Signature>
        <IconRow>
          {SOCIAL_LINKS.map((link) => (
            <IconLink
              key={link.name}
              href={link.href}
              aria-label={link.label}
              target={link.name === 'email' ? undefined : '_blank'}
              rel={link.name === 'email' ? undefined : 'noreferrer'}
            >
              <SocialIcon name={link.name} size={16} />
            </IconLink>
          ))}
        </IconRow>
      </Row>
    </Root>
  )
}
