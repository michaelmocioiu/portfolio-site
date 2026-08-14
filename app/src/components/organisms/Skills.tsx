import styled from 'styled-components'
import { SkillGroup } from '../molecules/SkillGroup'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px 32px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const SKILL_GROUPS = [
  { title: 'Languages & Frameworks', items: ['Python', 'JavaScript/TypeScript', 'Node.js', 'Java', 'C#', 'React Native'] },
  { title: 'Databases', items: ['SQL', 'Oracle DB', 'relational schema design', 'NoSQL / Firebase'] },
  { title: 'Infrastructure & Cloud', items: ['GCP', 'Docker', 'Linux'] },
  { title: 'Networking & Integration', items: ['REST APIs', 'remote system configuration'] },
]

export function Skills() {
  return (
    <Grid>
      {SKILL_GROUPS.map((group) => (
        <SkillGroup key={group.title} title={group.title} items={group.items} />
      ))}
    </Grid>
  )
}
