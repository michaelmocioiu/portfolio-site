type SocialIconName = 'linkedin' | 'instagram' | 'github' | 'email' | 'location'

type SocialIconProps = {
  name: SocialIconName
  size?: number
}

// Minimal single-path/stroke marks so they read well at the small size these
// render at in the hero row, and inherit color via currentColor.
const PATHS: Record<SocialIconName, JSX.Element> = {
  linkedin: (
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 7.03a1.96 1.96 0 1 0 0-3.93 1.96 1.96 0 0 0 0 3.93ZM20.44 20h-3.37v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.67V8.5h3.24v1.57h.05c.45-.86 1.56-1.76 3.2-1.76 3.43 0 4.06 2.25 4.06 5.19V20Z" />
  ),
  instagram: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 3.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9Zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM17.25 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  ),
  github: (
    <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.8c-2.64.57-3.2-1.14-3.2-1.14-.43-1.1-1.05-1.39-1.05-1.39-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.85 1.44 2.22 1.03 2.76.79.09-.62.33-1.03.6-1.27-2.11-.24-4.33-1.05-4.33-4.69 0-1.04.37-1.88.98-2.55-.1-.24-.42-1.22.09-2.55 0 0 .8-.26 2.6.97a9.05 9.05 0 0 1 4.74 0c1.8-1.23 2.6-.97 2.6-.97.51 1.33.19 2.31.1 2.55.6.67.97 1.51.97 2.55 0 3.65-2.22 4.45-4.34 4.69.34.29.64.87.64 1.75v2.6c0 .26.17.56.66.46A9.5 9.5 0 0 0 12 2.5Z" />
  ),
  email: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.4 2 6.1 5.34a.75.75 0 0 0 .99 0L18.6 7H5.4ZM19 8.62l-5.85 5.12a2.75 2.75 0 0 1-3.6 0L5 8.62V17h14V8.62Z"
    />
  ),
  location: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7Zm0 4.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z"
    />
  ),
}

export function SocialIcon({ name, size = 18 }: SocialIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {PATHS[name]}
    </svg>
  )
}
