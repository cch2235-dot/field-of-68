import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getYouTubeVideos } from '@/lib/api/youtube';
import { getArticles } from '@/lib/api/beehiiv';
import { getTweets } from '@/lib/api/twitter';
import VideoCard from '@/components/VideoCard';
import ArticleCard from '@/components/ArticleCard';
import { TweetCard } from '@/components/SocialPostCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import SponsorCTA from '@/components/SponsorCTA';
import HeroSection from '@/components/HeroSection';
import showsData from '../../data/shows.json';
export const metadata: Metadata = {
  title: 'The Field of 68 — The Home of College Basketball',
  description: 'Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.',
};
export const revalidate = 1800;
export default async function HomePage() {
  const [videos, articles, tweets] = await Promise.all([getYouTubeVideos(8), getArticles(6), getTweets(5)]);
  const featuredVideo = videos[0];
  const sideVideos = videos.slice(1, 4);
  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  return (
    <>
      {/* HERO */}
      <section className="relative bg-[#0A0A0A] overflow-hidden min-h-[85vh] md:min-h-[75vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A0A00] via-[#0A0A0A] to-[#0A0A0A]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#F5A623]/10 blur-[120px] -translate-y-1/2 translate-x-1/4" />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 select-none pointer-events-none hidden lg:block opacity-10">
          <Image src="/logo.png" alt="" width={480} height={192} className="w-[480px] h-auto" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <div className="live-dot" />
              <span className="font-condensed font-bold text-[#C4C4C4] text-xs tracking-widest uppercase">Live Coverage · College Basketball</span>
            </div>
            <h1 className="font-display text-[#FAFAFA] leading-none tracking-wider mb-4" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}>
              THE HOME OF{' '}<span className="text-gradient">COLLEGE BASKETBALL</span>
            </h1>
            <p className="font-condensed text-[#8A8A8A] text-xl md:text-2xl leading-relaxed mb-8 max-w-2xl">Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.</p>
            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/videos" className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-lg tracking-widest uppercase px-7 py-4 rounded-lg transition-all shadow-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>Watch Now
              </Link>
              <Link href="/shows" className="flex items-center gap-2 bg-transparent border border-[#2E2E2E] hover:border-[#F5A623] text-[#C4C4C4] hover:text-white font-condensed font-bold tracking-widest uppercase px-7 py-4 rounded-lg transition-all text-sm">Our Shows</Link>
              <a href="#newsletter" className="flex items-center gap-2 bg-transparent border border-[#2E2E2E] hover:border-[#F5A623] text-[#C4C4C4] hover:text-white font-condensed font-bold tracking-widest uppercase px-7 py-4 rounded-lg transition-all text-sm">Newsletter</a>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[#8A8A8A] font-condensed text-xs uppercase tracking-widest">Follow us:</span>
              {[{name:'YouTube',href:'https://youtube.com/@TheFieldOf68',color:'hover:text-[#FF0000]'},{name:'X / Twitter',href:'https://twitter.com/TheFieldOf68',color:'hover:text-white'},{name:'Instagram',href:'https://instagram.com/fieldof68',color:'hover:text-pink-400'}].map(({name,href,color}) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={`text-[#8A8A8A] ${color} font-condensed font-semibold text-sm transition-colors`}>{name}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </section>

      {/* SHOW PHOTOS — no labels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2 rounded-xl overflow-hidden" style={{height:'320px'}}>
            <Image src="/photos/action-1.jpg" alt="" fill className="object-cover object-center" sizes="(max-width: 768px) 100vw, 66vw" />
          </div>
          <div className="grid grid-rows-2 gap-4">
            <div className="relative rounded-xl overflow-hidden" style={{height:'152px'}}>
              <Image src="/photos/action-2.jpg" alt="" fill className="object-cover object-center" sizes="33vw" />
            </div>
            <div className="relative rounded-xl overflow-hidden" style={{height:'152px'}}>
              <Image src="/photos/action-3.jpg" alt="" fill className="object-cover object-center" sizes="33vw" />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

      {/* VIDEOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none">LATEST VIDEOS</h2>
          </div>
          <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2 rounded transition-colors">Watch on YouTube</a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">{featuredVideo && <VideoCard video={featuredVideo} featured />}</div>
          <div className="lg:col-span-1 bg-[#111111] rounded-lg p-4 flex flex-col gap-2">
            <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase px-3 mb-2">More Videos</p>
            {sideVideos.map(video => <VideoCard key={video.id} video={video} />)}
            <div className="mt-auto pt-4 border-t border-[#1A1A1A]">
              <Link href="/videos" className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white font-condensed font-bold text-xs tracking-widest uppercase py-3 rounded transition-colors">View All Videos →</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

      {/* ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none">LATEST ARTICLES</h2>
          </div>
          <Link href="/articles" className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase hover:text-[#FFBE4D] transition-colors">All Articles →</Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">{featuredArticle && <ArticleCard article={featuredArticle} featured />}</div>
          <div className="lg:col-span-1 bg-[#111111] rounded-lg p-4 flex flex-col gap-2">
            <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase px-3 mb-2">More Articles</p>
            {sideArticles.map(article => <ArticleCard key={article.id} article={article} />)}
            <div className="mt-auto pt-4 border-t border-[#1A1A1A]">
              <Link href="/articles" className="flex items-center justify-center gap-2 w-full bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white font-condensed font-bold text-xs tracking-widest uppercase py-3 rounded transition-colors">View All Articles →</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

      {/* TWEETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none">LATEST FROM X</h2>
          </div>
          <a href="https://twitter.com/TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase hover:text-[#FFBE4D] transition-colors">@TheFieldOf68 →</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tweets.slice(0, 3).map(tweet => <TweetCard key={tweet.id} tweet={tweet} />)}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />

      {/* SHOWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none">OUR SHOWS</h2>
          </div>
          <Link href="/shows" className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase hover:text-[#FFBE4D] transition-colors">All Shows →</Link>
        </div>
        <div className="relative bg-[#111111] rounded-xl overflow-hidden border border-[#1A1A1A] group mb-6">
          <div className="flex flex-col md:flex-row">
            <div className="relative md:w-2/5 h-48 md:h-auto">
              <Image src={showsData[0].thumbnail} alt={showsData[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 40vw" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111111] hidden md:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent md:hidden" />
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <span className="inline-block bg-[#F5A623] text-black font-condensed font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded mb-3">Flagship Show</span>
              <h3 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none mb-2 group-hover:text-[#F5A623] transition-colors">{showsData[0].name}</h3>
              <p className="text-[#F5A623] font-condensed text-sm font-semibold tracking-wider mb-3">{showsData[0].tagline}</p>
              <p className="text-[#8A8A8A] font-condensed text-sm leading-relaxed mb-5 max-w-lg">{showsData[0].description}</p>
              <div className="flex gap-3">
                <a href={showsData[0].youtubePlaylistUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">Watch on YouTube</a>
                <a href={showsData[0].podcastUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">Listen on Spotify</a>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {showsData.slice(1, 6).map((show: any) => (
            <Link key={show.id} href={`/shows#${show.slug}`} className="group bg-[#111111] rounded-lg overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all card-lift">
              <div className="relative h-32 overflow-hidden">
                <Image src={show.thumbnail} alt={show.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="220px" />
                <div className="show-overlay absolute inset-0" />
              </div>
              <div className="p-3">
                <h4 className="font-condensed font-bold text-white text-sm leading-tight group-hover:text-[#F5A623] transition-colors line-clamp-2">{show.name}</h4>
                <p className="text-[#8A8A8A] text-xs font-condensed mt-1">{show.hosts.join(', ')}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><NewsletterSignup variant="hero" /></section>
      <div className="section-divider mx-4 sm:mx-6 lg:mx-8 max-w-7xl xl:mx-auto" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"><SponsorCTA variant="section" /></section>
    </>
  );
}
