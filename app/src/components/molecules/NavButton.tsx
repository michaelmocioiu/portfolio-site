import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { TypeReveal } from '../atoms/TypeReveal'

const HOVER_FLASH_HOLD = 100 // ms — how long the simulated hover-in holds before releasing

const Button = styled.a<{ $active?: boolean; $dimmed?: boolean; $flash?: boolean }>`
  position: relative;
  display: inline-block;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ $active }) => ($active ? '16px' : '13px')};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  color: ${({ theme, $active, $flash }) => ($active || $flash ? theme.colors.accent : theme.colors.text)};
  padding: 10px 4px;
  opacity: ${({ $dimmed }) => ($dimmed ? 0.55 : 1)};
  transform: ${({ $active, $dimmed, $flash }) =>
    $active || $flash
      ? 'translateY(-3px) scale(1)'
      : $dimmed
        ? 'translateY(0) scale(0.9)'
        : 'translateY(0) scale(1)'};
  transition: color 0.3s ease, font-size 0.3s ease, transform 0.3s ease, opacity 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 4px;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.accent};
    transform: scaleX(${({ $active, $flash }) => ($active || $flash ? 1 : 0)});
    transform-origin: ${({ $active, $flash }) => ($active || $flash ? 'left' : 'right')};
    transition: transform 0.25s ease;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
    opacity: 1;
    transform: translateY(-3px) scale(1);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`

type NavButtonProps = {
  href: string
  label: string
  startDelay?: number
  active?: boolean
  dimmed?: boolean
}

// Always renders the same TypeReveal element (never swaps to plain text)
// so it never unmounts — its clip-path reveal is a one-time entrance
// animation and must stay mounted to avoid replaying every time the nav
// re-enters the undocked state (e.g. scrolling back up past the dock point).
export function NavButton({ href, label, startDelay = 0, active, dimmed }: NavButtonProps) {
  const [flash, setFlash] = useState(false)
  const releaseTimer = useRef<ReturnType<typeof setTimeout>>()

  const handleRevealComplete = () => {
    setFlash(true)
    releaseTimer.current = setTimeout(() => setFlash(false), HOVER_FLASH_HOLD)
  }

  useEffect(() => () => clearTimeout(releaseTimer.current), [])

  return (
    <Button href={href} $active={active} $dimmed={dimmed} $flash={flash}>
      <TypeReveal text={label} startDelay={startDelay} onRevealComplete={handleRevealComplete} />
    </Button>
  )
}
