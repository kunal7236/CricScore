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
  const strikeRate = Number(miniscore?.batsmanStriker?.strikeRate || 0);
  const nonStrikerRate = Number(miniscore?.batsmanNonStriker?.strikeRate || 0);
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
          <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 
            ${isLive ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
            {isLive && <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />}
            {isLive ? '● LIVE' : '● COMPLETED'}
          </span>
        </div>
        {viewLabel && (
          <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
            👁 {viewLabel}
          </div>
        )}
      </div>

      {/* Score Cards - Both Innings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Innings - CSK */}
        <div className="bg-gradient-to-br from-amber-50 to-white border border-amber-200 rounded-xl p-5">
          <div className="text-xs font-black text-amber-700 uppercase tracking-widest mb-3">
            1st Innings
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">{matchHeader?.team1.shortName || 'TEAM 1'}</h2>
          <div className="text-4xl font-black text-slate-900 mb-1">
            {miniscore?.matchScoreDetails?.inningsScoreList?.[1]?.score ?? batting?.teamScore ?? 0}
            <span className="text-2xl text-slate-500">/{miniscore?.matchScoreDetails?.inningsScoreList?.[1]?.wickets ?? batting?.teamWkts ?? 0}</span>
          </div>
          <div className="text-xs text-slate-600 font-bold">
            {miniscore?.matchScoreDetails?.inningsScoreList?.[1]?.overs ?? 0} Overs
          </div>
        </div>

        {/* Second Innings - GT */}
        <div className="bg-gradient-to-br from-slate-100 to-white border border-slate-300 rounded-xl p-5">
          <div className="text-xs font-black text-slate-700 uppercase tracking-widest mb-3">
            2nd Innings
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-2">{matchHeader?.team2.shortName || 'TEAM 2'}</h2>
          <div className="text-4xl font-black text-slate-900 mb-1">
            {batting?.teamScore ?? 0}
            <span className="text-2xl text-slate-500">/{batting?.teamWkts ?? 0}</span>
          </div>
          <div className="text-xs text-slate-600 font-bold">
            {miniscore?.overs ?? 0} Overs • Target: <span className="text-slate-900 font-black">{miniscore?.target ?? 0}</span>
          </div>
        </div>
      </div>

      {/* Run Rates & Key Stats */}
      {miniscore && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">CRR</div>
            <div className="text-2xl font-black text-blue-900">{currentRR}</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="text-xs font-bold text-orange-700 uppercase tracking-wider">RRR</div>
            <div className="text-2xl font-black text-orange-900">{requiredRR}</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Partnership</div>
            <div className="text-2xl font-black text-purple-900">{miniscore.partnerShip?.runs || 0}</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider">To Win</div>
            <div className="text-2xl font-black text-emerald-900">{miniscore.remRunsToWin || 0}</div>
          </div>
        </div>
      )}

      {/* Current Players */}
      {miniscore && (
        <div className="space-y-3">
          <div className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">At the Crease</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Striker */}
            {miniscore.batsmanStriker && (
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Striker</div>
                    <div className="text-lg font-black text-slate-900">{miniscore.batsmanStriker.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-slate-900">{miniscore.batsmanStriker.runs}</div>
                    <div className="text-xs text-slate-500">({miniscore.batsmanStriker.balls}b)</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{miniscore.batsmanStriker.fours}</div>
                    <div className="text-slate-500">4s</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{miniscore.batsmanStriker.sixes}</div>
                    <div className="text-slate-500">6s</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{strikeRate.toFixed(0)}</div>
                    <div className="text-slate-500">SR</div>
                  </div>
                </div>
              </div>
            )}

            {/* Non-Striker */}
            {miniscore.batsmanNonStriker && (
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Non-Striker</div>
                    <div className="text-lg font-black text-slate-900">{miniscore.batsmanNonStriker.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-slate-900">{miniscore.batsmanNonStriker.runs}</div>
                    <div className="text-xs text-slate-500">({miniscore.batsmanNonStriker.balls}b)</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{miniscore.batsmanNonStriker.fours}</div>
                    <div className="text-slate-500">4s</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{miniscore.batsmanNonStriker.sixes}</div>
                    <div className="text-slate-500">6s</div>
                  </div>
                  <div className="bg-slate-50 rounded p-2 text-center">
                    <div className="font-bold text-slate-900">{nonStrikerRate.toFixed(0)}</div>
                    <div className="text-slate-500">SR</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bowler */}
          {miniscore.bowlerStriker && (
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Bowling</div>
                  <div className="text-lg font-black text-slate-900">{miniscore.bowlerStriker.name}</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-slate-900">{miniscore.bowlerStriker.overs}</div>
                  <div className="text-slate-500">Overs</div>
                </div>
                <div className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-slate-900">{miniscore.bowlerStriker.runs}</div>
                  <div className="text-slate-500">Runs</div>
                </div>
                <div className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-slate-900">{miniscore.bowlerStriker.wickets}</div>
                  <div className="text-slate-500">Wkts</div>
                </div>
                <div className="bg-slate-50 rounded p-2 text-center">
                  <div className="font-bold text-slate-900">{miniscore.bowlerStriker.economy?.toFixed(1)}</div>
                  <div className="text-slate-500">Econ</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Message */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg p-4 text-center">
        <p className="text-sm font-bold text-white leading-relaxed">{status}</p>
      </div>
    </div>
  );
};

export default Scoreboard;