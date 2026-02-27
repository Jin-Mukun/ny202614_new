import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NavigationBar from './components/NavigationBar'
import FooterBar from './components/FooterBar'
import AppRoutes from './router'
import './styles/variables.css'
import './styles/global.css'
import './styles/components.css'
import './styles/components-extra.css'
import './styles/views.css'
import './styles/markdown.css'

function App() {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div id="app">
      <div className="background-decoration">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <NavigationBar />

      <main className="main-content">
        <div
          className={`page-transition ${isVisible ? 'page-enter-active' : 'page-enter-from'}`}
        >
          <AppRoutes />
        </div>
      </main>

      <FooterBar />
    </div>
  )
}

export default App
