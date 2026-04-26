import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import type { MatchIndexItem } from '../types/cricket';

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<MatchIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        // This hits the vite proxy to https://www.cricbuzz.com/cricket-match/live-scores
        const { data } = await axios.get('/api/live-matches-index');
        
        // Parsing the HTML response using a temporary DOM element
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const matchLinks = doc.querySelectorAll('a[href^="/live-cricket-scores/"]');
        
        const extractedMatches: MatchIndexItem[] = [];
        const seenIds = new Set();

        matchLinks.forEach((link: any) => {
          const href = link.getAttribute('href');
          const id = href?.split('/')[2];
          const title = link.getAttribute('title') || link.innerText;

          if (id && !seenIds.has(id)) {
            seenIds.add(id);
            extractedMatches.push({
              id,
              title: title.replace(' - Complete', '').replace(' - Live', ''),
              status: title.includes('Won') ? 'Completed' : 'Live Now'
            });
          }
        });

        setMatches(extractedMatches);
      } catch (error) {
        console.error("Failed to scrape match list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndex();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 animate-pulse">
        Scanning Global Fixtures...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2">
            CRIC.DASH
          </h1>
          <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">
            IPL 2026 • Live Cricket Scores
          </p>
        </header>

        {/* Matches Grid */}
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matches.map((match) => (
              <Link key={match.id} to={`/match/${match.id}`} className="block group">
                <div className="bg-white border border-slate-200 rounded-xl p-6 transition-all duration-300 hover:border-slate-400 hover:shadow-lg group-hover:shadow-slate-300/50 h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-3 ${
                        match.status === 'Live Now' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {match.status === 'Live Now' ? '● Live' : '✓ Completed'}
                      </span>
                      <h2 className="text-lg font-black text-slate-900 leading-tight line-clamp-2">
                        {match.title}
                      </h2>
                    </div>
                    
                    <div className="mt-auto pt-4 flex justify-end">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-500 font-bold">No matches available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;