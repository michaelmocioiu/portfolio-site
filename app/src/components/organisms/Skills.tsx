import styled from 'styled-components'
import { SkillGroup } from '../molecules/SkillGroup'
import { SKILL_GROUPS } from '../../data/content'

// Reads as a divided spec sheet — columns separated by a hairline, echoing
// the bordered/rule-driven language used elsewhere (Divider, MediaTile,
// ProjectCard) rather than a cloud of standalone chips.
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 40px;
  row-gap: 32px;

  > div {
    padding-left: 40px;
    border-left: 1px solid color-mix(in srgb, ${({ theme }) => theme.colors.text} 14%, transparent);
  }

  > div:nth-child(odd) {
    padding-left: 0;
    border-left: none;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 28px;

    > div {
      padding-left: 0;
      border-left: none;
    }
  }
`

export function Skills() {
  return (
    <Grid>
      {SKILL_GROUPS.map((group) => (
        <SkillGroup key={group.title} title={group.title} items={group.items} />
      ))}
    </Grid>
  )
}
