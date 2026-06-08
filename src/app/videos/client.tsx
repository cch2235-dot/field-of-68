'use client';
import { useState } from 'react';
import { YouTubeVideo } from '@/types';
import { formatRelativeDate, formatNumber, formatISODuration } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', label: 'All Videos' },
  { id: 'Full Show', label: 'Full Show' },
  { id: 'After Dark', label: 'After Dark' },
  { id: 'Exclusive Interviews', label: 'Exclusive Interviews' },
  { id: 'Transfer Portal', label: 'Transfer Portal' },
  { id: 'NBA Draft', label: 'NBA Draft' },
  { id: 'Coaching Carousel', label: 'Coaching Carousel' },
  { id: 'Conference Shows', label: 'Conference Shows' },
];

export default function VideosClient({ videos }: { videos: YouTubeVideo[] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const filtered = activeCategory === 'all' ? videos : videos.filter(v => v.category === activeCategory);
  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      {/* Category tabs */}
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
          <button onClick={() => setActiveCategory('all')} className="mt-4 text-[#F5A623] font-condensed font-bold text-sm hover:underline">
            View all videos
          </button>
        </div>
      ) : (
        <>
          {/* Featured video */}
          {featured && (
            <div className="mb-10">
              <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase mb-3">Featured</p>
              <div className="max-w-3xl">
                <a href={featured.url} target="_blank" rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-xl bg-[#111111] hover:ring-2 hover:ring-[#F5A623]/40 transition-all">
                  <div className="relative aspect-video overflow-hidden rounded-t-xl">
                    <img
                      src={featured.thumbnail}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 bg-[#F5A623]/90 group-hover:bg-[#F5A623] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all shadow-xl">
                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <span className="absolute top-3 left-3 bg-[#F5A623] text-black font-condensed text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded">
                      {featured.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-condensed font-bold text-white text-2xl leading-tight mb-2 group-hover:text-[#F5A623] transition-colors">
                      {featured.title}
                    </h3>
                  </div>
                </a>
              </div>
            </div>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div>
              <p className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase mb-5">More Videos</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {rest.map(video => (
                  <a key={video.id} href={video.url} target="_blank" rel="noopener noreferrer"
                    className="group block bg-[#111111] rounded-xl overflow-hidden hover:ring-2 hover:ring-[#F5A623]/40 transition-all">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/logo.png'; }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                        <div className="w-12 h-12 bg-[#F5A623] rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      <span className="absolute top-2 left-2 bg-[#F5A623] text-black font-condensed text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded">
                        {video.category}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">
                        {video.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <div className="mt-12 text-center">
        <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold tracking-widest uppercase px-8 py-4 rounded-lg transition-colors text-sm">
          Subscribe on YouTube
        </a>
      </div>
    </>
  );
}
