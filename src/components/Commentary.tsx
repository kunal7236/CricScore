import type { BallCommentary } from '../types/cricket';

export const CommentaryItem = ({ ball }: { ball: BallCommentary }) => {
  const isWicket = ball.event?.includes('wicket');
  const isFour = ball.event?.includes('four');
  const isSix = ball.event?.includes('six');
  
  let bgColor = 'bg-white';
  let borderColor = 'border-parchment';
  let accentColor = 'bg-charcoal';
  
  if (isWicket) {
    bgColor = 'bg-red-50';
    borderColor = 'border-red-100';
    accentColor = 'bg-burgundy';
  } else if (isSix) {
    bgColor = 'bg-amber-50';
    borderColor = 'border-amber-100';
    accentColor = 'bg-gold';
  } else if (isFour) {
    bgColor = 'bg-blue-50';
    borderColor = 'border-blue-100';
    accentColor = 'bg-blue-600';
  }

  return (
    <div className={`flex gap-4 p-4 rounded-lg border ${borderColor} ${bgColor} transition-all hover:shadow-md items-start`}>
      <div className={`w-10 h-10 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center text-white ${accentColor}`}>
        {ball.ballMetric ? String(ball.ballMetric).split('.')[1] || '•' : '•'}
      </div>
      <div className="grow">
        <p className="text-charcoal leading-relaxed" 
           dangerouslySetInnerHTML={{ __html: ball.commText }} />
            <div className="text-xs font-bold text-charcoal/50 mt-2">
              {ball.ballMetric ? `${ball.ballMetric} overs` : ''}
              {ball.batsmanDetails?.playerName ? (
                <span className="block">{ball.batsmanDetails.playerName ? `${ball.batsmanDetails.playerName} on the strike.` : ''}</span>
              ) : null}
        </div>
      </div>
      {isWicket && (
        <div className="ml-auto text-right">
          <div className="font-bold text-burgundy">WICKET</div>
          <div className="text-xs text-charcoal/70">{ball.event}</div>
        </div>
      )}
    </div>
  );
};