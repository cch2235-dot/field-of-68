'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Rotating photos — Jeff & Rob desk shot is first (matches screenshot)
const PHOTOS = [
  '/photos/jeff-rob-desk.png',
  '/photos/hero-1.jpg',
  '/photos/hero-2.jpg',
  '/photos/hero-3.jpg',
  '/photos/hero-4.jpg',
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      setVisible(false);
      setTimeout(() => {
        setCurrent(c => (c + 1) % PHOTOS.length);
        // Fade in
        setVisible(true);
      }, 600);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  function goTo(i: number) {
    if (i === current) return;
    setVisible(false);
    setTimeout(() => { setCurrent(i); setVisible(true); }, 400);
  }

  return (
    <section
      className="relative bg-[#0A0A0A] overflow-hidden"
      style={{ minHeight: '86vh', display: 'flex', alignItems: 'center' }}
    >
      {/* === PHOTO — full bleed background, fades === */}
      {PHOTOS.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? (visible ? 1 : 0) : 0 }}
        >
          {/* Photo positioned to right half */}
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[58%]">
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover object-center"
              style={{ objectPosition: 'center top' }}
            />
          </div>
        </div>
      ))}

      {/* === GRADIENTS === */}
      {/* Left black fade — strong, covers left ~40% completely */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'linear-gradient(to right, #0A0A0A 28%, #0A0A0A 36%, rgba(10,10,10,0.92) 50%, rgba(10,10,10,0.5) 65%, rgba(10,10,10,0.1) 80%, transparent 90%)'
        }}
      />
      {/* Mobile full overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/82 md:hidden" />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: '120px', background: 'linear-gradient(to top, #0A0A0A, transparent)' }}
      />

      {/* === TEXT CONTENT — left side === */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10" style={{ paddingTop: '5rem', paddingBottom: '4rem' }}>
        <div style={{ maxWidth: '540px' }}>

          {/* Live badge */}
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ animation: 'pulse 2s infinite' }} />
            <span className="font-condensed font-bold tracking-widest uppercase text-xs" style={{ color: '#8A8A8A' }}>
              Live Coverage · College Basketball
            </span>
          </div>

          {/* Main headline — white + gold stacked, matches screenshot */}
          <h1
            className="font-display leading-none tracking-wider mb-6"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
          >
            <span className="text-white block">THE HOME OF</span>
            <span className="block" style={{ color: '#F5A623' }}>COLLEGE</span>
            <span className="block" style={{ color: '#F5A623' }}>BASKETBALL</span>
          </h1>

          <p className="font-condensed text-lg leading-relaxed mb-8" style={{ color: '#8A8A8A', maxWidth: '440px' }}>
            Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/videos"
              className="flex items-center gap-2 font-display text-sm tracking-widest uppercase px-6 py-3.5 rounded transition-opacity hover:opacity-90"
              style={{ background: '#F5A623', color: '#000' }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              WATCH NOW
            </Link>
            <Link
              href="/shows"
              className="flex items-center font-condensed font-bold tracking-widest uppercase text-sm px-5 py-3.5 rounded border transition-all hover:border-[#666] hover:text-white"
              style={{ borderColor: '#333', color: '#C4C4C4', background: 'transparent' }}
            >
              OUR SHOWS
            </Link>
            <Link
              href="/articles"
              className="flex items-center font-condensed font-bold tracking-widest uppercase text-sm px-5 py-3.5 rounded border transition-all hover:border-[#666] hover:text-white"
              style={{ borderColor: '#333', color: '#C4C4C4', background: 'transparent' }}
            >
              NEWSLETTER
            </Link>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 flex-wrap mb-8">
            <span className="font-condensed text-xs uppercase tracking-widest" style={{ color: '#444' }}>Follow Us:</span>
            {[
              { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68' },
              { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68' },
              { name: 'Instagram', href: 'https://instagram.com/fieldof68' },
            ].map(({ name, href }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                className="font-condensed text-sm transition-colors hover:text-white"
                style={{ color: '#8A8A8A' }}>
                {name}
              </a>
            ))}
          </div>

          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {PHOTOS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? '2rem' : '1rem',
                  background: i === current ? '#F5A623' : '#2A2A2A'
                }}
                aria-label={`Photo ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
