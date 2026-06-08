'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import rostersData from '../../../data/rosters.json';

// Local uploaded logos for ACC and Big East, ESPN CDN for rest
const CONF_LOGOS: Record<string, string> = {
  'ACC': '/conf-logos/acc.png',
  'Big East': '/conf-logos/bigeast.png',
  'Big 12': 'https://a.espncdn.com/i/teamlogos/ncaa_conf/500/4.png',
  'Big Ten': 'https://a.espncdn.com/i/teamlogos/ncaa_conf/500/5.png',
  'SEC': 'https://a.espncdn.com/i/teamlogos/ncaa_conf/500/8.png',
};

// ESPN team logo IDs
const TEAM_LOGO_IDS: Record<string, string> = {
  'Boston College':'103','California':'25','Clemson':'228','Duke':'150',
  'Florida State':'52','Georgia Tech':'59','Louisville':'97','Miami FL':'2390',
  'NC State':'152','North Carolina':'153','Notre Dame':'87','Pittsburgh':'221',
  'SMU':'2567','Stanford':'24','Syracuse':'183','Virginia':'258',
  'Virginia Tech':'259','Wake Forest':'154',
  'Arizona':'12','Arizona State':'9','Baylor':'239','BYU':'252',
  'Cincinnati':'2132','Colorado':'38','Houston':'248','Iowa State':'66',
  'Kansas':'2305','Kansas State':'2306','Oklahoma State':'197','TCU':'2628',
  'Texas Tech':'2641','UCF':'2116','Utah':'254','West Virginia':'277',
  'Illinois':'356','Indiana':'84','Iowa':'2294','Maryland':'120',
  'Michigan':'130','Michigan State':'127','Minnesota':'135','Nebraska':'158',
  'Northwestern':'77','Ohio State':'194','Oregon':'2483','Penn State':'213',
  'Purdue':'2509','Rutgers':'164','UCLA':'26','USC':'30',
  'Washington':'264','Wisconsin':'275',
  'Butler':'2086','UConn':'41','Creighton':'156','DePaul':'305',
  'Georgetown':'46','Marquette':'269','Providence':'2507','Seton Hall':'238',
  "St. John's":'2599','Villanova':'222','Xavier':'2752',
  'Alabama':'333','Arkansas':'8','Auburn':'2','Florida':'57',
  'Georgia':'61','Kentucky':'96','LSU':'99','Mississippi State':'344',
  'Missouri':'142','Oklahoma':'201','Ole Miss':'145','South Carolina':'2579',
  'Tennessee':'2633','Texas':'251','Texas A&M':'245','Vanderbilt':'238',
};

const POS_COLORS: Record<string, string> = {
  'G': 'bg-blue-900/40 text-blue-300 border-blue-800/40',
  'F': 'bg-green-900/40 text-green-300 border-green-800/40',
  'C': 'bg-orange-900/40 text-orange-300 border-orange-800/40',
  'G/F': 'bg-purple-900/40 text-purple-300 border-purple-800/40',
  'F/G': 'bg-purple-900/40 text-purple-300 border-purple-800/40',
  'F/C': 'bg-yellow-900/40 text-yellow-300 border-yellow-800/40',
};

function getTeamLogo(teamName: string) {
  const id = TEAM_LOGO_IDS[teamName];
  if (!id) return null;
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;
}

function TeamsContent() {
  const searchParams = useSearchParams();
  const teamParam = searchParams.get('team');
  const [activeConf, setActiveConf] = useState('ACC');
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (teamParam) {
      for (const conf of rostersData.conferences) {
        const found = conf.teams.find(t => t.name === teamParam);
        if (found) { setActiveConf(conf.name); setActiveTeam(found.name); return; }
      }
    }
  }, [teamParam]);

  const conference = rostersData.conferences.find(c => c.name === activeConf);
  const teams = conference?.teams || [];
  const filteredTeams = search
    ? teams.filter(t => t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.players.some(p => p.name.toLowerCase().includes(search.toLowerCase())))
    : teams;
  const displayTeam = activeTeam ? teams.find(t => t.name === activeTeam) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">TEAMS</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-base mt-1">2026–27 projected rosters</p>
      </div>

      {/* Conference tabs — with real logos */}
      <div className="flex gap-2 flex-wrap mb-6 pb-4 border-b border-[#1A1A1A]">
        {rostersData.conferences.map(conf => {
          const logoUrl = CONF_LOGOS[conf.name];
          const active = activeConf === conf.name;
          return (
            <button key={conf.name}
              onClick={() => { setActiveConf(conf.name); setActiveTeam(null); setSearch(''); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border font-condensed font-bold text-sm tracking-wider uppercase transition-all ${
                active ? 'bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] text-[#8A8A8A] hover:border-[#333] hover:text-white'
              }`}>
              {logoUrl && (
                <img src={logoUrl} alt={conf.name} className="h-5 w-auto object-contain"
                  style={{ filter: active ? 'none' : 'grayscale(1) brightness(0.7)' }} />
              )}
              <span>{conf.name}</span>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input type="text" placeholder="Search teams or players..."
          value={search} onChange={e => { setSearch(e.target.value); setActiveTeam(null); }}
          className="w-full bg-[#111] border border-[#1A1A1A] focus:border-[#F5A623] text-white font-condensed text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors placeholder-[#444]" />
      </div>

      <div className="flex gap-6">
        {/* Team list */}
        <div className={`${displayTeam && !search ? 'hidden md:block md:w-56 flex-shrink-0' : 'w-full'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
            {filteredTeams.map(team => {
              const logoUrl = getTeamLogo(team.name);
              return (
                <button key={team.name} onClick={() => setActiveTeam(activeTeam === team.name ? null : team.name)}
                  className={`text-left px-3 py-3 rounded-lg border transition-all flex items-center gap-3 ${
                    activeTeam === team.name
                      ? 'bg-[#F5A623]/10 border-[#F5A623]/60 text-[#F5A623]'
                      : 'bg-[#111] border-[#1A1A1A] text-white hover:border-[#333] hover:bg-[#1A1A1A]'
                  }`}>
                  {logoUrl && <img src={logoUrl} alt={team.name} className="w-7 h-7 object-contain flex-shrink-0" />}
                  <div>
                    <div className="font-condensed font-bold text-sm leading-tight">{team.name}</div>
                    <div className="text-[#555] font-condensed text-xs mt-0.5">{team.players.length} players</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Roster detail */}
        {displayTeam && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-4">
                {getTeamLogo(displayTeam.name) && (
                  <img src={getTeamLogo(displayTeam.name)!} alt={displayTeam.name} className="w-16 h-16 object-contain" />
                )}
                <div>
                  <h2 className="font-display text-white text-3xl tracking-wider">{displayTeam.name.toUpperCase()}</h2>
                  <p className="text-[#555] font-condensed text-sm mt-0.5">{activeConf} · {displayTeam.players.length} players · 2026–27</p>
                </div>
              </div>
              <button onClick={() => setActiveTeam(null)} className="md:hidden text-[#8A8A8A] hover:text-white font-condensed text-sm border border-[#222] px-3 py-1.5 rounded transition-colors">
                ← Back
              </button>
            </div>
            <div className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
              <div className="grid grid-cols-[1fr_52px_60px_80px] px-4 py-3 border-b border-[#1A1A1A]">
                <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Player</span>
                <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Pos</span>
                <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Ht</span>
                <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Class</span>
              </div>
              {displayTeam.players.map((p, i) => (
                <div key={i} className="grid grid-cols-[1fr_52px_60px_80px] px-4 py-3 border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors items-center">
                  <span className="font-condensed font-semibold text-white text-sm">{p.name}</span>
                  <span>
                    <span className={`inline-block font-condensed font-bold text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded border ${POS_COLORS[p.pos] || 'bg-[#222] text-[#555] border-[#333]'}`}>
                      {p.pos}
                    </span>
                  </span>
                  <span className="font-condensed text-[#8A8A8A] text-sm">{p.ht}</span>
                  <span className="font-condensed text-[#C4C4C4] text-sm">{p.yr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state with faded conf logo */}
        {!displayTeam && !search && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              {CONF_LOGOS[activeConf] && (
                <img src={CONF_LOGOS[activeConf]} alt={activeConf} className="w-40 h-40 object-contain mx-auto mb-4 opacity-8" style={{ opacity: 0.08 }} />
              )}
              <p className="text-[#444] font-condensed text-base">Select a team to view their roster</p>
            </div>
          </div>
        )}

        {/* Search results */}
        {search && !activeTeam && (
          <div className="flex-1 min-w-0">
            <p className="text-[#555] font-condensed text-sm mb-4">Results for "<span className="text-white">{search}</span>"</p>
            <div className="space-y-3">
              {filteredTeams.map(team => {
                const matching = team.players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
                const logoUrl = getTeamLogo(team.name);
                return (
                  <div key={team.name} className="bg-[#111] rounded-xl border border-[#1A1A1A] overflow-hidden">
                    <button onClick={() => { setSearch(''); setActiveTeam(team.name); }}
                      className="w-full text-left px-4 py-3 border-b border-[#1A1A1A] flex items-center gap-3 hover:bg-[#1A1A1A] transition-colors">
                      {logoUrl && <img src={logoUrl} alt={team.name} className="w-7 h-7 object-contain" />}
                      <span className="font-display text-[#F5A623] text-lg tracking-wider">{team.name.toUpperCase()}</span>
                    </button>
                    {matching.map((p, i) => (
                      <div key={i} className="grid grid-cols-[1fr_52px_60px_80px] px-4 py-3 border-b border-[#1A1A1A] last:border-0 items-center">
                        <span className="font-condensed font-semibold text-white text-sm">{p.name}</span>
                        <span className={`inline-block font-condensed font-bold text-[10px] tracking-wider uppercase px-1.5 py-0.5 rounded border w-fit ${POS_COLORS[p.pos] || 'bg-[#222] text-[#555] border-[#333]'}`}>{p.pos}</span>
                        <span className="font-condensed text-[#8A8A8A] text-sm">{p.ht}</span>
                        <span className="font-condensed text-[#C4C4C4] text-sm">{p.yr}</span>
                      </div>
                    ))}
                    {matching.length === 0 && <div className="px-4 py-3"><p className="text-[#555] font-condensed text-xs">Team name matched</p></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-14 text-[#8A8A8A] font-condensed">Loading...</div>}>
      <TeamsContent />
    </Suspense>
  );
}
