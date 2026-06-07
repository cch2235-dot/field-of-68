'use client';
import { useState } from 'react';
import { TweetCard } from '@/components/SocialPostCard';
import { YouTubeVideo, Article, Tweet } from '@/types';
import { formatRelativeDate } from '@/lib/utils';
const PLATFORMS = [{ id: 'all', label: 'All' }, { id: 'youtube', label: 'YouTube' }, { id: 'twitter', label: 'X / Twitter' }, { id: 'articles', label: 'Articles' }];
interface Props { videos: YouTubeVideo[]; articles: Article[]; tweets: Tweet[]; }
export default function SocialFeedClient({ videos, articles, tweets }: Props) {
  const [platform, setPlatform] = useState('all');
  return (
    <>
      <div className="flex gap-2 flex-wrap mb-8 border-b border-[#1A1A1A] pb-4">
        {PLATFORMS.map(({ id, label }) => (
          <button key={id} onClick={() => setPlatform(id)}
            className={`font-condensed font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all ${platform === id ? 'bg-[#F5A623] text-black' : 'bg-[#1A1A1A] text-[#8A8A8A] hover:bg-[#242424] hover:text-white'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="space-y-12">
        {(platform === 'all' || platform === 'youtube') && videos.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#FF0000] rounded flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></div><h2 className="font-display text-white text-2xl tracking-wider">YOUTUBE</h2></div>
              <a href="https://youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#FF0000] font-condensed text-xs transition-colors">@TheFieldOf68 →</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map(video => (
                <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="group block bg-[#111111] rounded-lg overflow-hidden card-lift">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20"><div className="w-10 h-10 bg-[#F5A623] rounded-full flex items-center justify-center"><svg className="w-4 h-4 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div></div>
                  </div>
                  <div className="p-3"><h3 className="font-condensed font-semibold text-white text-xs leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">{video.title}</h3><p className="text-[#8A8A8A] text-[10px] font-condensed mt-1">{formatRelativeDate(video.publishedAt)}</p></div>
                </a>
              ))}
            </div>
          </div>
        )}
        {(platform === 'all' || platform === 'twitter') && tweets.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><div className="w-8 h-8 bg-black border border-[#333] rounded flex items-center justify-center"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div><h2 className="font-display text-white text-2xl tracking-wider">X / TWITTER</h2></div>
              <a href="https://twitter.com/TheFieldOf68" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-white font-condensed text-xs transition-colors">@TheFieldOf68 →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{tweets.map(tweet => <TweetCard key={tweet.id} tweet={tweet} />)}</div>
          </div>
        )}
        {(platform === 'all' || platform === 'articles') && articles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3"><div className="w-8 h-8 bg-[#F5A623] rounded flex items-center justify-center"><span className="font-display text-black text-sm">68</span></div><h2 className="font-display text-white text-2xl tracking-wider">ARTICLES</h2></div>
              <a href="https://fieldof68.beehiiv.com" target="_blank" rel="noopener noreferrer" className="text-[#8A8A8A] hover:text-[#F5A623] font-condensed text-xs transition-colors">fieldof68.beehiiv.com →</a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map(article => (
                <a key={article.id} href={article.url} target="_blank" rel="noopener noreferrer" className="group flex gap-3 bg-[#111111] rounded-lg p-4 card-lift">
                  {article.thumbnail && <img src={article.thumbnail} alt={article.title} className="w-20 h-16 object-cover rounded flex-shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-[10px] font-condensed font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-1">{article.category}</span>
                    <h4 className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">{article.title}</h4>
                    <p className="text-[#8A8A8A] text-xs font-condensed mt-1">{article.author} · {formatRelativeDate(article.publishedAt)}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
