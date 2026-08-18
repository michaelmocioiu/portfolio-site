import type { TechIconName } from '../components/atoms/TechIcon'

export type ExperienceEntry = {
  title: string
  meta: string
  bullets?: string[]
  href?: string
  linkLabel?: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: 'WSH Network — CTO / Technical Founder / Sole Engineer',
    meta: 'Apr 2025 — Present',
    bullets: [
      'Founded and lead all technical operations of an early-stage social platform, owning product vision and execution end to end.',
      'Drive executive-level decision-making across product strategy, operations, and growth.',
    ],
    href: 'https://wshnetwork.com',
    linkLabel: 'wshnetwork.com',
  },
  {
    title: 'InSchoolwear Inc. — Training & Development Manager',
    meta: 'May 2022 — Sep 2022 · Richmond Hill, ON',
    bullets: [
      'Managed the full hiring lifecycle for a retail team of 5–15, including interviews, onboarding, and structured training.',
      'Monitored ongoing employee performance against company standards and service quality.',
    ],
  },
]

export const EDUCATION: ExperienceEntry[] = [
  {
    title: 'George Brown College — Advanced Diploma, Computer Programming and Analysis',
    meta: '2021 — 2024',
  },
]

export type SocialLinkEntry = {
  name: 'linkedin' | 'instagram' | 'github' | 'email'
  label: string
  href: string
}

// TODO(Michael): replace with your real profile URLs.
export const SOCIAL_LINKS: SocialLinkEntry[] = [
  { name: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/michael-b-mocioiu-23541b1b3/' },
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/mxcioiu' },
  { name: 'github', label: 'GitHub', href: 'https://github.com/michaelmocioiu' },
  { name: 'email', label: 'Email', href: 'mailto:michaelmocioiu@gmail.com' },
]

export type SkillEntry = {
  name: string
  icon: TechIconName
}

export type SkillGroupEntry = {
  title: string
  items: SkillEntry[]
}

export const SKILL_GROUPS: SkillGroupEntry[] = [
  {
    title: 'Languages & Frameworks',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'Java', icon: 'java' },
      { name: 'C#', icon: 'csharp' },
      { name: 'React Native', icon: 'react' },
    ],
  },
  {
    title: 'Databases',
    items: [
      { name: 'SQL', icon: 'database' },
      { name: 'Oracle DB', icon: 'oracle' },
      { name: 'Relational Schema Design', icon: 'schema' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    title: 'Infrastructure & Cloud',
    items: [
      { name: 'GCP', icon: 'cloud' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Linux', icon: 'linux' },
    ],
  },
  {
    title: 'Networking & Integration',
    items: [
      { name: 'REST APIs', icon: 'api' },
      { name: 'Remote System Configuration', icon: 'terminal' },
    ],
  },
]
