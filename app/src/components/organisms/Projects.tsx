import styled from 'styled-components'
import { ProjectCard } from '../molecules/ProjectCard'

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const PROJECTS = [
  {
    title: 'Opportune',
    description:
      'George Brown capstone project — a job-search platform built around transparency and accountability between candidates and employers.',
  },
  {
    title: 'Connect 4 with AI opponent',
    description: 'Java implementation with a minimax-based AI opponent.',
    href: 'https://github.com/michaelmocioiu/Java_Connect4',
  },
  {
    title: 'Library Management System',
    description: 'Desktop app for library inventory and lending, built in Java/JavaFX.',
    href: 'https://github.com/michaelmocioiu/Library-Management-System',
  },
  {
    title: 'Travel planning site',
    description: 'Group project built on ASP.NET MVC.',
    href: 'https://github.com/michaelmocioiu/GBC_Travel-Group23',
  },
]

export function Projects() {
  return (
    <List>
      {PROJECTS.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </List>
  )
}
