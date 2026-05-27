import type { Metadata } from 'next';
import ShowCard from '@/components/ShowCard';
import SponsorCTA from '@/components/SponsorCTA';
import showsData from '../../../data/shows.json';
import { Show } from '@/types';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'All Field of 68 shows — After Dark, Goodman & Hummel, A-10 Insider, Mountain West Insider and more.',
};

export default function ShowsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 md:mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">OUR SHOWS</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-2">
          Original programming from the Field of 68 — live shows, podcasts, and conference deep dives.
        </p>
      </div>

      {/* Platform links */}
      <div className="flex flex-wrap gap-3 mb-10">
        <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
            <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Watch on YouTube
        </a>
        <a href="https://open.spotify.com/show/33wCvEW8lhzsrBqTNQKwV8" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#17a34a] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">
          Listen on Spotify
        </a>
        <a href="https://podcasts.apple.com/us/podcast/the-field-of-68-after-dark-podcast/id1540628867" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white border border-[#2E2E2E] font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">
          Apple Podcasts
        </a>
      </div>

      {/* Shows grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {showsData.map((show: any) => (
          <ShowCard key={show.id} show={show as Show} />
        ))}
      </div>

      <div className="mt-16">
        <SponsorCTA variant="section" />
      </div>
    </div>
  );
}
