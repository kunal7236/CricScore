import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  color: 'blue' | 'purple' | 'amber' | 'emerald';
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color, children }) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-800/70 text-blue-900',
    purple: 'bg-purple-500/10 text-purple-800/70 text-purple-900',
    amber: 'bg-amber-500/10 text-amber-800/70 text-amber-900',
    emerald: 'bg-emerald-500/10 text-emerald-800/70 text-emerald-900',
  };

  const [bgColor, titleColor, valueColor] = colorClasses[color].split(' ');

  return (
    <div className={`${bgColor} rounded-lg p-3 border border-parchment`}>
      <div className={`text-xs font-bold ${titleColor} uppercase tracking-wider`}>{title}</div>
      <div className={`text-2xl font-bold font-serif ${valueColor}`}>{value}</div>
      {children}
    </div>
  );
};

export default StatCard;
