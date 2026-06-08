'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PHOTOS = [
  '/photos/show-photo-3.png',
  '/photos/show-photo-1.jpg',
  '/photos/show-photo-2.jpg',
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
      }, 700);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  function goTo(i: number) {
    if (i === current) return;
    setFading(true);
    setTimeout(() => { setCurrent(i); setFading(false); }, 400);
  }

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" style={{ minHeight: '88vh' }}>
      {/* Photo — right side, fades in/out */}
      <div className="absolute inset-0">
        {PHOTOS.map((src, i) => (
          <div key={src} className="absolute right-0 top-0 bottom-0 w-full md:w-[65%] transition-opacity duration-700"
            style={{ opacity: i === current ? (fading ? 0 : 1) : 0 }}>
            <img src={src} alt="" className="w-full h-full object-cover object-center" />
          </div>
        ))}
        {/* Strong black gradient left — matches screenshot */}
        <div className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to right, #0A0A0A 35%, rgba(10,10,10,0.85) 52%, rgba(10,10,10,0.3) 70%, transparent 85%)' }} />
        {/* Mobile overlay */}
        <div className="absolute inset-0 bg-[#0A0A0A]/80 md:hidden" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      </div>

      {/* Left content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 flex flex-col justify-center" style={{ minHeight: '88vh', paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '520px' }}>
          {/* Live badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-condensed font-bold text-[#C4C4C4] text-xs tracking-widest uppercase">
              Live Coverage · College Basketball
            </span>
          </div>

          {/* Headline — matches screenshot exactly */}
          <h1 className="font-display leading-none tracking-wider mb-6" style={{ fontSize: 'clamp(3.2rem, 7vw, 6rem)' }}>
            <span className="text-white block">THE HOME OF</span>
            <span className="block" style={{ color: '#F5A623' }}>COLLEGE</span>
            <span className="block" style={{ color: '#F5A623' }}>BASKETBALL</span>
          </h1>

          <p className="font-condensed text-[#8A8A8A] text-lg leading-relaxed mb-8" style={{ maxWidth: '480px' }}>
            Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
          </p>

          {/* Buttons — matches screenshot */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/videos"
              className="flex items-center gap-2 font-display text-base tracking-widest uppercase px-6 py-3.5 rounded transition-all"
              style={{ background: '#F5A623', color: '#000' }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              WATCH NOW
            </Link>
            <Link href="/shows"
              className="flex items-center font-condensed font-bold tracking-widest uppercase px-6 py-3.5 rounded border transition-all text-sm text-[#C4C4C4] hover:text-white"
              style={{ borderColor: '#444', background: 'transparent' }}>
              OUR SHOWS
            </Link>
            <Link href="/articles"
              className="flex items-center font-condensed font-bold tracking-widest uppercase px-6 py-3.5 rounded border transition-all text-sm text-[#C4C4C4] hover:text-white"
              style={{ borderColor: '#444', background: 'transparent' }}>
              NEWSLETTER
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 flex-wrap mb-8">
            <span className="text-[#555] font-condensed text-xs uppercase tracking-widest">Follow Us:</span>
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
                style={{ width: i === current ? '2rem' : '1rem', background: i === current ? '#F5A623' : '#444' }}
                aria-label={`Photo ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
