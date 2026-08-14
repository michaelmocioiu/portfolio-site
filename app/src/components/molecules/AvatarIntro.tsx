import styled from 'styled-components'
import { motion } from 'framer-motion'
import {
  AVATAR_GROW_DURATION,
  AVATAR_IMAGE_FADE_DELAY,
  AVATAR_LAST_LAYER_START,
  AVATAR_LAYER_STAGGER,
  AVATAR_OVERSHOOT_SCALE,
  AVATAR_SETTLE_DURATION,
} from '../../lib/heroIntro'

const SIZE = 208

const Stage = styled.div`
  position: relative;
  width: ${SIZE}px;
  height: ${SIZE}px;
  flex: none;
`

const LAYER_COLOR_TOKENS = ['text', 'muted', 'accent'] as const

const Layer = styled(motion.div)<{ $token: (typeof LAYER_COLOR_TOKENS)[number] }>`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: ${({ $token, theme }) => theme.colors[$token]};
`

const Photo = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.colors.accent};
`

type AvatarIntroProps = {
  src: string
  alt: string
}

// The last layer's color (accent) doubles as the final photo's border color,
// so the color expansion visually "resolves" into the ring the image sits in.
// Non-final layers glide up to the overshoot size and hold there, then fade
// out (rather than scale down) over the same window the last layer settles —
// otherwise their larger, held-open edges would peek out from behind the
// smaller final circle as a second ring.
export function AvatarIntro({ src, alt }: AvatarIntroProps) {
  const lastIndex = LAYER_COLOR_TOKENS.length - 1
  const settleStart = AVATAR_LAST_LAYER_START + AVATAR_GROW_DURATION

  return (
    <Stage>
      {LAYER_COLOR_TOKENS.map((token, index) => {
        const isLast = index === lastIndex
        return (
          <Layer
            key={token}
            $token={token}
            style={{ zIndex: index + 1 }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: isLast ? [0, AVATAR_OVERSHOOT_SCALE, 1] : [0, AVATAR_OVERSHOOT_SCALE],
              opacity: isLast ? 1 : 0,
            }}
            transition={
              isLast
                ? {
                    scale: {
                      delay: index * AVATAR_LAYER_STAGGER,
                      duration: AVATAR_GROW_DURATION + AVATAR_SETTLE_DURATION,
                      times: [0, AVATAR_GROW_DURATION / (AVATAR_GROW_DURATION + AVATAR_SETTLE_DURATION), 1],
                      ease: ['easeOut', 'easeInOut'],
                    },
                  }
                : {
                    scale: {
                      delay: index * AVATAR_LAYER_STAGGER,
                      duration: AVATAR_GROW_DURATION,
                      ease: 'easeOut',
                    },
                    opacity: {
                      delay: settleStart,
                      duration: AVATAR_SETTLE_DURATION,
                      ease: 'easeInOut',
                    },
                  }
            }
          />
        )
      })}
      <Photo
        src={src}
        alt={alt}
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: AVATAR_IMAGE_FADE_DELAY, duration: 0.5, ease: 'easeOut' }}
      />
    </Stage>
  )
}
