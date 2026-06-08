'use client';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" style={{ minHeight: '86vh' }}>

      {/* THE PHOTO — right side, static, no rotation */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%]">
        <img
          src="/photos/hero-main.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Black gradient over photo — left to right */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to right, #0A0A0A 30%, #0A0A0A 38%, rgba(10,10,10,0.95) 50%, rgba(10,10,10,0.6) 65%, rgba(10,10,10,0.15) 80%, transparent 92%)'
      }} />

      {/* Mobile overlay */}
      <div className="absolute inset-0 bg-[#0A0A0A]/80 md:hidden" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{
        background: 'linear-gradient(to top, #0A0A0A, transparent)'
      }} />

      {/* TEXT — left side */}
      <div className="relative z-10 flex items-center" style={{ minHeight: '86vh' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full py-20">
          <div style={{ maxWidth: '520px' }}>

            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-condensed font-bold text-xs tracking-widest uppercase" style={{ color: '#8A8A8A' }}>
                Live Coverage · College Basketball
              </span>
            </div>

            <h1 className="font-display leading-none tracking-wider mb-6" style={{ fontSize: 'clamp(3.2rem, 6.5vw, 5.8rem)' }}>
              <span className="text-white block">THE HOME OF</span>
              <span className="block" style={{ color: '#F5A623' }}>COLLEGE</span>
              <span className="block" style={{ color: '#F5A623' }}>BASKETBALL</span>
            </h1>

            <p className="font-condensed text-lg leading-relaxed mb-8" style={{ color: '#8A8A8A', maxWidth: '420px' }}>
              Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/videos"
                className="flex items-center gap-2 font-display text-sm tracking-widest uppercase px-6 py-3.5 rounded"
                style={{ background: '#F5A623', color: '#000' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                WATCH NOW
              </Link>
              <Link href="/shows"
                className="flex items-center font-condensed font-bold tracking-widest uppercase text-sm px-5 py-3.5 rounded border"
                style={{ borderColor: '#333', color: '#C4C4C4', background: 'transparent' }}>
                OUR SHOWS
              </Link>
              <Link href="/articles"
                className="flex items-center font-condensed font-bold tracking-widest uppercase text-sm px-5 py-3.5 rounded border"
                style={{ borderColor: '#333', color: '#C4C4C4', background: 'transparent' }}>
                NEWSLETTER
              </Link>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-condensed text-xs uppercase tracking-widest" style={{ color: '#444' }}>Follow Us:</span>
              {[
                { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68' },
                { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68' },
                { name: 'Instagram', href: 'https://instagram.com/fieldof68' },
              ].map(({ name, href }) => (
                <a key={name} href={href} target="_blank" rel="noopener noreferrer"
                  className="font-condensed text-sm hover:text-white transition-colors"
                  style={{ color: '#8A8A8A' }}>
                  {name}
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
