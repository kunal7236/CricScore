import type { BallCommentary } from '../types/cricket';

export const CommentaryItem = ({ ball }: { ball: BallCommentary }) => {
  const isWicket = ball.event.includes('wicket');
  const isBoundary = ball.event.includes('four') || ball.event.includes('six');

  return (
    <div className="flex gap-4 py-4 border-b border-slate-50 last:border-0">
      <div className={`w-12 h-12 flex-shrink-0 rounded-full flex items-center justify-center font-bold
        ${isWicket ? 'bg-red-500 text-white' : isBoundary ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-600'}`}>
        {ball.ballMetric || '•'}
      </div>
      <div className="flex-grow">
        <p className="text-slate-700 leading-relaxed" 
           dangerouslySetInnerHTML={{ __html: ball.commText }} />
      </div>
    </div>
  );
};