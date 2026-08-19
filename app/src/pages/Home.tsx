import styled from 'styled-components'
import { Hero } from '../components/organisms/Hero'
import { Divider } from '../components/atoms/Divider'
import { ExperienceCard } from '../components/molecules/ExperienceCard'
import { SectionHeading } from '../components/molecules/SectionHeading'
import { About } from '../components/organisms/About'
import { Highlight } from '../components/organisms/Highlight'
import { Projects } from '../components/organisms/Projects'
import { Contact } from '../components/organisms/Contact'
import { Footer } from '../components/organisms/Footer'
import { HEADER_HEIGHT } from '../components/organisms/Header'
import { EDUCATION, EXPERIENCE } from '../data/content'

const Content = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px 80px;

  section {
    /* Clears the docked fixed header (HEADER_HEIGHT) plus some breathing room. */
    scroll-margin-top: ${HEADER_HEIGHT + 16}px;
    scroll-snap-align: start;
  }
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
          <SectionHeading text="About Me" />
          <About />
        </section>

        <section id="highlight">
          <Divider />
          <Highlight />
        </section>

        <section id="experience">
          <Divider />
          <SectionHeading text="Experience" />

          <SubsectionLabel>Professional</SubsectionLabel>
          {EXPERIENCE.map((entry) => (
            <ExperienceCard key={entry.company} {...entry} />
          ))}

          <SubsectionLabel>Education</SubsectionLabel>
          {EDUCATION.map((entry) => (
            <ExperienceCard key={entry.company} {...entry} />
          ))}
        </section>

        <section id="projects">
          <Divider />
          <SectionHeading text="Projects" />
          <Projects />
        </section>

        <section id="contact">
          <Divider />
          <SectionHeading text="Contact" />
          <Contact />
        </section>
      </Content>
      <Footer />
    </>
  )
}

export default Home
