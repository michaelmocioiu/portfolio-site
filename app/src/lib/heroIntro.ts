// Central timeline for the hero's entering animation. Every component below
// reads its start delay from here instead of guessing, so the sequence
// (avatar+name -> tagline+location -> buttons) stays in sync as copy changes.

export const CHAR_DELAY = 0.045 // seconds between characters for clip-reveal text (nav buttons)
export const NAME_CHAR_DELAY = 0.075 // slower, deliberate cadence for the typed name

export const NAME = 'Michael Mocioiu'

export const TAGLINE_LABELS = ['Software Engineer', 'Founder', 'Full-Stack Developer']
export const LABEL_FADE_DURATION = 0.4
export const LABEL_STAGGER = 0.32

// Height of the nav row itself — shared by Hero's layout spacer and Header's
// docked vertical centering so the two never drift out of sync.
export const NAV_HEIGHT = 44

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Highlight', href: '#highlight' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const NAME_TYPE_DURATION = NAME.length * NAME_CHAR_DELAY

// Tagline + location both start once the name finishes typing.
export const TAGLINE_START = NAME_TYPE_DURATION

export const TAGLINE_DURATION =
  (TAGLINE_LABELS.length - 1) * LABEL_STAGGER + LABEL_FADE_DURATION

// The avatar's color-layer animation runs the same length as the name typing.
export const AVATAR_LAYER_COUNT = 3
export const AVATAR_TOTAL_DURATION = NAME_TYPE_DURATION
export const AVATAR_OVERSHOOT_SCALE = 1.045 // scaled down from the old spring overshoot
export const AVATAR_GROW_DURATION = AVATAR_TOTAL_DURATION * 0.32 // 0 -> overshoot, per layer
export const AVATAR_SETTLE_DURATION = AVATAR_TOTAL_DURATION * 0.22 // last layer only: overshoot -> rest
// Layers are evenly spaced from t=0 so the last layer's grow+settle lands exactly on AVATAR_TOTAL_DURATION.
export const AVATAR_LAST_LAYER_START =
  AVATAR_TOTAL_DURATION - AVATAR_GROW_DURATION - AVATAR_SETTLE_DURATION
export const AVATAR_LAYER_STAGGER = AVATAR_LAST_LAYER_START / (AVATAR_LAYER_COUNT - 1)
// Image fades in once the last color layer finishes its full animation.
export const AVATAR_IMAGE_FADE_DELAY = AVATAR_TOTAL_DURATION

export const PIN_DROP_DURATION = 0.7

// Buttons start once the tagline has fully finished.
export const BUTTONS_START = TAGLINE_START + TAGLINE_DURATION
export const BUTTON_STAGGER = CHAR_DELAY * 2
