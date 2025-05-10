export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
}

export interface Player {
  id: number;
  name: string;
  photo: string;
  position: string;
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: {
    goals: number;
    assists: number;
    minutesPlayed: number;
    appearances: number;
    yellowCards: number;
    redCards: number;
    shots: number;
    shotsOnTarget: number;
    passes: number;
    passAccuracy: number;
    tackles: number;
    interceptions: number;
    saves?: number;
    cleanSheets?: number;
  };
  achievements?: string[];
  career?: {
    team: string;
    period: string;
    role: string;
    achievements: string;
  }[];
}

export interface Match {
  id: number;
  competition: {
    id: number;
    name: string;
  };
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
  };
  utcDate: string;
  status: string;
}

export interface Scorer {
  player: {
    id: number;
    name: string;
  };
  team: {
    id: number;
    name: string;
  };
  goals: number;
  assists: number;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
}
