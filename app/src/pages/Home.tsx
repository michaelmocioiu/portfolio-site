import styled from 'styled-components'
import { Hero } from '../components/organisms/Hero'
import { Divider } from '../components/atoms/Divider'
import { ExperienceCard } from '../components/molecules/ExperienceCard'
import { Highlight } from '../components/organisms/Highlight'
import { Skills } from '../components/organisms/Skills'
import { Projects } from '../components/organisms/Projects'
import { Contact } from '../components/organisms/Contact'
import { HEADER_HEIGHT } from '../components/organisms/Header'

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
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 8px;
`

const Intro = styled.p`
  font-size: 15px;
  line-height: 1.7;
  max-width: 640px;
  margin: 0;
`

function Home() {
  return (
    <>
      <Hero />
      <Content>
        <section id="about">
          <SectionLabel>About</SectionLabel>
          <Intro>
            Technically versatile software engineer and founder with hands-on experience architecting and deploying
            full-stack systems across cloud infrastructure, databases, and APIs. Comfortable working independently,
            diagnosing complex technical issues, and shipping reliable systems with minimal oversight.
          </Intro>
        </section>

        <Divider />
        <section id="highlight">
          <SectionLabel>Highlight</SectionLabel>
          <Highlight />
        </section>

        <Divider />
        <section id="expertise">
          <SectionLabel>Technical Expertise</SectionLabel>
          <Skills />
        </section>

        <Divider />
        <section id="experience">
          <SectionLabel>Experience</SectionLabel>
          <ExperienceCard
            title="WSH Network — CTO / Technical Founder / Sole Engineer"
            meta="Apr 2025 — Present"
            bullets={[
              'Founded and lead all technical operations of an early-stage social platform, owning product vision and execution end to end.',
              'Drive executive-level decision-making across product strategy, operations, and growth.',
            ]}
          />
          <ExperienceCard
            title="InSchoolwear Inc. — Training & Development Manager"
            meta="May 2022 — Sep 2022 · Richmond Hill, ON"
            bullets={[
              'Managed the full hiring lifecycle for a retail team of 5–15, including interviews, onboarding, and structured training.',
              'Monitored ongoing employee performance against company standards and service quality.',
            ]}
          />
        </section>

        <Divider />
        <section id="projects">
          <SectionLabel>Projects</SectionLabel>
          <Projects />
        </section>

        <Divider />
        <section id="education">
          <SectionLabel>Education</SectionLabel>
          <ExperienceCard
            title="George Brown College — Advanced Diploma, Computer Programming and Analysis"
            meta="2021 — 2024"
          />
        </section>

        <Divider />
        <section id="contact">
          <SectionLabel>Contact</SectionLabel>
          <Contact />
        </section>
      </Content>
    </>
  )
}

export default Home
