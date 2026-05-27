import Image from 'next/image';
import { YouTubeVideo } from '@/types';
import { formatRelativeDate, formatNumber, formatISODuration } from '@/lib/utils';

interface VideoCardProps {
  video: YouTubeVideo;
  featured?: boolean;
}

export default function VideoCard({ video, featured = false }: VideoCardProps) {
  const views = video.viewCount ? formatNumber(parseInt(video.viewCount)) : null;
  const duration = formatISODuration(video.duration);

  if (featured) {
    return (
      <a href={video.url} target="_blank" rel="noopener noreferrer"
        className="group block relative overflow-hidden rounded-lg bg-[#111111] card-lift">
        <div className="relative aspect-video overflow-hidden">
          <Image src={video.thumbnail} alt={video.title} fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 800px" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F5A623]/90 group-hover:bg-[#F5A623] rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-200 shadow-xl">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <span className="absolute top-3 left-3 bg-[#F5A623] text-black font-condensed text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded">
            {video.category}
          </span>
          {duration && (
            <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-0.5 rounded">
              {duration}
            </span>
          )}
        </div>
        <div className="p-4 md:p-5">
          <h3 className="font-condensed font-bold text-white text-xl md:text-2xl leading-tight mb-2 group-hover:text-[#F5A623] transition-colors line-clamp-2">
            {video.title}
          </h3>
          <p className="text-[#8A8A8A] text-sm line-clamp-2 mb-3">{video.description}</p>
          <div className="flex items-center gap-3 text-[#8A8A8A] text-xs font-condensed">
            {views && <span>{views} views</span>}
            <span>·</span>
            <span>{formatRelativeDate(video.publishedAt)}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={video.url} target="_blank" rel="noopener noreferrer"
      className="group flex gap-3 items-start p-3 rounded-lg hover:bg-[#1A1A1A] transition-colors">
      <div className="relative flex-shrink-0 w-32 md:w-36 aspect-video rounded overflow-hidden bg-[#1A1A1A]">
        <Image src={video.thumbnail} alt={video.title} fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="144px" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
          <div className="w-8 h-8 bg-[#F5A623] rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-black ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        {duration && (
          <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] text-[10px] font-condensed font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-1">
          {video.category}
        </span>
        <h4 className="font-condensed font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-[#F5A623] transition-colors">
          {video.title}
        </h4>
        <div className="flex items-center gap-2 mt-1 text-[#8A8A8A] text-xs font-condensed">
          {views && <><span>{views} views</span><span>·</span></>}
          <span>{formatRelativeDate(video.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}
