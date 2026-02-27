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

export interface NavItem {
  path: string;
  label: string;
  name: string;
  icon: string;
}

export interface CarouselItem {
  src: string;
  alt?: string;
}
