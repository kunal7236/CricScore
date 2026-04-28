/**
 * src/types/cricket.ts
 * Locked-in Types for Cricbuzz API Integration
 */

export interface TeamDetails {
  shortName: string;
  name: string;
}

export interface TeamScore {
  teamName: string;
  teamScore: number;
  teamWkts: number;
}

export interface BatterScore {
  id: number;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number | string;
}

export interface BowlerScore {
  id: number;
  name: string;
  overs: number;
  maidens: number;
  economy: number;
  runs: number;
  wickets: number;
}

export interface MatchScoreEntry {
  inningsId: number;
  batTeamId: number;
  batTeamName: string;
  score: number;
  wickets: number;
  overs: number;
  ballNbr: number;
}

export interface MatchScoreDetails {
  matchId: number;
  inningsScoreList: MatchScoreEntry[];
  isMatchNotCovered?: boolean;
  matchFormat?: string;
  customStatus?: string;
  state?: string;
  highlightedTeamId?: number;
}

export interface BallCommentary {
  matchId: string;
  commText: string;
  timestamp: number;
  ballMetric?: number;
  inningsId: number;
  event: string[];
  batsmanDetails?: {
    playerName: string;
  };
  bowlerDetails?: {
    playerName: string;
  };
}

export interface MatchHeader {
  matchId: string;
  matchDescription: string;
  matchFormat: string;
  matchType: string;
  state: "inprogress" | "preview" | "complete";
  status: string;
  year: number;
  team1: TeamDetails;
  team2: TeamDetails;
  seriesName: string;
}

export interface MiniScore {
  inningsId?: number;
  batTeam: TeamScore;
  bowlTeam: TeamScore;
  overs: number;
  currentRunRate?: number;
  target?: number;
  requiredRunRate?: number;
  partnerShip?: {
    runs: number;
    balls: number;
  };
  lastWicket?: string;
  remRunsToWin?: number;
  recentOvsStats?: string;
  batsmanStriker?: BatterScore;
  batsmanNonStriker?: BatterScore;
  bowlerStriker?: BowlerScore;
  bowlerNonStriker?: BowlerScore;
  matchScoreDetails?: MatchScoreDetails;
}

export interface WinProbability {
  matchId: number;
  drawTiePercent: number;
  team1: {
    id: number;
    percent: number;
    name: string;
    shortName: string;
    color: string;
  };
  team2: {
    id: number;
    percent: number;
    name: string;
    shortName: string;
    color: string;
  };
  lastUpdatedOver: number;
  odds: {
    team1_point: number;
    team2_point: number;
  };
}

export interface Commentary {
  winProbability?: WinProbability;
  miniScore?: MiniScore;
  matchCommentary?:Record<string, BallCommentary>;
  matchHeader?: MatchHeader;
  // other commentary properties can be added here
}

/**
 * Renamed to MatchDetails to match client.ts imports
 */
export interface MatchDetails {
  matchId: string;
  state: "inprogress" | "preview" | "complete";
  status: string;
  commentary?: Commentary;
  viewCount?: number;
}

export interface MatchIndexItem {
  id: string;
  title: string;
  status: string;
}