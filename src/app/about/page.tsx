import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About | Field of 68', description: 'About The Field of 68 Media Network.' };

const TEAM = [
  { name: 'Jeff Goodman', role: 'Co-Founder', bio: 'One of the most respected reporters and analysts in college basketball. Jeff co-founded The Field of 68 and co-hosts After Dark, the GHM Podcast, A-10 Insider, Mountain West Insider, and more. He brings unmatched access and insider knowledge to every show.', twitter: 'GoodmanHoops' },
  { name: 'Rob Dauster', role: 'Co-Founder', bio: 'Co-Founder of The Field of 68 Media Network and host of After Dark — the flagship live show with over 1,400 episodes. Rob built one of college basketball\'s premier media destinations and brings the insight and energy that makes the network what it is.', twitter: 'RobDauster' },
];

// All photos — no labels shown
const PHOTOS = [
  '/photos/action-1.jpg',
  '/photos/action-2.jpg',
  '/photos/action-3.jpg',
  '/photos/action-4.jpg',
  '/photos/show-photo-1.jpg',
  '/photos/show-photo-2.jpg',
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">ABOUT US</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-xl leading-relaxed">
          Led by Jeff Goodman and Rob Dauster, two of the biggest names in the college basketball media industry, the Field of 68 Media Network is the premier destination for college basketball insight, analysis and access.
        </p>
      </div>

      {/* Photo grid — NO labels */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-14">
        {PHOTOS.map((src, i) => (
          <div key={i} className={`relative rounded-xl overflow-hidden bg-[#111] ${i === 0 ? 'md:col-span-2 row-span-1' : ''}`}
            style={{ height: i === 0 ? '320px' : '220px' }}>
            <img src={src} alt="" className="w-full h-full object-cover object-center" />
            {/* Subtle bottom fade for depth — no text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Mission */}
      <div className="bg-[#111111] rounded-2xl p-8 md:p-12 mb-12 border border-[#1A1A1A]">
        <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">Our Mission</span>
        <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none mb-5">THE HOME OF COLLEGE BASKETBALL</h2>
        <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed mb-4">
          The Field of 68 was built to be the definitive destination for college basketball fans who want more than surface-level coverage. We go deeper, report harder, and aren't afraid to take a stand.
        </p>
        <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed">
          From breaking transfer portal news to in-depth bracket analysis, from live YouTube shows to a daily newsletter — The Field of 68 is everywhere college basketball lives.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { stat: '75K+', label: 'YouTube Subscribers' },
          { stat: '154K+', label: 'Twitter Followers' },
          { stat: '49K+', label: 'Instagram Followers' },
          { stat: '11', label: 'Original Shows' },
        ].map(({ stat, label }) => (
          <div key={label} className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-6 text-center">
            <div className="font-display text-[#F5A623] text-3xl md:text-4xl tracking-wider leading-none mb-2">{stat}</div>
            <div className="text-[#8A8A8A] font-condensed text-sm uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Co-Founders */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h2 className="font-display text-white text-3xl tracking-wider leading-none">CO-FOUNDERS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAM.map(member => (
            <div key={member.name} className="bg-[#111111] border border-[#1A1A1A] rounded-xl p-6 hover:border-[#F5A623]/40 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F5A623]/20 flex items-center justify-center mb-4">
                <span className="font-display text-[#F5A623] text-2xl tracking-widest">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-display text-white text-2xl tracking-wider leading-none mb-1">{member.name}</h3>
              <p className="text-[#F5A623] font-condensed text-xs font-bold tracking-widest uppercase mb-3">{member.role}</p>
              <p className="text-[#8A8A8A] font-condensed text-sm leading-relaxed mb-4">{member.bio}</p>
              <a href={`https://twitter.com/${member.twitter}`} target="_blank" rel="noopener noreferrer"
                className="text-[#8A8A8A] hover:text-white font-condensed text-xs transition-colors">
                @{member.twitter} →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Where to find us */}
      <div className="bg-[#111111] border border-[#1A1A1A] rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h2 className="font-display text-white text-3xl tracking-wider leading-none">WHERE TO FIND US</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68', handle: '@TheFieldOf68', desc: 'Shows, interviews & analysis' },
            { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68', handle: '@TheFieldOf68', desc: 'Breaking news & hot takes' },
            { name: 'Instagram', href: 'https://instagram.com/fieldof68', handle: '@fieldof68', desc: 'Highlights & behind the scenes' },
          ].map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              className="bg-[#1A1A1A] hover:bg-[#242424] rounded-lg p-4 transition-colors group">
              <div className="font-condensed font-bold text-white text-sm mb-0.5 group-hover:text-[#F5A623] transition-colors">{p.name}</div>
              <div className="font-condensed text-[#8A8A8A] text-xs mb-2">{p.handle}</div>
              <div className="font-condensed text-[#8A8A8A] text-xs">{p.desc}</div>
            </a>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#FFBE4D] text-black font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
          Partner With Us
        </Link>
      </div>

    </div>
  );
}
