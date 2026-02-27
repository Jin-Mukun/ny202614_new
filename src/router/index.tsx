import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import HomeView from '../views/HomeView'
import VideoView from '../views/VideoView'
import BlogView from '../views/BlogView'
import BlogArticleView from '../views/BlogArticleView'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/video" element={<VideoView />} />
        <Route path="/blog" element={<BlogView />} />
        <Route path="/blog/:id" element={<BlogArticleView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default AppRoutes
