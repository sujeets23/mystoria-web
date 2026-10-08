import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Eye, Share2, Check, ArrowUpRight } from 'lucide-react';
import type { Article } from '../types/blog';
import { getArticleBySlug, getArticles, incrementViews } from '../lib/supabase';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { CTA } from '../components/CTA';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadPost = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const found = await getArticleBySlug(slug);
        if (isMounted) {
          if (found) {
            setArticle(found);
            // Increment view counter
            incrementViews(found.id);

            // Fetch related articles
            const all = await getArticles({ onlyPublished: true });
            const related = all
              .filter((a) => a.id !== found.id && (a.category === found.category || a.tags?.some((t) => found.tags?.includes(t))))
              .slice(0, 3);
            // If less than 3, pad with other articles
            if (related.length < 3) {
              const others = all.filter((a) => a.id !== found.id && !related.some((r) => r.id === a.id));
              related.push(...others.slice(0, 3 - related.length));
            }
            setRelatedArticles(related);
          } else {
            setArticle(null);
          }
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPost();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (!article) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`"${article.title}" by @mystoria_agency`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  const handleShareLinkedIn = () => {
    if (!article) return;
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  if (loading) {
    return (
      <main className="relative pt-36 pb-24 min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 animate-pulse">
          <div className="h-4 bg-white/[0.05] rounded w-28 mb-8" />
          <div className="h-6 bg-white/[0.08] rounded w-40 mb-4" />
          <div className="h-12 bg-white/[0.1] rounded w-4/5 mb-6" />
          <div className="h-6 bg-white/[0.04] rounded w-2/3 mb-10" />
          <div className="w-full aspect-[16/9] bg-white/[0.03] rounded-2xl mb-12" />
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="relative pt-44 pb-32 min-h-screen text-center px-6">
        <div className="max-w-md mx-auto">
          <span className="text-xs font-mono tracking-widest text-crimson uppercase block mb-4">
            // 404 NOT FOUND
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase text-white mb-4">
            ARTICLE NOT FOUND
          </h1>
          <p className="text-neutral-400 font-light mb-8 text-sm">
            The requested intelligence dossier has been moved, unlisted, or does not exist.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 rounded-full bg-crimson hover:bg-crimson-bright text-white text-xs font-mono uppercase tracking-wider transition-colors"
          >
            Return to Articles Index
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative pt-28 md:pt-36">
      {/* Background Ambience */}
      <div
        aria-hidden="true"
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[750px] h-[550px] bg-crimson/10 blur-[170px] pointer-events-none"
      />

      <article className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1 text-crimson" />
            <span>BACK TO ARTICLES</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="border-b border-white/[0.08] pb-12 mb-12 max-w-[1050px]">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-white bg-white/[0.05] border border-white/10">
              {article.category}
            </span>
            <span className="text-xs font-mono text-neutral-500 uppercase">
              {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-crimson" />
              {article.read_time}
            </span>
            {article.views > 0 && (
              <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                {article.views.toLocaleString()} reads
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-display font-extrabold uppercase tracking-tight text-white leading-[1.02]">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="mt-6 text-lg sm:text-2xl text-neutral-300 font-light leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author & Share Bar */}
          <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-3.5">
              {article.author_avatar ? (
                <img
                  src={article.author_avatar}
                  alt={article.author_name}
                  className="w-11 h-11 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-crimson/20 border border-crimson/40 flex items-center justify-center font-display font-bold text-white">
                  {article.author_name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-sm font-semibold text-white">{article.author_name}</div>
                <div className="text-xs font-mono text-neutral-400">{article.author_role}</div>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase mr-1">SHARE:</span>
              <button
                onClick={handleCopyLink}
                title="Copy Article URL"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleShareTwitter}
                title="Share on X"
                aria-label="Share on X"
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>
              <button
                onClick={handleShareLinkedIn}
                title="Share on LinkedIn"
                aria-label="Share on LinkedIn"
                className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-neutral-300 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.62 1.62c0 .9.72 1.63 1.62 1.63s1.62-.73 1.62-1.63c0-.9-.72-1.62-1.62-1.62" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Featured Cover Media */}
        {article.cover_image && (
          <div className="mb-14 rounded-2xl overflow-hidden border border-white/[0.08] relative aspect-[16/9] max-h-[600px] shadow-2xl">
            <img
              src={article.cover_image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Body Content */}
        <div className="max-w-[850px] mx-auto pb-16">
          <div className="prose-dark font-sans">
            <MarkdownRenderer content={article.content} />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-neutral-500 uppercase mr-2">// TOPICS:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono text-neutral-300 bg-white/[0.03] border border-white/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author Box */}
          <div className="mt-12 p-8 rounded-2xl bg-[#0A0A0A] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {article.author_avatar && (
              <img
                src={article.author_avatar}
                alt={article.author_name}
                className="w-16 h-16 rounded-full object-cover border-2 border-crimson/40 shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="text-xs font-mono text-crimson uppercase tracking-widest mb-1">
                // AUTHOR PROFILE
              </div>
              <h4 className="text-lg font-display font-bold text-white uppercase">{article.author_name}</h4>
              <p className="text-xs font-mono text-neutral-400 mb-2">{article.author_role} at Mystoria</p>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Advising high-growth direct-to-consumer and enterprise partners on performance marketing, creative velocity, and technical market dominance.
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="pt-16 pb-24 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono tracking-widest text-crimson uppercase block mb-1">
                  // FURTHER READING
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase text-white">
                  RELATED INTELLIGENCE
                </h3>
              </div>
              <Link
                to="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
              >
                <span>ALL ARTICLES</span>
                <ArrowUpRight className="w-4 h-4 text-crimson" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  data-cursor="view"
                  className="group rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/[0.08] hover:border-crimson/50 transition-all p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="overflow-hidden rounded-xl aspect-[16/10] mb-4">
                      <img
                        src={rel.cover_image}
                        alt={rel.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="text-[11px] font-mono text-neutral-500 uppercase mb-2">
                      {rel.category} · {rel.read_time}
                    </div>
                    <h4 className="text-base font-display font-bold uppercase text-white group-hover:text-white transition-colors line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-crimson">
                    <span>READ DOSSIER</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* Global Studio CTA */}
      <CTA />
    </main>
  );
};
