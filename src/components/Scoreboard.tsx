import React from 'react';
import type { TeamScore, MiniScore, MatchHeader } from '../types/cricket';
import StatCard from './StatCard';
import BatsmanCard from './BatsmanCard';

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
            <span className="vintage-badge vintage-badge-live  border border-parchment">
              <div className="w-1 h-1.5 rounded-full bg-burgundy animate-pulse-slow"></div>
              • Live
            </span>
          ) : (
            <span className="vintage-badge vintage-badge-completed  border border-parchment">
              Completed
            </span>
          )}
        </div>
        {viewLabel && (
          <div className="text-xs font-bold text-charcoal/50 flex items-center gap-1.5  border border-parchment rounded px-2 py-1">
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
          <div className="h-7.5 text-xs text-charcoal/60 font-medium flex justify-between items-end">
            <b>{currentOvers} Overs</b>
            {isSecondInnings ? (
                <span className="text-charcoal font-bold">• Target: {target} Runs</span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Run Rates & Key Stats */}
      {miniscore && (
        <div className={`grid grid-cols-2 ${isSecondInnings ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-3`}>
          <StatCard title="Current Run Rate (CRR)" value={currentRR} color="blue" />
          <StatCard title="Partnership" value={partnershipRuns} color="purple" />
          {isSecondInnings && (
            <>
              <StatCard title="Required Run Rate (RRR)" value={requiredRR} color="amber" />
              <StatCard title="To Win" value={remainingToWin} color="emerald" />
            </>
          )}
        </div>
      )}

      {/* Batsman Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strikerData && (
          <BatsmanCard
            name={strikerName}
            runs={strikerRuns}
            balls={strikerBalls}
            fours={strikerFours}
            sixes={strikerSixes}
            isStriker={true}
          />
        )}
        {nonStrikerData && (
          <BatsmanCard
            name={nonStrikerName}
            runs={nonStrikerRuns}
            balls={nonStrikerBalls}
            fours={nonStrikerFours}
            sixes={nonStrikerSixes}
            isStriker={false}
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-charcoal rounded-md p-4 text-center text-cream font-semibold font-style: italic border border-parchment text-2xl">
        {status}
      </div>
    </div>
  );
};

export default Scoreboard;