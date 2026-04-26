import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMatchFullData } from '../api/client';
import Scoreboard from '../components/Scoreboard';
import { CommentaryItem } from '../components/Commentary';

const MatchDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  const loadData = async () => {
    try {
      const result = await getMatchFullData(id!);
      setData(result);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // 15s Polling
    return () => clearInterval(interval);
  }, [id]);

  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-cream">
      <p className="font-serif text-lg text-charcoal/70 mb-4">Match ID not found</p>
      <button onClick={() => navigate('/')} className="px-4 py-2 bg-charcoal text-cream rounded hover:bg-gold transition-colors">Go Back</button>
    </div>
  );

  if (!data) return <div className="flex h-screen items-center justify-center bg-cream text-charcoal/50 animate-pulse font-serif text-lg">Loading Field...</div>;

  const commentary = data.matchCommentary ? Object.values(data.matchCommentary).reverse().slice(0, 50) : [];

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 flex items-center gap-2 text-sm font-medium text-charcoal/60 hover:text-charcoal transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          All Matches
        </button>
        
        {/* Scoreboard */}
        <Scoreboard 
          batting={data.miniscore?.batTeam} 
          status={data.status} 
          state={data.state}
          views={data.views?.viewersCount?.[0]?.count}
          miniscore={data.miniscore}
          matchHeader={data.matchHeader}
        />

        {/* Commentary Section */}
        <div className="vintage-divider">
          <div className="w-1 h-6 bg-gold rounded-full"></div>
          <h2 className="text-sm font-bold text-charcoal/60 uppercase tracking-wider">Ball by Ball</h2>
        </div>

        <div className="space-y-3">
          {commentary.map((item: any, idx: number) => {
            if (!item.commText || item.commType !== 'commentary') return null;
            return <CommentaryItem key={idx} ball={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;