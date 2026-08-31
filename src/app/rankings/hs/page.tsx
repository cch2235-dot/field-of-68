'use client';
import { useState } from 'react';
import hsData from '../../../../data/hs-rankings.json';

type Prospect = {
  rank: number;
  name: string;
  stars: number;
  pos: string;
  height: string;
  weight: number;
  school: string;
  location: string;
  committed?: string;
  commitDate?: string;
  aau?: string;
  articleUrl?: string;
  visits?: { school: string; date: string }[];
  offers: string[];
};

const prospects = hsData.prospects as unknown as Prospect[];

export default function HSRankingsPage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [posFilter, setPosFilter] = useState('all');

  const positions = ['all', 'PG', 'CG', 'SF', 'PF', 'C'];

  const filtered = posFilter === 'all'
    ? prospects
    : prospects.filter(p => p.pos === posFilter);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 bg-[#F5A623] rounded-full" />
          <h1 className="font-display text-white text-4xl md:text-5xl tracking-wider">HS RANKINGS</h1>
        </div>
        <p className="text-[#8A8A8A] font-condensed text-lg mt-1">Field of 68 Top 68 — Class of 2027</p>
        <p className="text-[#555] font-condensed text-sm mt-1">Recruiting information per 247Sports</p>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {positions.map(p => (
          <button key={p} onClick={() => setPosFilter(p)}
            className={`font-condensed font-bold text-xs tracking-widest uppercase px-4 py-2.5 rounded-full transition-all ${posFilter === p ? 'bg-[#F5A623] text-black' : 'bg-[#111] border border-[#1A1A1A] text-[#8A8A8A] hover:text-white'}`}>
            {p === 'all' ? 'All Positions' : p}
          </button>
        ))}
      </div>

      <p className="text-[#555] font-condensed text-sm mb-4">{filtered.length} prospects</p>

      <div className="bg-[#111] rounded-2xl border border-[#1A1A1A] overflow-hidden">
        {filtered.map((p) => (
          <div key={p.rank} className={`border-b border-[#1A1A1A] last:border-0 ${expanded === p.rank ? 'bg-[#161616]' : ''}`}>
            <button
              onClick={() => setExpanded(expanded === p.rank ? null : p.rank)}
              className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#161616] transition-colors text-left">
              <span className="font-display text-[#F5A623] text-lg w-7 flex-shrink-0">{p.rank}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  {p.articleUrl ? (
                    <a href={p.articleUrl} target="_blank" rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      className="font-condensed font-bold text-white text-base hover:text-[#F5A623] transition-colors underline decoration-[#F5A623]/30 hover:decoration-[#F5A623]">
                      {p.name}
                    </a>
                  ) : (
                    <span className="font-condensed font-bold text-white text-base">{p.name}</span>
                  )}
                  {p.committed && (
                    <span className="bg-green-900/40 text-green-400 border border-green-800/40 font-condensed font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full">
                      Committed — {p.committed}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="text-[#F5A623] font-condensed text-xs font-bold">{p.pos}</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-[#8A8A8A] font-condensed text-xs">{p.height}, {p.weight} lbs</span>
                  <span className="text-[#555]">·</span>
                  <span className="text-[#8A8A8A] font-condensed text-xs">{p.school} — {p.location}</span>
                  {p.aau && (
                    <>
                      <span className="text-[#555]">·</span>
                      <span className="text-[#F5A623]/70 font-condensed text-xs">{p.aau}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                {Array.from({ length: p.stars }).map((_, i) => (
                  <span key={i} className="text-[#F5A623] text-sm">★</span>
                ))}
              </div>
              {!p.committed && (
                <span className={`text-[#555] text-sm flex-shrink-0 transition-transform duration-200 ${expanded === p.rank ? 'rotate-180' : ''}`}>▼</span>
              )}
            </button>

            {expanded === p.rank && !p.committed && (
              <div className="px-5 pb-5 pt-1 border-t border-[#0A0A0A]">
                <p className="text-[#555] font-condensed text-[10px] uppercase tracking-widest mb-3">Recruiting Info — per 247Sports</p>

                {p.visits && p.visits.length > 0 && (
                  <div className="mb-4">
                    <p className="text-[#F5A623] font-condensed font-bold text-xs uppercase tracking-widest mb-2">Scheduled Visits</p>
                    <div className="flex flex-wrap gap-2">
                      {p.visits.map(v => (
                        <span key={v.school} className="bg-[#F5A623]/10 border border-[#F5A623]/20 text-[#F5A623] font-condensed text-xs px-3 py-1 rounded-full">
                          {v.school} — {v.date}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {p.offers && p.offers.length > 0 && (
                  <div>
                    <p className="text-[#8A8A8A] font-condensed font-bold text-xs uppercase tracking-widest mb-2">Offers</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.offers.map(s => (
                        <span key={s} className="bg-[#1A1A1A] text-[#8A8A8A] font-condensed text-xs px-2.5 py-1 rounded-full">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
