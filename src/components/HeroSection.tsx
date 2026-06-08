'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const PHOTOS = [
  '/photos/show-photo-1.jpg',
  '/photos/show-photo-2.jpg',
  '/photos/show-photo-1.jpg',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % PHOTOS.length);
        setFading(false);
      }, 600);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden min-h-[85vh] md:min-h-[80vh] flex items-center">
      {/* Photo on right */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute right-0 top-0 bottom-0 w-[55%]">
          <div
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: fading ? 0 : 1 }}>
            <Image
              src={PHOTOS[current]}
              alt=""
              fill
              className="object-cover object-center"
              sizes="55vw"
              priority
            />
          </div>
          {/* Black fade from left to right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent" />
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Mobile photo bg */}
      <div className="absolute inset-0 md:hidden">
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: fading ? 0 : 0.3 }}>
          <Image
            src={PHOTOS[current]}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-[#0A0A0A]/70" />
      </div>

      {/* Text content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="live-dot" />
            <span className="font-condensed font-bold text-[#C4C4C4] text-xs tracking-widest uppercase">Live Coverage · College Basketball</span>
          </div>
          <h1 className="font-display text-[#FAFAFA] leading-none tracking-wider mb-4" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}>
            THE HOME OF{' '}
            <span className="text-gradient">COLLEGE BASKETBALL</span>
          </h1>
          <p className="font-condensed text-[#8A8A8A] text-xl leading-relaxed mb-8 max-w-lg">
            Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/videos" className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-lg tracking-widest uppercase px-7 py-4 rounded-lg transition-all shadow-lg">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              Watch Now
            </Link>
            <Link href="/shows" className="flex items-center gap-2 bg-transparent border border-[#2E2E2E] hover:border-[#F5A623] text-[#C4C4C4] hover:text-white font-condensed font-bold tracking-widest uppercase px-7 py-4 rounded-lg transition-all text-sm">
              Our Shows
            </Link>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-[#8A8A8A] font-condensed text-xs uppercase tracking-widest">Follow us:</span>
            {[
              { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68', color: 'hover:text-[#FF0000]' },
              { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68', color: 'hover:text-white' },
              { name: 'Instagram', href: 'https://instagram.com/fieldof68', color: 'hover:text-pink-400' },
            ].map(({ name, href, color }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                className={`text-[#8A8A8A] ${color} font-condensed font-semibold text-sm transition-colors`}>
                {name}
              </a>
            ))}
          </div>

          {/* Photo dots */}
          <div className="flex items-center gap-2 mt-8">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFading(true); setTimeout(() => { setCurrent(i); setFading(false); }, 300); }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-[#F5A623] w-5' : 'bg-[#444]'}`}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
    </section>
  );
}
