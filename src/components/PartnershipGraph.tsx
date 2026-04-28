import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPartnershipData } from '../api/client';
import type { PartnershipData, PartnershipDataItem } from '../types/partnership';

interface PartnershipGraphProps {
  matchId: string;
}

const PartnershipGraph: React.FC<PartnershipGraphProps> = ({ matchId }) => {
  const { data, isLoading, error } = useQuery<PartnershipData[]>({
    queryKey: ['partnership', matchId],
    queryFn: () => getPartnershipData(matchId),
  });

  if (isLoading) return <div>Loading Partnership...</div>;
  if (error) return <div>Error fetching partnership data.</div>;
  if (!data) return null;

  return (
    <div className="vintage-card p-5">
      <h2 className="text-2xl font-serif font-semibold text-charcoal mb-4">
        Partnership Graph
      </h2>

      {data.map((inning) => {
        const maxRuns = Math.max(
          ...inning.partnershipDataDTO.map(p => Number(p.totalRuns))
        );

        return (
          <div key={inning.inningsID} className="mb-8">
            <h3 className="text-lg font-bold font-serif text-charcoal mb-3">
              {inning.batTeamName} Innings
            </h3>

            <div className="space-y-4">
              {inning.partnershipDataDTO.map((p, index) => (
                <PartnershipBar
                  key={index}
                  partnership={p}
                  maxRuns={maxRuns}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};


const PartnershipBar: React.FC<{ partnership: PartnershipDataItem; maxRuns: number }> = ({
  partnership,
  maxRuns,
}) => {
  const totalRuns = Number(partnership.totalRuns);
  const bat1Runs = Number(partnership.bat1Runs);
  const bat2Runs = Number(partnership.bat2Runs);

  const totalWidth = maxRuns > 0 ? (totalRuns / maxRuns) * 100 : 0;

  const bat1Width = totalRuns > 0 ? (bat1Runs / totalRuns) * 100 : 0;
  const bat2Width = totalRuns > 0 ? (bat2Runs / totalRuns) * 100 : 0;

  return (
    <div className="flex items-center justify-between gap-4 font-sans">
      {/* LEFT BATTER */}
      <div className="w-1/3 text-right">
        <p className="font-semibold text-sm text-charcoal">{partnership.bat1Name}</p>
        <p className="text-xs text-charcoal/80">
          {bat1Runs} ({partnership.bat1balls})
        </p>
      </div>

      {/* CENTER GRAPH */}
      <div className="w-1/3 flex flex-col items-center">
        {/* Total label */}
        <p className="text-sm font-bold text-charcoal mb-1">
          {totalRuns} ({partnership.totalBalls})
        </p>

        {/* Bar */}
        <div className="w-full h-2 bg-parchment rounded overflow-hidden border border-charcoal/30">
          <div
            className="h-full flex"
            style={{ width: `${totalWidth}%` }}
          >
            <div
              className="bg-linear-to-r from-gold to-goldDark"
              style={{ width: `${bat1Width}%` }}
            />
            <div
              className="bg-linear-to-r from-goldDark to-gold"
              style={{ width: `${bat2Width}%` }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT BATTER */}
      <div className="w-1/3 text-left">
        <p className="font-semibold text-sm text-charcoal">{partnership.bat2Name}</p>
        <p className="text-xs text-charcoal/80">
          {bat2Runs} ({partnership.bat2balls})
        </p>
      </div>
    </div>
  );
};

export default PartnershipGraph;