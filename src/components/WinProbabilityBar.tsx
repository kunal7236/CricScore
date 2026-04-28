import React from 'react';
import type { WinProbability } from '../types/cricket';

interface Props {
  winProbability?: WinProbability;
}

const WinProbabilityBar: React.FC<Props> = ({ winProbability }) => {
  if (!winProbability) return null;

  const { team1, team2 } = winProbability;
  const team1Color = team1.color.split('|')[0] || '#E6A937';
  const team2Color = team2.color.split('|')[0] || '#1E293B';

  return (
    <div className="vintage-card p-4">
      <h3 className="text-sm font-bold text-charcoal/80 uppercase tracking-wider mb-3 text-center">Win Probability</h3>
      <div className="flex items-center justify-between text-sm font-bold mb-1">
        <span style={{ color: team1Color }}>{team1.shortName}</span>
        <span style={{ color: team2Color }}>{team2.shortName}</span>
      </div>
      <div className="flex w-full h-2.5 bg-parchment rounded-full overflow-hidden border border-charcoal/10">
        <div
          className="transition-all duration-500"
          style={{ width: `${team1.percent}%`, backgroundColor: team1Color }}
        />
        <div
          className="transition-all duration-500"
          style={{ width: `${team2.percent}%`, backgroundColor: team2Color }}
        />
      </div>
      <div className="flex items-center justify-between text-lg font-serif font-bold mt-1">
        <span style={{ color: team1Color }}>{team1.percent}%</span>
        <span style={{ color: team2Color }}>{team2.percent}%</span>
      </div>
    </div>
  );
};

export default WinProbabilityBar;
