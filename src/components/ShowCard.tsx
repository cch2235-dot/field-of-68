import Image from 'next/image';
import { Show } from '@/types';

interface Props { show: Show; compact?: boolean; }

export default function ShowCard({ show, compact = false }: Props) {
  if (compact) {
    return (
      <a href={`/shows#${show.slug}`} className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#1A1A1A]">
          <Image src={show.thumbnail} alt={show.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="64px" />
        </div>
        <div>
          <h4 className="font-condensed font-bold text-white text-sm group-hover:text-[#F5A623] transition-colors leading-tight">{show.name}</h4>
          <p className="text-[#8A8A8A] text-xs mt-0.5">{show.hosts.join(', ')}</p>
        </div>
      </a>
    );
  }

  return (
    <div id={show.slug} className="group bg-[#111111] rounded-xl overflow-hidden border border-[#1A1A1A] hover:border-[#F5A623]/40 transition-all duration-300 card-lift">
      <div className="relative h-48 md:h-56 overflow-hidden bg-[#1A1A1A]">
        <Image src={show.thumbnail} alt={show.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
        <div className="show-overlay absolute inset-0" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-white text-2xl tracking-wider mb-1 group-hover:text-[#F5A623] transition-colors leading-none">{show.name}</h3>
        <p className="text-[#F5A623] font-condensed text-xs font-semibold tracking-wider uppercase mb-3">{show.tagline}</p>
        <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4 line-clamp-3">{show.description}</p>
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[#8A8A8A] text-xs font-condensed uppercase tracking-wider">Hosted by:</span>
          <span className="text-[#C4C4C4] text-sm font-condensed font-semibold">{show.hosts.join(', ')}</span>
        </div>
        <div className="flex gap-2">
          <a href={show.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 rounded transition-colors">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/><path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            Watch
          </a>
          <a href={show.podcastUrl} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#17a34a] text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 rounded transition-colors">
            Listen
          </a>
          {show.appleUrl && (
            <a href={show.appleUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 px-3 rounded transition-colors border border-[#2E2E2E]">
              Apple
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
