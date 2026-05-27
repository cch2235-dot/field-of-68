'use client';

import { useState } from 'react';
import { YouTubeVideo, VideoCategory } from '@/types';
import { formatRelativeDate, formatNumber, formatISODuration } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'All Videos' },
  { id: 'After Dark', label: 'After Dark' },
  { id: 'Exclusive Interviews', label: 'Exclusive Interviews' },
  { id: 'Transfer Portal', label: 'Transfer Portal' },
  { id: 'NBA Draft', label: 'NBA Draft' },
  { id: 'Coaching Carousel', label: 'Coaching Carousel' },
  { id: 'Conference Shows', label: 'Conference Shows' },
];

// Playlist links per category
const PLAYLIST_LINKS: Record<string, string> = {
  'Transfer Portal': 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmmk2NEaj3JriE_jM-fFkF7h',
  'NBA Draft': 'https://www.youtube.com/playlist?list=PLOP74GK-ZAml63mikjPn5CtAn44IjTA4E',
  'Coaching Carousel': 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmkjmdxcog_EQfYKUwHNxA93',
  'Conference Shows': 'https://www.youtube.com/@TheFieldOf68/playlists',
  'After Dark': 'https://www.youtube.com/@TheFieldOf68',
  'Exclusive Interviews': 'https://www.youtube.com/@TheFieldOf68',
};

interface Props { videos: YouTubeVideo[]; }

export default function VideosClient({ videos }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const playlistLink = PLAYLIST_LINKS[activeCategory] || 'https://www.youtube.com/@TheFieldOf68';

  return (
    <>
      {/* Category filters */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CATEGORIES.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
            className={`font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${
              activeCategory === cat.id
                ? 'bg-[#F5A623] text-black'
                : 'bg-[#1A1A1A] text-[#8A8A8A] hover:bg-[#242424] hover:text-white'
            }`}>
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-[#8A8A8A] font-condensed text-lg">No videos in this category yet.</p>
          <button onClick={() => setActiveCategory('all')}
            className="mt-4 text-[#F5A623] font-condensed font-bold text-sm hover:underline">
            View all videos
          </button>
        </div>
      ) : (
        <>
          {/* Featured video */}
          {featured && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">Featured</p>
                {activeCategory !== 'all' && (
                  <a href={playlistLink} target="_blank" rel="noopener noreferrer"
                    className="text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase hover:text-[#FFBE4D] transition-colors">
                    Full Playlist on YouTube →
                  </a>
                )}
              </div>
              <div className="max-w-3xl">
                <a href={featured.url} target="_blank" rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-lg bg-[#111111] card-lift">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={featured.thumbnail} alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#F5A623]/90 group-hover:bg-[#F5A623] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-xl">
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-[#F5A623] text-black font-condensed text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                      {featured.category}
                    </span>
                    {formatISODuration(featured.duration) && (
                      <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded">
                        {formatISODuration(featured.duration)}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-condensed font-bold text-white text-2xl leading-tight mb-2 group-hover:text-[#F5A623] transition-colors">
                      {featured.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[#8A8A8A] text-xs font-condensed">
                      {featured.viewCount && <span>{formatNumber(parseInt(featured.viewCount))} views</span>}
                      <span>·</span>
                      <span>{formatRelativeDate(featured.publishedAt)}</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Video grid */}
          {rest.length > 0 && (
            <div>
              <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase mb-5">More Videos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {rest.map(video => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer"
                    className="group block bg-[#111111] rounded-lg overflow-hidden card-lift">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={video.thumbnail} alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div className="w-12 h-12 bg-[#F5A623] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 bg-[#F5A623] text-black font-condensed text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                        {video.category}
                      </span>
                      {formatISODuration(video.duration) && (
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                          {formatISODuration(video.duration)}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h3 className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors mb-1">
                        {video.title}
                      </h3>
                      <p className="text-[#8A8A8A] text-xs font-condensed">
                        {video.viewCount ? `${formatNumber(parseInt(video.viewCount))} views · ` : ''}
                        {formatRelativeDate(video.publishedAt)}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Conference shows section */}
      {(activeCategory === 'all' || activeCategory === 'Conference Shows') && (
        <div className="mt-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-1 h-6 bg-[#F5A623] rounded-full" />
            <h2 className="font-display text-white text-2xl tracking-wider">CONFERENCE SHOWS</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              { name: 'A-10 Insider', url: 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmkiJIE2sFl-kVurFn1bLDKM' },
              { name: 'Mountain West Insider', url: 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmnK6FZtMHRP6OjwqkvoKbl9' },
              { name: 'ACC Insider', url: 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmmjAPIn8Q-EG2j1YTYVxe6O' },
              { name: 'WCC Insider', url: 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmkdnDIAvUnffvvcNWFuMCTe' },
              { name: 'Mid-Major Show', url: 'https://www.youtube.com/playlist?list=PLOP74GK-ZAmmwYFtmDVEfMxkHh2rdR_lE' },
            ].map(show => (
              <a key={show.name} href={show.url} target="_blank" rel="noopener noreferrer"
                className="group bg-[#111111] hover:bg-[#1A1A1A] border border-[#1A1A1A] hover:border-[#F5A623]/40 rounded-lg p-4 transition-all text-center">
                <div className="w-10 h-10 bg-[#F5A623]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                    <path fill="#2B2B2B" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <p className="font-condensed font-bold text-white text-xs tracking-wide group-hover:text-[#F5A623] transition-colors">{show.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* YouTube CTA */}
      <div className="mt-12 text-center">
        <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold tracking-widest uppercase px-8 py-4 rounded-lg transition-colors text-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
            <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Subscribe on YouTube
        </a>
      </div>
    </>
  );
}
