'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PHOTOS = [
  '/photos/hero-6.png',   // Jeff & Rob at desk (primary - matches screenshot)
  '/photos/hero-1.jpg',   // Interview on court
  '/photos/hero-2.jpg',   // Interview red arena
  '/photos/hero-3.jpg',   // Indiana interview
  '/photos/hero-4.jpg',   // ACC media day
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent(c => (c + 1) % PHOTOS.length);
        setFading(false);
      }, 800);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  function goTo(i: number) {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  }

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" style={{ minHeight: '85vh' }}>
      {/* Photos */}
      <div className="absolute inset-0">
        {PHOTOS.map((src, i) => (
          <div key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}>
            <img src={src} alt="" className="w-full h-full object-cover object-center" />
          </div>
        ))}
        {/* Black gradient left — exactly like screenshot */}
        <div className="absolute inset-0 hidden md:block" style={{
          background: 'linear-gradient(to right, #0A0A0A 30%, rgba(10,10,10,0.88) 48%, rgba(10,10,10,0.4) 65%, rgba(10,10,10,0.1) 80%, transparent 90%)'
        }} />
        {/* Mobile */}
        <div className="absolute inset-0 bg-[#0A0A0A]/80 md:hidden" />
        {/* Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
      </div>

      {/* Text content — left aligned, matches screenshot */}
      <div className="relative z-10 flex flex-col justify-center" style={{ minHeight: '85vh', padding: '0 0' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div style={{ maxWidth: '580px' }}>
            {/* Live badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">
                Live Coverage · College Basketball
              </span>
            </div>

            {/* Headline — stacked like screenshot */}
            <h1 className="font-display leading-none tracking-wider mb-6" style={{ fontSize: 'clamp(3rem, 6.5vw, 5.5rem)' }}>
              <span className="text-white block">THE HOME OF</span>
              <span className="block" style={{ color: '#F5A623' }}>COLLEGE</span>
              <span className="block" style={{ color: '#F5A623' }}>BASKETBALL</span>
            </h1>

            <p className="font-condensed text-[#8A8A8A] text-lg leading-relaxed mb-8" style={{ maxWidth: '460px' }}>
              Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/videos"
                className="flex items-center gap-2 font-display text-sm tracking-widest uppercase px-6 py-3.5 rounded transition-all hover:opacity-90"
                style={{ background: '#F5A623', color: '#000' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                WATCH NOW
              </Link>
              <Link href="/shows"
                className="flex items-center font-condensed font-bold tracking-widest uppercase px-5 py-3.5 rounded border text-sm text-[#C4C4C4] hover:text-white hover:border-[#666] transition-all"
                style={{ borderColor: '#333', background: 'transparent' }}>
                OUR SHOWS
              </Link>
              <Link href="/articles"
                className="flex items-center font-condensed font-bold tracking-widest uppercase px-5 py-3.5 rounded border text-sm text-[#C4C4C4] hover:text-white hover:border-[#666] transition-all"
                style={{ borderColor: '#333', background: 'transparent' }}>
                NEWSLETTER
              </Link>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 flex-wrap mb-8">
              <span className="text-[#444] font-condensed text-xs uppercase tracking-widest">Follow Us:</span>
              {[
                { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68' },
                { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68' },
                { name: 'Instagram', href: 'https://instagram.com/fieldof68' },
              ].map(({ name, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className="text-[#8A8A8A] hover:text-white font-condensed text-sm transition-colors">
                  {name}
                </a>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {PHOTOS.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{ width: i === current ? '2rem' : '1rem', background: i === current ? '#F5A623' : '#2A2A2A' }}
                  aria-label={`Photo ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
