import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  @media (min-width: 1024px) {
    html {
      scroll-snap-type: y proximity;
    }
  }

  body {
    margin: 0;
    overflow-x: hidden;
    font-family: ${({ theme }) => theme.fonts.sans};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.background};
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      transition-duration: 0.001ms !important;
    }
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.fonts.serif};
  }
`
