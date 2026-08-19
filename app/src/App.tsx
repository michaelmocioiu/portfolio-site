import { ThemeProvider } from 'styled-components'
import { MotionConfig } from 'framer-motion'
import { theme } from './styles/theme'
import { GlobalStyle } from './styles/GlobalStyle'
import { ScrollProgressProvider } from './context/ScrollProgressContext'
import { Header } from './components/organisms/Header'
import Home from './pages/Home'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <MotionConfig reducedMotion="user">
        <ScrollProgressProvider>
          <Header />
          <Home />
        </ScrollProgressProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
