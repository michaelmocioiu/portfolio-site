import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ScrollProgressProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}

export default App
