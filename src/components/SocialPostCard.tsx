import Image from 'next/image';
import { Tweet } from '@/types';
import { formatRelativeDate, formatNumber } from '@/lib/utils';

export function TweetCard({ tweet }: { tweet: Tweet }) {
  const formatTweetText = (text: string) => text.split('\n').map((line, i) => <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>);
  return (
    <a href={tweet.url} target="_blank" rel="noopener noreferrer"
      className="group block bg-[#111111] hover:bg-[#1A1A1A] rounded-lg p-4 border border-[#242424] hover:border-[#F5A623]/30 transition-all duration-200 card-lift">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#242424] flex-shrink-0">
          <Image src={tweet.author.avatar || `https://picsum.photos/seed/${tweet.author.handle}/48/48`} alt={tweet.author.name} fill className="object-cover" sizes="36px" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-condensed font-bold text-white text-sm">{tweet.author.name}</span>
            {tweet.author.verified && <svg className="w-3.5 h-3.5 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor"><path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/></svg>}
          </div>
          <span className="text-[#8A8A8A] text-xs font-condensed">@{tweet.author.handle}</span>
        </div>
        <span className="inline-block text-[10px] font-condensed font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-black text-white border border-[#333]">X</span>
      </div>
      <p className="text-[#C4C4C4] text-sm leading-relaxed mb-3 group-hover:text-white transition-colors">{formatTweetText(tweet.text)}</p>
      <div className="flex items-center gap-5 text-[#8A8A8A] text-xs font-condensed pt-2 border-t border-[#242424]">
        <span className="flex items-center gap-1.5">{formatNumber(tweet.repliesCount)} replies</span>
        <span className="flex items-center gap-1.5">{formatNumber(tweet.retweetsCount)} RTs</span>
        <span className="flex items-center gap-1.5">{formatNumber(tweet.likesCount)} likes</span>
        <span className="ml-auto">{formatRelativeDate(tweet.publishedAt)}</span>
      </div>
    </a>
  );
}
