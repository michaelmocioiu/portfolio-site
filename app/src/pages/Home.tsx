import styled from 'styled-components'
import { Masthead } from '../components/organisms/Masthead'
import { Hero } from '../components/organisms/Hero'
import { Divider } from '../components/atoms/Divider'
import { ExperienceCard } from '../components/molecules/ExperienceCard'

const Page = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 52px 24px 80px;
`

const SectionLabel = styled.h3`
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 8px;
`

function Home() {
  return (
    <Page>
      <Masthead
        name="Michael Mocioiu"
        navItems={['About', 'Work', 'Contact']}
        issue="No. 01 — Founder & Engineer"
        established="Est. 2025"
      />
      <Hero
        headline="Code, product, and the will to ship it."
        roleLabel="WSH Network"
        roleDescription="CTO / Technical Founder — building an early-stage social platform from the ground up."
      />
      <Divider />
      <SectionLabel>Experience</SectionLabel>
      <ExperienceCard title="WSH Network — CTO / Technical Founder" meta="Apr 2025 — Present" />
      <ExperienceCard
        title="InSchoolwear Inc. — Training & Development Manager"
        meta="May 2022 — Sep 2022 · Richmond Hill, ON"
      />
    </Page>
  )
}

export default Home
