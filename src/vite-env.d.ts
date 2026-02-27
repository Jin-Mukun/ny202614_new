/// <reference types="vite/client" />

export interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image?: string;
  pinned?: boolean;
}

export interface Video {
  id: number;
  src: string;
  title: string;
  description: string;
}

export interface CarouselItem {
  src: string;
  alt?: string;
}
