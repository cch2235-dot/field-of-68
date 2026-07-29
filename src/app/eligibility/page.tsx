'use client';
import { useState } from 'react';
import eligibilityData from '../../../data/eligibility.json';

type Season = {
  year: string; team: string; gp: number; gs: number; min: number;
  fgPct: number; threePct: number; ftPct: number; reb: number;
  ast: number; stl: number; blk: number; to: number; pts: number;
};
type Player = {
  name: string; committedTo: string | null; pos: string;
  seasons: Season[];
};
type Case = {
  state: string; date: string; players: number;
  judge: string | null; attorney: string; players_list: Player[];
};

const cases = eligibilityData.cases as Case[];

export default function EligibilityPage() {
  const [activeState, setActiveState] = useState(cases[0].state);
  const [expanded, setExpanded] = useState<string | null>(null);

  const activeCase = cases.find(c => c.state === activeState)!;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">ELIGIBILITY TRACKER</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-1">State court injunctions granting extra eligibility to college basketball players</p>
      </div>

      {/* State tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {cases.map(c => (
          <button key={c.state} onClick={() => { setActiveState(c.state); setExpanded(null); }}
            className={`font-condensed font-bold text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all ${activeState === c.state ? 'bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
            {c.state}
          </button>
        ))}
      </div>

      {/* Case info */}
      <div className="bg-[#111] border border-[#1A1A1A] rounded-xl px-5 py-4 mb-6 flex flex-wrap gap-6">
        <div>
          <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Ruling Date</p>
          <p className="text-white font-condensed font-bold text-sm">{activeCase.date}</p>
        </div>
        {activeCase.judge && (
          <div>
            <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Judge</p>
            <p className="text-white font-condensed font-bold text-sm">{activeCase.judge}</p>
          </div>
        )}
        <div>
          <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Attorney</p>
          <p className="text-white font-condensed font-bold text-sm">{activeCase.attorney}</p>
        </div>
        <div>
          <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Players</p>
          <p className="text-white font-condensed font-bold text-sm">{activeCase.players} total ({activeCase.players_list.length} men's basketball)</p>
        </div>
      </div>

      {/* Players list */}
      <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden">
        {activeCase.players_list.map((player, i) => (
          <div key={player.name} className={`border-b border-[#1A1A1A] last:border-0 ${expanded === player.name ? 'bg-[#161616]' : ''}`}>
            <button onClick={() => setExpanded(expanded === player.name ? null : player.name)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#161616] transition-colors text-left">
              <span className="font-display text-[#F5A623] text-lg w-6 flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-condensed font-bold text-white text-base">{player.name}</span>
                  {player.committedTo && (
                    <span className="bg-green-900/40 text-green-400 border border-green-800/40 font-condensed font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full">
                      → {player.committedTo}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[#F5A623] font-condensed text-xs font-bold">{player.pos}</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-[#8A8A8A] font-condensed text-xs">
                    {player.seasons.find(s => s.year === 'Career')
                      ? `${player.seasons.find(s => s.year === 'Career')!.pts.toFixed(1)} PPG · ${player.seasons.find(s => s.year === 'Career')!.reb.toFixed(1)} RPG · ${player.seasons.find(s => s.year === 'Career')!.ast.toFixed(1)} APG (career)`
                      : ''}
                  </span>
                </div>
              </div>
              <span className={`text-[#555] text-sm flex-shrink-0 transition-transform duration-200 ${expanded === player.name ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {expanded === player.name && (
              <div className="px-5 pb-5 pt-1 border-t border-[#0A0A0A]">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-condensed">
                    <thead>
                      <tr className="text-[#555] uppercase tracking-widest">
                        <th className="text-left py-2 pr-4">Season</th>
                        <th className="text-left py-2 pr-4">Team</th>
                        <th className="text-right py-2 pr-3">GP</th>
                        <th className="text-right py-2 pr-3">MIN</th>
                        <th className="text-right py-2 pr-3">PTS</th>
                        <th className="text-right py-2 pr-3">REB</th>
                        <th className="text-right py-2 pr-3">AST</th>
                        <th className="text-right py-2 pr-3">STL</th>
                        <th className="text-right py-2 pr-3">BLK</th>
                        <th className="text-right py-2 pr-3">TO</th>
                        <th className="text-right py-2 pr-3">FG%</th>
                        <th className="text-right py-2 pr-3">3P%</th>
                        <th className="text-right py-2">FT%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {player.seasons.map((s, si) => (
                        <tr key={si} className={`border-t border-[#1A1A1A] ${s.year === 'Career' ? 'text-[#F5A623] font-bold' : 'text-[#C4C4C4]'}`}>
                          <td className="py-2 pr-4">{s.year}</td>
                          <td className="py-2 pr-4 text-[#8A8A8A]">{s.team}</td>
                          <td className="py-2 pr-3 text-right">{s.gp}</td>
                          <td className="py-2 pr-3 text-right">{s.min.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.pts.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.reb.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.ast.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.stl.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.blk.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.to.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.fgPct.toFixed(1)}</td>
                          <td className="py-2 pr-3 text-right">{s.threePct.toFixed(1)}</td>
                          <td className="py-2 text-right">{s.ftPct.toFixed(1)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
