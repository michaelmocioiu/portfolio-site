import styled from 'styled-components'
import { motion } from 'framer-motion'

const Figure = styled(motion.figure)`
  --accent-shadow: ${({ theme }) => theme.colors.accent};
  margin: 0;
  cursor: zoom-in;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 4%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  overflow: hidden;
`

const Img = styled(motion.img)`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
`

type MediaTileProps = {
  src: string
  alt: string
  onClick?: () => void
}

export function MediaTile({ src, alt, onClick }: MediaTileProps) {
  return (
    <Figure
      onClick={onClick}
      whileHover={{ y: -4, boxShadow: '6px 6px 0 var(--accent-shadow)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <Img src={src} alt={alt} loading="lazy" whileHover={{ scale: 1.06 }} transition={{ duration: 0.35 }} />
    </Figure>
  )
}
