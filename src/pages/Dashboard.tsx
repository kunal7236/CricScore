import React, { useEffect, useState } from 'react';
import type { MatchIndexItem } from '../types/cricket';
import { MatchCard } from '../components/MatchCard';
import { getActiveMatches } from '../api/client';

const Dashboard: React.FC = () => {
  const [matches, setMatches] = useState<MatchIndexItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndex = async () => {
      try {
        const extractedMatches = await getActiveMatches();
        setMatches(extractedMatches as MatchIndexItem[]);
      } catch (error) {
        console.error("Failed to scrape match list", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIndex();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-cream flex items-center justify-center">
      <div className="font-serif text-lg font-medium text-charcoal/50 animate-pulse">
        Scanning Global Fixtures...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream font-sans text-charcoal">
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex justify-center items-center gap-4">
            <div className="w-8 h-px bg-gold"></div>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-charcoal">
              CRIC-DASH
            </h1>
            <div className="w-8 h-px bg-gold"></div>
          </div>
          <p className="text-charcoal/60 text-sm font-semibold uppercase tracking-widest mt-2">
            Vintage Scorecard
          </p>
        </header>

        {/* Matches Grid */}
        {matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="font-serif text-xl text-charcoal/70">No matches found.</p>
            <p className="text-sm text-charcoal/50 mt-2">Please check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;