import styled from 'styled-components'
import { motion } from 'framer-motion'
import { SocialIcon } from '../atoms/SocialIcon'
import { SOCIAL_LINKS_STAGGER } from '../../lib/heroIntro'
import { SOCIAL_LINKS } from '../../data/content'

const List = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Link = styled(motion.a)`
  display: flex;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
`

type SocialLinksProps = {
  startDelay: number
}

export function SocialLinks({ startDelay }: SocialLinksProps) {
  return (
    <List>
      {SOCIAL_LINKS.map((link, index) => (
        <Link
          key={link.name}
          href={link.href}
          aria-label={link.label}
          target={link.name === 'email' ? undefined : '_blank'}
          rel={link.name === 'email' ? undefined : 'noreferrer'}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: startDelay + index * SOCIAL_LINKS_STAGGER, duration: 0.35, ease: 'easeOut' }}
        >
          <SocialIcon name={link.name} />
        </Link>
      ))}
    </List>
  )
}
