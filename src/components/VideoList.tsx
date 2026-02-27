import type { Video } from '../types'

interface VideoListProps {
  onSelectVideo: (video: Video) => void
}

const videos: Video[] = [
  { id: 1, src: 'videos/video1.mp4', title: '入站必刷', description: '帅就对了<br>' },
  { id: 2, src: 'videos/video2.mp4', title: '扫地机器人测评', description: '水哥...<br>(拍摄于2025.11.11)' },
  { id: 3, src: 'videos/video3.mp4', title: '战神反击战1', description: '谁说战神超不了简？<br>(拍摄于2025.12.09)' },
  { id: 4, src: 'videos/video4.mp4', title: '厕所二战', description: '男厕所世界大战<br>(拍摄于2025.12.18)' },
  { id: 5, src: 'videos/video5.mp4', title: '战神反击战2', description: '书接上回<br>(拍摄于2025.12.18)' },
  { id: 6, src: 'videos/video6.mp4', title: '原始鼻祖', description: '原始鼻祖退居第六位了<br>(拍摄于2025.01.06)' },
  { id: 7, src: 'videos/video7.mp4', title: '战神、吴简战至平手', description: '蚌埠住了<br>(拍摄于2026.01.04)' },
  { id: 8, src: 'videos/video8.mp4', title: '割玉坠机', description: '割玉成为演员<br>(拍摄于2026.01.16)' },
  { id: 9, src: 'videos/video9.mp4', title: '【全站首发】第一个有预谋的视频', description: '无尾蛇向吴简展示频率<br>(拍摄于2026.01.23)' },
  { id: 10, src: 'videos/video10.mp4', title: '世！纪！大！战！', description: '强强对决<br>(拍摄于2026.01.14)' }
]

function VideoList({ onSelectVideo }: VideoListProps) {
  const selectVideo = (video: Video) => {
    onSelectVideo(video)
    const videoSection = document.getElementById('video')
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="video-list-section">
      <h2 className="section-title">
        <span className="title-icon">视频列表</span>
      </h2>
      <div className="video-list">
        {videos.map((video) => (
          <div
            key={video.id}
            className="video-item"
            role="button"
            tabIndex={0}
            aria-label={video.title}
            onClick={() => selectVideo(video)}
            onKeyDown={(e) => e.key === 'Enter' && selectVideo(video)}
          >
            <div className="video-item-cover">
              <span className="play-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg> 
              </span>
            </div>
            <div className="video-item-content">
              <h3 className="video-item-title">{video.title}</h3>
              <p
                className="video-item-desc"
                dangerouslySetInnerHTML={{ __html: video.description }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VideoList
