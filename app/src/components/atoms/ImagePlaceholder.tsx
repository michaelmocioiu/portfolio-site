import styled from 'styled-components'

const Box = styled.div<{ $ratio: string }>`
  aspect-ratio: ${({ $ratio }) => $ratio};
  border: 1px dashed ${({ theme }) => theme.colors.muted};
  background: color-mix(in srgb, ${({ theme }) => theme.colors.text} 4%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 16px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.muted};
`

type ImagePlaceholderProps = {
  label: string
  ratio?: string
}

export function ImagePlaceholder({ label, ratio = '4 / 3' }: ImagePlaceholderProps) {
  return <Box $ratio={ratio}>{label}</Box>
}
