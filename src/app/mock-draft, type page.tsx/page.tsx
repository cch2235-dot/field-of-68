'use client';
import { useState, useEffect, useCallback, useRef } from "react";

import prospectsData from "../../../data/draft-prospects.json";

const ALL_PROSPECTS: any[] = prospectsData as any[];
const NBA_TEAMS: any[] = [{"pick":1,"name":"Washington Wizards","abbr":"WAS","espnId":27,"color":"#002B5C"},{"pick":2,"name":"Utah Jazz","abbr":"UTA","espnId":26,"color":"#002B5C"},{"pick":3,"name":"Philadelphia 76ers","abbr":"PHI","espnId":20,"color":"#006BB6"},{"pick":4,"name":"Charlotte Hornets","abbr":"CHA","espnId":30,"color":"#1D1160"},{"pick":5,"name":"New Orleans Pelicans","abbr":"NOP","espnId":3,"color":"#0C2340"},{"pick":6,"name":"Brooklyn Nets","abbr":"BKN","espnId":17,"color":"#000000"},{"pick":7,"name":"Toronto Raptors","abbr":"TOR","espnId":28,"color":"#CE1141"},{"pick":8,"name":"Portland Trail Blazers","abbr":"POR","espnId":22,"color":"#E03A3E"},{"pick":9,"name":"Chicago Bulls","abbr":"CHI","espnId":4,"color":"#CE1141"},{"pick":10,"name":"San Antonio Spurs","abbr":"SAS","espnId":24,"color":"#C4CED4"},{"pick":11,"name":"Sacramento Kings","abbr":"SAC","espnId":23,"color":"#5A2D81"},{"pick":12,"name":"Houston Rockets","abbr":"HOU","espnId":10,"color":"#CE1141"},{"pick":13,"name":"Atlanta Hawks","abbr":"ATL","espnId":1,"color":"#E03A3E"},{"pick":14,"name":"Memphis Grizzlies","abbr":"MEM","espnId":29,"color":"#5D76A9"},{"pick":15,"name":"Orlando Magic","abbr":"ORL","espnId":19,"color":"#0077C0"},{"pick":16,"name":"Detroit Pistons","abbr":"DET","espnId":8,"color":"#C8102E"},{"pick":17,"name":"Indiana Pacers","abbr":"IND","espnId":11,"color":"#002D62"},{"pick":18,"name":"Dallas Mavericks","abbr":"DAL","espnId":6,"color":"#00538C"},{"pick":19,"name":"Phoenix Suns","abbr":"PHX","espnId":21,"color":"#E56020"},{"pick":20,"name":"Miami Heat","abbr":"MIA","espnId":14,"color":"#98002E"},{"pick":21,"name":"Los Angeles Lakers","abbr":"LAL","espnId":13,"color":"#552583"},{"pick":22,"name":"Minnesota Timberwolves","abbr":"MIN","espnId":16,"color":"#0C2340"},{"pick":23,"name":"New York Knicks","abbr":"NYK","espnId":18,"color":"#006BB6"},{"pick":24,"name":"Denver Nuggets","abbr":"DEN","espnId":7,"color":"#0E2240"},{"pick":25,"name":"Milwaukee Bucks","abbr":"MIL","espnId":15,"color":"#00471B"},{"pick":26,"name":"Golden State Warriors","abbr":"GSW","espnId":9,"color":"#1D428A"},{"pick":27,"name":"Los Angeles Clippers","abbr":"LAC","espnId":12,"color":"#C8102E"},{"pick":28,"name":"Cleveland Cavaliers","abbr":"CLE","espnId":5,"color":"#860038"},{"pick":29,"name":"Oklahoma City Thunder","abbr":"OKC","espnId":25,"color":"#007AC1"},{"pick":30,"name":"Boston Celtics","abbr":"BOS","espnId":2,"color":"#007A33"}];

// NBA lottery odds % for picks 1-14 (worst to best record)
const LOTTERY_ODDS = [14.0,13.0,12.0,11.0,10.5,9.0,7.5,6.0,4.5,3.0,2.0,1.5,1.0,0.5];

const POS_COLORS: Record<string,string> = {
  PG:"#3b82f6", SG:"#60a5fa", SF:"#22c55e", PF:"#a855f7", C:"#f97316"
};

function nbaLogo(espnId: number) {
  return `https://a2.espncdn.com/combiner/i?img=/i/teamlogos/nba/500/${espnId}.png&w=80&h=80&cquality=40&scale=crop`;
}

function TeamLogo({ team, size = 40 }: { team: any; size?: number }) {
  const [err, setErr] = useState(false);
  if (err || !team.espnId) {
    return (
      <div style={{ width: size, height: size, borderRadius: 6, background: team.color || "#111", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: size * 0.28, color: "white", letterSpacing: 0.5 }}>{team.abbr}</span>
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: 6, background: "#0D1117", border: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4, flexShrink: 0 }}>
      <img src={nbaLogo(team.espnId)} alt={team.abbr} style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={() => setErr(true)} />
    </div>
  );
}

function autoPick(available: any[]): any {
  return available[0];
}

// Weighted lottery simulation
function runLottery(teams: any[]): any[] {
  const lotteryTeams = teams.slice(0, 14);
  const nonLotteryTeams = teams.slice(14);
  
  // Assign weighted odds
  const pool: number[] = [];
  lotteryTeams.forEach((_, i) => {
    const odds = Math.round(LOTTERY_ODDS[i] * 10);
    for (let j = 0; j < odds; j++) pool.push(i);
  });
  
  const lotteryOrder: number[] = [];
  const usedIdxs = new Set<number>();
  
  // Draw top 4 picks via lottery
  for (let pick = 0; pick < 4; pick++) {
    let drawn = -1;
    while (drawn === -1 || usedIdxs.has(drawn)) {
      drawn = pool[Math.floor(Math.random() * pool.length)];
    }
    lotteryOrder.push(drawn);
    usedIdxs.add(drawn);
  }
  
  // Remaining lottery teams in original order (worst to best)
  for (let i = 0; i < 14; i++) {
    if (!usedIdxs.has(i)) lotteryOrder.push(i);
  }
  
  const result = lotteryOrder.map(i => lotteryTeams[i]);
  return [...result, ...nonLotteryTeams];
}

type DraftPick = { pickNum: number; teamIdx: number; prospect: any };

export default function MockDraft() {
  const [phase, setPhase] = useState<"setup"|"lottery"|"manual"|"draft"|"done">("setup");
  const [userTeamIdx, setUserTeamIdx] = useState<number|null>(null);
  const [rounds, setRounds] = useState(1);
  const [draftOrder, setDraftOrder] = useState<any[]>([...NBA_TEAMS]);
  const [lotteryResult, setLotteryResult] = useState<any[]|null>(null);
  const [lotteryAnimating, setLotteryAnimating] = useState(false);
  const [lotteryRevealIdx, setLotteryRevealIdx] = useState(-1);
  const [available, setAvailable] = useState<any[]>([...ALL_PROSPECTS]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [currentPick, setCurrentPick] = useState(0);
  const [posFilter, setPosFilter] = useState("ALL");
  const [confirming, setConfirming] = useState<any>(null);
  const [searchQ, setSearchQ] = useState("");
  const [manualOrder, setManualOrder] = useState<any[]>([...NBA_TEAMS]);
  const [dragTeam, setDragTeam] = useState<number|null>(null);

  const totalPicks = draftOrder.length * rounds;
  const currentPickNum = currentPick + 1;
  const currentTeamIdx = currentPick % draftOrder.length;
  const currentTeam = draftOrder[currentTeamIdx];
  const isUserTurn = userTeamIdx === null || (currentTeam && draftOrder[currentTeamIdx]?.abbr === NBA_TEAMS[userTeamIdx]?.abbr);

  const startDraft = (order: any[]) => {
    setDraftOrder(order);
    setAvailable([...ALL_PROSPECTS]);
    setPicks([]);
    setCurrentPick(0);
    setConfirming(null);
    setPosFilter("ALL");
    setSearchQ("");
    setPhase("draft");
    const firstTeamAbbr = order[0]?.abbr;
    const userAbbr = userTeamIdx !== null ? NBA_TEAMS[userTeamIdx]?.abbr : null;
    if (userAbbr && firstTeamAbbr !== userAbbr) {
      setTimeout(() => autoPickUntilUser(0, [], [...ALL_PROSPECTS], order, userAbbr), 300);
    }
  };

  const autoPickUntilUser = (startAt: number, startPicks: DraftPick[], startAvail: any[], order: any[], userAbbr: string | null) => {
    let pick = startAt;
    let pks = startPicks;
    let avail = startAvail;
    const total = order.length * rounds;
    const run = () => {
      const teamIdx = pick % order.length;
      const team = order[teamIdx];
      if (pick >= total) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); setPhase("done"); return; }
      if (!userAbbr || team?.abbr === userAbbr) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); return; }
      const auto = autoPick(avail);
      if (!auto) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); setPhase("done"); return; }
      pks = [...pks, { pickNum: pick + 1, teamIdx, prospect: auto }];
      avail = avail.filter(p => p.rank !== auto.rank);
      pick++;
      setTimeout(run, 60);
    };
    run();
  };

  const advancePick = (newPick: number, newPicks: DraftPick[], newAvail: any[]) => {
    const total = draftOrder.length * rounds;
    if (newPick >= total) { setPicks(newPicks); setAvailable(newAvail); setCurrentPick(newPick); setPhase("done"); return; }
    const nextTeam = draftOrder[newPick % draftOrder.length];
    const userAbbr = userTeamIdx !== null ? NBA_TEAMS[userTeamIdx]?.abbr : null;
    if (userAbbr && nextTeam?.abbr !== userAbbr) {
      autoPickUntilUser(newPick, newPicks, newAvail, draftOrder, userAbbr);
    } else {
      setPicks(newPicks); setAvailable(newAvail); setCurrentPick(newPick);
    }
  };

  const confirmPick = () => {
    if (!confirming) return;
    const newPick: DraftPick = { pickNum: currentPickNum, teamIdx: currentTeamIdx, prospect: confirming };
    const newPicks = [...picks, newPick];
    const newAvail = available.filter(p => p.rank !== confirming.rank);
    setConfirming(null);
    advancePick(currentPick + 1, newPicks, newAvail);
  };

  const filteredAvailable = available.filter(p => {
    if (posFilter !== "ALL" && !p.pos.includes(posFilter)) return false;
    if (searchQ && !p.name.toLowerCase().includes(searchQ.toLowerCase()) && !p.school.toLowerCase().includes(searchQ.toLowerCase())) return false;
    return true;
  });

  const reset = () => {
    setPhase("setup");
    setUserTeamIdx(null);
    setRounds(1);
    setDraftOrder([...NBA_TEAMS]);
    setLotteryResult(null);
    setLotteryRevealIdx(-1);
    setAvailable([...ALL_PROSPECTS]);
    setPicks([]);
    setCurrentPick(0);
    setConfirming(null);
    setPosFilter("ALL");
    setSearchQ("");
    setManualOrder([...NBA_TEAMS]);
  };

  const runLotteryAnimation = () => {
    setLotteryAnimating(true);
    setLotteryRevealIdx(-1);
    const result = runLottery([...NBA_TEAMS]);
    // Reveal from pick 14 down to pick 1 (dramatic reveal)
    const reversed = [...result.slice(0, 14)].reverse();
    let idx = 0;
    const interval = setInterval(() => {
      setLotteryRevealIdx(idx);
      idx++;
      if (idx >= 14) { clearInterval(interval); setLotteryResult(result); setLotteryAnimating(false); }
    }, 600);
  };

  // Manual order drag handlers
  const onDragStartTeam = (idx: number) => setDragTeam(idx);
  const onDropTeam = (idx: number) => {
    if (dragTeam === null || dragTeam === idx) { setDragTeam(null); return; }
    const newOrder = [...manualOrder];
    const [moved] = newOrder.splice(dragTeam, 1);
    newOrder.splice(idx, 0, moved);
    setManualOrder(newOrder);
    setDragTeam(null);
  };

  const roundNum = Math.floor(currentPick / draftOrder.length) + 1;
  const gc = (grade: string) => grade?.startsWith("A") ? "#22c55e" : grade?.startsWith("B") ? "#F5A623" : "#ef4444";

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "white", fontFamily: "'Barlow Condensed', sans-serif", paddingBottom: 80 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 16px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", padding: "24px 0 16px" }}>
          <div style={{ display: "inline-block", background: "#F5A623", borderRadius: 5, padding: "2px 10px", marginBottom: 8 }}>
            <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 3, color: "#0A0A0A" }}>FIELD OF 68</span>
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.4rem,6vw,4rem)", letterSpacing: 4, margin: "0 0 4px", lineHeight: 1 }}>2026 NBA MOCK DRAFT</h1>
          <p style={{ color: "#555", fontSize: 14, margin: 0 }}>100 prospects · Simulate the full draft</p>
        </div>

        {/* SETUP */}
        {phase === "setup" && (
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.5rem", marginBottom: "1.2rem" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623", marginBottom: 6 }}>WHICH TEAM DO YOU PICK FOR?</div>
                <div style={{ color: "#555", fontSize: 12, marginBottom: 8 }}>Selecting a team enables Auto Pick for all other teams</div>
                <select value={userTeamIdx === null ? "ALL" : String(userTeamIdx)} onChange={e => setUserTeamIdx(e.target.value === "ALL" ? null : Number(e.target.value))}
                  style={{ width: "100%", background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 8, color: "white", padding: "10px 12px", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, cursor: "pointer" }}>
                  <option value="ALL">All Teams (you pick for everyone)</option>
                  {NBA_TEAMS.map((t: any, i: number) => (<option key={i} value={i}>#{t.pick} — {t.name}</option>))}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623", marginBottom: 8 }}>HOW MANY ROUNDS?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {([[1,"1ST ROUND","30 picks"],[2,"2 ROUNDS","60 picks"]] as [number,string,string][]).map(([r,label,sub]) => (
                    <button key={r} onClick={() => setRounds(r)} style={{ flex: 1, background: rounds === r ? "#F5A623" : "#0D0D0D", border: `1px solid ${rounds === r ? "#F5A623" : "#2A2A2A"}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: rounds === r ? "#0A0A0A" : "white", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2 }}>{label}</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623", marginBottom: 8 }}>DRAFT ORDER</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => startDraft([...NBA_TEAMS])} style={{ flex: 1, background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 8, padding: "10px", cursor: "pointer", color: "white", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>USE DEFAULT ORDER</div>
                    <div style={{ fontSize: 11, color: "#555" }}>Standard pick order</div>
                  </button>
                  <button onClick={() => setPhase("lottery")} style={{ flex: 1, background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 8, padding: "10px", cursor: "pointer", color: "white", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>🎰 RUN LOTTERY</div>
                    <div style={{ fontSize: 11, color: "#555" }}>Simulate weighted lottery</div>
                  </button>
                  <button onClick={() => setPhase("manual")} style={{ flex: 1, background: "#0D0D0D", border: "1px solid #2A2A2A", borderRadius: 8, padding: "10px", cursor: "pointer", color: "white", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>✏️ SET MANUALLY</div>
                    <div style={{ fontSize: 11, color: "#555" }}>Drag to set order</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* LOTTERY */}
        {phase === "lottery" && (
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.5rem", marginBottom: "1.2rem" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, marginBottom: 4 }}>🎰 NBA DRAFT LOTTERY</div>
              <div style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>Weighted odds: worst record has 14% chance at #1 pick</div>
              
              {!lotteryResult && !lotteryAnimating && (
                <button onClick={runLotteryAnimation} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 8, padding: "14px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, cursor: "pointer", marginBottom: 16 }}>
                  RUN THE LOTTERY
                </button>
              )}

              {/* Lottery reveal — teams shown from #14 down to #1 */}
              {(lotteryAnimating || lotteryRevealIdx >= 0) && !lotteryResult && (
                <div>
                  {[...NBA_TEAMS.slice(0, 14)].reverse().map((team, revIdx) => (
                    <div key={team.abbr} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #1A1A1A", opacity: revIdx <= lotteryRevealIdx ? 1 : 0.15, transition: "opacity 0.3s" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#333", width: 28 }}>{revIdx <= lotteryRevealIdx ? `#${14 - revIdx}` : "?"}</div>
                      <TeamLogo team={team} size={28} />
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 1 }}>{revIdx <= lotteryRevealIdx ? team.name : "???"}</span>
                      <span style={{ marginLeft: "auto", color: "#444", fontSize: 11 }}>{LOTTERY_ODDS[13 - revIdx].toFixed(1)}% odds</span>
                    </div>
                  ))}
                </div>
              )}

              {lotteryResult && (
                <div>
                  <div style={{ color: "#22c55e", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, marginBottom: 12 }}>LOTTERY COMPLETE — TOP 14 PICKS SET</div>
                  {lotteryResult.slice(0, 14).map((team, i) => (
                    <div key={team.abbr} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", borderBottom: "1px solid #111" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#F5A623", width: 28 }}>#{i+1}</div>
                      <TeamLogo team={team} size={24} />
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1 }}>{team.name}</span>
                      {i < 4 && NBA_TEAMS.indexOf(team) !== i && (
                        <span style={{ marginLeft: "auto", background: "#1A1A0A", color: "#F5A623", fontSize: 10, padding: "2px 6px", borderRadius: 4, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>JUMPED UP</span>
                      )}
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    <button onClick={() => { setLotteryResult(null); setLotteryRevealIdx(-1); }} style={{ flex: 1, background: "#1A1A1A", color: "#888", border: "1px solid #2A2A2A", borderRadius: 8, padding: "10px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2, cursor: "pointer" }}>RE-RUN</button>
                    <button onClick={() => startDraft(lotteryResult)} style={{ flex: 2, background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 8, padding: "10px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>START DRAFT</button>
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setPhase("setup")} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>← BACK TO SETUP</button>
          </div>
        )}

        {/* MANUAL ORDER */}
        {phase === "manual" && (
          <div style={{ maxWidth: 560, margin: "0 auto" }}>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 14, padding: "1.5rem", marginBottom: "1.2rem" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 20, letterSpacing: 3, marginBottom: 4 }}>✏️ SET DRAFT ORDER</div>
              <div style={{ color: "#555", fontSize: 13, marginBottom: 16 }}>Drag teams to set the pick order</div>
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                {manualOrder.map((team, i) => (
                  <div key={team.abbr} draggable
                    onDragStart={() => onDragStartTeam(i)}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => onDropTeam(i)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderBottom: "1px solid #1A1A1A", cursor: "grab", background: dragTeam === i ? "#1A1A1A" : "transparent", borderRadius: 6 }}>
                    <span style={{ color: "#333", fontSize: 10, marginRight: 2 }}>⠿</span>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, color: "#F5A623", width: 28 }}>#{i+1}</div>
                    <TeamLogo team={team} size={24} />
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1 }}>{team.name}</span>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <button onClick={() => setManualOrder([...NBA_TEAMS])} style={{ flex: 1, background: "#1A1A1A", color: "#888", border: "1px solid #2A2A2A", borderRadius: 8, padding: "10px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, cursor: "pointer" }}>RESET</button>
                <button onClick={() => startDraft(manualOrder)} style={{ flex: 2, background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 8, padding: "10px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>START DRAFT</button>
              </div>
            </div>
            <button onClick={() => setPhase("setup")} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>← BACK TO SETUP</button>
          </div>
        )}

        {/* DRAFT */}
        {phase === "draft" && currentPick < totalPicks && (
          <div>
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 12, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <TeamLogo team={currentTeam} size={52} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 2 }}>ON THE CLOCK</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", letterSpacing: 1.5, lineHeight: 1.2 }}>
                  With the <span style={{ color: "#F5A623" }}>#{currentPickNum}</span> pick{rounds > 1 ? ` (Rd ${roundNum})` : ""}, the <span style={{ color: "#F5A623" }}>{currentTeam?.name}</span> select...
                </div>
              </div>
              {isUserTurn && userTeamIdx === null && (
                <button onClick={() => { const auto = available[0]; if (auto) setConfirming(auto); }} style={{ background: "#222", border: "1px solid #333", borderRadius: 8, color: "#888", padding: "8px 14px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, letterSpacing: 2, cursor: "pointer", flexShrink: 0 }}>AUTO</button>
              )}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" as const }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["ALL","PG","SG","SF","PF","C"].map(p => (
                  <button key={p} onClick={() => setPosFilter(p)} style={{ background: posFilter === p ? "#F5A623" : "#111", border: `1px solid ${posFilter === p ? "#F5A623" : "#1A1A1A"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: posFilter === p ? "#0A0A0A" : "#666", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, letterSpacing: 1 }}>{p}</button>
                ))}
              </div>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search player or school..." style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 6, padding: "5px 10px", color: "white", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, flex: 1, minWidth: 140 }} />
            </div>

            <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>AVAILABLE ({filteredAvailable.length})</div>

            {/* Player list with stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {filteredAvailable.map((p: any) => (
                <div key={p.rank} style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#2A2A2A", width: 30, textAlign: "center", flexShrink: 0, paddingTop: 2 }}>{p.rank}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                      <span style={{ background: POS_COLORS[p.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "1px 5px", borderRadius: 3, flexShrink: 0 }}>{p.pos}</span>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1, lineHeight: 1 }}>{p.name}</span>
                    </div>
                    <div style={{ color: "#555", fontSize: 11, marginBottom: p.ppg > 0 ? 5 : 0 }}>{p.school}{p.age ? ` · ${p.age} yrs` : ""}{p.height ? ` · ${p.height}` : ""}</div>
                    {p.ppg > 0 ? (
                      <div style={{ display: "flex", gap: 10 }}>
                        {([["PPG",p.ppg],["RPG",p.rpg],["APG",p.apg],["FG%",p.fgp > 0 ? p.fgp+"%" : "—"]] as [string,any][]).map(([l,v]) => (
                          <span key={l} style={{ display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
                            <span style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, lineHeight: 1 }}>{v}</span>
                            <span style={{ color: "#444", fontSize: 9, letterSpacing: 1 }}>{l}</span>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div style={{ color: "#333", fontSize: 11 }}>Fr / International — No college stats</div>
                    )}
                  </div>
                  <button onClick={() => setConfirming(p)} disabled={!isUserTurn}
                    style={{ background: isUserTurn ? "#F5A623" : "#1A1A1A", color: isUserTurn ? "#0A0A0A" : "#333", border: "none", borderRadius: 7, padding: "7px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 2, cursor: isUserTurn ? "pointer" : "not-allowed", flexShrink: 0, alignSelf: "center" }}>
                    DRAFT
                  </button>
                </div>
              ))}
            </div>

            {/* Recent picks */}
            {picks.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>RECENT PICKS</div>
                {picks.slice(-5).reverse().map((pk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "#0D0D0D", borderRadius: 6, marginBottom: 3 }}>
                    <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, width: 24 }}>#{pk.pickNum}</div>
                    <TeamLogo team={draftOrder[pk.teamIdx]} size={20} />
                    <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 8, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 4px", borderRadius: 2 }}>{pk.prospect.pos}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 1 }}>{pk.prospect.name}</span>
                      <span style={{ color: "#444", fontSize: 11, marginLeft: 6 }}>{pk.prospect.school}</span>
                    </div>
                    <span style={{ color: "#333", fontSize: 11 }}>{draftOrder[pk.teamIdx]?.abbr}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONFIRM MODAL */}
        {confirming && (
          <div style={{ position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.88)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50, padding: 16 }}>
            <div style={{ background: "#111", border: "2px solid #F5A623", borderRadius: 16, padding: "1.5rem", maxWidth: 400, width: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <TeamLogo team={currentTeam} size={44} />
                <div>
                  <div style={{ color: "#444", fontSize: 11, letterSpacing: 1, fontFamily: "'Bebas Neue',sans-serif" }}>PICK #{currentPickNum}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623" }}>{currentTeam?.name?.toUpperCase()}</div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ display: "inline-block", background: POS_COLORS[confirming.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 10, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "2px 8px", borderRadius: 4, marginBottom: 8 }}>{confirming.pos}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.4rem,4vw,2rem)", letterSpacing: 3, lineHeight: 1, marginBottom: 4 }}>{confirming.name}</div>
                <div style={{ color: "#555", fontSize: 13 }}>{confirming.school}{confirming.height ? ` · ${confirming.height}` : ""}{confirming.age ? ` · ${confirming.age} yrs` : ""}</div>
              </div>
              {confirming.ppg > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 14, background: "#0D0D0D", borderRadius: 10, padding: "10px" }}>
                  {([["PPG",confirming.ppg],["RPG",confirming.rpg],["APG",confirming.apg],["FG%",confirming.fgp > 0 ? confirming.fgp+"%" : "—"]] as [string,any][]).map(([l,v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, color: "#F5A623", lineHeight: 1 }}>{v}</div>
                      <div style={{ color: "#444", fontSize: 10, letterSpacing: 1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: "#0D0D0D", borderRadius: 10, padding: "10px", marginBottom: 14, textAlign: "center", color: "#444", fontSize: 12 }}>
                  Freshman / International — No college stats available
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setConfirming(null)} style={{ flex: 1, background: "#1A1A1A", color: "#666", border: "1px solid #2A2A2A", borderRadius: 8, padding: "11px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 2, cursor: "pointer" }}>BACK</button>
                <button onClick={confirmPick} style={{ flex: 2, background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 8, padding: "11px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2, cursor: "pointer" }}>CONFIRM PICK</button>
              </div>
            </div>
          </div>
        )}

        {/* DONE */}
        {phase === "done" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2rem,5vw,3rem)", letterSpacing: 3, marginBottom: 4 }}>DRAFT COMPLETE</div>
              <div style={{ color: "#555", fontSize: 14 }}>{picks.length} picks made</div>
            </div>
            {userTeamIdx !== null && (() => {
              const userAbbr = NBA_TEAMS[userTeamIdx]?.abbr;
              const userPicks = picks.filter(p => draftOrder[p.teamIdx]?.abbr === userAbbr);
              return userPicks.length > 0 ? (
                <div style={{ background: "#111", border: "2px solid #F5A623", borderRadius: 14, padding: "1.2rem", marginBottom: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <TeamLogo team={NBA_TEAMS[userTeamIdx]} size={44} />
                    <div>
                      <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2 }}>YOUR PICKS</div>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2 }}>{NBA_TEAMS[userTeamIdx].name.toUpperCase()}</div>
                    </div>
                  </div>
                  {userPicks.map((pk, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #1A1A1A" }}>
                      <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, width: 28 }}>#{pk.pickNum}</div>
                      <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 5px", borderRadius: 3 }}>{pk.prospect.pos}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 1 }}>{pk.prospect.name}</div>
                        <div style={{ color: "#555", fontSize: 11 }}>{pk.prospect.school}</div>
                      </div>
                      {pk.prospect.ppg > 0 && <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13 }}>{pk.prospect.ppg} PPG</div>}
                    </div>
                  ))}
                </div>
              ) : null;
            })()}
            <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>FULL DRAFT BOARD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 20 }}>
              {picks.map((pk, i) => {
                const userAbbr = userTeamIdx !== null ? NBA_TEAMS[userTeamIdx]?.abbr : null;
                const isUser = userAbbr && draftOrder[pk.teamIdx]?.abbr === userAbbr;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: isUser ? "#161400" : "#0D0D0D", border: `1px solid ${isUser ? "#F5A62344" : "transparent"}`, borderRadius: 7 }}>
                    <div style={{ color: "#2A2A2A", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, width: 28, textAlign: "center", flexShrink: 0 }}>{pk.pickNum}</div>
                    <TeamLogo team={draftOrder[pk.teamIdx]} size={24} />
                    <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 8, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 4px", borderRadius: 2, flexShrink: 0 }}>{pk.prospect.pos}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1 }}>{pk.prospect.name}</span>
                      <span style={{ color: "#444", fontSize: 11, marginLeft: 6 }}>{pk.prospect.school}</span>
                    </div>
                    {pk.prospect.ppg > 0 && <span style={{ color: "#555", fontSize: 11, flexShrink: 0 }}>{pk.prospect.ppg} PPG</span>}
                    <span style={{ color: "#333", fontSize: 11, flexShrink: 0 }}>{draftOrder[pk.teamIdx]?.abbr}</span>
                    {isUser && <span style={{ color: "#F5A623", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>YOU</span>}
                  </div>
                );
              })}
            </div>
            <button onClick={reset} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 22, letterSpacing: 3, cursor: "pointer" }}>
              START NEW MOCK
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
