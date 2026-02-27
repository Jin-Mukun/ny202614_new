import { useState, useEffect, useRef, useCallback } from 'react'

interface VideoPlayerProps {
  currentSrc?: string
  currentTitle?: string
}

function VideoPlayer({ currentSrc, currentTitle }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showRetry, setShowRetry] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('准备就绪')
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isInViewport, setIsInViewport] = useState(false)

  const progressRafRef = useRef<number | null>(null)
  const progressLastUpdateRef = useRef(0)

  // Intersection Observer - 只在视频进入视口时加载
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting)
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  // 当视频进入视口且 src 变化时，开始加载
  useEffect(() => {
    if (!isInViewport || !currentSrc) return

    const video = videoRef.current
    if (!video) return

    setIsLoading(true)
    setIsError(false)
    setShowRetry(false)
    setLoadingStatus('正在加载...')
    setLoadingProgress(0)

    video.src = currentSrc
    video.load()
  }, [isInViewport, currentSrc])

  const retryLoad = useCallback(() => {
    const video = videoRef.current
    if (!video) return

    video.load()
    setIsError(false)
    setShowRetry(false)
    setLoadingStatus('正在加载...')
  }, [])

  const onLoadStart = () => {
    setIsLoading(true)
    setLoadingStatus('正在连接...')
  }

  const onProgress = () => {
    const now = Date.now()
    if (now - progressLastUpdateRef.current < 100) return
    progressLastUpdateRef.current = now

    const video = videoRef.current
    if (video && video.buffered.length > 0 && video.duration > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1)
      const percent = Math.min((bufferedEnd / video.duration) * 100, 100)

      if (progressRafRef.current) cancelAnimationFrame(progressRafRef.current)
      progressRafRef.current = requestAnimationFrame(() => {
        setLoadingProgress(percent)
        progressRafRef.current = null
      })
    }
  }

  const onWaiting = () => {
    if (!isError) {
      setIsLoading(true)
      setLoadingStatus('缓冲中...')
    }
  }

  const onCanPlay = () => {
    if (!isError) {
      setLoadingStatus('可以播放')
    }
  }

  const onPlaying = () => {
    setIsLoading(false)
    setIsError(false)
    setShowRetry(false)
    setLoadingStatus('播放中')
  }

  const onLoadedMetadata = () => {
    if (!isError) {
      setLoadingStatus('加载元数据...')
    }
  }

  const onCanPlayThrough = () => {
    const video = videoRef.current
    if (!isError && video && !video.paused) {
      setIsLoading(false)
      setLoadingStatus('播放中')
    }
  }

  const onEnded = () => {
    setLoadingStatus('播放完成')
    setTimeout(() => {
      if (!isLoading && !isError) {
        setLoadingStatus('准备就绪')
      }
    }, 2000)
  }

  const onError = () => {
    const video = videoRef.current
    let errorMsg = '视频加载失败'

    if (video && video.error) {
      switch (video.error.code) {
        case 1:
          errorMsg = '视频加载被中止'
          break
        case 2:
          errorMsg = '网络错误，请检查网络连接'
          break
        case 3:
          errorMsg = '视频解码失败，格式不支持'
          break
        case 4:
          errorMsg = '视频文件不存在或格式不支持'
          break
        default:
          errorMsg = `视频加载失败 (错误码: ${video.error.code})`
      }
    }

    setIsError(true)
    setIsLoading(false)
    setShowRetry(true)
    setLoadingStatus(errorMsg)
  }

  return (
    <section id="video" className="video-section" ref={sectionRef}>
      <h2 className="section-title">
        <span className="title-icon">播放视频</span>
      </h2>
      <div className="video-player">
        <div className="video-header-overlay">
          <h3 className="video-title">{currentTitle}</h3>
        </div>

        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          preload="none"
          playsInline
          autoPlay={currentSrc !== 'videos/video1.mp4'}
          onContextMenu={(e) => e.preventDefault()}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          onWaiting={onWaiting}
          onCanPlay={onCanPlay}
          onPlaying={onPlaying}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={onEnded}
          onError={onError}
          onCanPlayThrough={onCanPlayThrough}
        >
          您的浏览器不支持视频播放，请使用现代浏览器。
        </video>

        <div className="controls-area">
          <div className={`loading-status ${isError ? 'error' : ''}`}>
            {loadingStatus}
            {showRetry && (
              <button className="retry-btn" onClick={retryLoad}>
                重试
              </button>
            )}
          </div>
          {isLoading && !isError && (
            <div className="loading-bar">
              <div className="loading-progress" style={{ width: `${loadingProgress}%` }}></div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default VideoPlayer
