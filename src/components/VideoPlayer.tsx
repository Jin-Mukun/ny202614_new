import { useState, useEffect, useRef } from 'react'

interface VideoPlayerProps {
  currentSrc?: string
  currentTitle?: string
}

function VideoPlayer({ currentSrc, currentTitle }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [showRetry, setShowRetry] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState('准备就绪')
  const [loadingProgress, setLoadingProgress] = useState(0)

  const progressRafRef = useRef<number | null>(null)
  const progressLastUpdateRef = useRef(0)

  const retryLoad = () => {
    if (videoRef.current) {
      videoRef.current.load()
      setIsError(false)
      setShowRetry(false)
      setLoadingStatus('正在加载...')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setShowRetry(false)
    setLoadingStatus('正在加载...')
    setLoadingProgress(0)
  }, [currentSrc])

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

  const onSuspend = () => {
    console.log('视频加载被浏览器暂停')
  }

  const onAbort = () => {
    console.log('视频加载被中止')
    if (!isError) {
      setIsLoading(false)
      setLoadingStatus('加载已取消')
    }
  }

  return (
    <section id="video" className="video-section">
      <h2 className="section-title">
        <span className="title-icon">🎬</span>
        播放视频
      </h2>
      <div className="video-player">
        <div className="video-header-overlay">
          <h3 className="video-title">{currentTitle}</h3>
        </div>

        <video
          ref={videoRef}
          controls
          controlsList="nodownload"
          preload="auto"
          playsInline
          autoPlay={currentSrc !== 'videos/video1.mp4'}
          src={currentSrc}
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
          onSuspend={onSuspend}
          onAbort={onAbort}
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
