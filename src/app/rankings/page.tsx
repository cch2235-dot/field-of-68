import type { Metadata } from 'next';
import Link from 'next/link';
import rankingsData from '../../../data/rankings.json';

export const metadata: Metadata = {
  title: 'Top 25 Rankings | Field of 68',
  description: "Rob Dauster's Way-Too-Early Top 25 college basketball rankings.",
};

const TEAM_ESPN_IDS: Record<string, string> = {
  'Florida': '57', 'Michigan': '130', 'UConn': '41', 'Duke': '150',
  'Illinois': '356', 'Michigan State': '127', 'Houston': '248',
  'Arizona': '12', 'Virginia': '258', 'Texas': '251',
  'Tennessee': '2633', "St. John's": '2599', 'Iowa State': '66',
  'Miami FL': '2390', 'Louisville': '97', 'Gonzaga': '2250',
  'Kentucky': '96', 'Alabama': '333', 'Vanderbilt': '238',
  'Arkansas': '8', 'Indiana': '84', 'Purdue': '2509',
  'Kansas': '2305', 'USC': '30', 'Nebraska': '158',
};

// Map ranking team names to roster team names
const TEAM_ROSTER_SLUG: Record<string, string> = {
  'Florida': 'Florida',
  'Michigan': 'Michigan',
  'UConn': 'UConn',
  'Duke': 'Duke',
  'Illinois': 'Illinois',
  'Michigan State': 'Michigan State',
  'Houston': 'Houston',
  'Arizona': 'Arizona',
  'Virginia': 'Virginia',
  'Texas': 'Texas',
  'Tennessee': 'Tennessee',
  "St. John's": "St. John's",
  'Iowa State': 'Iowa State',
  'Miami FL': 'Miami FL',
  'Louisville': 'Louisville',
  'Gonzaga': 'Gonzaga',
  'Kentucky': 'Kentucky',
  'Alabama': 'Alabama',
  'Vanderbilt': 'Vanderbilt',
  'Arkansas': 'Arkansas',
  'Indiana': 'Indiana',
  'Purdue': 'Purdue',
  'Kansas': 'Kansas',
  'USC': 'USC',
  'Nebraska': 'Nebraska',
};

function MovementBadge({ movement }: { movement: number | null }) {
  if (movement === null) return (
    <span className="inline-flex items-center bg-[#2A2A2A] text-[#8A8A8A] font-condensed font-bold text-xs px-2 py-0.5 rounded">UR</span>
  );
  if (movement === 0) return <span className="text-[#555] font-condensed text-sm">—</span>;
  if (movement > 0) return (
    <span className="inline-flex items-center gap-0.5 text-green-400 font-condensed font-bold text-sm">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 14l5-5 5 5z"/></svg>{movement}
    </span>
  );
  return (
    <span className="inline-flex items-center gap-0.5 text-red-400 font-condensed font-bold text-sm">
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>{Math.abs(movement)}
    </span>
  );
}

export default function RankingsPage() {
  const latest = rankingsData.weeks[rankingsData.weeks.length - 1];
  const rankings = latest.rankings;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">TOP 25</h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="bg-[#F5A623] text-black font-condensed font-bold text-xs tracking-widest uppercase px-3 py-1 rounded">
            {latest.label}
          </span>
          <span className="text-[#8A8A8A] font-condensed text-sm">by {latest.author}</span>
          <span className="text-[#333]">·</span>
          <span className="text-[#8A8A8A] font-condensed text-sm">
            {new Date(latest.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Top 3 featured cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {rankings.slice(0, 3).map((team) => {
          const espnId = TEAM_ESPN_IDS[team.team];
          const rosterSlug = TEAM_ROSTER_SLUG[team.team];
          const logoUrl = espnId ? `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png` : null;
          return (
            <Link key={team.rank} href={rosterSlug ? `/teams?team=${encodeURIComponent(rosterSlug)}` : '/teams'}
              className={`group relative bg-[#111] border rounded-xl p-6 overflow-hidden hover:border-[#F5A623]/60 transition-all ${
                team.rank === 1 ? 'border-[#F5A623]' : 'border-[#1A1A1A]'
              }`}>
              {team.rank === 1 && (
                <div className="absolute top-0 right-0 bg-[#F5A623] text-black font-condensed font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-bl-lg">#1</div>
              )}
              <div className="flex items-start gap-3 mb-3">
                <span className="font-display text-[#F5A623] text-5xl tracking-wider leading-none">{team.rank}</span>
                {logoUrl && <img src={logoUrl} alt={team.team} className="w-12 h-12 object-contain mt-1" />}
              </div>
              <div className="font-display text-white text-xl tracking-wider mb-1 group-hover:text-[#F5A623] transition-colors">{team.team.toUpperCase()}</div>
              <div className="text-[#8A8A8A] font-condensed text-xs mb-2">{team.conference}</div>
              <div className="flex items-center justify-between">
                <MovementBadge movement={team.movement} />
                <span className="text-[#F5A623] text-xs font-condensed opacity-0 group-hover:opacity-100 transition-opacity">View Roster →</span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full table */}
      <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
        <div className="grid grid-cols-[44px_44px_1fr_100px_56px] px-4 py-3 border-b border-[#1A1A1A]">
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">RK</span>
          <span />
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">TEAM</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">CONF</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase text-right">+/-</span>
        </div>
        {rankings.map((team) => {
          const espnId = TEAM_ESPN_IDS[team.team];
          const rosterSlug = TEAM_ROSTER_SLUG[team.team];
          const logoUrl = espnId ? `https://a.espncdn.com/i/teamlogos/ncaa/500/${espnId}.png` : null;
          return (
            <Link key={team.rank} href={rosterSlug ? `/teams?team=${encodeURIComponent(rosterSlug)}` : '/teams'}
              className={`grid grid-cols-[44px_44px_1fr_100px_56px] px-4 py-3 items-center border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors group ${
                team.rank <= 5 ? 'bg-[#F5A623]/5' : ''
              }`}>
              <div className={`font-display text-xl tracking-wider leading-none ${team.rank <= 5 ? 'text-[#F5A623]' : 'text-[#2A2A2A]'}`}>
                {team.rank}
              </div>
              <div className="flex items-center justify-center">
                {logoUrl
                  ? <img src={logoUrl} alt={team.team} className="w-8 h-8 object-contain" />
                  : <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center">
                      <span className="text-[#555] font-condensed font-bold text-[10px]">{team.team.slice(0,2).toUpperCase()}</span>
                    </div>
                }
              </div>
              <div className="font-condensed font-bold text-white text-sm group-hover:text-[#F5A623] transition-colors">
                {team.team}
                <span className="text-[#F5A623] text-xs ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→ Roster</span>
              </div>
              <div className="font-condensed text-[#555] text-xs">{team.conference}</div>
              <div className="text-right"><MovementBadge movement={team.movement} /></div>
            </Link>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="mt-6 bg-[#111] border border-[#1A1A1A] rounded-xl p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#F5A623]/20 flex items-center justify-center flex-shrink-0">
          <span className="font-display text-[#F5A623] text-lg">RD</span>
        </div>
        <div>
          <p className="font-condensed font-bold text-white text-sm mb-1">Rob Dauster's Way-Too-Early Top 25</p>
          <p className="text-[#8A8A8A] font-condensed text-sm">Click any team to view their full 2026-27 roster. UR = previously unranked.</p>
        </div>
      </div>
    </div>
  );
}
