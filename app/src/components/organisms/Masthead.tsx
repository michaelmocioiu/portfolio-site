import styled from 'styled-components'

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`

const Issue = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: 0.1em;
  padding: 8px 0 28px;
  font-weight: 700;
`

type MastheadProps = {
  name: string
  navItems: string[]
  issue: string
  established: string
}

export function Masthead({ name, navItems, issue, established }: MastheadProps) {
  return (
    <>
      <Nav>
        <span>{name}</span>
        <span>{navItems.join(' — ')}</span>
      </Nav>
      <Issue>
        <span>{issue}</span>
        <span>{established}</span>
      </Issue>
    </>
  )
}
