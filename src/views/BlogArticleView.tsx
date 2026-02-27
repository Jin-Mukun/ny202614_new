import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getArticleById } from '../data/articles'
import MarkdownRenderer from '../components/MarkdownRenderer'

function BlogArticleView() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const article = useMemo(() => {
    if (!id) return null
    return getArticleById(Number(id))
  }, [id])

  const goBack = () => {
    navigate('/blog')
  }

  return (
    <div className="blog-article-view">
      <div className="article-container">
        <button className="back-btn" onClick={goBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>返回博客列表</span>
        </button>

        {article ? (
          <article className="article-content">
            <header className="article-header">
              <span className="article-category">{article.category}</span>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta">
                <span className="meta-item">
                  <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {article.author}
                </span>
                <span className="meta-item">
                  <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {article.date}
                </span>
              </div>
            </header>

            {article.image && (
              <div className="article-image">
                <img src={article.image} alt={article.title} loading="lazy" />
              </div>
            )}

            <div className="article-body markdown-body">
              <MarkdownRenderer content={article.content} />
            </div>
          </article>
        ) : (
          <div className="not-found">
            <div className="not-found-icon">📄</div>
            <h2>文章未找到</h2>
            <p>该文章不存在或已被删除</p>
            <button className="back-btn" onClick={goBack}>
              <span>返回博客列表</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogArticleView
