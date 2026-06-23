import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden" style={{ height: '92vh' }}>
      {/* Full bleed photo */}
      <img
        src="/photos/hero-5.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 50%, rgba(10,10,10,0.4) 100%)' }} />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />

      {/* Text box */}
      <div className="relative z-10 flex items-center h-full">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="max-w-xl">

            {/* Live badge */}
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-condensed font-bold text-xs tracking-widest uppercase" style={{ color: '#8A8A8A' }}>
                Live Coverage · College Basketball
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display leading-none tracking-wider mb-4" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}>
              <span className="text-white block">THE HOME OF</span>
              <span className="block" style={{ color: '#F5A623' }}>COLLEGE</span>
              <span className="block" style={{ color: '#F5A623' }}>BASKETBALL</span>
            </h1>

            {/* Subtitle */}
            <p className="font-condensed text-lg leading-relaxed mb-8" style={{ color: '#C4C4C4', maxWidth: '440px' }}>
              Breaking news, interviews, analysis, live shows, podcasts, and everything college hoops.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/videos"
                className="flex items-center gap-2 font-display text-sm tracking-widest uppercase px-7 py-4 rounded-lg transition-opacity hover:opacity-90"
                style={{ background: '#F5A623', color: '#000' }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                WATCH NOW
              </Link>
              <Link href="/shows"
                className="font-condensed font-bold tracking-widest uppercase text-sm px-6 py-4 rounded-lg border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                OUR SHOWS
              </Link>
              <Link href="/articles"
                className="font-condensed font-bold tracking-widest uppercase text-sm px-6 py-4 rounded-lg border transition-all hover:bg-white/10"
                style={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                NEWSLETTER
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="font-condensed text-xs uppercase tracking-widest" style={{ color: '#555' }}>Follow Us:</span>
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
