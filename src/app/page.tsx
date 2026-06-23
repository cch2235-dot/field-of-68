import type { Metadata } from 'next';
import Link from 'next/link';
import { getYouTubeVideos } from '@/lib/api/youtube';
import { getArticles } from '@/lib/api/beehiiv';
import HeroSection from '@/components/HeroSection';
export const metadata: Metadata = { title: 'The Field of 68 — The Home of College Basketball' };
export const revalidate = 1800;
export default async function HomePage() {
  const [videos, articles] = await Promise.all([getYouTubeVideos(8), getArticles(6)]);
  return (
    <>
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative rounded-xl overflow-hidden md:col-span-2" style={{height:'320px'}}>
            <img src="/photos/action-1.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative rounded-xl overflow-hidden" style={{height:'152px'}}>
              <img src="/photos/action-2.jpg" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{height:'152px'}}>
              <img src="/photos/action-3.jpg" alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider">LATEST VIDEOS</h2>
          </div>
          <Link href="/videos" className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase">View All →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {videos.slice(0,4).map(video => (
            <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer"
              className="group block bg-[#111] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#F5A623]/40 transition-all">
              <div className="relative aspect-video overflow-hidden">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3">
                <p className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">{video.title}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
              <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider">LATEST ARTICLES</h2>
            </div>
            <Link href="/articles" className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase">All Articles →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.slice(0,3).map(article => (
              <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer"
                className="group block bg-[#111] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#F5A623]/40 transition-all">
                {article.thumbnail && <div style={{height:'180px'}}><img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" /></div>}
                <div className="p-4">
                  <p className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">{article.title}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider mb-3">THE FIELD OF 68 DAILY</h2>
          <p className="text-[#8A8A8A] font-condensed text-lg mb-6 max-w-lg mx-auto">Get Jeff Goodman and Rob Dauster's daily takes, breaking news, and insider analysis.</p>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="inline-flex bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
            Subscribe — $4.99/mo
          </a>
        </div>
      </section>
    </>
  );
}
