function AnnouncementBar() {
  return (
    <section className="announcement-section">
      <div className="announcement-container">
        <div className="announcement-content">
          <div className="announcement-title">公告</div>
          <div className="announcement-list">
            <p className="announcement-item">
              1. 由于该网站对您的网络质量要求较高，请确保您在良好的网络环境访问本站，否则视频播放时可能出现卡顿。
              <a href="https://www.cloudflare.com/zh-cn/application-services/products/china-network/" target="_blank" rel="noopener noreferrer">点击了解更多</a>
            </p>
            <p className="announcement-item">
              2. 目前所有视频均由诺基亚拍摄，赞助作者运动相机以解锁高清画质(doge)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnnouncementBar
