export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  category: string;
  tags: string[];
  author_name: string;
  author_role: string;
  author_avatar: string;
  read_time: string;
  is_featured: boolean;
  published: boolean;
  views: number;
  created_at: string;
  updated_at?: string;
}

export type ArticleInput = Omit<Article, 'id' | 'views' | 'created_at' | 'updated_at'>;

export type BlogCategory = 
  | 'All'
  | 'Performance'
  | 'Creative Strategy'
  | 'Search Dominance'
  | 'Growth Engineering'
  | 'Case Study'
  | 'Insights';
