import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description: 'About The Field of 68 — the premier college basketball media network, led by Jon Rothstein.',
};

const TEAM = [
  {
    name: 'Rob Dauster',
    role: 'Co-Founder & Host, After Dark',
    bio: 'The founder of The Field of 68 Media Network. Rob built one of college basketball\'s premier destinations from the ground up and hosts the flagship After Dark show every night during the season.',
    twitter: 'RobDauster',
    color: '#F5A623',
  },
  {
    name: 'Jeff Goodman',
    role: 'Co-Founder & Senior Analyst',
    bio: 'One of the most respected reporters in college basketball. Jeff co-hosts After Dark, the Goodman & Hummel Podcast, the A-10 Insider, and the Mountain West Insider — bringing unmatched access and insight every day.',
    twitter: 'GoodmanHoops',
    color: '#F5A623',
  },
  {
    name: 'The Field of 68 Staff',
    role: 'Writers, Hosts & Contributors',
    bio: 'Tristan Freeman, Samuel Lance, Mike Miller, Sean Paul, John Fanta, Terrence Oglesby, Robbie Hummel, Randolph Childress, and many more — the writers, hosts, and analysts who make the Field of 68 run.',
    twitter: 'TheFieldOf68',
    color: '#F5A623',
  },
];

const STATS = [
  { stat: '10+ Years', label: 'Covering College Hoops' },
  { stat: '200K+', label: 'Newsletter Subscribers' },
  { stat: '500K+', label: 'Social Media Followers' },
  { stat: '6', label: 'Original Shows' },
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
          The Field of 68 is the premier college basketball media network — built by fans, for fans.
        </p>
      </div>

      {/* Mission section */}
      <div className="bg-[#383838] rounded-2xl p-8 md:p-12 mb-12 border border-[#444444] relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-5 select-none pointer-events-none">
          <span className="font-display text-[#F5A623] leading-none" style={{ fontSize: '18rem' }}>68</span>
        </div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block bg-[#F5A623]/20 text-[#F5A623] font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1.5 rounded-full mb-5">
            Our Mission
          </span>
          <h2 className="font-display text-white text-3xl md:text-4xl tracking-wider leading-none mb-5">
            THE HOME OF COLLEGE BASKETBALL
          </h2>
          <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed mb-4">
            The Field of 68 was built to be the definitive destination for college basketball fans who want more than surface-level coverage. We go deeper, report harder, and aren't afraid to take a stand.
          </p>
          <p className="text-[#8A8A8A] font-condensed text-lg leading-relaxed">
            From breaking transfer portal news to in-depth bracket analysis, from live YouTube shows to a daily newsletter read by hundreds of thousands — The Field of 68 is everywhere college basketball lives.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map(({ stat, label }) => (
          <div key={label} className="bg-[#383838] border border-[#444444] rounded-xl p-6 text-center">
            <div className="font-display text-[#F5A623] text-3xl md:text-4xl tracking-wider leading-none mb-2">{stat}</div>
            <div className="text-[#8A8A8A] font-condensed text-sm uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>

      {/* Team */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h2 className="font-display text-white text-3xl tracking-wider leading-none">THE TEAM</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map(member => (
            <div key={member.name} className="bg-[#383838] border border-[#444444] rounded-xl p-6 hover:border-[#F5A623]/40 transition-all">
              <div className="w-14 h-14 rounded-full bg-[#F5A623]/20 flex items-center justify-center mb-4">
                <span className="font-display text-[#F5A623] text-2xl tracking-widest">
                  {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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

      {/* Platforms */}
      <div className="bg-[#383838] border border-[#444444] rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h2 className="font-display text-white text-3xl tracking-wider leading-none">WHERE TO FIND US</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'YouTube', href: 'https://youtube.com/@TheFieldOf68', handle: '@TheFieldOf68', color: '#FF0000', desc: 'Shows, interviews & analysis' },
            { name: 'X / Twitter', href: 'https://twitter.com/TheFieldOf68', handle: '@TheFieldOf68', color: '#FFFFFF', desc: 'Breaking news & hot takes' },
            { name: 'Instagram', href: 'https://instagram.com/fieldof68', handle: '@fieldof68', color: '#E1306C', desc: 'Highlights & behind the scenes' },
            { name: 'TikTok', href: 'https://tiktok.com/@fieldof68', handle: '@fieldof68', color: '#69C9D0', desc: 'Short-form highlights & clips' },
          ].map(p => (
            <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer"
              className="bg-[#444444] hover:bg-[#383838] rounded-lg p-4 transition-colors group">
              <div className="font-condensed font-bold text-white text-sm mb-0.5 group-hover:text-[#F5A623] transition-colors">{p.name}</div>
              <div className="font-condensed text-[#8A8A8A] text-xs mb-2">{p.handle}</div>
              <div className="font-condensed text-[#8A8A8A] text-xs">{p.desc}</div>
            </a>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link href="/contact"
          className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#F7B84B] text-white font-display text-xl tracking-widest uppercase px-10 py-4 rounded-lg transition-colors">
          Partner With Us
        </Link>
      </div>
    </div>
  );
}
