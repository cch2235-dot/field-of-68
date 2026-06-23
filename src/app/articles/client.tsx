'use client';
import { useState } from 'react';
import { Article } from '@/types';

const CATS = [
  { id: 'all', label: 'All' },
  { id: 'Daily', label: 'Daily' },
  { id: 'Grassroots', label: 'Grassroots' },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default function ArticlesClient({ posts }: { posts: Article[] }) {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? posts : posts.filter(p => p.category === cat);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${
              cat === c.id ? 'bg-[#F5A623] text-black' : 'bg-[#1A1A1A] text-[#8A8A8A] hover:text-white'
            }`}>
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#1A1A1A]">
          <h2 className="font-display text-white text-3xl tracking-wider mb-6">THE FIELD OF 68 DAILY</h2>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="inline-flex bg-[#F5A623] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg">
            Subscribe for $4.99/mo
          </a>
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured && (
            <div className="mb-10">
              <a href={featured.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-[#111] rounded-2xl overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div style={{ minHeight: '280px' }}>
                    {featured.thumbnail ? (
                      <img src={featured.thumbnail} alt={featured.title} className="w-full h-full object-cover" style={{ minHeight: '280px' }} />
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center" style={{ minHeight: '280px' }}>
                        <span className="font-display text-[#F5A623]/20 text-8xl">68</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-3 w-fit">
                      {featured.category}
                    </span>
                    <h2 className="font-display text-white text-3xl tracking-wider leading-tight mb-3 group-hover:text-[#F5A623] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.excerpt && (
                      <p className="text-[#8A8A8A] font-condensed text-base leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                    )}
                    <div className="flex items-center gap-3 mt-auto">
                      <span className="text-[#C4C4C4] font-condensed text-sm">{featured.author}</span>
                      <span className="text-[#333]">·</span>
                      <span className="text-[#8A8A8A] font-condensed text-sm">{formatDate(featured.publishedAt)}</span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => (
              <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-[#111] rounded-xl overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all">
                <div style={{ height: '180px' }}>
                  {post.thumbnail ? (
                    <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                      <span className="font-display text-[#F5A623]/10 text-6xl">68</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className="inline-block bg-[#F5A623]/10 text-[#F5A623] font-condensed font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-condensed font-bold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#F5A623] transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-[#555] font-condensed text-xs">{formatDate(post.publishedAt)}</span>
                    <span className="text-[#8A8A8A] font-condensed text-xs">Read →</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="mt-14 bg-[#111] border border-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider mb-3">THE FIELD OF 68 DAILY</h2>
            <p className="text-[#8A8A8A] font-condensed text-lg mb-6 max-w-lg mx-auto">
              Get Jeff Goodman and Rob Dauster's daily takes, breaking news, and insider analysis.
            </p>
            <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
              className="inline-flex bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
              Subscribe — $4.99/mo
            </a>
          </div>
        </>
      )}
    </>
  );
}
