import type { MatchIndexItem } from "../types/cricket";
import { Link } from "react-router-dom";

export const MatchCard = ({ match }: { match: MatchIndexItem }) => (
  <Link to={`/match/${match.id}`} className="block">
    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-blue-500 transition-all group">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600">
          {match.title}
        </h3>
        <div className="text-xs font-semibold text-slate-400">
          ID: {match.id}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-blue-500 font-medium">
        View Live Commentary
        <span className="text-xl">→</span>
      </div>
    </div>
  </Link>
);
