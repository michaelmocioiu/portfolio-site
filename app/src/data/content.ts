import type { TechIconName } from '../components/atoms/TechIcon'

export type ExperienceEntry = {
  company: string
  role?: string
  meta: string
  bullets?: string[]
  href?: string
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: 'Zuri Solutions',
    role: 'Founding Member',
    meta: 'May 2026 — Present',
    bullets: [
      'Founding member of a custom solutions studio delivering bespoke automation and orchestration systems for clients. ',
      'Serve as the primary technical point of contact across client engagements, translating business requirements into working systems.',
      'Serve as the team\'s primary technical decision-maker across architecture, tooling, and implementation.',
    ],
    href: 'https://zurisolutions.dev',
  },
  {
    company: 'WSH Network',
    role: 'CTO / Technical Founder / Sole Engineer',
    meta: 'Apr 2025 — Present',
    bullets: [
      'Sole technical decision-maker for the company, owning all infrastructure, architecture, and stack choices.',
      'Built and shipped the full backend, APIs, and data architecture on Google Cloud and Firebase, validated at one school (~600 users) ahead of a planned multi-school expansion.',
    ],
    href: 'https://wshnetwork.com',
  },
  {
    company: 'InSchoolwear Inc.',
    role: 'Training & Development Manager',
    meta: 'May 2022 — Sep 2022 · Richmond Hill, ON',
    bullets: [
      'Hired and trained a retail team of 20, with 100% retention among hires made under my management.',
      'Implemented a faster floor protocol at a mandatory school-uniform retail location, reducing customer bottlenecks during peak rushes.',
    ],
    href: 'https://inschoolwear.com/',
  },
]

export const EDUCATION: ExperienceEntry[] = [
  {
    company: 'George Brown College',
    role: 'Advanced Diploma, Computer Programming and Analysis',
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

export type ProjectEntry = {
  title: string
  description?: string
  repoHref?: string
  websiteHref?: string
}

export const PROJECTS: ProjectEntry[] = [
  {
    title: 'Widget Gallery',
    description:
      'A github pages hosted site showcasing a collection of small, interactive web components built with React and TypeScript.',
    websiteHref: 'https://michaelmocioiu.github.io/widget-lib',
    repoHref: 'https://github.com/michaelmocioiu/widget-lib'
  },
  {
    title: 'Connect 4 with AI opponent',
    description: 'Java implementation with a minimax-based AI opponent.',
    repoHref: 'https://github.com/michaelmocioiu/Java_Connect4',
  },
  {
    title: 'Library Management System',
    description: 'Desktop app for library inventory and lending, built in Java/JavaFX.',
    repoHref: 'https://github.com/michaelmocioiu/Library-Management-System',
  },
  {
    title: 'Travel planning site',
    description: 'Group project built on ASP.NET MVC.',
    repoHref: 'https://github.com/michaelmocioiu/GBC_Travel-Group23',
  },
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
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'Firebase', icon: 'firebase' },
    ],
  },
  {
    title: 'Infrastructure & Networking',
    items: [
      { name: 'GCP', icon: 'cloud' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Linux', icon: 'linux' },
      { name: 'REST APIs', icon: 'api' },
      { name: 'Remote System Configuration', icon: 'terminal' },
    ],
  },
  {
    title: 'AI & ML',
    items: [
      { name: 'Claude Code', icon: 'claude' },
      { name: 'n8n', icon: 'n8n' },
      { name: 'llama.cpp', icon: 'terminal' },
      { name: 'Ollama', icon: 'ollama' },
      { name: 'TensorFlow', icon: 'tensorflow' },
    ],
  },
]
