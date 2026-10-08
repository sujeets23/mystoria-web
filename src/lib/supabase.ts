import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Article, ArticleInput } from '../types/blog';
import { initialArticles } from '../data/blogArticles';

// Read environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if valid Supabase configuration is supplied
export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.trim().length > 0 &&
    supabaseUrl.startsWith('https://') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.trim().length > 0 &&
    !supabaseUrl.includes('your-project')
  );
};

// Create client or fallback dummy client to prevent runtime crash
export const supabase: SupabaseClient = createClient(
  isSupabaseConfigured() ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured() ? supabaseAnonKey : 'placeholder-key'
);

// Local Storage Key for offline preview / fallback mode
const LOCAL_STORAGE_KEY = 'mystoria_blog_articles_v1';

// Helper to get local articles cache
const getLocalArticles = (): Article[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Failed reading articles from localStorage:', err);
  }
  // Initialize with starter articles
  saveLocalArticles(initialArticles);
  return initialArticles;
};

// Helper to save local articles cache
const saveLocalArticles = (articles: Article[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(articles));
  } catch (err) {
    console.warn('Failed saving articles to localStorage:', err);
  }
};

// ==========================================
// ARTICLE DATA OPERATIONS
// ==========================================

export async function getArticles(options?: {
  category?: string;
  tag?: string;
  search?: string;
  onlyPublished?: boolean;
}): Promise<Article[]> {
  const onlyPublished = options?.onlyPublished ?? true;

  if (isSupabaseConfigured()) {
    try {
      let query = supabase
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (onlyPublished) {
        query = query.eq('published', true);
      }

      if (options?.category && options.category !== 'All') {
        query = query.eq('category', options.category);
      }

      if (options?.tag) {
        query = query.contains('tags', [options.tag]);
      }

      if (options?.search && options.search.trim()) {
        const term = options.search.trim();
        query = query.or(`title.ilike.%${term}%,excerpt.ilike.%${term}%,category.ilike.%${term}%`);
      }

      const { data, error } = await query;

      if (!error && data) {
        return data as Article[];
      }
      console.warn('Supabase fetch failed, falling back to local store:', error);
    } catch (err) {
      console.warn('Supabase fetch exception, falling back to local store:', err);
    }
  }

  // Fallback to local storage
  let items = getLocalArticles();

  if (onlyPublished) {
    items = items.filter((a) => a.published);
  }

  if (options?.category && options.category !== 'All') {
    items = items.filter((a) => a.category.toLowerCase() === options.category?.toLowerCase());
  }

  if (options?.tag) {
    items = items.filter((a) => a.tags?.includes(options.tag!));
  }

  if (options?.search && options.search.trim()) {
    const q = options.search.toLowerCase();
    items = items.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }

  return items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        return data as Article;
      }
    } catch (err) {
      console.warn('Supabase fetch slug error, falling back:', err);
    }
  }

  const items = getLocalArticles();
  return items.find((a) => a.slug === slug) || null;
}

export async function createArticle(input: ArticleInput): Promise<{ data: Article | null; error: string | null }> {
  const newArticle: Article = {
    ...input,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `art-${Date.now()}`,
    views: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title: input.title,
            slug: input.slug,
            excerpt: input.excerpt,
            content: input.content,
            cover_image: input.cover_image,
            category: input.category,
            tags: input.tags,
            author_name: input.author_name,
            author_role: input.author_role,
            author_avatar: input.author_avatar,
            read_time: input.read_time,
            is_featured: input.is_featured,
            published: input.published,
          },
        ])
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }
      return { data: data as Article, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create article';
      return { data: null, error: message };
    }
  }

  // Fallback storage
  const current = getLocalArticles();
  // Check for duplicate slug
  if (current.some((a) => a.slug === newArticle.slug)) {
    return { data: null, error: 'An article with this slug already exists.' };
  }
  const updated = [newArticle, ...current];
  saveLocalArticles(updated);
  return { data: newArticle, error: null };
}

export async function updateArticle(
  id: string,
  updates: Partial<ArticleInput>
): Promise<{ data: Article | null; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('articles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: error.message };
      }
      return { data: data as Article, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update article';
      return { data: null, error: message };
    }
  }

  // Fallback storage
  const current = getLocalArticles();
  const index = current.findIndex((a) => a.id === id);
  if (index === -1) {
    return { data: null, error: 'Article not found.' };
  }

  const updatedArticle: Article = {
    ...current[index],
    ...updates,
    updated_at: new Date().toISOString(),
  };

  current[index] = updatedArticle;
  saveLocalArticles([...current]);
  return { data: updatedArticle, error: null };
}

export async function deleteArticle(id: string): Promise<{ success: boolean; error: string | null }> {
  if (isSupabaseConfigured()) {
    try {
      const { error } = await supabase.from('articles').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true, error: null };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete article';
      return { success: false, error: message };
    }
  }

  // Fallback storage
  const current = getLocalArticles();
  const filtered = current.filter((a) => a.id !== id);
  saveLocalArticles(filtered);
  return { success: true, error: null };
}

export async function incrementViews(id: string): Promise<void> {
  if (isSupabaseConfigured()) {
    try {
      // Call RPC function if it exists, or fallback to direct update
      const { error } = await supabase.rpc('increment_article_views', { article_id: id });
      if (error) {
        // Fallback direct increment
        await supabase
          .from('articles')
          .update({ views: supabase.rpc('increment_article_views', { article_id: id }) })
          .eq('id', id);
      }
      return;
    } catch {
      // Ignored
    }
  }

  // Fallback storage
  const current = getLocalArticles();
  const target = current.find((a) => a.id === id);
  if (target) {
    target.views = (target.views || 0) + 1;
    saveLocalArticles(current);
  }
}
