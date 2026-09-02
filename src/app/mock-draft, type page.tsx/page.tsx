'use client';
import { useState, useCallback } from "react";

const ALL_PROSPECTS: any[] = [{"rank":1,"name":"Tyran Stokes","pos":"SF","height":"6'7\"","school":"Kansas","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":2,"name":"Jordan Smith Jr.","pos":"PG","height":"6'4\"","school":"Arkansas","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":3,"name":"Caleb Holt","pos":"SG","height":"6'5\"","school":"Arizona","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":4,"name":"Stefan Joksimovic","pos":"SG","height":"6'6\"","school":"Baskonia","age":17,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":5,"name":"JJ Andrews","pos":"SF","height":"6'7\"","school":"Arkansas","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":6,"name":"Anthony Thompson","pos":"SF","height":"6'7\"","school":"Ohio State","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":7,"name":"Braylon Mullins","pos":"SG","height":"6'5\"","school":"Connecticut","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":8,"name":"Bruce Branch III","pos":"SF","height":"6'7\"","school":"BYU","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":9,"name":"Motiejus Krivas","pos":"C","height":"7'0\"","school":"Arizona","age":21,"ppg":10.4,"rpg":8.2,"apg":1.0,"fgp":57.3},{"rank":10,"name":"Bryson Howard","pos":"SG","height":"6'6\"","school":"Duke","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":11,"name":"Colben Landrew","pos":"SG","height":"6'6\"","school":"Connecticut","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":12,"name":"Amari Allen","pos":"SG","height":"6'5\"","school":"Alabama","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":13,"name":"Patrick Ngongba II","pos":"C","height":"7'1\"","school":"Duke","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":14,"name":"Jason Crowe Jr.","pos":"SG","height":"6'4\"","school":"Missouri","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":15,"name":"Dylan Mingo","pos":"PG","height":"6'3\"","school":"Baylor","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":16,"name":"Ivan Kharchenkov","pos":"SG","height":"6'7\"","school":"Arizona","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":17,"name":"Luigi Suigo","pos":"C","height":"7'1\"","school":"Villanova","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":18,"name":"Baba Oladotun","pos":"SF","height":"6'10\"","school":"Maryland","age":17,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":19,"name":"Quentin Coleman","pos":"PG","height":"6'3\"","school":"Illinois","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":20,"name":"Brandon McCoy","pos":"PG","height":"6'5\"","school":"Michigan","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":21,"name":"Hugo Yimga-Moukouri","pos":"SF","height":"6'9\"","school":"Nanterre 92","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":22,"name":"Miikka Muurinen","pos":"PF","height":"6'10\"","school":"Arkansas","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":23,"name":"Cameron Williams","pos":"C","height":"7'0\"","school":"Duke","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":24,"name":"Najai Hines","pos":"C","height":"6'11\"","school":"Connecticut","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":25,"name":"Abdou Toure","pos":"SG","height":"6'6\"","school":"Arkansas","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":26,"name":"Caleb Gaskins","pos":"SF","height":"6'8\"","school":"Miami","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":27,"name":"Thomas Haugh","pos":"SF","height":"6'8\"","school":"Florida","age":23,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":28,"name":"Alijah Arenas","pos":"SG","height":"6'6\"","school":"USC","age":19,"ppg":14.1,"rpg":2.9,"apg":2.1,"fgp":34.1},{"rank":29,"name":"Davis Fogel","pos":"SF","height":"6'7\"","school":"Gonzaga","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":30,"name":"Maximo Adams","pos":"SG","height":"6'5\"","school":"North Carolina","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":31,"name":"Tyler Tanner","pos":"PG","height":"6'3\"","school":"Vanderbilt","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":32,"name":"Tounde Yessoufou","pos":"SG","height":"6'6\"","school":"St. John's","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":33,"name":"Malachi Moreno","pos":"C","height":"7'0\"","school":"Kentucky","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":34,"name":"Arafan Diane","pos":"C","height":"7'0\"","school":"Houston","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":35,"name":"Massamba Diop","pos":"C","height":"7'1\"","school":"Gonzaga","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":36,"name":"Alex Condon","pos":"C","height":"6'11\"","school":"Florida","age":22,"ppg":14.2,"rpg":9.4,"apg":2.4,"fgp":58.4},{"rank":37,"name":"Cameron Houindo","pos":"PF","height":"6'9\"","school":"Cedevita","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":38,"name":"Klark Reithauser","pos":"SG","height":"6'5\"","school":"Chalon","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":39,"name":"Juke Harris","pos":"SG","height":"6'7\"","school":"Tennessee","age":21,"ppg":21.4,"rpg":6.5,"apg":1.9,"fgp":44.4},{"rank":40,"name":"Dame Sarr","pos":"SF","height":"6'8\"","school":"Duke","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":41,"name":"Pryce Sandfort","pos":"SF","height":"6'7\"","school":"Nebraska","age":22,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":42,"name":"David Mirkovic","pos":"PF","height":"6'10\"","school":"Illinois","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":43,"name":"Stefan Vaaks","pos":"SG","height":"6'6\"","school":"Illinois","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":44,"name":"Trey McKenney","pos":"SF","height":"6'7\"","school":"Michigan","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":45,"name":"Matt Able","pos":"SG","height":"6'5\"","school":"North Carolina","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":46,"name":"Sayon Keita","pos":"C","height":"7'0\"","school":"North Carolina","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":47,"name":"Milan Momcilovic","pos":"SF","height":"6'8\"","school":"Kentucky","age":21,"ppg":16.4,"rpg":5.4,"apg":2.8,"fgp":48.4},{"rank":48,"name":"Flory Bidunga","pos":"C","height":"6'9\"","school":"Louisville","age":21,"ppg":13.3,"rpg":9.0,"apg":1.5,"fgp":64.0},{"rank":49,"name":"Adam Atamna","pos":"SG","height":"6'5\"","school":"Ratiopharm Ulm","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":50,"name":"Roman Domon","pos":"SF","height":"6'7\"","school":"Murray State","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":51,"name":"Nigel James","pos":"PG","height":"6'2\"","school":"Marquette","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":52,"name":"Rueben Chinyelu","pos":"C","height":"7'1\"","school":"Florida","age":22,"ppg":10.8,"rpg":8.4,"apg":1.2,"fgp":56.4},{"rank":53,"name":"Neoklis Avdalas","pos":"SG","height":"6'6\"","school":"North Carolina","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":54,"name":"Billy Richmond III","pos":"SG","height":"6'6\"","school":"Arkansas","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":55,"name":"Moustapha Thiam","pos":"C","height":"7'1\"","school":"Michigan","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":56,"name":"Shelton Henderson","pos":"SG","height":"6'5\"","school":"Miami","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":57,"name":"Paul McNeil","pos":"SG","height":"6'5\"","school":"NC State","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":58,"name":"Johann Grunloh","pos":"C","height":"7'0\"","school":"Virginia","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":59,"name":"Mason Falslev","pos":"SG","height":"6'5\"","school":"Utah State","age":24,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":60,"name":"Daniel Jacobsen","pos":"C","height":"7'1\"","school":"Purdue","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":61,"name":"Lucas Morillo","pos":"SF","height":"6'8\"","school":"Illinois","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":62,"name":"Dash Daniels","pos":"PG","height":"6'4\"","school":"SE Melbourne","age":18,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":63,"name":"JT Toppin","pos":"PF","height":"6'9\"","school":"Texas Tech","age":21,"ppg":14.8,"rpg":7.4,"apg":2.1,"fgp":54.8},{"rank":64,"name":"Joseph Tugler","pos":"PF","height":"6'9\"","school":"Houston","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":65,"name":"Thijs De Ridder","pos":"PF","height":"6'9\"","school":"Virginia","age":23,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":66,"name":"Nikolas Khamenia","pos":"SF","height":"6'8\"","school":"Connecticut","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":67,"name":"Arrinten Page","pos":"C","height":"7'0\"","school":"Providence","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":68,"name":"Matas Vokietaitis","pos":"C","height":"7'0\"","school":"Texas","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":69,"name":"Kellen Thames","pos":"SF","height":"6'7\"","school":"Saint Louis","age":23,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":70,"name":"Elyjah Freeman","pos":"SF","height":"6'8\"","school":"Texas","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":71,"name":"Nolan Winter","pos":"C","height":"7'1\"","school":"Wisconsin","age":20,"ppg":12.4,"rpg":8.8,"apg":1.8,"fgp":58.4},{"rank":72,"name":"Braden Frager","pos":"SF","height":"6'7\"","school":"Nebraska","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":73,"name":"Jeremy Fears Jr.","pos":"PG","height":"6'2\"","school":"Michigan State","age":21,"ppg":13.8,"rpg":3.4,"apg":6.2,"fgp":43.2},{"rank":74,"name":"Jacob Cofie","pos":"C","height":"6'10\"","school":"USC","age":20,"ppg":9.9,"rpg":6.8,"apg":1.9,"fgp":51.0},{"rank":75,"name":"Andrej Stojakovic","pos":"SF","height":"6'8\"","school":"Illinois","age":22,"ppg":14.8,"rpg":5.4,"apg":2.8,"fgp":50.4},{"rank":76,"name":"Amani Hansberry","pos":"PF","height":"6'9\"","school":"Virginia Tech","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":77,"name":"John Blackwell","pos":"SG","height":"6'4\"","school":"Duke","age":21,"ppg":16.8,"rpg":3.8,"apg":3.4,"fgp":46.8},{"rank":78,"name":"Zoom Diallo","pos":"PG","height":"6'6\"","school":"Kentucky","age":20,"ppg":15.7,"rpg":3.9,"apg":4.5,"fgp":48.9},{"rank":79,"name":"Finley Bizjack","pos":"SG","height":"6'4\"","school":"West Virginia","age":21,"ppg":17.1,"rpg":2.2,"apg":2.5,"fgp":42.2},{"rank":80,"name":"Alvaro Folgueiras","pos":"PF","height":"6'10\"","school":"Louisville","age":21,"ppg":8.5,"rpg":3.8,"apg":2.3,"fgp":49.3},{"rank":81,"name":"Ruben Prey","pos":"C","height":"7'0\"","school":"St. John's","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":82,"name":"Paulius Murauskas","pos":"PF","height":"6'9\"","school":"Arizona State","age":22,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":83,"name":"Jordan Scott","pos":"SF","height":"6'7\"","school":"Michigan State","age":19,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":84,"name":"Miles Byrd","pos":"SG","height":"6'7\"","school":"Providence","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":85,"name":"Amael L'Etang","pos":"C","height":"7'0\"","school":"Dayton","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":86,"name":"Killyan Toure","pos":"PG","height":"6'4\"","school":"Iowa State","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":87,"name":"Tahaad Pettiford","pos":"PG","height":"6'2\"","school":"Auburn","age":21,"ppg":12.4,"rpg":2.8,"apg":3.8,"fgp":43.8},{"rank":88,"name":"Collin Chandler","pos":"SG","height":"6'5\"","school":"BYU","age":22,"ppg":9.7,"rpg":2.8,"apg":2.3,"fgp":43.5},{"rank":89,"name":"Zvonimir Ivisic","pos":"C","height":"7'3\"","school":"Illinois","age":23,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":90,"name":"Jalen Haralson","pos":"SF","height":"6'7\"","school":"Tennessee","age":19,"ppg":16.2,"rpg":4.0,"apg":2.6,"fgp":51.5},{"rank":91,"name":"Aiden Sherrell","pos":"PF","height":"6'9\"","school":"Indiana","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":92,"name":"Tomislav Ivisic","pos":"C","height":"7'3\"","school":"Illinois","age":23,"ppg":13.2,"rpg":10.4,"apg":1.5,"fgp":0},{"rank":93,"name":"Xavier Edmonds","pos":"SF","height":"6'7\"","school":"TCU","age":22,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":94,"name":"Dillan Shaw","pos":"SF","height":"6'7\"","school":"Arizona State","age":0,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":95,"name":"Bryson Tiller","pos":"PF","height":"6'9\"","school":"Missouri","age":20,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":96,"name":"Blue Cain","pos":"PG","height":"6'2\"","school":"Georgia","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":97,"name":"Trent Pierce","pos":"PF","height":"6'9\"","school":"Missouri","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":98,"name":"Coen Carr","pos":"SF","height":"6'7\"","school":"Michigan State","age":21,"ppg":11.2,"rpg":5.8,"apg":1.4,"fgp":52.4},{"rank":99,"name":"Kanon Catchings","pos":"SF","height":"6'7\"","school":"Georgia","age":21,"ppg":0,"rpg":0,"apg":0,"fgp":0},{"rank":100,"name":"Teagan Moore","pos":"SG","height":"6'4\"","school":"Western Kentucky","age":0,"ppg":0,"rpg":0,"apg":0,"fgp":0}];
const NBA_TEAMS: any[] = [{"pick":1,"name":"Washington Wizards","abbr":"WAS","espnId":27,"color":"#002B5C"},{"pick":2,"name":"Utah Jazz","abbr":"UTA","espnId":26,"color":"#002B5C"},{"pick":3,"name":"Philadelphia 76ers","abbr":"PHI","espnId":20,"color":"#006BB6"},{"pick":4,"name":"Charlotte Hornets","abbr":"CHA","espnId":30,"color":"#1D1160"},{"pick":5,"name":"New Orleans Pelicans","abbr":"NOP","espnId":3,"color":"#0C2340"},{"pick":6,"name":"Brooklyn Nets","abbr":"BKN","espnId":17,"color":"#000000"},{"pick":7,"name":"Toronto Raptors","abbr":"TOR","espnId":28,"color":"#CE1141"},{"pick":8,"name":"Portland Trail Blazers","abbr":"POR","espnId":22,"color":"#E03A3E"},{"pick":9,"name":"Chicago Bulls","abbr":"CHI","espnId":4,"color":"#CE1141"},{"pick":10,"name":"San Antonio Spurs","abbr":"SAS","espnId":24,"color":"#C4CED4"},{"pick":11,"name":"Sacramento Kings","abbr":"SAC","espnId":23,"color":"#5A2D81"},{"pick":12,"name":"Houston Rockets","abbr":"HOU","espnId":10,"color":"#CE1141"},{"pick":13,"name":"Atlanta Hawks","abbr":"ATL","espnId":1,"color":"#E03A3E"},{"pick":14,"name":"Memphis Grizzlies","abbr":"MEM","espnId":29,"color":"#5D76A9"},{"pick":15,"name":"Orlando Magic","abbr":"ORL","espnId":19,"color":"#0077C0"},{"pick":16,"name":"Detroit Pistons","abbr":"DET","espnId":8,"color":"#C8102E"},{"pick":17,"name":"Indiana Pacers","abbr":"IND","espnId":11,"color":"#002D62"},{"pick":18,"name":"Dallas Mavericks","abbr":"DAL","espnId":6,"color":"#00538C"},{"pick":19,"name":"Phoenix Suns","abbr":"PHX","espnId":21,"color":"#E56020"},{"pick":20,"name":"Miami Heat","abbr":"MIA","espnId":14,"color":"#98002E"},{"pick":21,"name":"Los Angeles Lakers","abbr":"LAL","espnId":13,"color":"#552583"},{"pick":22,"name":"Minnesota Timberwolves","abbr":"MIN","espnId":16,"color":"#0C2340"},{"pick":23,"name":"New York Knicks","abbr":"NYK","espnId":18,"color":"#006BB6"},{"pick":24,"name":"Denver Nuggets","abbr":"DEN","espnId":7,"color":"#0E2240"},{"pick":25,"name":"Milwaukee Bucks","abbr":"MIL","espnId":15,"color":"#00471B"},{"pick":26,"name":"Golden State Warriors","abbr":"GSW","espnId":9,"color":"#1D428A"},{"pick":27,"name":"Los Angeles Clippers","abbr":"LAC","espnId":12,"color":"#C8102E"},{"pick":28,"name":"Cleveland Cavaliers","abbr":"CLE","espnId":5,"color":"#860038"},{"pick":29,"name":"Oklahoma City Thunder","abbr":"OKC","espnId":25,"color":"#007AC1"},{"pick":30,"name":"Boston Celtics","abbr":"BOS","espnId":2,"color":"#007A33"}];

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

function autoPick(available: any[], teamIdx: number, picks: any[]): any {
  return available[0];
}

type DraftPick = { pickNum: number; teamIdx: number; prospect: any };

export default function MockDraft() {
  const [phase, setPhase] = useState<"setup"|"draft"|"done">("setup");
  const [userTeamIdx, setUserTeamIdx] = useState<number|null>(null);
  const [rounds, setRounds] = useState(1);
  const [available, setAvailable] = useState<any[]>([...ALL_PROSPECTS]);
  const [picks, setPicks] = useState<DraftPick[]>([]);
  const [currentPick, setCurrentPick] = useState(0);
  const [posFilter, setPosFilter] = useState("ALL");
  const [confirming, setConfirming] = useState<any>(null);
  const [searchQ, setSearchQ] = useState("");

  const totalPicks = NBA_TEAMS.length * rounds;
  const currentPickNum = currentPick + 1;
  const currentTeamIdx = currentPick % NBA_TEAMS.length;
  const currentTeam = NBA_TEAMS[currentTeamIdx];
  const isUserTurn = userTeamIdx === null || userTeamIdx === currentTeamIdx;
  const roundNum = Math.floor(currentPick / NBA_TEAMS.length) + 1;
  const pickInRound = (currentPick % NBA_TEAMS.length) + 1;

  const startDraft = () => {
    setAvailable([...ALL_PROSPECTS]);
    setPicks([]);
    setCurrentPick(0);
    setConfirming(null);
    setPosFilter("ALL");
    setSearchQ("");
    setPhase("draft");
    if (userTeamIdx !== null && userTeamIdx !== 0) {
      // auto-pick until user's turn
      setTimeout(() => autoPickUntil(0, [], [...ALL_PROSPECTS]), 200);
    }
  };

  const advancePick = (newPick: number, newPicks: DraftPick[], newAvail: any[]) => {
    if (newPick >= totalPicks) {
      setPicks(newPicks);
      setAvailable(newAvail);
      setCurrentPick(newPick);
      setPhase("done");
      return;
    }
    const nextTeamIdx = newPick % NBA_TEAMS.length;
    if (userTeamIdx !== null && userTeamIdx !== nextTeamIdx) {
      autoPickUntil(newPick, newPicks, newAvail);
    } else {
      setPicks(newPicks);
      setAvailable(newAvail);
      setCurrentPick(newPick);
    }
  };

  const autoPickUntil = (startPick: number, startPicks: DraftPick[], startAvail: any[]) => {
    let pick = startPick;
    let pks = startPicks;
    let avail = startAvail;
    const run = () => {
      const teamIdx = pick % NBA_TEAMS.length;
      if (pick >= totalPicks) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); setPhase("done"); return; }
      if (userTeamIdx === null || teamIdx === userTeamIdx) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); return; }
      const auto = autoPick(avail, teamIdx, pks);
      if (!auto) { setPicks(pks); setAvailable(avail); setCurrentPick(pick); setPhase("done"); return; }
      pks = [...pks, { pickNum: pick + 1, teamIdx, prospect: auto }];
      avail = avail.filter(p => p.rank !== auto.rank);
      pick++;
      setTimeout(run, 60);
    };
    run();
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
    setAvailable([...ALL_PROSPECTS]);
    setPicks([]);
    setCurrentPick(0);
    setConfirming(null);
    setPosFilter("ALL");
    setSearchQ("");
  };

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
                  {NBA_TEAMS.map((t: any, i: number) => (
                    <option key={i} value={i}>#{t.pick} — {t.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623", marginBottom: 8 }}>HOW MANY ROUNDS?</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {([[1,"1ST ROUND","30 picks"],[2,"2 ROUNDS","60 picks"]] as [number,string,string][]).map(([r, label, sub]) => (
                    <button key={r} onClick={() => setRounds(r)}
                      style={{ flex: 1, background: rounds === r ? "#F5A623" : "#0D0D0D", border: `1px solid ${rounds === r ? "#F5A623" : "#2A2A2A"}`, borderRadius: 8, padding: "10px", cursor: "pointer", color: rounds === r ? "#0A0A0A" : "white", textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 2 }}>{label}</div>
                      <div style={{ fontSize: 11, opacity: 0.7 }}>{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={startDraft} style={{ width: "100%", background: "#F5A623", color: "#0A0A0A", border: "none", borderRadius: 10, padding: "15px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 24, letterSpacing: 3, cursor: "pointer" }}>
              START THE DRAFT
            </button>
          </div>
        )}

        {/* DRAFT */}
        {phase === "draft" && currentPick < totalPicks && (
          <div>
            {/* On the clock */}
            <div style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 12, padding: "14px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <TeamLogo team={currentTeam} size={52} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 2 }}>ON THE CLOCK</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1rem,2.5vw,1.5rem)", letterSpacing: 1.5, lineHeight: 1.2 }}>
                  With the <span style={{ color: "#F5A623" }}>#{currentPickNum}</span> pick{rounds > 1 ? ` (Rd ${roundNum}, Pk ${pickInRound})` : ""}, the{" "}
                  <span style={{ color: "#F5A623" }}>{currentTeam.name}</span> select...
                </div>
              </div>
              {isUserTurn && userTeamIdx === null && (
                <button onClick={() => { const auto = available[0]; if (auto) setConfirming(auto); }}
                  style={{ background: "#222", border: "1px solid #333", borderRadius: 8, color: "#888", padding: "8px 14px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, letterSpacing: 2, cursor: "pointer", flexShrink: 0 }}>
                  AUTO
                </button>
              )}
            </div>

            {/* Not user turn */}
            {!isUserTurn && (
              <div style={{ background: "#0D0D0D", borderRadius: 10, padding: "10px 16px", marginBottom: 12, color: "#333", textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2 }}>
                AUTO-PICKING FOR {currentTeam.name.toUpperCase()}...
              </div>
            )}

            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "center", flexWrap: "wrap" as const }}>
              <div style={{ display: "flex", gap: 5 }}>
                {["ALL","PG","SG","SF","PF","C"].map(p => (
                  <button key={p} onClick={() => setPosFilter(p)}
                    style={{ background: posFilter === p ? "#F5A623" : "#111", border: `1px solid ${posFilter === p ? "#F5A623" : "#1A1A1A"}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", color: posFilter === p ? "#0A0A0A" : "#666", fontFamily: "'Bebas Neue',sans-serif", fontSize: 12, letterSpacing: 1 }}>
                    {p}
                  </button>
                ))}
              </div>
              <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search player or school..." style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 6, padding: "5px 10px", color: "white", fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, flex: 1, minWidth: 140 }} />
            </div>

            <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>AVAILABLE ({filteredAvailable.length})</div>

            {/* Player list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {filteredAvailable.map((p: any) => (
                <div key={p.rank} style={{ background: "#111", border: "1px solid #1A1A1A", borderRadius: 10, padding: "10px 12px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, color: "#2A2A2A", width: 30, textAlign: "center", flexShrink: 0 }}>{p.rank}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                      <span style={{ background: POS_COLORS[p.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "1px 5px", borderRadius: 3, flexShrink: 0 }}>{p.pos}</span>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 16, letterSpacing: 1, lineHeight: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>{p.name}</span>
                    </div>
                    <div style={{ color: "#555", fontSize: 11 }}>{p.school}{p.age ? ` · ${p.age} yrs` : ""}</div>
                    {p.ppg > 0 && (
                      <div style={{ display: "flex", gap: 8, marginTop: 3 }}>
                        {([["PTS",p.ppg],["REB",p.rpg],["AST",p.apg],["FG%",p.fgp > 0 ? p.fgp+"%" : "—"]] as [string,any][]).map(([l,v]) => (
                          <span key={l}>
                            <span style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13 }}>{v}</span>
                            <span style={{ color: "#444", fontSize: 10, marginLeft: 2 }}>{l}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button onClick={() => setConfirming(p)} disabled={!isUserTurn}
                    style={{ background: isUserTurn ? "#F5A623" : "#1A1A1A", color: isUserTurn ? "#0A0A0A" : "#333", border: "none", borderRadius: 7, padding: "7px 16px", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 2, cursor: isUserTurn ? "pointer" : "not-allowed", flexShrink: 0 }}>
                    DRAFT
                  </button>
                </div>
              ))}
            </div>

            {/* Recent picks */}
            {picks.length > 0 && (
              <div style={{ marginTop: 16 }}>
                <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>RECENT PICKS</div>
                {picks.slice(-6).reverse().map((pk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: "#0D0D0D", borderRadius: 6, marginBottom: 3 }}>
                    <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, width: 24 }}>#{pk.pickNum}</div>
                    <TeamLogo team={NBA_TEAMS[pk.teamIdx]} size={20} />
                    <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 8, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 4px", borderRadius: 2 }}>{pk.prospect.pos}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 1 }}>{pk.prospect.name}</span>
                      <span style={{ color: "#444", fontSize: 11, marginLeft: 6 }}>{pk.prospect.school}</span>
                    </div>
                    <span style={{ color: "#333", fontSize: 11 }}>{NBA_TEAMS[pk.teamIdx].abbr}</span>
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
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 13, letterSpacing: 2, color: "#F5A623" }}>{currentTeam.name.toUpperCase()}</div>
                </div>
              </div>
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div style={{ display: "inline-block", background: POS_COLORS[confirming.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 10, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1, padding: "2px 8px", borderRadius: 4, marginBottom: 8 }}>{confirming.pos}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(1.4rem,4vw,2rem)", letterSpacing: 3, lineHeight: 1, marginBottom: 4 }}>{confirming.name}</div>
                <div style={{ color: "#555", fontSize: 13 }}>{confirming.school}{confirming.age ? ` · ${confirming.age} yrs` : ""}</div>
              </div>
              {confirming.ppg > 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14, background: "#0D0D0D", borderRadius: 10, padding: "10px" }}>
                  {([["PTS",confirming.ppg],["REB",confirming.rpg],["AST",confirming.apg]] as [string,number][]).map(([l,v]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 26, color: "#F5A623", lineHeight: 1 }}>{v}</div>
                      <div style={{ color: "#444", fontSize: 10, letterSpacing: 1 }}>{l}</div>
                    </div>
                  ))}
                </div>
              )}
              {confirming.ppg === 0 && (
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

            {userTeamIdx !== null && (
              <div style={{ background: "#111", border: "2px solid #F5A623", borderRadius: 14, padding: "1.2rem", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <TeamLogo team={NBA_TEAMS[userTeamIdx]} size={44} />
                  <div>
                    <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2 }}>YOUR PICKS</div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 18, letterSpacing: 2 }}>{NBA_TEAMS[userTeamIdx].name.toUpperCase()}</div>
                  </div>
                </div>
                {picks.filter(p => p.teamIdx === userTeamIdx).map((pk, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid #1A1A1A" }}>
                    <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, width: 28 }}>#{pk.pickNum}</div>
                    <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 5px", borderRadius: 3 }}>{pk.prospect.pos}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, letterSpacing: 1 }}>{pk.prospect.name}</div>
                      <div style={{ color: "#555", fontSize: 11 }}>{pk.prospect.school}</div>
                    </div>
                    {pk.prospect.ppg > 0 && <div style={{ color: "#F5A623", fontFamily: "'Bebas Neue',sans-serif", fontSize: 13 }}>{pk.prospect.ppg} PTS</div>}
                  </div>
                ))}
              </div>
            )}

            <div style={{ color: "#333", fontFamily: "'Bebas Neue',sans-serif", fontSize: 11, letterSpacing: 2, marginBottom: 8 }}>FULL DRAFT BOARD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 20 }}>
              {picks.map((pk, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", background: userTeamIdx !== null && pk.teamIdx === userTeamIdx ? "#161400" : "#0D0D0D", border: `1px solid ${userTeamIdx !== null && pk.teamIdx === userTeamIdx ? "#F5A62344" : "transparent"}`, borderRadius: 7 }}>
                  <div style={{ color: "#2A2A2A", fontFamily: "'Bebas Neue',sans-serif", fontSize: 15, width: 28, textAlign: "center", flexShrink: 0 }}>{pk.pickNum}</div>
                  <TeamLogo team={NBA_TEAMS[pk.teamIdx]} size={24} />
                  <span style={{ background: POS_COLORS[pk.prospect.pos.split("/")[0]] || "#555", color: "#0A0A0A", fontSize: 8, fontFamily: "'Bebas Neue',sans-serif", padding: "1px 4px", borderRadius: 2, flexShrink: 0 }}>{pk.prospect.pos}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 14, letterSpacing: 1 }}>{pk.prospect.name}</span>
                    <span style={{ color: "#444", fontSize: 11, marginLeft: 6 }}>{pk.prospect.school}</span>
                  </div>
                  <span style={{ color: "#333", fontSize: 11, flexShrink: 0 }}>{NBA_TEAMS[pk.teamIdx].abbr}</span>
                  {userTeamIdx !== null && pk.teamIdx === userTeamIdx && <span style={{ color: "#F5A623", fontSize: 9, fontFamily: "'Bebas Neue',sans-serif", letterSpacing: 1 }}>YOU</span>}
                </div>
              ))}
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
