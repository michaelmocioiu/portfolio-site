import styled from 'styled-components'
import { Hero } from '../components/organisms/Hero'
import { Divider } from '../components/atoms/Divider'
import { ExperienceCard } from '../components/molecules/ExperienceCard'
import { About } from '../components/organisms/About'
import { Highlight } from '../components/organisms/Highlight'
import { Projects } from '../components/organisms/Projects'
import { Contact } from '../components/organisms/Contact'
import { HEADER_HEIGHT } from '../components/organisms/Header'
import { EDUCATION, EXPERIENCE } from '../data/content'

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px 80px;

  section {
    /* Clears the docked fixed header (HEADER_HEIGHT) plus some breathing room. */
    scroll-margin-top: ${HEADER_HEIGHT + 16}px;
    /* TEMP: forcing 1-screen-tall sections to test the header dock/scroll behavior */
    min-height: 100vh;
  }
`

const SectionLabel = styled.h3`
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px;
`

const SubsectionLabel = styled.h4`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 32px 0 4px;

  &:first-of-type {
    margin-top: 0;
  }
`

function Home() {
  return (
    <>
      <Hero />
      <Content>
        <section id="about">
          <Divider />
          <SectionLabel>About Me</SectionLabel>
          <About />
        </section>

        <section id="highlight">
          <Divider />
          <SectionLabel>Highlight</SectionLabel>
          <Highlight />
        </section>

        <section id="experience">
          <Divider />
          <SectionLabel>Experience</SectionLabel>

          <SubsectionLabel>Professional</SubsectionLabel>
          {EXPERIENCE.map((entry) => (
            <ExperienceCard key={entry.title} {...entry} />
          ))}

          <SubsectionLabel>Education</SubsectionLabel>
          {EDUCATION.map((entry) => (
            <ExperienceCard key={entry.title} {...entry} />
          ))}
        </section>

        <section id="projects">
          <Divider />
          <SectionLabel>Projects</SectionLabel>
          <Projects />
        </section>

        <section id="contact">
          <Divider />
          <SectionLabel>Contact</SectionLabel>
          <Contact />
        </section>
      </Content>
    </>
  )
}

export default Home
