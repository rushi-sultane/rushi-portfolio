
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import WhatsAppFloat from './components/common/WhatsAppFloat'

function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>

          <WhatsAppFloat />
        </BrowserRouter>
      </LazyMotion>
    </ThemeProvider>
  )
}

export default App
