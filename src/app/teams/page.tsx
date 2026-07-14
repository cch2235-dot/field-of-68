'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import rostersData from '../../../data/rosters.json';

const CONFERENCES = ['ACC', 'Big East', 'Big Ten', 'Big 12', 'SEC'];

function TeamsContent() {
  const sp = useSearchParams();
  const [activeConf, setActiveConf] = useState('Big Ten');
  const [activeTeam, setActiveTeam] = useState<string | null>(null);

  const allTeams = rostersData.teams;
  const confTeams = allTeams.filter(t => t.conference === activeConf);
  const selectedTeam = allTeams.find(t => t.name === activeTeam);

  useEffect(() => {
    const t = sp.get('team');
    if (t) {
      const found = allTeams.find(team => team.name === t);
      if (found) { setActiveConf(found.conference); setActiveTeam(found.name); }
    }
  }, [sp]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
        <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">TEAMS</h1>
      </div>

      {/* Conference tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {CONFERENCES.map(c => (
          <button key={c} onClick={() => { setActiveConf(c); setActiveTeam(null); }}
            className={`font-condensed font-bold text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all ${activeConf === c ? 'bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Team grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
        {confTeams.map(team => (
          <button key={team.name} onClick={() => setActiveTeam(activeTeam === team.name ? null : team.name)}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeTeam === team.name ? 'bg-[#F5A623]/10 border-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] hover:border-[#333]'}`}>
            {team.espnId && (
              <img src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${team.espnId}.png`} alt={team.name} className="w-12 h-12 object-contain" />
            )}
            <span className="font-condensed font-bold text-white text-xs text-center leading-tight">{team.name}</span>
          </button>
        ))}
      </div>

      {/* Roster panel */}
      {selectedTeam && (
        <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden">
          {/* Team header */}
          <div className="flex items-center gap-4 p-6 border-b border-[#1A1A1A] bg-[#0A0A0A]">
            {selectedTeam.espnId && (
              <img src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${selectedTeam.espnId}.png`} alt={selectedTeam.name} className="w-16 h-16 object-contain" />
            )}
            <div>
              <h2 className="font-display text-white text-3xl tracking-wider">{selectedTeam.name}</h2>
              <p className="text-[#8A8A8A] font-condensed text-sm mt-1">
                Coach: <span className="text-[#F5A623]">{selectedTeam.coach}</span> · {selectedTeam.conference}
              </p>
            </div>
          </div>

          {/* Roster table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A] bg-[#0A0A0A]">
                  <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-4 py-3">Player</th>
                  <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">Pos</th>
                  <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">Ht</th>
                  <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">Yr</th>
                  <th className="text-right font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">PPG</th>
                  <th className="text-right font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">RPG</th>
                  <th className="text-right font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">APG</th>
                  <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3 hidden lg:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[...selectedTeam.players].sort((a, b) => (b.ppg || 0) - (a.ppg || 0)).map((player, i) => (
                  <tr key={i} className={`border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors`}>
                    <td className="px-4 py-3">
                      <span className="font-condensed font-bold text-white text-sm">{player.name}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-condensed text-[#8A8A8A] text-sm">{player.pos}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-condensed text-[#8A8A8A] text-sm">{player.height}</span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-condensed text-[#8A8A8A] text-sm">{player.year}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className={`font-condensed font-bold text-sm ${player.ppg >= 15 ? 'text-[#F5A623]' : 'text-white'}`}>
                        {player.ppg > 0 ? player.ppg.toFixed(1) : '—'}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-condensed text-[#C4C4C4] text-sm">{player.rpg > 0 ? player.rpg.toFixed(1) : '—'}</span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <span className="font-condensed text-[#C4C4C4] text-sm">{player.apg > 0 ? player.apg.toFixed(1) : '—'}</span>
                    </td>
                    <td className="px-3 py-3 hidden lg:table-cell">
                      {player.notes && <span className="font-condensed text-[#555] text-xs">{player.notes}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
