import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { articles } from '../data/articles'
import type { Article } from '../types'

function BlogList() {
  const navigate = useNavigate()

  const sortedArticles = useMemo<Article[]>(() => {
    return [...articles].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return 0
    })
  }, [])

  const goToArticle = (id: number) => {
    navigate(`/blog/${id}`)
  }

  return (
    <div className="blog-list-container">
      <div className="blog-grid">
        {sortedArticles.map((article) => (
          <article
            key={article.id}
            className={`blog-card ${article.pinned ? 'pinned-card' : ''}`}
            onClick={() => goToArticle(article.id)}
          >
            <div className="blog-card-image">
              {article.image ? (
                <img
                  src={article.image}
                  className="blog-image"
                  alt="文章配图"
                  loading="lazy"
                />
              ) : (
                <div className="blog-image-placeholder">
                  <span className="image-icon">📄</span>
                </div>
              )}
            </div>
            <div className="blog-card-content">
              <div className="blog-header-row">
                <h3 className="blog-title">{article.title}</h3>
                {article.pinned && <span className="pinned-badge">置顶</span>}
              </div>
              <p className="blog-excerpt">{article.excerpt}</p>
              <div className="blog-meta">
                <span className="blog-date">{article.date}</span>
                <span className="read-more">
                  阅读更多
                  <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default BlogList
