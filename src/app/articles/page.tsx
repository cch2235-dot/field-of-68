import type { Metadata } from 'next';
import { getArticles } from '@/lib/api/beehiiv';

export const metadata: Metadata = { title: 'Articles | Field of 68' };
export const revalidate = 1800;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function ArticlesPage() {
  const posts = await getArticles(60);
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">ARTICLES</h1>
        </div>
        <div className="flex items-center justify-between mt-3 flex-wrap gap-4">
          <p className="text-[#8A8A8A] font-condensed text-lg">The latest from The Field of 68 Daily newsletter.</p>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="bg-[#F5A623] text-black font-condensed font-bold text-sm tracking-widest uppercase px-5 py-2.5 rounded-lg">
            Subscribe — $4.99/mo
          </a>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#1A1A1A]">
          <h2 className="font-display text-white text-3xl tracking-wider mb-6">THE FIELD OF 68 DAILY</h2>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="inline-flex bg-[#F5A623] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg">
            Subscribe for $4.99/mo
          </a>
        </div>
      ) : (
        <>
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
                    <span className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase mb-3">Latest</span>
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
    </div>
  );
}
