import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getMatchFullData } from '../api/client';
import Scoreboard from '../components/Scoreboard';
import { CommentaryItem } from '../components/Commentary';
import PartnershipGraph from '../components/PartnershipGraph';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['match', id],
    queryFn: () => getMatchFullData(id!),
    refetchInterval: 15000, // 15s polling
    enabled: !!id,
  });

  if (isLoading) return <div className="flex h-screen items-center justify-center bg-cream text-charcoal/50 animate-pulse font-serif text-lg">Loading Field...</div>;

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-cream">
      <p className="font-serif text-lg text-charcoal/70 mb-4">Match data could not be loaded.</p>
      <button onClick={() => navigate('/')} className="px-4 py-2 bg-charcoal text-cream rounded hover:bg-gold transition-colors">Go Back</button>
    </div>
  );

  if (!data) return null;

  const commentary = data.commentary?.matchCommentary
    ? Object.values(data.commentary.matchCommentary)
        .filter((item: any) => item?.commText && item?.commType === 'commentary')
        .sort((a: any, b: any) => (Number(b?.timestamp) || 0) - (Number(a?.timestamp) || 0))
        .slice(0, 50)
    : [];

  return (
    <div className="min-h-screen bg-parchment/30 font-sans text-charcoal py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 flex items-center gap-2 text-sm font-medium text-charcoal hover:text-charcoal transition"
        >
          <svg className="w-4 h-4 border border-charcoal rounded-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          All Matches
        </button>
        
        {/* Scoreboard */}
        <Scoreboard 
          batting={data.commentary?.miniScore?.batTeam} 
          status={data.status} 
          state={data.state}
          views={data.views?.viewersCount?.[0]?.count}
          miniscore={data.commentary?.miniScore}
          matchHeader={data.commentary?.matchHeader}
          commentaryData={data.commentary}
        />

        {/* Partnership Graph */}
        {id && (
          <div className="my-6">
            <PartnershipGraph matchId={id} />
          </div>
        )}

        {/* Commentary Section */}
        <div className="vintage-divider">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h2 className="text-sm font-bold text-charcoal/60 uppercase tracking-wider">Ball by Ball</h2>
        </div>

        <div className="space-y-3">
          {commentary.map((item: any, idx: number) => (
            <CommentaryItem key={`${item.timestamp || idx}-${idx}`} ball={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;