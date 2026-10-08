import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Search, Clock, Eye, Sparkles, X, Filter } from 'lucide-react';
import type { Article } from '../types/blog';
import { getArticles } from '../lib/supabase';
import { CTA } from '../components/CTA';

export const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchBlogArticles = async () => {
      setLoading(true);
      try {
        const data = await getArticles({ onlyPublished: true });
        if (isMounted) {
          setArticles(data);
        }
      } catch (err) {
        console.error('Failed to load articles:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBlogArticles();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute available categories dynamically
  const categories = ['All', ...Array.from(new Set(articles.map((a) => a.category))).filter(Boolean)];

  // Filtered articles based on search and category
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category.toLowerCase() === selectedCategory.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      article.title.toLowerCase().includes(query) ||
      article.excerpt.toLowerCase().includes(query) ||
      article.tags?.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Featured article is either the flagged featured one or the most recent article
  const featuredArticle = articles.find((a) => a.is_featured) || articles[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== (selectedCategory === 'All' && !searchQuery ? featuredArticle?.id : ''));

  return (
    <main className="relative pt-32 md:pt-44">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-20 right-1/4 w-[650px] h-[650px] bg-crimson/10 blur-[160px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-[-150px] w-[500px] h-[500px] bg-crimson/[0.06] blur-[180px] pointer-events-none"
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_10px_#DC2626]" />
            <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
              EDITORIAL &amp; FIELD NOTES
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-white">
              ARTICLES
            </h1>
            <p className="max-w-md text-sm md:text-base text-neutral-400 font-light leading-relaxed">
              Uncompromising essays on creative performance, scale architecture, generative search dominance, and consumer psychology.
            </p>
          </div>

          {/* Search Bar & Filter Controls */}
          <div className="mt-12 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, strategies, tags..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.03] border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-crimson/80 focus:ring-1 focus:ring-crimson transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="hidden lg:flex items-center gap-1.5 mr-2 text-xs font-mono text-neutral-500 uppercase">
                <Filter className="w-3.5 h-3.5" />
                <span>TOPIC:</span>
              </div>
              {categories.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                      isSelected
                        ? 'bg-crimson text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white border border-white/[0.07] hover:border-white/20'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Article Spotlight (shown when no search filter active & on 'All' category) */}
        {!searchQuery && selectedCategory === 'All' && featuredArticle && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <Link
              to={`/blog/${featuredArticle.slug}`}
              data-cursor="view"
              className="group block relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all duration-500 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Visual */}
                <div className="lg:col-span-7 overflow-hidden relative aspect-[16/10] lg:aspect-auto min-h-[320px] lg:min-h-[460px]">
                  <img
                    src={featuredArticle.cover_image}
                    alt={featuredArticle.title}
                    loading="eager"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80 lg:opacity-40" />

                  <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-crimson text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>FEATURED DOSSIER</span>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 mb-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-white uppercase">
                        {featuredArticle.category}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-crimson" />
                        {featuredArticle.read_time}
                      </span>
                      {featuredArticle.views > 0 && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-neutral-500">
                            <Eye className="w-3 h-3" />
                            {featuredArticle.views.toLocaleString()} reads
                          </span>
                        </>
                      )}
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors leading-[1.1]">
                      {featuredArticle.title}
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed line-clamp-4">
                      {featuredArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-8 mt-8 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {featuredArticle.author_avatar && (
                        <img
                          src={featuredArticle.author_avatar}
                          alt={featuredArticle.author_name}
                          className="w-9 h-9 rounded-full object-cover border border-white/10"
                        />
                      )}
                      <div>
                        <div className="text-xs font-medium text-white">{featuredArticle.author_name}</div>
                        <div className="text-[11px] font-mono text-neutral-500">{featuredArticle.author_role}</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-crimson group-hover:translate-x-1 transition-transform">
                      <span>READ ESSAY</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 animate-pulse">
                <div className="w-full aspect-[16/10] bg-white/[0.04] rounded-xl mb-4" />
                <div className="h-4 bg-white/[0.06] rounded w-1/3 mb-3" />
                <div className="h-6 bg-white/[0.08] rounded w-4/5 mb-2" />
                <div className="h-4 bg-white/[0.04] rounded w-full mb-4" />
                <div className="h-8 bg-white/[0.03] rounded-full w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && (
          <div className="pb-24">
            {gridArticles.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border border-white/[0.06] bg-white/[0.01]">
                <p className="text-lg text-neutral-400 font-light mb-4">
                  No articles matched your current query or category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-crimson text-white text-xs font-mono uppercase tracking-wider hover:bg-crimson-bright transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {gridArticles.map((article, index) => (
                    <motion.article
                      key={article.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Link
                        to={`/blog/${article.slug}`}
                        data-cursor="view"
                        className="group flex flex-col h-full rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 hover:shadow-[0_10px_30px_rgba(220,38,38,0.1)] transition-all duration-500"
                      >
                        {/* Card Image */}
                        <div className="overflow-hidden relative aspect-[16/10]">
                          <img
                            src={article.cover_image}
                            alt={article.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10">
                              {article.category}
                            </span>
                          </div>
                        </div>

                        {/* Card Body */}
                        <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-crimson" />
                                {article.read_time}
                              </span>
                              <span>·</span>
                              <span>{new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors line-clamp-2 leading-snug">
                              {article.title}
                            </h3>

                            <p className="mt-3 text-sm text-neutral-400 font-light leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                          </div>

                          {/* Card Footer */}
                          <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              {article.author_avatar ? (
                                <img
                                  src={article.author_avatar}
                                  alt={article.author_name}
                                  className="w-7 h-7 rounded-full object-cover border border-white/10"
                                />
                              ) : (
                                <div className="w-7 h-7 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center text-[10px] font-mono text-white">
                                  M
                                </div>
                              )}
                              <span className="text-xs text-neutral-300 font-medium">{article.author_name}</span>
                            </div>

                            <div className="w-8 h-8 rounded-full bg-white/[0.04] group-hover:bg-crimson flex items-center justify-center transition-colors">
                              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Global Studio CTA */}
      <CTA />
    </main>
  );
};
