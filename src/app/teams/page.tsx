'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import rostersData from '../../../data/rosters.json';
import espnIds from '../../../data/espn-ids.json';

const ESPN_IDS: Record<string, number> = espnIds as any;
import schedulesData from '../../../data/schedules.json';

const CONFERENCES = ['ACC', 'American', 'Atlantic 10', 'Big 12', 'Big East', 'Big Ten', 'MWC', 'Pac-12', 'SEC', 'WCC'];
const WHITE_BG_TEAMS = ['Cincinnati', 'Penn State', 'Iowa', 'Wake Forest', 'California'];

const schedules: Record<string, { games: { date: string; opponent: string; location: string; venue?: string }[] }> = schedulesData as any;

function LocationBadge({ location, venue }: { location: string; venue?: string }) {
  if (location === 'away') return <span className="font-condensed text-xs px-1.5 py-0.5 rounded bg-[#1A1A1A] text-[#8A8A8A]">AWAY</span>;
  if (location === 'neutral') return <span className="font-condensed text-xs px-1.5 py-0.5 rounded bg-[#1A1A2A] text-[#60a5fa]">{venue || 'NEUTRAL'}</span>;
  return <span className="font-condensed text-xs px-1.5 py-0.5 rounded bg-[#1A1A0A] text-[#F5A623]">HOME</span>;
}

function TeamsContent() {
  const sp = useSearchParams();
  const [activeConf, setActiveConf] = useState('Big Ten');
  const [activeTeam, setActiveTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'roster' | 'schedule'>('roster');

  const allTeams = rostersData.teams;
  const confTeams = allTeams.filter(t => t.conference === activeConf).sort((a, b) => a.name.localeCompare(b.name));
  const selectedTeam = allTeams.find(t => t.name === activeTeam);
  const teamSchedule = activeTeam ? schedules[activeTeam] : null;

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
          <button key={team.name} onClick={() => { setActiveTeam(activeTeam === team.name ? null : team.name); setActiveTab('roster'); }}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${activeTeam === team.name ? 'bg-[#F5A623]/10 border-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] hover:border-[#333]'}`}>
            {(team.espnId || ESPN_IDS[team.name]) && (
              <img
                src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${team.espnId || ESPN_IDS[team.name]}.png`}
                alt={team.name}
                className="w-12 h-12 object-contain"
                style={WHITE_BG_TEAMS.includes(team.name) ? {background:'white',borderRadius:'6px',padding:'3px'} : {}}
              />
            )}
            <span className="font-condensed font-bold text-white text-xs text-center leading-tight">{team.name}</span>
          </button>
        ))}
      </div>

      {/* Team panel */}
      {selectedTeam && (
        <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden">
          {/* Team header */}
          <div className="flex items-center gap-4 p-6 border-b border-[#1A1A1A] bg-[#0A0A0A]">
            {(selectedTeam.espnId || ESPN_IDS[selectedTeam.name]) && (
              <img
                src={`https://a.espncdn.com/i/teamlogos/ncaa/500/${selectedTeam.espnId || ESPN_IDS[selectedTeam.name]}.png`}
                alt={selectedTeam.name}
                className="w-16 h-16 object-contain"
                style={WHITE_BG_TEAMS.includes(selectedTeam.name) ? {background:'white',borderRadius:'6px',padding:'4px'} : {}}
              />
            )}
            <div>
              <h2 className="font-display text-white text-3xl tracking-wider">{selectedTeam.name}</h2>
              <p className="text-[#8A8A8A] font-condensed text-sm mt-1">
                Coach: <span className="text-[#F5A623]">{selectedTeam.coach}</span> · {selectedTeam.conference}
              </p>
            </div>
          </div>

          {/* Roster / Schedule tabs */}
          <div className="flex border-b border-[#1A1A1A]">
            <button onClick={() => setActiveTab('roster')}
              className={`font-condensed font-bold text-sm tracking-wider uppercase px-6 py-3 border-b-2 transition-all ${activeTab === 'roster' ? 'border-[#F5A623] text-[#F5A623]' : 'border-transparent text-[#555] hover:text-white'}`}>
              Roster
            </button>
            <button onClick={() => setActiveTab('schedule')}
              className={`font-condensed font-bold text-sm tracking-wider uppercase px-6 py-3 border-b-2 transition-all ${activeTab === 'schedule' ? 'border-[#F5A623] text-[#F5A623]' : 'border-transparent text-[#555] hover:text-white'}`}>
              Non-Conference Schedule {teamSchedule ? `(${teamSchedule.games.length})` : ''}
            </button>
          </div>

          {/* Roster tab */}
          {activeTab === 'roster' && (
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
                    <tr key={i} className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-condensed font-bold text-white text-sm">{player.name}</span>
                        {(player as any).seeking5th && (
                          <span className="ml-2 bg-blue-900/50 text-blue-300 border border-blue-700/50 font-condensed font-bold text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full whitespace-nowrap">SEEKING 5TH YR</span>
                        )}
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
          )}

          {/* Schedule tab */}
          {activeTab === 'schedule' && (
            <div>
              {teamSchedule ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1A1A1A] bg-[#0A0A0A]">
                      <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-4 py-3">Date</th>
                      <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">Opponent</th>
                      <th className="text-left font-condensed font-bold text-[#555] text-xs tracking-widest uppercase px-3 py-3">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamSchedule.games.map((game, i) => (
                      <tr key={i} className="border-b border-[#1A1A1A] last:border-0 hover:bg-[#1A1A1A] transition-colors">
                        <td className="px-4 py-3">
                          <span className="font-condensed text-[#8A8A8A] text-sm">{game.date}</span>
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-condensed font-bold text-white text-sm">{game.opponent}</span>
                        </td>
                        <td className="px-3 py-3">
                          <LocationBadge location={game.location} venue={game.venue} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="px-6 py-10 text-center text-[#555] font-condensed text-sm">
                  No non-conference schedule available for {selectedTeam.name}.
                </div>
              )}
            </div>
          )}
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
