import type { MatchIndexItem } from "../types/cricket";
import { Link } from "react-router-dom";

export const MatchCard = ({ match }: { match: MatchIndexItem }) => (
  <Link to={`/match/${match.id}`} className="block group">
    <div className="vintage-card p-5 h-full transition-all duration-300 hover:shadow-lg hover:border-gold">
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <div className="flex justify-between items-start mb-4">
            {match.status === 'Live Now' ? (
              <span className="vintage-badge vintage-badge-live">
                <div className="w-1.5 h-1.5 rounded-full bg-burgundy animate-pulse-slow"></div>
                Live
              </span>
            ) : (
              <span className="vintage-badge vintage-badge-completed">
                Completed
              </span>
            )}
          </div>
          <h2 className="font-serif text-xl font-semibold text-charcoal leading-tight">
            {match.title}
          </h2>
        </div>
        
        <div className="mt-6 pt-4 border-t border-parchment flex justify-between items-center text-xs uppercase font-bold tracking-wider">
          {/* <span className="text-charcoal/50">Match ID: {match.id}</span> */}
          <div className="flex items-center gap-2 text-gold transition-transform duration-300 group-hover:translate-x-1">
            <span>View</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </Link>
);
