import styled from 'styled-components'
import { SOCIAL_LINKS } from '../../data/content'

const EMAIL = SOCIAL_LINKS.find((link) => link.name === 'email')!

const Root = styled.div`
  display: grid;
  gap: 16px;
  justify-items: start;
`

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
`

const Body = styled.p`
  font-size: 14px;
  line-height: 1.7;
  max-width: 480px;
  margin: 0;
`

const EmailButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.accent} 40%, transparent);
  border-radius: 999px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;

  &:hover,
  &:focus-visible {
    background: color-mix(in srgb, ${({ theme }) => theme.colors.accent} 10%, transparent);
  }
`

export function Contact() {
  return (
    <Root>
      <Kicker>Get in touch</Kicker>
      <Body>Have a role, project, or idea worth building? I&rsquo;d like to hear about it.</Body>
      <EmailButton href={EMAIL.href}>
        {EMAIL.href.replace('mailto:', '')}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </EmailButton>
    </Root>
  )
}
