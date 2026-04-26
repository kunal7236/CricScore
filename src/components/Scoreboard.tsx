import React from 'react';
import type { TeamScore, MiniScore, MatchHeader } from '../types/cricket';

interface Props {
  batting?: TeamScore;
  status: string;
  state: string;
  views?: string | number;
  miniscore?: MiniScore;
  matchHeader?: MatchHeader;
}

const Scoreboard: React.FC<Props> = ({ 
  batting, 
  status, 
  state, 
  views, 
  miniscore,
  matchHeader 
}) => {
  const getNumber = (...values: Array<unknown>) => {
    for (const value of values) {
      const parsed = Number(value);
      if (Number.isFinite(parsed)) return parsed;
    }
    return 0;
  };

  const getText = (...values: Array<unknown>) => {
    for (const value of values) {
      if (typeof value === 'string' && value.trim()) return value.trim();
    }
    return '';
  };

  const strikerData = miniscore?.batsmanStriker as any;
  const nonStrikerData = miniscore?.batsmanNonStriker as any;

  const isLive = state === 'inprogress' || state === 'In Progress';
  const currentRR = getNumber(miniscore?.currentRunRate).toFixed(2);
  const requiredRR = getNumber(miniscore?.requiredRunRate).toFixed(2);
  const inningsFromScoreList = miniscore?.matchScoreDetails?.inningsScoreList?.at(-1)?.inningsId;
  const currentInnings = getNumber(miniscore?.inningsId, inningsFromScoreList, 1);
  const isSecondInnings = currentInnings >= 2;
  const currentInningsEntry = miniscore?.matchScoreDetails?.inningsScoreList?.find(
    (entry) => entry?.inningsId === currentInnings,
  );
  const currentTeamName =
    getText(miniscore?.batTeam?.teamName, currentInningsEntry?.batTeamName) ||
    (isSecondInnings ? matchHeader?.team2.shortName : matchHeader?.team1.shortName) ||
    'TEAM';
  const currentScore = getNumber(
    miniscore?.batTeam?.teamScore,
    currentInningsEntry?.score,
    batting?.teamScore,
  );
  const currentWickets = getNumber(
    miniscore?.batTeam?.teamWkts,
    currentInningsEntry?.wickets,
    batting?.teamWkts,
  );
  const currentOvers = getNumber(miniscore?.overs, currentInningsEntry?.overs);
  const target = getNumber(miniscore?.target);
  const partnershipRuns = getNumber(miniscore?.partnerShip?.runs);
  const remainingToWin = getNumber(miniscore?.remRunsToWin);

  const strikerName = getText(strikerData?.name, strikerData?.batName);
  const strikerRuns = getNumber(strikerData?.runs, strikerData?.batRuns);
  const strikerBalls = getNumber(strikerData?.balls, strikerData?.batBalls);
  const strikerFours = getNumber(strikerData?.fours, strikerData?.batFours);
  const strikerSixes = getNumber(strikerData?.sixes, strikerData?.batSixes);

  const nonStrikerName = getText(nonStrikerData?.name, nonStrikerData?.batName);
  const nonStrikerRuns = getNumber(nonStrikerData?.runs, nonStrikerData?.batRuns);
  const nonStrikerBalls = getNumber(nonStrikerData?.balls, nonStrikerData?.batBalls);
  const nonStrikerFours = getNumber(nonStrikerData?.fours, nonStrikerData?.batFours);
  const nonStrikerSixes = getNumber(nonStrikerData?.sixes, nonStrikerData?.batSixes);
  const viewLabel = typeof views === 'number'
    ? `${(views / 1000000).toFixed(1)}M watching`
    : views
      ? `${views} watching`
      : '';

  return (
    <div className="space-y-6 mb-8">
      {/* Live Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="vintage-badge vintage-badge-live">
              <div className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse-slow"></div>
              Live
            </span>
          ) : (
            <span className="vintage-badge vintage-badge-completed">
              Completed
            </span>
          )}
        </div>
        {viewLabel && (
          <div className="text-xs font-bold text-charcoal/50 flex items-center gap-1.5">
            👁 {viewLabel}
          </div>
        )}
      </div>

      {/* Score Card - Current Innings */}
      <div className="grid grid-cols-1 gap-4">
        <div className="vintage-card p-5 relative">
          {isSecondInnings ? <div className="absolute top-0 left-0 right-0 h-0.75 bg-forest"></div> : null}
          <div className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3">
            {isSecondInnings ? '2nd Innings' : '1st Innings'}
          </div>
          <h2 className="text-xl font-serif font-semibold text-charcoal mb-2">{currentTeamName}</h2>
          <div className="score-display text-4xl text-charcoal mb-1">
            {currentScore}
            <span className="text-2xl text-charcoal/50">/{currentWickets}</span>
          </div>
          <div className="text-xs text-charcoal/60 font-medium">
            {currentOvers} Overs
            {isSecondInnings ? (
              <>
                {' '}• Target: <span className="text-charcoal font-bold">{target}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Run Rates & Key Stats */}
      {miniscore && (
        <div className={`grid grid-cols-2 ${isSecondInnings ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-3`}>
          <div className="bg-blue-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-blue-800/70 uppercase tracking-wider">Current Run Rate (CRR)</div>
            <div className="text-2xl font-bold font-serif text-blue-900">{currentRR}</div>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-purple-800/70 uppercase tracking-wider">Partnership</div>
            <div className="text-2xl font-bold font-serif text-purple-900">{partnershipRuns}</div>
          </div>
          {isSecondInnings && (
            <>
              <div className="bg-amber-500/10 rounded-lg p-3">
                <div className="text-xs font-bold text-amber-800/70 uppercase tracking-wider">Required Run Rate (RRR)</div>
                <div className="text-2xl font-bold font-serif text-amber-900">{requiredRR}</div>
              </div>
              <div className="bg-emerald-500/10 rounded-lg p-3">
                <div className="text-xs font-bold text-emerald-800/70 uppercase tracking-wider">To Win</div>
                <div className="text-2xl font-bold font-serif text-emerald-900">{remainingToWin}</div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Batsman Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strikerData && (
          <div className="vintage-card p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif font-semibold text-charcoal">{strikerName ? `${strikerName}*` : 'Striker'}</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Runs</div>
                <div className="font-bold">{strikerRuns}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Balls</div>
                <div className="font-bold">{strikerBalls}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">4s</div>
                <div className="font-bold">{strikerFours}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">6s</div>
                <div className="font-bold">{strikerSixes}</div>
              </div>
            </div>
          </div>
        )}
        {nonStrikerData && (
          <div className="vintage-card p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif font-semibold text-charcoal">{nonStrikerName || 'Non-striker'}</h3>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Runs</div>
                <div className="font-bold">{nonStrikerRuns}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Balls</div>
                <div className="font-bold">{nonStrikerBalls}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">4s</div>
                <div className="font-bold">{nonStrikerFours}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">6s</div>
                <div className="font-bold">{nonStrikerSixes}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-charcoal rounded-md p-4 text-center text-cream font-medium">
        {status}
      </div>
    </div>
  );
};

export default Scoreboard;