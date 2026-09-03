'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import teamsData from "../../../data/teams.json";

const ALL_TEAMS: any[] = teamsData as any[];

const SLOTS = [
  { id: "G1",  label: "G",     color: "#3b82f6" },
  { id: "G2",  label: "G",     color: "#3b82f6" },
  { id: "F1",  label: "F",     color: "#22c55e" },
  { id: "F2",  label: "F",     color: "#22c55e" },
  { id: "C",   label: "C",     color: "#a855f7" },
  { id: "BEN", label: "BENCH", color: "#F5A623" },
];

const CARD_W = 104;
const LAND_IDX = 18;
const ABBR: Record<string,string> = {"Illinois":"ILL","Indiana":"IND","Iowa":"IOWA","Maryland":"MD","Michigan":"MICH","Michigan State":"MSU","Minnesota":"MINN","Nebraska":"NEB","Northwestern":"NU","Ohio State":"OSU","Oregon":"ORE","Penn State":"PSU","Purdue":"PUR","Rutgers":"RUT","UCLA":"UCLA","USC":"USC","Washington":"UW","Wisconsin":"WIS","Arizona":"ARIZ","Arizona State":"ASU","Baylor":"BAY","BYU":"BYU","Cincinnati":"CIN","Colorado":"COL","Houston":"HOU","Iowa State":"ISU","Kansas":"KU","Kansas State":"KSU","Oklahoma State":"OKST","TCU":"TCU","Texas Tech":"TTU","UCF":"UCF","Utah":"UTAH","West Virginia":"WVU","Alabama":"ALA","Arkansas":"ARK","Auburn":"AUB","Florida":"FLA","Georgia":"UGA","Kentucky":"UK","LSU":"LSU","Mississippi State":"MSST","Missouri":"MIZ","Ole Miss":"MISS","Oklahoma":"OU","South Carolina":"SC","Tennessee":"TENN","Texas":"TEX","Texas A&M":"TAMU","Vanderbilt":"VAN","Butler":"BUT","Connecticut":"UCONN","Creighton":"CRE","DePaul":"DEP","Georgetown":"GTOWN","Marquette":"MU","Providence":"PROV","Seton Hall":"SHU","St. John's":"STJ","Villanova":"NOVA","Xavier":"XAV","Boston College":"BC","California":"CAL","Clemson":"CLEM","Duke":"DUKE","Florida State":"FSU","Georgia Tech":"GT","Louisville":"LOU","Miami":"MIA","NC State":"NCST","North Carolina":"UNC","Notre Dame":"ND","Pittsburgh":"PITT","Stanford":"STAN","Syracuse":"SYR","Virginia":"UVA","Virginia Tech":"VT","Wake Forest":"WAKE","SMU":"SMU"};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function espnLogo(id: number) {
  return `https://a.espncdn.com/i/teamlogos/ncaa/500/${id}.png`;
}

function rateSquad(squad: any[]): { score: number; breakdown: any; verdict: string; color: string } {
  const players = squad.filter(Boolean);
  if (players.length === 0) return { score: 0, breakdown: {}, verdict: "", color: "#555" };
  const withStats = players.filter((p: any) => p.hasStats);

  // Combined team totals — 40-0 criteria: 110 PPG / 35 RPG / 20 APG
  const totalPpg = Math.round(withStats.reduce((s: number, p: any) => s + (p.ppg || 0), 0) * 10) / 10;
  const totalRpg = Math.round(withStats.reduce((s: number, p: any) => s + (p.rpg || 0), 0) * 10) / 10;
  const totalApg = Math.round(withStats.reduce((s: number, p: any) => s + (p.apg || 0), 0) * 10) / 10;

  const ppgScore = Math.min(50, Math.round((totalPpg / 110) * 50));
  const rpgScore = Math.min(25, Math.round((totalRpg / 35) * 25));
  const apgScore = Math.min(25, Math.round((totalApg / 20) * 25));
  const noStatsPenalty = (players.length - withStats.length) * 4;

  const score = Math.min(100, Math.max(0, ppgScore + rpgScore + apgScore - noStatsPenalty));

  const hits110ppg = totalPpg >= 110;
  const hits35rpg = totalRpg >= 35;
  const hits20apg = totalApg >= 20;
  const perfect = hits110ppg && hits35rpg && hits20apg;

  let verdict = "", color = "";
  if (perfect) { verdict = "40-0 WORTHY"; color = "#22c55e"; }
  else if (score >= 80) { verdict = "TOURNAMENT THREAT"; color = "#86efac"; }
  else if (score >= 65) { verdict = "BUBBLE TEAM"; color = "#F5A623"; }
  else if (score >= 45) { verdict = "LONG SHOT"; color = "#f97316"; }
  else { verdict = "NEEDS WORK"; color = "#ef4444"; }

  return {
    score: perfect ? 100 : score,
    breakdown: { totalPpg, totalRpg, totalApg, hits110ppg, hits35rpg, hits20apg, noStatsPenalty },
    verdict,
    color,
  };
}

function TeamLogo({ team, size = 72 }: { team: any; size?: number }) {
  const [err, setErr] = useState(false);
  const abbr = ABBR[team.name] || team.name.slice(0, 5).toUpperCase();
  if (!team.espnId || err) {
    return (
      <div style={{ width: size, height: size, borderRadius: 8, background: "#0D1117", border: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: size * 0.2, color: "#F5A623", letterSpacing: 1, textAlign: "center", lineHeight: 1.1, padding: 4 }}>{abbr}</span>
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: 8, background: "#0D1117", border: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 6, flexShrink: 0 }}>
      <img src={espnLogo(team.espnId)} alt={team.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={() => setErr(true)} />
    </div>
  );
}

function PlayerCard({ player, team, slotIdx, onRemove, onDragStart, onDragOver, onDrop, isDragOver }: any) {
  const slot = SLOTS[slotIdx];
  return (
    <div draggable onDragStart={() => onDragStart(slotIdx)}
      onDragOver={(e: any) => { e.preventDefault(); onDragOver(slotIdx); }}
      onDrop={() => onDrop(slotIdx)}
      style={{ background: isDragOver ? "#1A1A1A" : "#111", border: `1px solid ${isDragOver ? "#F5A623" : "#222"}`, borderRadius: 10, padding: "10px 12px", cursor: "grab", userSelect: "none" as const, transition: "border-color 0.15s", opacity: isDragOver ? 0.6 : 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
            <span style={{ color: "#333", fontSize: 10 }}>⠿</span>
            <span style={{ background: slot?.color || "#F5A623", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "1px 5px", borderRadius: 3 }}>{slot?.label}</span>
            {player.pos && <span style={{ background: "#222", color: "#666", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 5px", borderRadius: 3 }}>{player.pos}</span>}
          </div>
          <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1.5, lineHeight: 1, color: "white" }}>{player.name}</div>
          <div style={{ color: "#444", fontSize: 11, marginTop: 1 }}>{team}</div>
        </div>
        <button onClick={onRemove} style={{ background: "none", border: "1px solid #1A1A1A", color: "#333", cursor: "pointer", fontSize: 11, padding: "2px 6px", borderRadius: 4, lineHeight: 1, flexShrink: 0, marginLeft: 8 }}>✕</button>
      </div>
      {player.hasStats ? (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {([["PPG", player.ppg], ["RPG", player.rpg], ["APG", player.apg]] as [string, number][]).map(([l, v]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#F5A623", lineHeight: 1 }}>{v}</div>
              <div style={{ color: "#444", fontSize: 9, letterSpacing: 1 }}>{l}</div>
            </div>
          ))}
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
              <span style={{ color: "#333", fontSize: 9 }}>FG%</span>
              <span style={{ color: "#555", fontSize: 9 }}>{player.fgp}%</span>
            </div>
            <div style={{ height: 3, background: "#1A1A1A", borderRadius: 2 }}>
              <div style={{ height: "100%", width: `${Math.min((player.fgp / 75) * 100, 100)}%`, background: "#F5A623", borderRadius: 2 }} />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ color: "#333", fontSize: 11 }}>{player.note || "No prior stats"}</div>
      )}
    </div>
  );
}

function RatingBar({ label, value, max, color = "#F5A623" }: any) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ color: "#555", fontSize: 11, letterSpacing: 1, fontFamily: "'Bebas Neue',sans-serif" }}>{label}</span>
        <span style={{ color: "#888", fontSize: 11 }}>{value}/{max}</span>
      </div>
      <div style={{ height: 4, background: "#1A1A1A", borderRadius: 2 }}>
        <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 2, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("intro");
  const [teamPool, setTeamPool] = useState<any[]>([]);
  const [currentTeam, setCurrentTeam] = useState<any>(null);
  const [squad, setSquad] = useState<(any | null)[]>(Array(6).fill(null));
  const [spinning, setSpinning] = useState(false);
  const [wheelItems, setWheelItems] = useState<any[]>([]);
  const [wheelPx, setWheelPx] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [simStep, setSimStep] = useState(0);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [rating, setRating] = useState<any>(null);
  const animRef = useRef<number>(0);
  const pickedRef = useRef<any>(null);

  const filledCount = squad.filter(Boolean).length;
  const nextSlotIdx = squad.findIndex(s => !s);

  const init = useCallback(() => {
    // Shuffle all teams into a queue - guaranteed no repeats across all 6 picks
    setTeamPool(shuffle(ALL_TEAMS));
    setSquad(Array(6).fill(null));
    setCurrentTeam(null);
    setResult(null);
    setRating(null);
    setSpinning(false);
    setWheelItems([]);
    setWheelPx(0);
  }, []);

  useEffect(() => { init(); }, [init]);

  const spinWheel = () => {
    if (spinning || teamPool.length === 0) return;
    setSpinning(true);
    const picked = teamPool[0];
    pickedRef.current = picked;
    // Build wheel with no adjacent duplicates
    const items: any[] = [];
    for (let i = 0; i < 36; i++) {
      if (i === LAND_IDX) {
        items.push(picked);
      } else {
        let candidate = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
        // Retry if same as previous item
        let tries = 0;
        while (tries < 5 && items.length > 0 && candidate.name === items[items.length - 1].name) {
          candidate = ALL_TEAMS[Math.floor(Math.random() * ALL_TEAMS.length)];
          tries++;
        }
        items.push(candidate);
      }
    }
    setWheelItems(items);
    setWheelPx(0);
    const targetPx = 8 + LAND_IDX * (CARD_W + 8);
    const duration = 4500;
    const start = performance.now();
    cancelAnimationFrame(animRef.current);
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.7 ? (t / 0.7) * 0.85 : 0.85 + ((t - 0.7) / 0.3) * 0.15;
      const smoothEase = 1 - Math.pow(1 - ease, 3);
      setWheelPx(smoothEase * targetPx);
      if (t < 1) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setWheelPx(targetPx);
        setSpinning(false);
        setCurrentTeam(pickedRef.current);
        setTeamPool(prev => {
          // Remove picked team — never refill to avoid duplicates
          return prev.filter((t: any) => t.name !== pickedRef.current?.name);
        });
        setPhase("picking");
      }
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const pickPlayer = (player: any) => {
    const idx = nextSlotIdx >= 0 ? nextSlotIdx : 0;
    const newSquad = [...squad];
    newSquad[idx] = { ...player, team: currentTeam.name, conf: currentTeam.conf };
    setSquad(newSquad);
    setCurrentTeam(null);
    if (newSquad.filter(Boolean).length >= 6) {
      setRating(rateSquad(newSquad));
      setPhase("done");
    } else {
      setPhase("ready");
    }
  };

  const removePlayer = (idx: number) => {
    const p = squad[idx];
    if (!p) return;
    const team = ALL_TEAMS.find((t: any) => t.name === p.team);
    if (team) setTeamPool(prev => [team, ...prev]);
    const newSquad = [...squad];
    newSquad[idx] = null;
    setSquad(newSquad);
    setRating(null);
    if (phase === "done") setPhase("ready");
  };

  const onDragStart = (idx: number) => setDragIdx(idx);
  const onDragOver = (idx: number) => setDragOver(idx);
  const onDrop = (idx: number) => {
    if (dragIdx === null || dragIdx === idx) { setDragIdx(null); setDragOver(null); return; }
    const s = [...squad];
    [s[dragIdx], s[idx]] = [s[idx], s[dragIdx]];
    setSquad(s);
    setDragIdx(null);
    setDragOver(null);
    setRating(rateSquad(s));
  };

  const SIM_STEPS = ["Scheduling...","Regular season...","Conference tournaments...","Selection Sunday...","Simulating March..."];

  const simulate = async () => {
    setPhase("simulating");
    setSimStep(0);
    let step = 0;
    const iv = setInterval(() => { step++; if (step < SIM_STEPS.length) setSimStep(step); }, 900);
    const r = rating || rateSquad(squad);
    const squadStr = squad.filter(Boolean).map((p: any, i: number) =>
      `${SLOTS[i].label}: ${p.name} (${p.pos || "G"}, ${p.team}) — ` +
      (p.hasStats ? `${p.ppg} PPG, ${p.rpg} RPG, ${p.apg} APG, FG%: ${p.fgp}` : "No prior stats")
    ).join("\n");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1200,
          messages: [{ role: "user", content: `You are a sharp college basketball analyst. Simulate this squad's season. Squad rating: ${r.score}/100 (${r.verdict}). Combined: ${r.breakdown.totalPpg} PPG / ${r.breakdown.totalRpg} RPG / ${r.breakdown.totalApg} APG (40-0 requires 110 PPG / 35 RPG / 20 APG).\\n\\nSquad:\\n${squadStr}\\n\\nBase the RECORD directly on how close they hit the parameters. Perfect thresholds = 40-0. Well below = .500 or worse. Include realistic scores for every tournament game. Mention players by name.\\n\\nRespond ONLY in JSON (no markdown):\\n{"record":"24-11","madetournament":true,"seed":7,"tournamentRun":[{"round":"Round of 64","opponent":"Duke Blue Devils","result":"W","score":"82-74"},{"round":"Round of 32","opponent":"Kansas Jayhawks","result":"L","score":"68-71"}],"exitRound":"Round of 32","mvp":"Player Name","headline":"ALL CAPS HEADLINE","analysis":"3-4 sentences...","grade":"B+"}}` }]
        })
      });
      clearInterval(iv);
      const data = await res.json();
      const text = data.content.map((c: any) => c.text || "").join("");
      setResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
      setPhase("result");
    } catch {
      clearInterval(iv);
      setResult({ record: "18-17", madetournament: false, seed: null, tournamentRun: [], mvp: squad.filter(Boolean)[0]?.name, headline: "A SEASON TO FORGET", analysis: "This squad never found its footing.", grade: "C-" });
      setPhase("result");
    }
  };

  const reset = () => { init(); setPhase("intro"); };
  const gc = (g: string) => !g ? "#F5A623" : g.startsWith("A") ? "#22c55e" : g.startsWith("B") ? "#F5A623" : g.startsWith("C") ? "#f97316" : "#ef4444";

  const SlotTracker = () => (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginBottom: 20 }}>
      {SLOTS.map((slot, i) => {
        const p = squad[i];
        const isNext = i === nextSlotIdx && phase !== "done";
        return (
          <div key={slot.id} style={{ flex: 1, maxWidth: 130, textAlign: "center" }}>
            <div style={{ height: 4, borderRadius: 2, marginBottom: 5, background: p ? slot.color : isNext ? `${slot.color}44` : "#1A1A1A", transition: "background 0.3s" }} />
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 10, letterSpacing: 1, color: p ? slot.color : isNext ? `${slot.color}88` : "#2A2A2A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
              {p ? p.name.split(" ").slice(-1)[0].toUpperCase() : slot.label}
            </div>
          </div>
        );
      })}
    </div>
  );

  const SquadGrid = ({ showRemove }: { showRemove: boolean }) => (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
      {squad.map((p, i) => p ? (
        <div key={i} onDragOver={e => { e.preventDefault(); onDragOver(i); }} onDrop={() => onDrop(i)} style={{ opacity: dragOver === i && dragIdx !== i ? 0.5 : 1, transition: "opacity 0.15s" }}>
          <PlayerCard player={p} team={p.team} slotIdx={i} onRemove={() => showRemove && removePlayer(i)} onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} isDragOver={dragOver === i && dragIdx !== i} />
        </div>
      ) : (
        <div key={i} onDragOver={e => { e.preventDefault(); onDragOver(i); }} onDrop={() => onDrop(i)} style={{ border: "1px dashed #1A1A1A", borderRadius: 10, padding: "10px 12px", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center", opacity: dragOver === i ? 0.6 : 1 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, color: "#2A2A2A" }}>{SLOTS[i].label}</div>
            <div style={{ fontSize: 10, color: "#1A1A1A" }}>EMPTY</div>
          </div>
        </div>
      ))}
    </div>
  );

  const WheelStrip = () => (
    <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "14px 0 10px", marginBottom: 14, overflow: "hidden", position: "relative" }}>
      <div style={{ textAlign: "center", color: "#444", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>
        {spinning ? "SPINNING..." : `SPIN FOR PICK ${filledCount + 1}`}
      </div>
      <div style={{ position: "absolute", left: "50%", top: 36, transform: "translateX(-50%)", zIndex: 4, width: 0, height: 0, borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "9px solid #F5A623" }} />
      <div style={{ position: "absolute", left: "50%", top: 45, bottom: 8, width: 2, background: "rgba(245,166,35,0.15)", transform: "translateX(-50%)", zIndex: 3 }} />
      <div style={{ position: "relative", height: CARD_W + 22, overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 8, paddingLeft: 8, position: "absolute", left: `calc(50% - ${wheelPx + CARD_W / 2}px)`, top: 0 }}>
          {(wheelItems.length > 0 ? wheelItems : shuffle(ALL_TEAMS).slice(0, 13)).map((t: any, i: number) => (
            <div key={i} style={{ flexShrink: 0, width: CARD_W, textAlign: "center" }}>
              <TeamLogo team={t} size={CARD_W - 8} />
              <div style={{ fontSize: 9, color: "#444", fontFamily: "'Bebas Neue',sans-serif", marginTop: 3 }}>{ABBR[t.name] || t.name.slice(0, 6)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "white", fontFamily: "'Barlow Condensed', sans-serif", paddingBottom: 80 }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 16px" }}>

        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <div style={{ display: "inline-block", background: "#F5A623", borderRadius: 5, padding: "2px 10px", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 3, color: "#0A0A0A" }}>FIELD OF 68</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.8rem,7vw,5rem)", letterSpacing: 4, margin: "0 0 4px", lineHeight: 1 }}>THE 40-0 CHALLENGE</h1>
          <p style={{ color: "#555", fontSize: 14, margin: 0 }}>Spin for a team · Pick any player · Build your squad · Go undefeated</p>
        </div>

        {phase === "intro" && (
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.5rem", marginBottom: "1.2rem" }}>
              {[["1","The wheel spins to a random","major conference team.",""],["2","Pick","any player from their full roster.",""],["3","Build:","G · G · F · F · C · Bench.","Pick anyone — drag to rearrange."],["4","Your squad gets a","Squad Rating (0-100)","based on star power, scoring, efficiency, and balance."],["5","We simulate the full season then","March Madness.","Can you go 40-0?"]].map(([n,a,b,c]) => (
                <div key={n} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <div style={{ background: "#F5A623", color: "#0A0A0A", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, flexShrink: 0 }}>{n}</div>
                  <p style={{ margin: 0, color: "#C4C4C4", fontSize: 14, lineHeight: 1.5 }}>{a} <strong style={{ color: "#F5A623" }}>{b}</strong> {c}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid #1A1A1A", paddingTop: 12, color: "#444", fontSize: 12, textAlign: "center" }}>{ALL_TEAMS.length} teams · Full rosters · Real 2025-26 stats</div>
            </div>
            <button onClick={() => setPhase("ready")} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, cursor: "pointer" }}>START THE WHEEL</button>
          </div>
        )}

        {phase === "ready" && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SlotTracker />
            {squad.some(Boolean) && (<div style={{ marginBottom: 14 }}><div style={{ color: "#444", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>YOUR PICKS — {filledCount}/6 · DRAG TO REORDER</div><SquadGrid showRemove={true} /></div>)}
            <WheelStrip />
            <button onClick={spinWheel} disabled={spinning} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, cursor: spinning ? "not-allowed" : "pointer", opacity: spinning ? 0.5 : 1 }}>
              🎰 SPIN FOR PICK {filledCount + 1}
            </button>
          </div>
        )}

        {phase === "spinning" && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SlotTracker />
            <WheelStrip />
            <button disabled style={{ width: "100%", background: "#222", color: "#444", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, cursor: "not-allowed" }}>SPINNING...</button>
          </div>
        )}

        {phase === "picking" && currentTeam && (() => {
          const sorted = [...currentTeam.players].sort((a: any, b: any) => (b.ppg || 0) - (a.ppg || 0));
          return (
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <SlotTracker />
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ color: "#444", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>PICK {filledCount + 1} OF 6 — {SLOTS[nextSlotIdx]?.label} SLOT</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
                  <TeamLogo team={currentTeam} size={56} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,4vw,2.6rem)", letterSpacing: 3, lineHeight: 1 }}>{currentTeam.name.toUpperCase()}</div>
                    <div style={{ color: "#F5A623", fontSize: 12, letterSpacing: 2 }}>{currentTeam.conf}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {sorted.map((player: any) => (
                  <button key={player.name} onClick={() => pickPlayer(player)}
                    style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 8, padding: "12px", cursor: "pointer", color: "white", textAlign: "left", width: "100%", transition: "all 0.12s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#F5A623"; (e.currentTarget as HTMLElement).style.background = "#161616"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A"; (e.currentTarget as HTMLElement).style.background = "#111"; }}>
                    <div style={{ marginBottom: 4 }}>{player.pos && <span style={{ background: "#222", color: "#888", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "1px 5px", borderRadius: 3 }}>{player.pos}</span>}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1, lineHeight: 1.1, marginBottom: 3 }}>{player.name}</div>
                    <div style={{ color: "#444", fontSize: 10, marginBottom: 6 }}>{player.height}{player.year ? ` · ${player.year}` : ""}</div>
                    {player.hasStats ? (
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" as const }}>
                        {([["PPG", player.ppg],["RPG", player.rpg],["APG", player.apg],["FG%", player.fgp+"%"]] as [string,any][]).map(([l,v]) => (
                          <span key={l}><span style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15 }}>{v}</span><span style={{ color: "#444", fontSize: 9, marginLeft: 2 }}>{l}</span></span>
                        ))}
                      </div>
                    ) : (<div style={{ color: "#333", fontSize: 11 }}>{player.note || "No prior stats"}</div>)}
                  </button>
                ))}
              </div>
            </div>
          );
        })()}

        {phase === "done" && rating && (
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <SlotTracker />
            <div style={{ marginBottom: 14 }}><div style={{ color: "#444", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>YOUR SQUAD · DRAG TO REORDER</div><SquadGrid showRemove={true} /></div>
            <div style={{ background: "#111", border: `2px solid ${rating.color}`, borderRadius: 14, padding: "1.2rem", marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div><div style={{ color: "#444", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2 }}>SQUAD RATING</div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2, color: rating.color, marginTop: 2 }}>{rating.verdict}</div></div>
                <div style={{ textAlign: "right" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 52, color: rating.color, lineHeight: 1 }}>{rating.score}</div><div style={{ color: "#444", fontSize: 11, letterSpacing: 1 }}>OUT OF 100</div></div>
              </div>
              <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                {[["PPG", rating.breakdown.totalPpg, 110], ["RPG", rating.breakdown.totalRpg, 35], ["APG", rating.breakdown.totalApg, 20]].map(([l, v, t]: any) => (
                  <div key={l} style={{ textAlign: "center", flex: 1, background: "#0D0D0D", borderRadius: 8, padding: "10px 6px" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: v >= t ? "#22c55e" : rating.color, lineHeight: 1 }}>{v}</div>
                    <div style={{ color: "#444", fontSize: 10, letterSpacing: 1 }}>TEAM {l}</div>
                  </div>
                ))}
              </div>
              </div>
            </div>
            <button onClick={simulate} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, cursor: "pointer" }}>🏆 SIMULATE THE SEASON</button>
          </div>
        )}

        {phase === "simulating" && (
          <div style={{ textAlign: "center", padding: "5rem 0", maxWidth: 400, margin: "0 auto" }}>
            {SIM_STEPS.map((step, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center", marginBottom: 12, opacity: simStep >= i ? 1 : 0.2, transition: "opacity 0.4s" }}>
                <span style={{ color: simStep > i ? "#22c55e" : simStep === i ? "#F5A623" : "#333", fontSize: 16 }}>{simStep > i ? "✓" : "○"}</span>
                <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 17, letterSpacing: 2, color: simStep >= i ? "#C4C4C4" : "#333" }}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {phase === "result" && result && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            {rating && (<div style={{ display: "flex", gap: 8, marginBottom: 14, background: "#111", border: `1px solid ${rating.color}33`, borderRadius: 10, padding: "10px 14px", alignItems: "center" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 32, color: rating.color, lineHeight: 1 }}>{rating.score}</div><div><div style={{ color: "#444", fontSize: 10, letterSpacing: 2, fontFamily: "'Bebas Neue',sans-serif" }}>SQUAD RATING</div><div style={{ color: rating.color, fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2 }}>{rating.verdict}</div></div></div>)}
            <div style={{ background: "#111", border: `2px solid ${gc(result.grade)}`, borderRadius: 14, padding: "1.5rem", marginBottom: "1rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.6rem,5vw,2.8rem)", letterSpacing: 3, lineHeight: 1.1, marginBottom: 14 }}>{result.headline}</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 28, marginBottom: 16 }}>
                {([["RECORD",result.record,"#F5A623"],["GRADE",result.grade,gc(result.grade)],...(result.seed?[["SEED",`#${result.seed}`,"#60a5fa"]]:[])] as [string,string,string][]).map(([l,v,c]) => (
                  <div key={l} style={{ textAlign: "center" }}><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 48, color: c, lineHeight: 1 }}>{v}</div><div style={{ color: "#444", fontSize: 11, letterSpacing: 1 }}>{l}</div></div>
                ))}
              </div>
              <p style={{ color: "#C4C4C4", fontSize: 15, lineHeight: 1.6, margin: 0, textAlign: "left" }}>{result.analysis}</p>
            </div>
            {result.madetournament && result.tournamentRun?.length > 0 && (
              <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.2rem", marginBottom: "1rem" }}>
                <div style={{ color: "#444", fontSize: 11, letterSpacing: 2, marginBottom: 12, fontFamily: "'Bebas Neue',sans-serif" }}>TOURNAMENT RUN</div>
                {result.tournamentRun.map((g: any, i: number) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < result.tournamentRun.length - 1 ? "1px solid #1A1A1A" : "none" }}>
                    <div><div style={{ color: "#444", fontSize: 11, letterSpacing: 1 }}>{g.round}</div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1 }}>vs. {g.opponent}</div></div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span style={{ color: "#555", fontSize: 14 }}>{g.score}</span><span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, color: g.result === "W" ? "#22c55e" : "#ef4444", letterSpacing: 2 }}>{g.result === "W" ? "WIN" : "LOSS"}</span></div>
                  </div>
                ))}
              </div>
            )}
            {!result.madetournament && (<div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.5rem", marginBottom: "1rem", textAlign: "center" }}><div style={{ fontSize: 36, marginBottom: 8 }}>😬</div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3, color: "#ef4444" }}>MISSED THE TOURNAMENT</div></div>)}
            {result.mvp && (<div style={{ background: "#111", border: "1px solid #F5A623", borderRadius: 12, padding: "14px 18px", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 12 }}><span style={{ fontSize: 24 }}>⭐</span><div><div style={{ color: "#444", fontSize: 11, letterSpacing: 2, fontFamily: "'Bebas Neue',sans-serif" }}>SEASON MVP</div><div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 2, color: "#F5A623" }}>{result.mvp}</div></div></div>)}
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.2rem", marginBottom: "1rem" }}>
              <div style={{ color: "#444", fontSize: 11, letterSpacing: 2, marginBottom: 10, fontFamily: "'Bebas Neue',sans-serif" }}>YOUR SQUAD</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {squad.filter(Boolean).map((p: any, i: number) => (
                  <div key={i} style={{ background: "#0D0D0D", borderRadius: 8, padding: "10px" }}>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4 }}><span style={{ background: SLOTS[i]?.color || "#F5A623", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 5px", borderRadius: 3 }}>{SLOTS[i]?.label}</span>{p.pos && <span style={{ background: "#222", color: "#666", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 5px", borderRadius: 3 }}>{p.pos}</span>}</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1, lineHeight: 1.1 }}>{p.name}{p.name === result.mvp ? " ⭐" : ""}</div>
                    <div style={{ color: "#444", fontSize: 11, marginTop: 2 }}>{p.team}</div>
                    {p.hasStats && <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, marginTop: 4 }}>{p.ppg} / {p.rpg} / {p.apg}</div>}
                  </div>
                ))}
              </div>
            </div>
            <button onClick={reset} style={{ width: "100%", background: "#1A1A1A", color: "white", border: "1px solid #222", borderRadius: 10, padding: "13px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, cursor: "pointer" }}>PLAY AGAIN</button>
          </div>
        )}

      </div>
    </div>
  );
}
