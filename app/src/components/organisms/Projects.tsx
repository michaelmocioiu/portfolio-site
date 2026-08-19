import styled from 'styled-components'
import { ProjectCard } from '../molecules/ProjectCard'
import { PROJECTS } from '../../data/content'

const List = styled.div`
  display: flex;
  flex-direction: column;
`

export function Projects() {
  return (
    <List>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </List>
  )
}
