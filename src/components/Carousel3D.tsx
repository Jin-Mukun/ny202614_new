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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
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

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  return (
    <section className="carousel-section" ref={carouselSectionRef}>
      <div className="carousel-container">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${positions[index]}`}
            style={{
              backgroundImage: loadedImages.has(index) ? `url(${item})` : 'none',
              backgroundColor: '#f1f5f9'
            }}
          >
            <img
              src={item}
              alt=""
              loading={index === 2 ? 'eager' : 'lazy'}
              decoding="async"
              onLoad={() => handleImageLoad(index)}
              style={{
                position: 'absolute',
                width: 0,
                height: 0,
                opacity: 0,
                pointerEvents: 'none'
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Carousel3D
