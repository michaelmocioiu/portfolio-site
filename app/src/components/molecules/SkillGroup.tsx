import styled from 'styled-components'

const Group = styled.div`
  break-inside: avoid;
`

const Title = styled.h4`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  margin: 0 0 8px;
`

const List = styled.p`
  font-size: 14px;
  line-height: 1.6;
  margin: 0;
`

type SkillGroupProps = {
  title: string
  items: string[]
}

export function SkillGroup({ title, items }: SkillGroupProps) {
  return (
    <Group>
      <Title>{title}</Title>
      <List>{items.join(', ')}</List>
    </Group>
  )
}
