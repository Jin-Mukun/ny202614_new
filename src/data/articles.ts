import type { Article } from '../types'

interface ArticleMeta {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  image?: string
  pinned?: boolean
}

const articleModules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
})

function parseFrontmatter(content: string): { meta: ArticleMeta; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      meta: { id: 0, title: '', excerpt: '', category: '', date: '', author: '' },
      content
    }
  }

  const [, frontmatter, body] = match
  const meta: Partial<ArticleMeta> = {}

  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':')
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim()
      if (key.trim() === 'id') {
        meta.id = parseInt(value, 10)
      } else if (key.trim() === 'pinned') {
        meta.pinned = value === 'true'
      } else {
        (meta as Record<string, unknown>)[key.trim()] = value
      }
    }
  })

  return {
    meta: meta as ArticleMeta,
    content: body.trim()
  }
}

const articlesData: Article[] = Object.entries(articleModules).map(([, content]) => {
  const { meta, content: articleContent } = parseFrontmatter(content as string)
  return {
    id: meta.id,
    title: meta.title,
    excerpt: meta.excerpt,
    content: articleContent,
    category: meta.category,
    date: meta.date,
    author: meta.author,
    image: meta.image,
    pinned: meta.pinned
  }
})

export const articles: Article[] = articlesData.sort((a, b) => {
  if (a.pinned && !b.pinned) return -1
  if (!a.pinned && b.pinned) return 1
  return 0
})

export const getArticleById = (id: number): Article | undefined => {
  return articles.find(article => article.id === Number(id))
}

export const getAllArticles = (): Article[] => {
  return articles
}
