import styled from 'styled-components'
import { motion } from 'framer-motion'

const Figure = styled(motion.figure)<{ $aspectRatio?: number }>`
  --accent-shadow: ${({ theme }) => theme.colors.accent};
  position: relative;
  margin: 0;
  cursor: zoom-in;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 4%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  height: ${({ $aspectRatio }) => ($aspectRatio ? 'auto' : '220px')};
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio ?? 'auto'};

  /* Pre-positioned "shadow block" that only fades in on hover, instead of
     animating box-shadow itself — box-shadow isn't GPU-composited, so
     animating it repaints the tile every frame of the spring transition. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    translate: 6px 6px;
    background: var(--accent-shadow);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover::after {
    opacity: 1;
  }
`

const Img = styled(motion.img)<{ $aspectRatio?: number }>`
  display: block;
  ${({ $aspectRatio }) =>
    $aspectRatio
      ? `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `
      : `
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  `}
`

type MediaTileProps = {
  src: string
  alt: string
  onClick?: () => void
  // width / height so the tile's container matches the image's own
  // proportions (no letterboxing when tiles are height-constrained, e.g. in
  // the mobile carousel).
  aspectRatio?: number
}

export function MediaTile({ src, alt, onClick, aspectRatio }: MediaTileProps) {
  return (
    <Figure
      $aspectRatio={aspectRatio}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
    >
      <Img
        $aspectRatio={aspectRatio}
        src={src}
        alt={alt}
        loading="lazy"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.35 }}
      />
    </Figure>
  )
}
