import Image from 'next/image';
import { InstagramPost, TikTokPost, Tweet } from '@/types';
import { formatRelativeDate, formatNumber, truncateText } from '@/lib/utils';

function PlatformBadge({ platform }: { platform: 'instagram' | 'tiktok' | 'twitter' }) {
  const config = {
    instagram: { label: 'Instagram', className: 'badge-instagram' },
    tiktok: { label: 'TikTok', className: 'badge-tiktok' },
    twitter: { label: 'X / Twitter', className: 'badge-twitter' },
  }[platform];
  return (
    <span className={`inline-block text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded ${config.className}`}>
      {config.label}
    </span>
  );
}

// ── Instagram Card — square grid card ──────────────────────
export function InstagramCard({ post }: { post: InstagramPost }) {
  return (
    <a href={post.url} target="_blank" rel="noopener noreferrer"
      className="group block bg-[#111111] rounded-lg overflow-hidden card-lift">
      <div className="relative aspect-square overflow-hidden bg-[#1A1A1A]">
        <Image src={post.thumbnail} alt={post.caption || 'Instagram post'} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, 300px" />
        {post.mediaType === 'VIDEO' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2"><PlatformBadge platform="instagram" /></div>
        {/* Hover overlay with caption */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
          <p className="text-white text-xs font-condensed leading-snug line-clamp-3">{truncateText(post.caption, 120)}</p>
          <p className="text-[#F5A623] text-[10px] font-condensed mt-1">{formatRelativeDate(post.publishedAt)}</p>
        </div>
      </div>
    </a>
  );
}

// ── TikTok Card — 9:16 portrait with overlay ───────────────
export function TikTokCard({ post }: { post: TikTokPost }) {
  return (
    <a href={post.url} target="_blank" rel="noopener noreferrer"
      className="group block bg-[#111111] rounded-lg overflow-hidden card-lift">
      <div className="relative overflow-hidden bg-[#1A1A1A]" style={{ aspectRatio: '9/16' }}>
        <Image src={post.thumbnail} alt={post.caption || 'TikTok'} fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="200px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute top-2 left-2"><PlatformBadge platform="tiktok" /></div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-xs font-condensed leading-snug line-clamp-2 mb-2">{truncateText(post.caption, 80)}</p>
          <div className="flex items-center gap-3 text-white/70 text-[10px] font-condensed">
            <span>▶ {formatNumber(post.viewCount)}</span>
            <span>♥ {formatNumber(post.likesCount)}</span>
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
      </div>
    </a>
  );
}

// ── Tweet Card ─────────────────────────────────────────────
export function TweetCard({ tweet }: { tweet: Tweet }) {
  const formatTweetText = (text: string) =>
    text.split('\n').map((line, i) => (
      <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
    ));

  return (
    <a href={tweet.url} target="_blank" rel="noopener noreferrer"
      className="group block bg-[#111111] hover:bg-[#1A1A1A] rounded-lg p-4 border border-[#242424] hover:border-[#F5A623]/30 transition-all duration-200 card-lift">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#242424] flex-shrink-0">
          <Image src={tweet.author.avatar || `https://picsum.photos/seed/${tweet.author.handle}/48/48`}
            alt={tweet.author.name} fill className="object-cover" sizes="36px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-condensed font-bold text-white text-sm">{tweet.author.name}</span>
            {tweet.author.verified && (
              <svg className="w-3.5 h-3.5 text-[#1d9bf0] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
              </svg>
            )}
          </div>
          <span className="text-[#8A8A8A] text-xs font-condensed">@{tweet.author.handle}</span>
        </div>
        <PlatformBadge platform="twitter" />
      </div>
      <p className="text-[#C4C4C4] text-sm leading-relaxed mb-3 group-hover:text-white transition-colors">
        {formatTweetText(tweet.text)}
      </p>
      <div className="flex items-center gap-5 text-[#8A8A8A] text-xs font-condensed pt-2 border-t border-[#242424]">
        <span className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"/>
          </svg>
          {formatNumber(tweet.repliesCount)}
        </span>
        <span className="flex items-center gap-1.5 hover:text-green-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"/>
          </svg>
          {formatNumber(tweet.retweetsCount)}
        </span>
        <span className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
          {formatNumber(tweet.likesCount)}
        </span>
        <span className="ml-auto">{formatRelativeDate(tweet.publishedAt)}</span>
      </div>
    </a>
  );
}
