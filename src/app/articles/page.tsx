import type { Metadata } from 'next';
import { getArticles } from '@/lib/api/beehiiv';
import ArticlesClient from './client';

export const metadata: Metadata = { title: 'Articles | Field of 68' };
export const revalidate = 1800;

export default async function ArticlesPage() {
  const posts = await getArticles(60);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">ARTICLES</h1>
        </div>
        <div className="flex items-center justify-between mt-3 flex-wrap gap-4">
          <p className="text-[#8A8A8A] font-condensed text-lg">The latest from The Field of 68 Daily newsletter.</p>
          <a href="https://fieldof68.beehiiv.com/upgrade" target="_blank" rel="noopener noreferrer"
            className="bg-[#F5A623] text-black font-condensed font-bold text-sm tracking-widest uppercase px-5 py-2.5 rounded-lg">
            Subscribe — $4.99/mo
          </a>
        </div>
      </div>
      <ArticlesClient posts={posts} />
    </div>
  );
}
