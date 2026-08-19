import styled from 'styled-components'
import { AnimatePresence, motion, type Transition } from 'framer-motion'

// Flat 2D phone mockup. Previously this rendered a tilted 3D phone via
// three.js, but the phone always faced the camera head-on (no actual tilt),
// so the WebGL cost bought nothing visually — this trades it for a plain
// CSS/SVG frame with the same rounded-body, notch, status-bar, and
// side-button details.

const STATUS_BAR_IMAGE = `${import.meta.env.BASE_URL}images/statusbar.jpg`
const FADE_S = 0.32

const ENTRANCE_TRANSITION: Transition = { type: 'spring', stiffness: 260, damping: 18, bounce: 0.35 }

const Stage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Body = styled(motion.div)`
  position: relative;
  height: 100%;
  aspect-ratio: 1179 / 2556;
  border-radius: 13% / 6%;
  background: linear-gradient(160deg, #2c2c2e, #0e0e0f 60%);
  box-shadow:
    0 30px 60px -20px rgba(0, 0, 0, 0.55),
    inset 0 0 0 2px rgba(255, 255, 255, 0.06);
  padding: 3%;
`

const SideButton = styled.div<{ $side: 'left' | 'right'; $top: string; $height: string }>`
  position: absolute;
  ${({ $side }) => ($side === 'left' ? 'left: -1%;' : 'right: -1%;')}
  top: ${({ $top }) => $top};
  width: 1%;
  height: ${({ $height }) => $height};
  background: linear-gradient(${({ $side }) => ($side === 'left' ? '270deg' : '90deg')}, #1c1c1e, #050505);
  border-radius: 1px;
`

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10% / 4.8%;
  overflow: hidden;
  background: #0a0a0a;
`

const ScreenImage = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const StatusBarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 5% 6.5% 0;
  background: linear-gradient(to bottom, #0a0a0a 65%, transparent);
`

const StatusBarImg = styled.img`
  display: block;
  width: 100%;
`

const Notch = styled.div`
  position: absolute;
  top: 1.6%;
  left: 50%;
  translate: -50% 0;
  width: 28%;
  height: 3.4%;
  background: #000;
  border-radius: 999px;
  z-index: 1;
`

type PhoneStageProps = {
  image: string | null
  /** Plays a spring-in entrance once this flips true. */
  active: boolean
}

export function PhoneStage({ image, active }: PhoneStageProps) {
  return (
    <Stage>
      <Body
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 16 }}
        transition={ENTRANCE_TRANSITION}
      >
        <SideButton $side="left" $top="18%" $height="5%" />
        <SideButton $side="left" $top="26%" $height="9%" />
        <SideButton $side="left" $top="37%" $height="9%" />
        <SideButton $side="right" $top="22%" $height="12%" />

        <Screen>
          <AnimatePresence initial={false}>
            {image && (
              <ScreenImage
                key={image}
                src={image}
                alt=""
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_S }}
              />
            )}
          </AnimatePresence>
          <StatusBarOverlay>
            <StatusBarImg src={STATUS_BAR_IMAGE} alt="" />
          </StatusBarOverlay>
          <Notch />
        </Screen>
      </Body>
    </Stage>
  )
}
