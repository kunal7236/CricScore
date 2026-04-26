import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMatchFullData } from '../api/client';
import Scoreboard from '../components/Scoreboard';

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
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <p className="text-slate-500 font-bold mb-4">Match ID not found</p>
      <button onClick={() => navigate('/')} className="text-blue-500 font-black uppercase text-xs tracking-widest">Go Back</button>
    </div>
  );

  if (!data) return <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-300 animate-pulse font-black uppercase tracking-widest">Loading Field...</div>;

  const commentary = data.matchCommentary ? Object.values(data.matchCommentary).reverse().slice(0, 50) : [];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-6">
      <button 
        onClick={() => navigate('/')} 
        className="mb-6 flex items-center gap-2 text-sm font-black text-slate-600 hover:text-slate-900 transition"
      >
        ← Back
      </button>
      
      <div className="max-w-4xl mx-auto">
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
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-slate-900 rounded-full"></div>
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Ball by Ball</h2>
          </div>

          <div className="space-y-2">
            {commentary.slice(0, 20).map((item: any, idx: number) => {
              // Skip non-commentary items
              if (!item.commText || item.commType !== 'commentary') return null;
              
              // Check if this is a over summary or special event
              const isWicket = item.event?.includes('wicket');
              const isFour = item.event?.includes('four');
              const isSix = item.event?.includes('six');
              
              let bgColor = 'bg-white';
              let borderColor = 'border-slate-100';
              let accentColor = 'bg-slate-900';
              
              if (isWicket) {
                bgColor = 'bg-red-50';
                borderColor = 'border-red-200';
                accentColor = 'bg-red-600';
              } else if (isSix) {
                bgColor = 'bg-amber-50';
                borderColor = 'border-amber-200';
                accentColor = 'bg-amber-600';
              } else if (isFour) {
                bgColor = 'bg-blue-50';
                borderColor = 'border-blue-200';
                accentColor = 'bg-blue-600';
              }

              return (
                <div 
                  key={idx} 
                  className={`flex gap-4 p-4 ${bgColor} border ${borderColor} rounded-lg shadow-sm items-start hover:shadow-md transition`}
                >
                  {/* Ball metric badge */}
                  <div className={`${accentColor} text-white flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg text-xs font-black`}>
                    {item.ballMetric ? String(item.ballMetric).split('.')[1] || '○' : '•'}
                  </div>
                  
                  {/* Commentary text */}
                  <div className="flex-grow min-w-0">
                    <p 
                      className="text-slate-800 text-sm font-medium leading-relaxed" 
                      dangerouslySetInnerHTML={{ __html: item.commText }}
                    />
                    
                    {/* Player details */}
                    {(item.batsmanDetails?.playerName || item.bowlerDetails?.playerName) && (
                      <div className="flex gap-3 mt-2 text-xs text-slate-500 flex-wrap">
                        {item.batsmanDetails?.playerName && (
                          <span className="font-bold">🏏 {item.batsmanDetails.playerName}</span>
                        )}
                        {item.bowlerDetails?.playerName && (
                          <span className="font-bold">🎯 {item.bowlerDetails.playerName}</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;