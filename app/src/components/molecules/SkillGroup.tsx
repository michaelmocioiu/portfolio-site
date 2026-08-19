import styled from 'styled-components'
import { motion } from 'framer-motion'
import { TechIcon } from '../atoms/TechIcon'
import type { SkillEntry } from '../../data/content'

const Group = styled.div`
  break-inside: avoid;
`

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 15px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 14%, transparent);
`

const List = styled.div``

const Row = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: -13px;
  padding: 8px 0 8px 10px;
  border-left: 2px solid transparent;
  border-bottom: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 8%, transparent);
  font-size: 13.5px;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease, border-left-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-left-color: ${({ theme }) => theme.colors.accent};
  }

  &:hover svg {
    color: var(--tech-brand, ${({ theme }) => theme.colors.accent});
  }
`

const IconScale = styled(motion.span)`
  display: flex;
  flex: none;

  svg {
    transition: color 0.2s ease;
  }
`

const TextScale = styled(motion.span)`
  display: inline-block;
`

const iconHover = {
  rest: { scale: 1 },
  hover: { scale: 1.2 },
}

const textHover = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
}

type SkillGroupProps = {
  title: string
  items: SkillEntry[]
}

export function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <Group>
      <Title>{title}</Title>
      <List>
        {items.map((item, index) => (
          <Row
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            whileHover="hover"
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ delay: index * 0.05, duration: 0.35, ease: 'easeOut' }}
          >
            <IconScale variants={iconHover} transition={{ duration: 0.2, ease: 'easeOut' }}>
              <TechIcon name={item.icon} size={19} />
            </IconScale>
            <TextScale variants={textHover} transition={{ duration: 0.2, ease: 'easeOut' }}>
              {item.name}
            </TextScale>
          </Row>
        ))}
      </List>
    </Group>
  )
}
