import styled from 'styled-components'
import { motion } from 'framer-motion'

// Repurposes MediaTile's hover lift + accent shadow-pop for a text row
// instead of an image tile.
const Row = styled(motion.button)<{ $active: boolean }>`
  --accent-shadow: ${({ theme }) => theme.colors.accent};
  display: block;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  border-left: 3px solid
    ${({ $active, theme }) => (
      $active ? theme.colors.accent : 'color-mix(in srgb, ' + theme.colors.text + ' 14%, transparent)'
    )};
  padding: 10px 0 10px 16px;
  cursor: pointer;
  font-family: inherit;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : theme.colors.muted)};
`

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: 16px;
  display: block;
`

const Description = styled.span`
  font-size: 12px;
  line-height: 1.5;
  display: block;
  margin-top: 2px;
`

type HoverTextButtonProps = {
  label: string
  description?: string
  active: boolean
  onHoverStart: () => void
  onHoverEnd: () => void
}

export function HoverTextButton({ label, description, active, onHoverStart, onHoverEnd }: HoverTextButtonProps) {
  return (
    <Row
      type="button"
      $active={active}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onFocus={onHoverStart}
      onBlur={onHoverEnd}
      whileHover={{ x: 6, boxShadow: '6px 6px 0 var(--accent-shadow)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <Label>{label}</Label>
      {description && <Description>{description}</Description>}
    </Row>
  )
}
