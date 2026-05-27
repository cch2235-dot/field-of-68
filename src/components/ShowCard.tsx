import Image from 'next/image';
import Link from 'next/link';
import { Show } from '@/types';
import { formatRelativeDate } from '@/lib/utils';

interface ShowCardProps {
  show: Show;
  compact?: boolean;
}

export default function ShowCard({ show, compact = false }: ShowCardProps) {
  if (compact) {
    return (
      <Link
        href={`/shows#${show.slug}`}
        className="group flex items-center gap-4 p-3 rounded-lg hover:bg-[#444444] transition-colors"
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#444444]">
          <Image src={show.thumbnail} alt={show.name} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="64px" />
        </div>
        <div>
          <h4 className="font-condensed font-bold text-white text-sm group-hover:text-[#F5A623] transition-colors leading-tight">{show.name}</h4>
          <p className="text-[#8A8A8A] text-xs mt-0.5">{show.hosts.join(', ')}</p>
        </div>
      </Link>
    );
  }

  return (
    <div id={show.slug} className="group bg-[#383838] rounded-xl overflow-hidden border border-[#444444] hover:border-[#F5A623]/40 transition-all duration-300 card-lift">
      {/* Show thumbnail */}
      <div className="relative h-48 md:h-56 overflow-hidden bg-[#444444]">
        <Image
          src={show.thumbnail}
          alt={show.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
        />
        <div className="show-overlay absolute inset-0" />
        {/* Episode count badge */}
        <span className="absolute top-3 right-3 bg-[#1C1C1C]/80 text-[#8A8A8A] font-condensed text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          {show.episodeCount} episodes
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-display text-white text-2xl tracking-wider mb-1 group-hover:text-[#F5A623] transition-colors leading-none">
          {show.name}
        </h3>
        <p className="text-[#F5A623] font-condensed text-xs font-semibold tracking-wider uppercase mb-3">
          {show.tagline}
        </p>

        <p className="text-[#8A8A8A] text-sm leading-relaxed mb-4 line-clamp-3">
          {show.description}
        </p>

        {/* Hosts */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[#8A8A8A] text-xs font-condensed uppercase tracking-wider">Hosted by:</span>
          <span className="text-[#C4C4C4] text-sm font-condensed font-semibold">{show.hosts.join(', ')}</span>
        </div>

        {/* Latest episode */}
        {show.latestEpisode && (
          <div className="bg-[#444444] rounded-lg p-3 mb-4">
            <p className="text-[#8A8A8A] text-[10px] font-condensed uppercase tracking-widest mb-1">Latest Episode</p>
            <a
              href={show.latestEpisode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-sm font-condensed font-semibold hover:text-[#F5A623] transition-colors line-clamp-2 leading-snug"
            >
              {show.latestEpisode.title}
            </a>
            <p className="text-[#8A8A8A] text-xs mt-1 font-condensed">
              {formatRelativeDate(show.latestEpisode.date)}
            </p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <a
            href={show.youtubePlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
              <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Watch
          </a>
          <a
            href={show.podcastUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1DB954] hover:bg-[#17a34a] text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 rounded transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
            Listen
          </a>
          {show.appleUrl && (
            <a
              href={show.appleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#444444] hover:bg-[#383838] text-[#C4C4C4] hover:text-white font-condensed font-bold text-xs tracking-widest uppercase py-2.5 px-3 rounded transition-colors border border-[#444444]"
              title="Apple Podcasts"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.5c2.109 0 4.05.75 5.578 1.992L6.492 17.578A7.465 7.465 0 014.5 12c0-4.136 3.364-7.5 7.5-7.5zm0 15c-2.109 0-4.05-.75-5.578-1.992l11.086-11.086A7.465 7.465 0 0119.5 12c0 4.136-3.364 7.5-7.5 7.5z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
