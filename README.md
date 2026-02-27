# NY 2026.14班宣传网站

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 面向 NY 2026.14 班同学的班级宣传网站，采用 React 18 + TypeScript + Vite 构建，支持视频播放、博客文章、Markdown 渲染、图片轮播等功能。

**在线预览**: [jinmukun.qzz.io](http://jinmukun.qzz.io)

---

## 功能特性

- 视频专区 - 支持 10+ 个班级视频播放，带加载进度和错误重试
- 博客系统 - 支持文章置顶、Markdown 内容展示、代码块渲染
- 3D 轮播图 - 全屏图片轮播展示，支持自动播放
- 响应式布局 - 现代化浅色 UI 设计，完美适配各种设备
- 性能优化 - 资源懒加载、代码分割、TypeScript 类型安全

---

## 项目结构

```
ny202614/
├── public/                     # 静态资源
│   ├── _redirects             # Cloudflare Pages 重定向配置
│   ├── images/                # 图片资源
│   │   ├── image1.jpg         # 轮播图
│   │   ├── image2.jpg
│   │   ├── image3.jpg
│   │   ├── image4.jpg
│   │   ├── image5.jpg
│   │   ├── home/              # 首页图片
│   │   └── blog/              # 博客配图
│   │       └── blog1.png
│   └── videos/                # 视频资源
│       ├── video1.mp4
│       └── ...
├── src/
│   ├── components/            # React 组件
│   │   ├── NavigationBar.tsx  # 导航栏
│   │   ├── Carousel3D.tsx    # 3D 轮播图
│   │   ├── VideoPlayer.tsx   # 视频播放器
│   │   ├── VideoList.tsx     # 视频列表
│   │   ├── BlogSection.tsx   # 博客区域
│   │   ├── BlogList.tsx     # 文章列表
│   │   ├── MarkdownRenderer.tsx  # Markdown 渲染器
│   │   └── FooterBar.tsx    # 页脚
│   ├── views/                # 页面视图
│   │   ├── HomeView.tsx      # 首页
│   │   ├── VideoView.tsx    # 视频页
│   │   ├── BlogView.tsx     # 博客页
│   │   └── BlogArticleView.tsx  # 文章详情页
│   ├── content/              # 博客内容
│   │   └── blog/            # Markdown 文章
│   │       ├── v3-release.md
│   │       └── contribute-video.md
│   ├── router/               # 路由配置
│   │   └── index.tsx
│   ├── styles/               # 全局样式
│   │   ├── variables.css    # CSS 变量
│   │   ├── global.css      # 全局样式
│   │   ├── components.css   # 组件样式
│   │   ├── views.css       # 视图样式
│   │   └── markdown.css    # Markdown 样式
│   ├── data/                # 数据文件
│   │   └── articles.ts     # 文章数据
│   ├── types/               # TypeScript 类型
│   │   └── index.ts
│   ├── App.tsx              # 根组件
│   └── main.tsx             # 入口文件
├── index.html                # HTML 模板
├── package.json              # 项目配置
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
└── README.md                # 项目说明
```

---

## 快速开始

### 环境要求

- Node.js >= 18.0
- npm >= 9.0

### 安装依赖

```bash
npm install
```

### 开发服务器

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:5173`

### 构建生产版本

```bash
npm run build
```

构建后的文件位于 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

---

### 错误码对照

| 错误码 | 含义                  | 处理方式           |
| ------ | --------------------- | ------------------ |
| 1      | 加载被中止            | 提示用户重新加载   |
| 2      | 网络错误              | 检查网络连接后重试 |
| 3      | 解码失败              | 视频格式不支持     |
| 4      | 格式不支持/文件不存在 | 检查视频文件路径   |

## 添加新内容

### 添加视频

1. 将视频文件放入 `public/videos/` 目录
2. 编辑 `src/components/VideoList.tsx`，在 `videos` 数组中添加：

```typescript
{
  id: 11,                          // 递增ID
  src: 'videos/video11.mp4',       // 视频路径
  title: '视频标题',                // 显示标题
  description: '视频描述<br>(拍摄于日期)'  // 描述
}
```

### 添加博客文章

1. 如需配图，将图片放入 `public/images/blog/` 目录
2. 在 `src/content/blog/` 目录创建新的 `.md` 文件：

```markdown
---
id: 3
title: 文章标题
excerpt: 文章摘要，显示在卡片上...
category: activity
date: 2026-02-11
author: 作者名称
image: /images/blog/blog2.png  # 配图路径（可选）
pinned: true  # 是否置顶（可选）
---

# 文章标题

正文内容，支持 Markdown 语法...

## 二级标题

- 列表项 1
- 列表项 2

> 引用块

```javascript
// 代码块
const hello = 'world';
```
```

### 添加轮播图片

1. 将图片放入 `public/images/` 目录，命名为 `image6.jpg` 等
2. 编辑 `src/components/Carousel3D.tsx`，在 `defaultItems` 数组中添加路径

---

## 技术栈

- 框架: React 18 (Hooks)
- 语言: TypeScript 5
- 构建工具: Vite 6
- 路由: React Router 6
- Markdown: react-markdown + remark-gfm
- 样式: CSS Variables
- 图标: SVG

---

## 响应式断点

| 断点    | 宽度           | 说明       |
| ------- | -------------- | ---------- |
| Desktop | > 1024px       | 完整布局   |
| Tablet  | 768px - 1024px | 适配平板   |
| Mobile  | < 768px        | 移动端布局 |

---

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 提交规范

- 描述清晰，说明改动内容
- 媒体文件命名简短，包含序号或描述
- 更新页面引用保证展示正确

---

## 许可证

本项目采用 [MIT](LICENSE) 许可证

---

## 联系与反馈

- 仓库地址: https://github.com/Jin-Mukun/ny202614_new
- 问题反馈: 在仓库中提交 Issue
- 开源协议: 欢迎贡献代码，请遵循 MIT 协议

---

<p align="center">Made by NY 2026.14班</p>
