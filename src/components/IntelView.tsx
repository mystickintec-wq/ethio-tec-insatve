import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, Search } from 'lucide-react';
import { Article } from '../types.ts';
import { SpotlightCard } from './SpotlightCard.tsx';
import { ScrollReveal } from './ScrollReveal.tsx';

interface IntelViewProps {
  articles: Article[];
}

export const IntelView: React.FC<IntelViewProps> = ({ articles }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = ['All', 'AI & ML', 'Engineering', 'Robotics', 'Cybersecurity', 'Ecosystem & News'];

  const filteredArticles = articles.filter((a) => {
    const matchesCat = selectedCategory === 'All' || a.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesQuery =
      !searchQuery ||
      a.title.toLowerCase().includes(query) ||
      a.summary.toLowerCase().includes(query) ||
      a.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header with official branding */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>ETHIOTECH INTEL</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Discover. Decode. Innovate.</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Engineering Briefs & Research Publications
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
          Deep-dives, field reports, and architectural postmortems written by student fellows and faculty researchers across Ethiopian tech departments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 border-b border-slate-800 pb-5">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search articles or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0b1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-slate-800 rounded-2xl p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-semibold text-slate-300">No publications found</h3>
          <p className="text-xs text-slate-400">Try searching for keywords like 'NLP', 'Robotics', or 'Infrastructure'.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-white rounded-xl"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <ScrollReveal key={article.id} delayMs={idx * 75}>
              <SpotlightCard
                glowColor="rgba(245, 158, 11, 0.12)"
                className="bg-[#0b1322] border border-slate-800/90 rounded-2xl p-6 flex flex-col justify-between h-full group"
              >
                <div className="space-y-4">
                  {/* Unboxed Metadata (Zero-pill rule: no bordered chips or capsules) */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-amber-400 font-semibold">{article.category}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{article.readTimeMinutes} min read</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug tracking-tight">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-normal">
                    {article.summary}
                  </p>

                  {/* Author Info */}
                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 border-t border-slate-800/60 font-mono">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-medium text-slate-300">{article.author.name}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="truncate text-slate-400">{article.author.institution}</span>
                  </div>
                </div>

                {/* Read Action */}
                <div className="pt-6 border-t border-slate-800/80 mt-6">
                  <button
                    onClick={() => setActiveArticle(article)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
                  >
                    <span>Read Full Intel Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      )}

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="bg-[#0b1322] border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-10 space-y-6 max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-xl focus:outline-none"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                <span className="text-amber-400 font-bold">{activeArticle.category}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{activeArticle.readTimeMinutes} min read</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{new Date(activeArticle.publishedAt).toLocaleDateString()}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-3 py-3 border-y border-slate-800 text-xs text-slate-300 font-mono">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-amber-400">
                  {activeArticle.author.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-white">{activeArticle.author.name}</div>
                  <div className="text-[11px] text-slate-400">{activeArticle.author.role} · {activeArticle.author.institution}</div>
                </div>
              </div>

              {/* Formatted Article Body */}
              <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-normal">
                {activeArticle.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center gap-2 font-mono">
                <span className="text-slate-500 font-medium">Research Tags:</span>
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 bg-slate-900 rounded-lg text-slate-300 border border-slate-800">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
