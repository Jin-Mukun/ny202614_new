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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([2])) // 预加载当前显示的图片
  const carouselSectionRef = useRef<HTMLElement>(null)
  const intervalIdRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null)

  // 预加载下一张图片
  const preloadNextImage = useCallback((currentIndex: number) => {
    const nextIndex = (currentIndex + 1) % items.length
    const prevIndex = (currentIndex - 1 + items.length) % items.length

    setLoadedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(currentIndex)
      newSet.add(nextIndex)
      newSet.add(prevIndex)
      return newSet
    })
  }, [items.length])

  const rotateCarousel = useCallback(() => {
    setPositions(prev => {
      const newPositions = [...prev]
      newPositions.unshift(newPositions.pop()!)

      // 计算当前显示的图片索引（pos-3 是当前显示的图片）
      const currentIndex = newPositions.indexOf('pos-3')
      preloadNextImage(currentIndex)

      return newPositions
    })
  }, [preloadNextImage])

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
    // 预加载前3张图片
    setLoadedImages(new Set([0, 1, 2]))
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

  // 获取当前显示的图片索引
  const currentIndex = positions.indexOf('pos-3')

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
              loading={index <= 2 ? 'eager' : 'lazy'}
              decoding={index === currentIndex ? 'sync' : 'async'}
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
