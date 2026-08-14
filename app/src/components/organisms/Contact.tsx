import styled from 'styled-components'

const Row = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`

const Link = styled.a`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 13px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.accent};
  }
`

export function Contact() {
  return (
    <Row>
      <Link href="mailto:michaelmocioiu@gmail.com">michaelmocioiu@gmail.com</Link>
      <Link href="https://github.com/michaelmocioiu" target="_blank" rel="noreferrer">
        github
      </Link>
      <Link href="https://www.linkedin.com/in/michael-mocioiu-23541b1b3/" target="_blank" rel="noreferrer">
        linkedin
      </Link>
    </Row>
  )
}
