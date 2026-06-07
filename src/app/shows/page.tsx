import type { Metadata } from 'next';
import ShowCard from '@/components/ShowCard';
import SponsorCTA from '@/components/SponsorCTA';
import showsData from '../../../data/shows.json';
import { Show } from '@/types';
export const metadata: Metadata = { title: 'Shows', description: 'All Field of 68 shows.' };
export default function ShowsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8 md:mb-10"><div className="flex items-center gap-3 mb-2"><div className="w-1 h-7 bg-[#F5A623] rounded-full" /><h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">OUR SHOWS</h1></div><p className="text-[#8A8A8A] font-condensed text-lg mt-2">Original programming from the Field of 68 — live shows, podcasts, and conference deep dives.</p></div>
      <div className="flex flex-wrap gap-3 mb-10">
        <a href="https://www.youtube.com/@TheFieldOf68" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#FF0000] hover:bg-[#CC0000] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">Watch on YouTube</a>
        <a href="https://open.spotify.com/show/33wCvEW8lhzsrBqTNQKwV8" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1DB954] hover:bg-[#17a34a] text-white font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">Listen on Spotify</a>
        <a href="https://podcasts.apple.com/us/podcast/the-field-of-68-after-dark-podcast/id1540628867" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#242424] text-[#C4C4C4] hover:text-white border border-[#2E2E2E] font-condensed font-bold text-xs tracking-widest uppercase px-5 py-3 rounded transition-colors">Apple Podcasts</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {showsData.map((show: any) => <ShowCard key={show.id} show={show as Show} />)}
      </div>
      <div className="mt-16"><SponsorCTA variant="section" /></div>
    </div>
  );
}
