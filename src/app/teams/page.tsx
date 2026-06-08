'use client';
import { useState } from 'react';
import rostersData from '../../../data/rosters.json';

const POS_COLORS: Record<string, string> = {
  'G': 'bg-blue-900/40 text-blue-300 border-blue-800/50',
  'F': 'bg-green-900/40 text-green-300 border-green-800/50',
  'C': 'bg-orange-900/40 text-orange-300 border-orange-800/50',
  'G/F': 'bg-purple-900/40 text-purple-300 border-purple-800/50',
  'F/G': 'bg-purple-900/40 text-purple-300 border-purple-800/50',
  'EE': 'bg-[#333]/60 text-[#8A8A8A] border-[#444]/50',
};

export default function TeamsPage() {
  const [activeConf, setActiveConf] = useState('ACC');
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const conference = rostersData.conferences.find(c => c.name === activeConf);
  const teams = conference?.teams || [];

  const displayTeam = activeTeam
    ? teams.find(t => t.name === activeTeam)
    : null;

  const filteredTeams = search
    ? teams.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.players.some(p => p.name.toLowerCase().includes(search.toLowerCase()))
      )
    : teams;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider leading-none">TEAMS</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-2">
          2026–27 roster projections. Player names and eligibility years.
        </p>
      </div>

      {/* Conference tabs */}
      <div className="flex gap-2 flex-wrap mb-6 border-b border-[#1A1A1A] pb-4">
        {rostersData.conferences.map(conf => (
          <button key={conf.name} onClick={() => { setActiveConf(conf.name); setActiveTeam(null); setSearch(''); }}
            className={`font-condensed font-bold text-xs tracking-widest uppercase px-5 py-2.5 rounded-full transition-all ${
              activeConf === conf.name ? 'bg-[#F5A623] text-black' : 'bg-[#1A1A1A] text-[#8A8A8A] hover:bg-[#242424] hover:text-white'
            }`}>
            {conf.name}
          </button>
        ))}
        <span className="ml-auto flex items-center">
          <span className="text-[#8A8A8A] font-condensed text-xs">More conferences coming soon</span>
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search teams or players..."
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveTeam(null); }}
          className="w-full bg-[#1A1A1A] border border-[#2E2E2E] focus:border-[#F5A623] text-white font-condensed text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors placeholder-[#555]"
        />
      </div>

      {/* Team grid + detail */}
      <div className="flex gap-6">
        {/* Team list */}
        <div className={`${activeTeam ? 'hidden md:block md:w-64 flex-shrink-0' : 'w-full'}`}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-1 gap-2">
            {filteredTeams.map(team => (
              <button key={team.name} onClick={() => setActiveTeam(activeTeam === team.name ? null : team.name)}
                className={`text-left px-4 py-3 rounded-lg border transition-all ${
                  activeTeam === team.name
                    ? 'bg-[#F5A623]/10 border-[#F5A623]/60 text-[#F5A623]'
                    : 'bg-[#111111] border-[#1A1A1A] text-white hover:border-[#F5A623]/30 hover:bg-[#1A1A1A]'
                }`}>
                <div className="font-condensed font-bold text-sm">{team.name}</div>
                <div className="text-[#8A8A8A] font-condensed text-xs mt-0.5">{team.players.length} players</div>
              </button>
            ))}
          </div>
        </div>

        {/* Roster detail */}
        {displayTeam && (
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display text-white text-3xl tracking-wider leading-none">{displayTeam.name.toUpperCase()}</h2>
                <p className="text-[#8A8A8A] font-condensed text-sm mt-1">{activeConf} · {displayTeam.players.length} players</p>
              </div>
              <button onClick={() => setActiveTeam(null)} className="md:hidden text-[#8A8A8A] hover:text-white font-condensed text-sm border border-[#2E2E2E] px-3 py-1.5 rounded transition-colors">
                ← Back
              </button>
            </div>
            <div className="bg-[#111111] rounded-xl border border-[#1A1A1A] overflow-hidden">
              <div className="grid grid-cols-[1fr_60px_60px_80px] gap-0 px-4 py-3 border-b border-[#1A1A1A]">
                <span className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">Player</span>
                <span className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">Pos</span>
                <span className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">Ht</span>
                <span className="font-condensed font-bold text-[#8A8A8A] text-xs tracking-widest uppercase">Year</span>
              </div>
              {displayTeam.players.map((player, i) => (
                <div key={i} className="grid grid-cols-[1fr_60px_60px_80px] gap-0 px-4 py-3 border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors items-center">
                  <span className="font-condensed font-semibold text-white text-sm">{player.name}</span>
                  <span>
                    <span className={`inline-block font-condensed font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border ${POS_COLORS[player.pos] || 'bg-[#333]/60 text-[#8A8A8A] border-[#444]/50'}`}>
                      {player.pos}
                    </span>
                  </span>
                  <span className="font-condensed text-[#8A8A8A] text-sm">{player.ht}</span>
                  <span className="font-condensed text-[#C4C4C4] text-sm">{player.yr}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state when no team selected and not searching */}
        {!displayTeam && !search && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className="text-center">
              <div className="text-[#F5A623]/20 font-display text-8xl tracking-widest mb-4">68</div>
              <p className="text-[#8A8A8A] font-condensed text-base">Select a team to view their roster</p>
            </div>
          </div>
        )}

        {/* Search results */}
        {search && !activeTeam && (
          <div className="flex-1 min-w-0">
            <p className="text-[#8A8A8A] font-condensed text-sm mb-4">
              Results for "<span className="text-white">{search}</span>"
            </p>
            <div className="space-y-4">
              {filteredTeams.map(team => {
                const matchingPlayers = team.players.filter(p =>
                  p.name.toLowerCase().includes(search.toLowerCase())
                );
                return (
                  <div key={team.name} className="bg-[#111111] rounded-xl border border-[#1A1A1A] overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#1A1A1A]">
                      <button onClick={() => { setSearch(''); setActiveTeam(team.name); }} className="font-display text-[#F5A623] text-xl tracking-wider hover:text-[#FFBE4D] transition-colors">
                        {team.name.toUpperCase()}
                      </button>
                    </div>
                    {matchingPlayers.length > 0 ? matchingPlayers.map((player, i) => (
                      <div key={i} className="grid grid-cols-[1fr_60px_60px_80px] gap-0 px-4 py-3 border-b border-[#1A1A1A] last:border-0 items-center">
                        <span className="font-condensed font-semibold text-white text-sm">{player.name}</span>
                        <span className={`inline-block font-condensed font-bold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border w-fit ${POS_COLORS[player.pos] || 'bg-[#333]/60 text-[#8A8A8A] border-[#444]/50'}`}>{player.pos}</span>
                        <span className="font-condensed text-[#8A8A8A] text-sm">{player.ht}</span>
                        <span className="font-condensed text-[#C4C4C4] text-sm">{player.yr}</span>
                      </div>
                    )) : (
                      <div className="px-4 py-3">
                        <p className="text-[#8A8A8A] font-condensed text-xs">Team name matched</p>
                      </div>
                    )}
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
