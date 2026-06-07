import type { Metadata } from 'next';
import { getTweets } from '@/lib/api/twitter';
import { getYouTubeVideos } from '@/lib/api/youtube';
import { getArticles } from '@/lib/api/beehiiv';
import SocialFeedClient from './client';
export const metadata: Metadata = { title: 'Social Feed', description: 'All Field of 68 content in one place.' };
export const revalidate = 900;
export default async function SocialFeedPage() {
  const [videos, articles, tweets] = await Promise.all([getYouTubeVideos(12), getArticles(8), getTweets(10)]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-2"><div className="w-1 h-7 bg-[#F5A623] rounded-full" /><h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">SOCIAL FEED</h1></div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-2">Every piece of Field of 68 content — in one place.</p>
      </div>
      <SocialFeedClient videos={videos} articles={articles} tweets={tweets} />
    </div>
  );
}
