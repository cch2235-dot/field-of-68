'use client';
import { useState } from 'react';
import portalData from '../../../data/portal.json';

const ESPN_IDS: Record<string,string> = {
  'Alabama':'333','Arizona':'12','Arizona State':'9','Arkansas':'8','Auburn':'2',
  'Baylor':'239','Boise State':'68','Boston College':'103','Bowling Green':'189',
  'BYU':'252','California':'25','Charlotte':'2429','Cincinnati':'2132','Clemson':'228',
  'Colorado':'38','Connecticut':'41','UConn':'41','Creighton':'156','DePaul':'305',
  'Duke':'150','Florida':'57','Florida State':'52','Fordham':'2210','Georgetown':'46',
  'Georgia':'61','Georgia Tech':'59','Gonzaga':'2250','Houston':'248','Illinois':'356',
  'Indiana':'84','Iowa':'2294','Iowa State':'66','Kansas':'2305','Kansas State':'2306',
  'Kentucky':'96','Liberty':'2335','Louisville':'97','LSU':'99','Marquette':'269',
  'Maryland':'120','Miami FL':'2390','Michigan':'130','Michigan State':'127',
  'Minnesota':'135','Mississippi State':'344','Missouri':'142','NC State':'152',
  'Nebraska':'158','New Mexico':'167','North Carolina':'153','Northwestern':'77',
  'Notre Dame':'87','Ohio State':'194','Oklahoma':'201','Oklahoma State':'197',
  'Ole Miss':'145','Oregon':'2483','Penn State':'213','Pittsburgh':'221','Purdue':'2509',
  'Robert Morris':'2543','Rutgers':'164','Saint Mary\'s':'2608','Sam Houston':'2534',
  'San Francisco':'2650','San Diego State':'21','Seton Hall':'238','SMU':'2567',
  'South Carolina':'2579','South Florida':'58','Stanford':'24','Syracuse':'183',
  'TCU':'2628','Tennessee':'2633','Texas':'251','Texas A&M':'245','Texas Tech':'2641',
  'UCF':'2116','UCLA':'26','UNLV':'2439','USC':'30','Utah':'254',
  'Vanderbilt':'238','VCU':'2670','Virginia':'258','Virginia Tech':'259',
  'Wake Forest':'154','Washington':'264','West Virginia':'277','Wisconsin':'275',
  'Xavier':'2752','NBA Draft':'','St. John\'s':'2599',
};

function getLogo(school: string) {
  const id = ESPN_IDS[school];
  if (!id) return null;
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;
}

const STATUS_STYLES: Record<string,string> = {
  'Committed': 'bg-green-900/40 text-green-400 border-green-800/40',
  'Available': 'bg-blue-900/40 text-blue-400 border-blue-800/40',
  'Withdrawn': 'bg-yellow-900/40 text-yellow-400 border-yellow-800/40',
  'NBA Draft': 'bg-purple-900/40 text-purple-400 border-purple-800/40',
};

type Player = typeof portalData.players[0] & { ppg?: number; rpg?: number; apg?: number; spg?: number; bpg?: number; fgPct?: number; threePct?: number; prevTeam?: string };

export default function PortalPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [posFilter, setPosFilter] = useState('all');
  const [selected, setSelected] = useState<Player | null>(null);

  const players = portalData.players as Player[];

  const filtered = players.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.from.toLowerCase().includes(search.toLowerCase()) ||
      p.to.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    const matchPos = posFilter === 'all' || p.pos.includes(posFilter);
    return matchSearch && matchStatus && matchPos;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">TRANSFER PORTAL</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-1">Field of 68 Top 100 Transfer Portal Rankings</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search player or school..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-[#1A1A1A] focus:border-[#F5A623] text-white font-condensed text-sm pl-9 pr-4 py-2.5 rounded-lg outline-none transition-colors placeholder-[#444]" />
        </div>
        {/* Status */}
        <div className="flex gap-2 flex-wrap">
          {['all','Committed','Available','Withdrawn','NBA Draft'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${statusFilter === s ? 'bg-[#F5A623] text-black' : 'bg-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
        {/* Position */}
        <div className="flex gap-2 flex-wrap">
          {['all','G','F','C'].map(p => (
            <button key={p} onClick={() => setPosFilter(p)}
              className={`font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${posFilter === p ? 'bg-[#F5A623] text-black' : 'bg-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
              {p === 'all' ? 'All Pos' : p}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <p className="text-[#555] font-condensed text-sm mb-4">{filtered.length} players</p>

      {/* Table */}
      <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-[48px_1fr_80px_1fr_1fr_120px] px-4 py-3 border-b border-[#1A1A1A] bg-[#0A0A0A]">
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">#</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Player</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Pos</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">From</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">To</span>
          <span className="font-condensed font-bold text-[#555] text-xs tracking-widest uppercase">Status</span>
        </div>

        {filtered.map((player, i) => (
          <button key={player.rank} onClick={() => setSelected(selected?.rank === player.rank ? null : player)}
            className={`w-full grid grid-cols-[48px_1fr_80px_1fr_1fr_120px] px-4 py-3.5 border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors text-left items-center ${selected?.rank === player.rank ? 'bg-[#1A1A1A]' : ''}`}>
            {/* Rank */}
            <span className="font-display text-[#F5A623] text-lg">{player.rank}</span>
            {/* Name */}
            <span className="font-condensed font-bold text-white text-sm">{player.name}</span>
            {/* Pos */}
            <span className="font-condensed text-[#8A8A8A] text-sm">{player.pos}</span>
            {/* From */}
            <div className="flex items-center gap-2">
              {getLogo(player.from) && <img src={getLogo(player.from)!} alt={player.from} className="w-7 h-7 object-contain flex-shrink-0" />}
              <span className="font-condensed text-[#C4C4C4] text-sm hidden md:block">{player.from}</span>
            </div>
            {/* To */}
            <div className="flex items-center gap-2">
              {player.status === 'NBA Draft' ? (
                <span className="font-condensed font-bold text-purple-400 text-sm">NBA Draft</span>
              ) : player.status === 'Withdrawn' ? (
                <span className="font-condensed font-bold text-yellow-400 text-sm">Staying</span>
              ) : (
                <>
                  {getLogo(player.to) && <img src={getLogo(player.to)!} alt={player.to} className="w-7 h-7 object-contain flex-shrink-0" />}
                  <span className="font-condensed text-[#C4C4C4] text-sm hidden md:block">{player.to}</span>
                </>
              )}
            </div>
            {/* Status */}
            <span className={`inline-flex font-condensed font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border w-fit ${STATUS_STYLES[player.status]}`}>
              {player.status}
            </span>
          </button>
        ))}
      </div>

      {/* Player detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl p-8 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-display text-[#F5A623] text-2xl">#{selected.rank}</span>
                  <span className={`font-condensed font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${STATUS_STYLES[selected.status]}`}>{selected.status}</span>
                </div>
                <h2 className="font-display text-white text-3xl tracking-wider">{selected.name}</h2>
                <p className="text-[#8A8A8A] font-condensed text-sm mt-1">{selected.pos}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#555] hover:text-white font-condensed text-xl">✕</button>
            </div>

            {/* From → To */}
            <div className="flex items-center justify-between bg-[#1A1A1A] rounded-xl p-4 mb-6">
              <div className="flex flex-col items-center gap-2">
                {getLogo(selected.from) && <img src={getLogo(selected.from)!} alt={selected.from} className="w-14 h-14 object-contain" />}
                <span className="text-[#8A8A8A] font-condensed text-xs text-center">{selected.from}</span>
                <span className="text-[#555] font-condensed text-[10px] uppercase tracking-widest">From</span>
              </div>
              <div className="text-[#F5A623] font-display text-2xl">→</div>
              <div className="flex flex-col items-center gap-2">
                {selected.status === 'NBA Draft' ? (
                  <div className="w-14 h-14 rounded-full bg-purple-900/40 flex items-center justify-center">
                    <span className="text-purple-400 font-display text-lg">NBA</span>
                  </div>
                ) : selected.status === 'Withdrawn' ? (
                  getLogo(selected.to) && <img src={getLogo(selected.to)!} alt={selected.to} className="w-14 h-14 object-contain" />
                ) : (
                  getLogo(selected.to) && <img src={getLogo(selected.to)!} alt={selected.to} className="w-14 h-14 object-contain" />
                )}
                <span className="text-[#8A8A8A] font-condensed text-xs text-center">{selected.status === 'NBA Draft' ? 'NBA Draft' : selected.to}</span>
                <span className="text-[#555] font-condensed text-[10px] uppercase tracking-widest">To</span>
              </div>
            </div>

            {/* Stats */}
            {(selected.ppg || selected.rpg || selected.apg) ? (
              <div>
                <p className="text-[#555] font-condensed text-xs tracking-widest uppercase mb-3">2024-25 Stats</p>
                <div className="grid grid-cols-3 gap-3">
                  {selected.ppg !== undefined && (
                    <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                      <div className="font-display text-[#F5A623] text-2xl">{selected.ppg}</div>
                      <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">PPG</div>
                    </div>
                  )}
                  {selected.rpg !== undefined && (
                    <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                      <div className="font-display text-[#F5A623] text-2xl">{selected.rpg}</div>
                      <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">RPG</div>
                    </div>
                  )}
                  {selected.apg !== undefined && (
                    <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                      <div className="font-display text-[#F5A623] text-2xl">{selected.apg}</div>
                      <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">APG</div>
                    </div>
                  )}
                </div>
                {(selected.fgPct || selected.threePct) && (
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    {selected.spg !== undefined && (
                      <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                        <div className="font-display text-[#F5A623] text-2xl">{selected.spg}</div>
                        <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">SPG</div>
                      </div>
                    )}
                    {selected.fgPct !== undefined && (
                      <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                        <div className="font-display text-[#F5A623] text-2xl">{selected.fgPct}%</div>
                        <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">FG%</div>
                      </div>
                    )}
                    {selected.threePct !== undefined && (
                      <div className="bg-[#1A1A1A] rounded-lg p-3 text-center">
                        <div className="font-display text-[#F5A623] text-2xl">{selected.threePct}%</div>
                        <div className="text-[#555] font-condensed text-xs uppercase tracking-wider mt-1">3P%</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[#555] font-condensed text-sm text-center py-4">Stats coming soon</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
