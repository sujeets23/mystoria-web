import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  Unlock,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  Copy,
  AlertCircle,
  Database,
  Search,
  X,
  Code,
  Quote,
  List,
  Bold,
  Italic,
  Link2,
} from 'lucide-react';
import type { Article, ArticleInput } from '../types/blog';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  isSupabaseConfigured,
} from '../lib/supabase';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

// Studio passcode configured strictly in .env
const EXPECTED_PASSCODE = (import.meta.env.VITE_ADMIN_PASSCODE || '').trim();

// Curated image presets for easy article creation
const IMAGE_PRESETS = [
  { label: 'Dark Cinematic', url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Abstract Fluid', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Neural Mesh', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Cyber Hardware', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80' },
  { label: 'Studio Minimal', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80' },
];

export const AdminBlog: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mystoria_admin_session') === 'active';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Articles & Management State
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'write' | 'preview'>('write');
  const [editorError, setEditorError] = useState<string | null>(null);
  const [editorSaving, setEditorSaving] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<ArticleInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: IMAGE_PRESETS[0].url,
    category: 'Creative Strategy',
    tags: ['Paid Media', 'Scale'],
    author_name: 'Sujeet S.',
    author_role: 'Creative Director',
    author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    read_time: '5 min read',
    is_featured: false,
    published: true,
  });

  const [tagInput, setTagInput] = useState('');

  // SQL & Info Modal State
  const [isSqlModalOpen, setIsSqlModalOpen] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load articles once authenticated
  const loadArticles = async () => {
    setLoading(true);
    try {
      const data = await getArticles({ onlyPublished: false });
      setArticles(data);
    } catch (err) {
      console.error('Failed to load articles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadArticles();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!EXPECTED_PASSCODE) {
      setAuthError('VITE_ADMIN_PASSCODE is not defined in .env.');
      return;
    }
    if (passcode.trim() === EXPECTED_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem('mystoria_admin_session', 'active');
      setAuthError('');
    } else {
      setAuthError('Access denied. Invalid studio passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mystoria_admin_session');
    setPasscode('');
  };

  // Slug generator helper
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      // Only auto-generate slug if it's a new post or slug was unmodified
      slug: editingId ? prev.slug : generateSlug(val),
    }));
  };

  // Open Create Mode
  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '## Executive Summary\n\nOutline the primary hypothesis and findings here.\n\n---\n\n## The Strategic Framework\n\nDetail the exact execution playbook.\n\n> "Key breakthrough insight or quote here."\n\n- Milestone 1\n- Milestone 2\n- Statistical Benchmark',
      cover_image: IMAGE_PRESETS[0].url,
      category: 'Creative Strategy',
      tags: ['Paid Media', 'Scale'],
      author_name: 'Sujeet S.',
      author_role: 'Creative Director',
      author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      read_time: '5 min read',
      is_featured: false,
      published: true,
    });
    setTagInput('Paid Media, Scale');
    setEditorTab('write');
    setEditorError(null);
    setIsEditorOpen(true);
  };

  // Open Edit Mode
  const handleOpenEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      cover_image: article.cover_image,
      category: article.category,
      tags: article.tags || [],
      author_name: article.author_name,
      author_role: article.author_role,
      author_avatar: article.author_avatar,
      read_time: article.read_time,
      is_featured: article.is_featured,
      published: article.published,
    });
    setTagInput((article.tags || []).join(', '));
    setEditorTab('write');
    setEditorError(null);
    setIsEditorOpen(true);
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setEditorError('Article title is required.');
      return;
    }
    if (!formData.slug.trim()) {
      setEditorError('Article slug is required.');
      return;
    }
    if (!formData.content.trim()) {
      setEditorError('Article content is required.');
      return;
    }

    setEditorSaving(true);
    setEditorError(null);

    // Process tags
    const processedTags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Auto-calculate read time if needed
    const words = formData.content.split(/\s+/).length;
    const computedReadTime = `${Math.max(1, Math.ceil(words / 200))} min read`;

    const payload: ArticleInput = {
      ...formData,
      tags: processedTags,
      read_time: formData.read_time || computedReadTime,
    };

    if (editingId) {
      const { error } = await updateArticle(editingId, payload);
      if (error) {
        setEditorError(error);
        setEditorSaving(false);
        return;
      }
    } else {
      const { error } = await createArticle(payload);
      if (error) {
        setEditorError(error);
        setEditorSaving(false);
        return;
      }
    }

    setEditorSaving(false);
    setIsEditorOpen(false);
    await loadArticles();
  };

  // Delete Article
  const handleDeleteArticle = async (id: string, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`);
    if (!confirmed) return;

    const { success, error } = await deleteArticle(id);
    if (!success) {
      alert(`Failed to delete: ${error}`);
    } else {
      await loadArticles();
    }
  };

  // Toggle Quick Publish
  const handleTogglePublish = async (article: Article) => {
    const updatedStatus = !article.published;
    await updateArticle(article.id, { published: updatedStatus });
    await loadArticles();
  };

  // Markdown Toolbar Inserter
  const insertMarkdownSyntax = (prefix: string, suffix: string = '') => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const replacement = `${prefix}${selectedText || 'text'}${suffix}`;

    const newContent =
      textarea.value.substring(0, start) + replacement + textarea.value.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + (selectedText.length || 4));
    }, 0);
  };

  // Filtered Articles
  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      !searchQuery.trim() ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'published' && art.published) ||
      (statusFilter === 'draft' && !art.published);

    const matchesCategory =
      categoryFilter === 'all' || art.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categoriesList = Array.from(new Set(articles.map((a) => a.category))).filter(Boolean);

  // SQL Query for 1-click copy
  const supabaseSqlQuery = `-- Copy and execute this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT DEFAULT '',
    category TEXT NOT NULL DEFAULT 'Insights',
    tags TEXT[] DEFAULT '{}',
    author_name TEXT NOT NULL DEFAULT 'Mystoria Editorial',
    author_role TEXT DEFAULT 'Growth Strategist',
    author_avatar TEXT DEFAULT '',
    read_time TEXT DEFAULT '5 min read',
    is_featured BOOLEAN DEFAULT false,
    published BOOLEAN DEFAULT true,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(published);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published articles"
    ON public.articles FOR SELECT
    USING (published = true);

CREATE POLICY "Anon full access for simple admin"
    ON public.articles FOR ALL
    TO anon
    USING (true)
    WITH CHECK (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(supabaseSqlQuery);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  // ==========================================
  // VIEW: AUTHENTICATION GATE
  // ==========================================
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#050505] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-crimson/15 blur-[160px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          {/* Studio Gate Card */}
          <div className="bg-[#0A0A0A] border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between mb-8">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_#DC2626]" />
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  MYSTORIA // RESTRICTED
                </span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-neutral-400">
                <Lock className="w-4 h-4 text-crimson" />
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-extrabold uppercase tracking-tight text-white mb-2">
              ADMIN PORTAL
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
              Enter your master studio passcode to manage articles, publications, and cloud database records.
            </p>

            {authError && (
              <div className="mb-6 p-3 rounded-lg bg-crimson/10 border border-crimson/30 flex items-center gap-2.5 text-xs text-crimson-bright">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                  STUDIO PASSCODE
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter studio passcode"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-crimson/80 focus:ring-1 focus:ring-crimson font-mono transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-crimson hover:bg-crimson-bright text-white font-display font-semibold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>AUTHENTICATE &amp; ENTER</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const publishedCount = articles.filter((a) => a.published).length;
  const draftCount = articles.filter((a) => !a.published).length;
  const totalViews = articles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <main className="min-h-screen bg-[#050505] text-[#E5E5E5] pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-8">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_#DC2626]" />
                <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  CONFIDENTIAL // ADMIN WORKSPACE
                </span>
              </div>
              <h1 className="text-3xl font-display font-bold uppercase tracking-tight text-white">
                ARTICLE MANAGEMENT
              </h1>
            </div>

            {/* Supabase Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border ml-4 bg-white/[0.02]">
              {isSupabaseConfigured() ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10B981]" />
                  <span className="text-emerald-400">Supabase Connected</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_6px_#F59E0B]" />
                  <span className="text-amber-400">Local Cache Mode</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <Database className="w-3.5 h-3.5 text-crimson" />
              <span>Supabase SQL</span>
            </button>

            <Link
              to="/blog"
              target="_blank"
              className="px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Blog</span>
            </Link>

            <button
              onClick={handleOpenCreate}
              className="px-5 py-2 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Article</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-neutral-400 hover:text-white transition-colors"
              title="Lock & Exit Admin"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Info Banner if Supabase is in local fallback mode */}
        {!isSupabaseConfigured() && (
          <div className="mb-8 p-4 rounded-xl bg-amber-500/[0.07] border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-neutral-300">
                <span className="font-semibold text-amber-300 block mb-0.5">
                  Running in Local Preview Mode
                </span>
                Supabase keys not detected in <code className="text-amber-200">.env</code>. Your articles are currently safely cached in browser memory/storage. Connect Supabase to sync live across devices.
              </div>
            </div>
            <button
              onClick={() => setIsSqlModalOpen(true)}
              className="shrink-0 px-3.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-mono transition-colors"
            >
              View Setup Steps
            </button>
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.08]">
            <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
              TOTAL ARTICLES
            </span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">
              {articles.length}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.08]">
            <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
              PUBLISHED (LIVE)
            </span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-emerald-400">
              {publishedCount}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.08]">
            <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
              DRAFTS (UNLISTED)
            </span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-amber-400">
              {draftCount}
            </div>
          </div>
          <div className="p-5 rounded-xl bg-[#0A0A0A] border border-white/[0.08]">
            <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">
              ACCUMULATED READS
            </span>
            <div className="text-2xl sm:text-3xl font-display font-bold text-white">
              {totalViews.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="p-4 rounded-xl bg-[#0A0A0A] border border-white/[0.08] mb-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, slug, tag..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-crimson font-mono transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status Segment */}
            <div className="flex items-center rounded-lg bg-white/[0.03] p-1 border border-white/10 text-xs font-mono">
              {(['all', 'published', 'draft'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-md uppercase transition-all ${
                    statusFilter === st
                      ? 'bg-crimson text-white shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            {categoriesList.length > 0 && (
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-crimson"
              >
                <option value="all" className="bg-[#0A0A0A]">All Categories</option>
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0A0A0A]">{cat}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Articles Table */}
        <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-[#0A0A0A]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.02] border-b border-white/[0.08] text-neutral-400 font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">ARTICLE</th>
                  <th className="py-4 px-4">CATEGORY</th>
                  <th className="py-4 px-4">STATUS</th>
                  <th className="py-4 px-4">READ TIME</th>
                  <th className="py-4 px-4">VIEWS</th>
                  <th className="py-4 px-4">DATE</th>
                  <th className="py-4 px-6 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-500 font-mono">
                      Loading studio archives...
                    </td>
                  </tr>
                ) : filteredArticles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-500 font-mono">
                      No articles found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-white/[0.02] transition-colors group">
                      {/* Title & Cover */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5 max-w-md">
                          <img
                            src={art.cover_image}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-white/10 shrink-0"
                          />
                          <div className="truncate">
                            <div className="font-display font-bold text-white uppercase truncate text-sm">
                              {art.title}
                            </div>
                            <div className="font-mono text-[11px] text-neutral-500 truncate">
                              /{art.slug}
                            </div>
                            {art.is_featured && (
                              <span className="inline-block mt-1 text-[10px] font-mono text-crimson uppercase">
                                ★ Featured Dossier
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 font-mono text-neutral-300">
                        <span className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/10">
                          {art.category}
                        </span>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleTogglePublish(art)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[11px] uppercase transition-all ${
                            art.published
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              art.published ? 'bg-emerald-400' : 'bg-amber-400'
                            }`}
                          />
                          <span>{art.published ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Read Time */}
                      <td className="py-4 px-4 font-mono text-neutral-400">
                        {art.read_time}
                      </td>

                      {/* Views */}
                      <td className="py-4 px-4 font-mono text-neutral-300">
                        {art.views || 0}
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 font-mono text-neutral-500">
                        {new Date(art.created_at).toLocaleDateString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            to={`/blog/${art.slug}`}
                            target="_blank"
                            title="Preview on site"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(art)}
                            title="Edit article"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-crimson hover:bg-white/[0.05] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id, art.title)}
                            title="Delete article"
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-white/[0.05] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ARTICLE CREATE / EDIT MODAL DRAWER                       */}
      {/* ======================================================== */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_#DC2626]" />
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  {editingId ? 'Edit Article Dossier' : 'Author New Article'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {editorError && (
              <div className="mx-6 mt-4 p-3 rounded-lg bg-crimson/10 border border-crimson/30 text-xs text-crimson-bright flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{editorError}</span>
              </div>
            )}

            {/* Modal Form */}
            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Row 1: Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Scaling Paid Media Beyond $500k/Month"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    URL SLUG *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. scaling-paid-media-beyond-500k"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-mono"
                  />
                </div>
              </div>

              {/* Row 2: Category, Tags & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    CATEGORY
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson"
                  >
                    <option value="Creative Strategy" className="bg-[#0A0A0A]">Creative Strategy</option>
                    <option value="Performance" className="bg-[#0A0A0A]">Performance</option>
                    <option value="Search Dominance" className="bg-[#0A0A0A]">Search Dominance</option>
                    <option value="Growth Engineering" className="bg-[#0A0A0A]">Growth Engineering</option>
                    <option value="Case Study" className="bg-[#0A0A0A]">Case Study</option>
                    <option value="Insights" className="bg-[#0A0A0A]">Insights</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    TAGS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Meta Ads, ROAS, Scaling"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    READ TIME
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-mono"
                  />
                </div>
              </div>

              {/* Row 3: Cover Image URL & Presets */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  COVER IMAGE URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={formData.cover_image}
                    onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-mono"
                  />
                </div>

                {/* Quick Preset Selector */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[11px] font-mono text-neutral-500">Presets:</span>
                  {IMAGE_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setFormData({ ...formData, cover_image: p.url })}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-neutral-300 border border-white/10 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 4: Author Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    AUTHOR NAME
                  </label>
                  <input
                    type="text"
                    value={formData.author_name}
                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                    placeholder="Sujeet S."
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    AUTHOR ROLE
                  </label>
                  <input
                    type="text"
                    value={formData.author_role}
                    onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                    placeholder="Creative Director"
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    AUTHOR AVATAR URL
                  </label>
                  <input
                    type="url"
                    value={formData.author_avatar}
                    onChange={(e) => setFormData({ ...formData, author_avatar: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-mono"
                  />
                </div>
              </div>

              {/* Row 5: Excerpt Summary */}
              <div>
                <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                  EXCERPT / BRIEF SUMMARY *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Concise 2-3 sentence overview that appears on preview cards and hero summaries..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-crimson font-sans leading-relaxed"
                />
              </div>

              {/* Row 6: Markdown Content Area with Toolbar & Tab Switcher */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-mono uppercase text-neutral-400">
                    ARTICLE BODY (MARKDOWN) *
                  </label>

                  {/* Write vs Preview Tabs */}
                  <div className="flex items-center bg-white/[0.04] rounded-lg p-0.5 border border-white/10 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setEditorTab('write')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        editorTab === 'write' ? 'bg-crimson text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Write
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab('preview')}
                      className={`px-3 py-1 rounded-md transition-all ${
                        editorTab === 'preview' ? 'bg-crimson text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Live Preview
                    </button>
                  </div>
                </div>

                {editorTab === 'write' ? (
                  <div className="space-y-2">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center gap-1 p-2 rounded-t-xl bg-white/[0.03] border border-white/10 border-b-0 text-neutral-400">
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('## ', '')}
                        title="Heading 2"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white text-xs font-mono"
                      >
                        H2
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('### ', '')}
                        title="Heading 3"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white text-xs font-mono"
                      >
                        H3
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('**', '**')}
                        title="Bold"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <Bold className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('*', '*')}
                        title="Italic"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <Italic className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('> ')}
                        title="Quote"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <Quote className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('- ')}
                        title="Bullet List"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <List className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('```\n', '\n```')}
                        title="Code block"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <Code className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('[', '](https://)')}
                        title="Insert Link"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertMarkdownSyntax('\n---\n')}
                        title="Horizontal divider"
                        className="p-1.5 rounded hover:bg-white/[0.08] hover:text-white text-xs font-mono"
                      >
                        ---
                      </button>
                    </div>

                    <textarea
                      ref={contentTextareaRef}
                      required
                      rows={12}
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Write your article in Markdown..."
                      className="w-full px-4 py-3 rounded-b-xl bg-white/[0.03] border border-white/10 text-white font-mono text-xs sm:text-sm focus:outline-none focus:border-crimson leading-relaxed"
                    />
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-black border border-white/10 min-h-[300px] max-h-[420px] overflow-y-auto">
                    <MarkdownRenderer content={formData.content} />
                  </div>
                )}
              </div>

              {/* Row 7: Switches (Publish & Featured) */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {/* Published Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase">
                    <input
                      type="checkbox"
                      checked={formData.published}
                      onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/[0.05] border-white/20 text-crimson focus:ring-0"
                    />
                    <span className={formData.published ? 'text-emerald-400 font-semibold' : 'text-neutral-400'}>
                      {formData.published ? 'Live On Site (Published)' : 'Save As Unlisted Draft'}
                    </span>
                  </label>

                  {/* Featured Toggle */}
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-mono uppercase">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded bg-white/[0.05] border-white/20 text-crimson focus:ring-0"
                    />
                    <span className={formData.is_featured ? 'text-crimson font-semibold' : 'text-neutral-400'}>
                      Spotlight As Featured
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-5 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-neutral-300 text-xs font-mono uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={editorSaving}
                    className="px-6 py-2.5 rounded-xl bg-crimson hover:bg-crimson-bright text-white text-xs font-display font-semibold uppercase tracking-wider transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                  >
                    {editorSaving ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUPABASE SQL & INSTRUCTIONS MODAL                        */}
      {/* ======================================================== */}
      {isSqlModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0A0A0A] border border-white/[0.1] rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
            <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-crimson" />
                <h3 className="text-base font-display font-bold uppercase text-white">
                  Supabase Database Setup &amp; SQL Query
                </h3>
              </div>
              <button
                onClick={() => setIsSqlModalOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="space-y-2 text-neutral-300 font-light">
                <p>
                  To link this app with your real Supabase cloud instance:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-neutral-400 font-mono">
                  <li>Create a free project at <span className="text-white">supabase.com</span></li>
                  <li>Go to <span className="text-white">SQL Editor</span> and click <span className="text-white">New query</span></li>
                  <li>Paste the SQL script below and click <span className="text-white">RUN</span></li>
                  <li>Copy your project URL &amp; Anon Key into your <span className="text-white">.env</span> file</li>
                </ol>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border border-white/10 rounded-t-xl text-neutral-400 font-mono text-[11px]">
                  <span>supabase-schema.sql</span>
                  <button
                    onClick={copySql}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-crimson hover:bg-crimson-bright text-white transition-colors"
                  >
                    {copiedSql ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSql ? 'Copied!' : 'Copy SQL'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-b-xl bg-black border border-white/10 border-t-0 font-mono text-neutral-300 text-[11px] overflow-x-auto max-h-72">
                  <code>{supabaseSqlQuery}</code>
                </pre>
              </div>

              <div className="pt-2 text-neutral-500 font-mono text-[11px]">
                Note: A full version of this file with seed articles is saved at <code className="text-neutral-300">supabase-schema.sql</code> in the project root.
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
