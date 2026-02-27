import BlogSection from '../components/BlogSection'

function BlogView() {
  return (
    <div className="blog-view">
      <div className="page-header">
        <h1 className="page-title">
          <span className="title-icon">📝</span>
          博客专区
        </h1>
        <p className="page-desc">作者随笔</p>
      </div>

      <BlogSection />
    </div>
  )
}

export default BlogView
