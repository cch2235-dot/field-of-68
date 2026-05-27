import type { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import articlesData from '../../../data/articles.json';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'College basketball news, analysis, transfer portal coverage and recruiting from The Field of 68.',
};

export const revalidate = 1800;

export default function ArticlesPage() {
  const dailyArticles = articlesData.filter(a => a.category === 'The Daily');
  const portalArticles = articlesData.filter(a => a.category === 'Transfer Portal');
  const coachingArticles = articlesData.filter(a => a.category === 'Coaching Carousel');
  const featuresArticles = articlesData.filter(a => a.category === 'Features');
  const grassrootsArticles = articlesData.filter(a => a.category === 'Grassroots');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">ARTICLES</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-2">
          Daily coverage, transfer portal, coaching carousel, features, grassroots recruiting and more.
        </p>
      </div>

      {/* The Daily — Premium Section */}
      <div className="bg-[#2B2B2B] border border-[#F5A623]/40 rounded-xl p-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#F5A623] text-black font-condensed font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded">Premium · $4.99/mo</span>
              <h2 className="font-display text-white text-2xl tracking-wider">THE FIELD OF 68 DAILY</h2>
            </div>
            <p className="text-[#8A8A8A] font-condensed text-sm">The must-read newsletter for college hoops fans and coaches — every morning.</p>
          </div>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-lg tracking-widest uppercase px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
            Subscribe — $4.99/mo
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {dailyArticles.slice(0, 6).map(article => (
            <a key={article.id} href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
              className="group block bg-[#1A1A1A] rounded-lg overflow-hidden card-lift relative">
              {article.thumbnail && (
                <div className="relative h-40 overflow-hidden">
                  <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                  <div className="absolute top-2 right-2 bg-[#F5A623] rounded-full w-7 h-7 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-black" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                    </svg>
                  </div>
                </div>
              )}
              <div className="p-3">
                <h4 className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors mb-1">{article.title}</h4>
                <p className="text-[#8A8A8A] text-xs font-condensed line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[#8A8A8A] text-xs font-condensed">{article.author}</span>
                  <span className="text-[#F5A623] text-xs font-condensed font-bold">Subscribe to read →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Features */}
      {featuresArticles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-2xl md:text-3xl tracking-wider">FEATURES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuresArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      )}

      {/* Coaching Carousel */}
      {coachingArticles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-2xl md:text-3xl tracking-wider">COACHING CAROUSEL</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {coachingArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      )}

      {/* Transfer Portal */}
      {portalArticles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-2xl md:text-3xl tracking-wider">TRANSFER PORTAL</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {portalArticles.slice(0, 3).map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      )}

      {/* Grassroots */}
      {grassrootsArticles.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-2xl md:text-3xl tracking-wider">GRASSROOTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {grassrootsArticles.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </div>
      )}

      <NewsletterSignup variant="hero" />
    </div>
  );
}
