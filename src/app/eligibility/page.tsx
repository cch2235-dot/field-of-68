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
  state: string; case: string; date: string; players: number;
  status: string; statusNote: string;
  judge: string | null; attorney: string; players_list: Player[];
};

const cases = eligibilityData.cases as Case[];

function StatusBadge({ status, note }: { status: string; note: string }) {
  const eligible = status === 'ELIGIBLE';
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${eligible ? 'bg-green-900/20 border-green-800/40' : 'bg-red-900/20 border-red-800/40'}`}>
      <span className={`text-lg ${eligible ? 'text-green-400' : 'text-red-400'}`}>{eligible ? '✅' : '❌'}</span>
      <div>
        <div className={`font-condensed font-bold text-xs tracking-widest uppercase ${eligible ? 'text-green-400' : 'text-red-400'}`}>
          {eligible ? 'ACTIVE COURT RELIEF' : 'RELIEF STAYED/DENIED'}
        </div>
        <div className="text-[#555] font-condensed text-xs">{note}</div>
      </div>
    </div>
  );
}

export default function EligibilityPage() {
  const [activeState, setActiveState] = useState(cases[0].state);
  const [expanded, setExpanded] = useState<string | null>(null);

  const activeCase = cases.find(c => c.state === activeState)!;
  const eligible = cases.filter(c => c.status === 'ELIGIBLE');
  const ineligible = cases.filter(c => c.status === 'INELIGIBLE');

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">ELIGIBILITY TRACKER</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-1">State court injunctions granting extra eligibility to college basketball players</p>
        <p className="text-[#555] font-condensed text-sm mt-1">Last updated: September 4, 2026</p>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-green-900/10 border border-green-800/30 rounded-xl p-4">
          <div className="text-green-400 font-condensed font-bold text-xs tracking-widest uppercase mb-2">✅ ACTIVE COURT RELIEF ({eligible.length} states)</div>
          <div className="flex flex-wrap gap-2">
            {eligible.map(c => (
              <button key={c.state} onClick={() => { setActiveState(c.state); setExpanded(null); }}
                className={`font-condensed text-sm px-3 py-1 rounded-lg border transition-all ${activeState === c.state ? 'bg-green-900/40 border-green-600 text-green-300' : 'bg-green-900/20 border-green-900/40 text-green-500 hover:border-green-600'}`}>
                {c.state}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-red-900/10 border border-red-800/30 rounded-xl p-4">
          <div className="text-red-400 font-condensed font-bold text-xs tracking-widest uppercase mb-2">❌ RELIEF STAYED/DENIED ({ineligible.length} states)</div>
          <div className="flex flex-wrap gap-2">
            {ineligible.map(c => (
              <button key={c.state} onClick={() => { setActiveState(c.state); setExpanded(null); }}
                className={`font-condensed text-sm px-3 py-1 rounded-lg border transition-all ${activeState === c.state ? 'bg-red-900/40 border-red-600 text-red-300' : 'bg-red-900/20 border-red-900/40 text-red-500 hover:border-red-600'}`}>
                {c.state}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All state tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {cases.map(c => (
          <button key={c.state} onClick={() => { setActiveState(c.state); setExpanded(null); }}
            className={`font-condensed font-bold text-sm tracking-wider uppercase px-4 py-2.5 rounded-lg border transition-all ${activeState === c.state ? 'bg-[#F5A623]/10 border-[#F5A623] text-[#F5A623]' : 'bg-[#111] border-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
            {c.state}
            <span className={`ml-1.5 text-[9px] ${c.status === 'ELIGIBLE' ? 'text-green-500' : 'text-red-500'}`}>
              {c.status === 'ELIGIBLE' ? '●' : '●'}
            </span>
          </button>
        ))}
      </div>

      {/* Case info */}
      <div className="bg-[#111] border border-[#1A1A1A] rounded-xl px-5 py-4 mb-4">
        <div className="flex flex-wrap items-start gap-4 mb-4">
          <StatusBadge status={activeCase.status} note={activeCase.statusNote} />
        </div>
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Case</p>
            <p className="text-white font-condensed font-bold text-sm">{activeCase.case}</p>
          </div>
          <div>
            <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Date</p>
            <p className="text-white font-condensed font-bold text-sm">{activeCase.date}</p>
          </div>
          {activeCase.judge && (
            <div>
              <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Judge</p>
              <p className="text-white font-condensed font-bold text-sm">{activeCase.judge}</p>
            </div>
          )}
          {activeCase.attorney && (
            <div>
              <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Attorney</p>
              <p className="text-white font-condensed font-bold text-sm">{activeCase.attorney}</p>
            </div>
          )}
          <div>
            <p className="text-[#555] font-condensed text-xs uppercase tracking-widest mb-1">Players</p>
            <p className="text-white font-condensed font-bold text-sm">{activeCase.players} total ({activeCase.players_list.length} men's basketball)</p>
          </div>
        </div>
      </div>

      {/* Players list */}
      <div className="bg-[#111] border border-[#1A1A1A] rounded-2xl overflow-hidden">
        {activeCase.players_list.length === 0 ? (
          <div className="px-5 py-8 text-center text-[#555] font-condensed">No player details available</div>
        ) : (
          activeCase.players_list.map((player, i) => (
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
                    {(() => {
                        const recent = player.seasons.find(s => s.year === '2025-26') || player.seasons[0];
                        if (!recent) return null;
                        return (
                          <>
                            <span className="text-[#555]">·</span>
                            <span className="text-[#8A8A8A] font-condensed text-xs">
                              {`${recent.pts.toFixed(1)} PPG · ${recent.reb.toFixed(1)} RPG · ${recent.ast.toFixed(1)} APG (${recent.year})`}
                            </span>
                          </>
                        );
                      })()}
                  </div>
                </div>
                {player.seasons.length > 0 && (
                  <span className={`text-[#555] text-sm flex-shrink-0 transition-transform duration-200 ${expanded === player.name ? 'rotate-180' : ''}`}>▼</span>
                )}
              </button>

              {expanded === player.name && player.seasons.length > 0 && (
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
          ))
        )}
      </div>
    </div>
  );
}
