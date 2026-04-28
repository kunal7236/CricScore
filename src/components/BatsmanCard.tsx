import React from 'react';
import PlayerStat from './PlayerStat';

interface BatsmanCardProps {
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isStriker: boolean;
}

const BatsmanCard: React.FC<BatsmanCardProps> = ({ name, runs, balls, fours, sixes, isStriker }) => {
  return (
    <div className="vintage-card p-4 border border-parchment">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-serif font-semibold text-charcoal">
          {name ? `${name}${isStriker ? '*' : ''}` : (isStriker ? 'Striker' : 'Non-striker')}
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        <PlayerStat label="Runs" value={runs} />
        <PlayerStat label="Balls" value={balls} />
        <PlayerStat label="4s" value={fours} />
        <PlayerStat label="6s" value={sixes} />
      </div>
    </div>
  );
};

export default BatsmanCard;
