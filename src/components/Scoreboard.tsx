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
  const isLive = state === 'inprogress' || state === 'In Progress';
  const currentRR = miniscore?.currentRunRate?.toFixed(2) || '0.00';
  const requiredRR = miniscore?.requiredRunRate?.toFixed(2) || '0.00';
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

      {/* Score Cards - Both Innings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Innings */}
        <div className="vintage-card p-5">
          <div className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3">
            1st Innings
          </div>
          <h2 className="text-xl font-serif font-semibold text-charcoal mb-2">{matchHeader?.team1.shortName || 'TEAM 1'}</h2>
          <div className="score-display text-4xl text-charcoal mb-1">
            {miniscore?.matchScoreDetails?.inningsScoreList?.[0]?.score ?? batting?.teamScore ?? 0}
            <span className="text-2xl text-charcoal/50">/{miniscore?.matchScoreDetails?.inningsScoreList?.[0]?.wickets ?? batting?.teamWkts ?? 0}</span>
          </div>
          <div className="text-xs text-charcoal/60 font-medium">
            {miniscore?.matchScoreDetails?.inningsScoreList?.[0]?.overs ?? 0} Overs
          </div>
        </div>

        {/* Second Innings */}
        <div className="vintage-card p-5 relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-forest"></div>
          <div className="text-xs font-bold text-charcoal/60 uppercase tracking-wider mb-3">
            2nd Innings
          </div>
          <h2 className="text-xl font-serif font-semibold text-charcoal mb-2">{matchHeader?.team2.shortName || 'TEAM 2'}</h2>
          <div className="score-display text-4xl text-charcoal mb-1">
            {miniscore?.matchScoreDetails?.inningsScoreList?.[1]?.score ?? 0}
            <span className="text-2xl text-charcoal/50">/{miniscore?.matchScoreDetails?.inningsScoreList?.[1]?.wickets ?? 0}</span>
          </div>
          <div className="text-xs text-charcoal/60 font-medium">
            {miniscore?.overs ?? 0} Overs • Target: <span className="text-charcoal font-bold">{miniscore?.target ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Run Rates & Key Stats */}
      {miniscore && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-blue-800/70 uppercase tracking-wider">CRR</div>
            <div className="text-2xl font-bold font-serif text-blue-900">{currentRR}</div>
          </div>
          <div className="bg-amber-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-amber-800/70 uppercase tracking-wider">RRR</div>
            <div className="text-2xl font-bold font-serif text-amber-900">{requiredRR}</div>
          </div>
          <div className="bg-purple-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-purple-800/70 uppercase tracking-wider">Partnership</div>
            <div className="text-2xl font-bold font-serif text-purple-900">{miniscore.partnerShip?.runs || 0}</div>
          </div>
          <div className="bg-emerald-500/10 rounded-lg p-3">
            <div className="text-xs font-bold text-emerald-800/70 uppercase tracking-wider">To Win</div>
            <div className="text-2xl font-bold font-serif text-emerald-900">{miniscore.remRunsToWin || 0}</div>
          </div>
        </div>
      )}

      {/* Batsman Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {miniscore?.batsmanStriker && (
          <div className="vintage-card p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif font-semibold text-charcoal">{miniscore.batsmanStriker.name}*</h3>
              <div className="score-display text-2xl">{miniscore.batsmanStriker.runs}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Balls</div>
                <div className="font-bold">{miniscore.batsmanStriker.balls}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">4s</div>
                <div className="font-bold">{miniscore.batsmanStriker.fours}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">6s</div>
                <div className="font-bold">{miniscore.batsmanStriker.sixes}</div>
              </div>
            </div>
          </div>
        )}
        {miniscore?.batsmanNonStriker && (
          <div className="vintage-card p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-serif font-semibold text-charcoal">{miniscore.batsmanNonStriker.name}</h3>
              <div className="score-display text-2xl">{miniscore.batsmanNonStriker.runs}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">Balls</div>
                <div className="font-bold">{miniscore.batsmanNonStriker.balls}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">4s</div>
                <div className="font-bold">{miniscore.batsmanNonStriker.fours}</div>
              </div>
              <div className="bg-[#F5EDE4] rounded p-2">
                <div className="text-xs text-charcoal/60">6s</div>
                <div className="font-bold">{miniscore.batsmanNonStriker.sixes}</div>
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