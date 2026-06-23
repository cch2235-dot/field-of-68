import type { Metadata } from 'next';
import { getBeehiivPosts } from '@/lib/api/beehiiv';

export const metadata: Metadata = {
  title: 'Articles | Field of 68',
  description: 'The latest college basketball articles, analysis and breaking news from The Field of 68.',
};

export const revalidate = 1800;

function formatDate(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });
}

export default async function ArticlesPage() {
  const posts = await getBeehiivPosts(60); // pull last 60
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">ARTICLES</h1>
        </div>
        <div className="flex items-center justify-between flex-wrap gap-4 mt-3">
          <p className="text-[#8A8A8A] font-condensed text-lg">
            The latest from The Field of 68 Daily newsletter.
          </p>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-condensed font-bold text-sm tracking-widest uppercase px-5 py-2.5 rounded-lg transition-colors">
            Subscribe — $4.99/mo
          </a>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-[#111] rounded-2xl border border-[#1A1A1A]">
          <div className="font-display text-[#F5A623] text-6xl tracking-wider mb-4">68</div>
          <h2 className="font-display text-white text-3xl tracking-wider mb-3">THE FIELD OF 68 DAILY</h2>
          <p className="text-[#8A8A8A] font-condensed text-lg mb-8 max-w-md mx-auto">
            Subscribe to get Jeff Goodman and Rob Dauster's daily takes, breaking news, and insider analysis.
          </p>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
            Subscribe for $4.99/mo
          </a>
        </div>
      ) : (
        <>
          {/* Featured article */}
          {featured && (
            <div className="mb-10">
              <a href={featured.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-[#111] rounded-2xl overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
                    {featured.thumbnail_url ? (
                      <img src={featured.thumbnail_url} alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ minHeight: '300px' }} />
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center" style={{ minHeight: '300px' }}>
                        <span className="font-display text-[#F5A623]/20 text-8xl tracking-widest">68</span>
                      </div>
                    )}
                    {featured.audience === 'premium' && (
                      <span className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#F5A623] text-black font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <span className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase mb-3">Latest</span>
                    <h2 className="font-display text-white text-3xl tracking-wider leading-tight mb-3 group-hover:text-[#F5A623] transition-colors">
                      {featured.title}
                    </h2>
                    {featured.subtitle && (
                      <p className="text-[#8A8A8A] font-condensed text-base leading-relaxed mb-4 line-clamp-3">
                        {featured.subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-auto">
                      {featured.authors?.[0] && (
                        <span className="text-[#C4C4C4] font-condensed text-sm">{featured.authors[0].name}</span>
                      )}
                      {featured.authors?.[0] && <span className="text-[#333]">·</span>}
                      <span className="text-[#8A8A8A] font-condensed text-sm">
                        {formatDate(featured.publish_date || featured.displayed_date)}
                      </span>
                      {featured.audience === 'premium' && (
                        <>
                          <span className="text-[#333]">·</span>
                          <span className="text-[#F5A623] font-condensed text-sm font-bold">Premium</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Article grid — remaining 59 */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map(post => (
                <a key={post.id} href={post.url} target="_blank" rel="noopener noreferrer"
                  className="group block bg-[#111] rounded-xl overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all">
                  <div className="relative overflow-hidden" style={{ height: '180px' }}>
                    {post.thumbnail_url ? (
                      <img src={post.thumbnail_url} alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-[#1A1A1A] flex items-center justify-center">
                        <span className="font-display text-[#F5A623]/10 text-6xl tracking-widest">68</span>
                      </div>
                    )}
                    {post.audience === 'premium' && (
                      <span className="absolute top-3 left-3 flex items-center gap-1 bg-[#F5A623] text-black font-condensed font-bold text-[10px] tracking-widest uppercase px-2 py-1 rounded-full">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
                        Premium
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-condensed font-bold text-white text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#F5A623] transition-colors">
                      {post.title}
                    </h3>
                    {post.subtitle && (
                      <p className="text-[#8A8A8A] font-condensed text-xs leading-relaxed line-clamp-2 mb-3">
                        {post.subtitle}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-[#555] font-condensed text-xs">
                        {formatDate(post.publish_date || post.displayed_date)}
                      </span>
                      {post.audience === 'premium' ? (
                        <span className="text-[#F5A623] font-condensed text-xs font-bold">Subscribe →</span>
                      ) : (
                        <span className="text-[#8A8A8A] font-condensed text-xs">Free →</span>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Subscribe CTA */}
          <div className="mt-14 bg-[#111] border border-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider mb-3">THE FIELD OF 68 DAILY</h2>
            <p className="text-[#8A8A8A] font-condensed text-lg mb-6 max-w-lg mx-auto">
              Get Jeff Goodman and Rob Dauster's daily takes, breaking news, and insider analysis delivered to your inbox.
            </p>
            <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
              Subscribe — $4.99/mo
            </a>
          </div>
        </>
      )}
    </div>
  );
}
