import type { Metadata } from 'next';
import { getYouTubeVideos } from '@/lib/api/youtube';
import VideoCard from '@/components/VideoCard';
import VideosClient from './client';

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Watch the latest Field of 68 videos — interviews, analysis, NBA Draft coverage, conference shows, and more.',
};

export const revalidate = 1800;

export default async function VideosPage() {
  const videos = await getYouTubeVideos(24);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Page header */}
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">VIDEOS</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-2">
          The latest from the Field of 68 YouTube channel — interviews, analysis, shows, and more.
        </p>
      </div>

      <VideosClient videos={videos} />
    </div>
  );
}
