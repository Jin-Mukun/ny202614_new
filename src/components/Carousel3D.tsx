import { useState, useEffect, useRef, useCallback } from 'react'

interface Carousel3DProps {
  items?: string[]
  interval?: number
}

const defaultItems = [
  'images/image1.jpg',
  'images/image2.jpg',
  'images/image3.jpg',
  'images/image4.jpg',
  'images/image5.jpg'
]

function Carousel3D({ items = defaultItems, interval = 3000 }: Carousel3DProps) {
  const [positions, setPositions] = useState(['pos-1', 'pos-2', 'pos-3', 'pos-4', 'pos-5'])
  const carouselSectionRef = useRef<HTMLElement>(null)
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

  const rotateCarousel = useCallback(() => {
    setPositions(prev => {
      const newPositions = [...prev]
      newPositions.unshift(newPositions.pop()!)
      return newPositions
    })
  }, [])

  const startCarousel = useCallback(() => {
    if (intervalIdRef.current) return
    intervalIdRef.current = setInterval(rotateCarousel, interval)
  }, [interval, rotateCarousel])

  const stopCarousel = useCallback(() => {
    if (!intervalIdRef.current) return
    clearInterval(intervalIdRef.current)
    intervalIdRef.current = null
  }, [])

  useEffect(() => {
    startCarousel()

    if ('IntersectionObserver' in window && carouselSectionRef.current) {
      intersectionObserverRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCarousel()
            } else {
              stopCarousel()
            }
          })
        },
        { threshold: 0.1 }
      )
      intersectionObserverRef.current.observe(carouselSectionRef.current)
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCarousel()
      } else {
        startCarousel()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stopCarousel()
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect()
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [startCarousel, stopCarousel])

  return (
    <section className="carousel-section" ref={carouselSectionRef}>
      <div className="carousel-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${positions[index]}`}
            style={{ backgroundImage: `url(${item})` }}
          />
        ))}
      </div>
    </section>
  )
}

export default Carousel3D
