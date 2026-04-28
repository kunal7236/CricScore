import React from 'react';

interface PlayerStatProps {
  label: string;
  value: string | number;
}

const PlayerStat: React.FC<PlayerStatProps> = ({ label, value }) => (
  <div className="bg-[#F5EDE4] rounded p-2 border border-parchment">
    <div className="text-xs text-charcoal/60">{label}</div>
    <div className="font-bold">{value}</div>
  </div>
);

export default PlayerStat;
