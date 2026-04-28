import type { BallCommentary } from '../types/cricket';

export const CommentaryItem = ({ ball }: { ball: BallCommentary }) => {
  const eventTokens = Array.isArray(ball.event)
    ? ball.event.map((item) => String(item).toLowerCase())
    : [String(ball.event || '').toLowerCase()];

  const hasEvent = (keyword: string) => eventTokens.some((token) => token.includes(keyword));

  const isWicket = hasEvent('wicket');
  const isFour = hasEvent('four');
  const isSix = hasEvent('six');

  const getOutcomeIcon = () => {
    if (isWicket) return 'W';
    if (isSix) return '6';
    if (isFour) return '4';
  };

  const outcomeIcon = getOutcomeIcon();
  
  let bgColor = 'bg-white';
  let borderColor = 'border-charcoal/20';
  let accentColor = 'bg-white';
  
  if (isWicket) {
    bgColor = 'bg-red-50';
    accentColor = 'bg-red-600';
  } else if (isSix) {
    bgColor = 'bg-amber-50';
    accentColor = 'bg-amber-600';
  } else if (isFour) {
    bgColor = 'bg-blue-50';
    accentColor = 'bg-blue-600';
  }

  return (
    <div className={`flex gap-4 p-4 rounded-lg border ${borderColor} ${bgColor} transition-all hover:shadow-md items-start`}>
      <div className={`w-10 h-10 rounded-lg text-xs font-bold shrink-0 flex items-center justify-center text-white ${accentColor}`}>
        {outcomeIcon}
      </div>
      <div className="grow">
        <p className="text-charcoal leading-relaxed" 
           dangerouslySetInnerHTML={{ __html: ball.commText }} />
            <div className="text-xs font-bold text-charcoal/50 mt-2">
              {ball.ballMetric ? `${ball.ballMetric} Overs` : ''}
              {ball.batsmanDetails?.playerName ? (
                <span className="block">{ball.batsmanDetails.playerName ? `${ball.batsmanDetails.playerName} on the strike.` : ''}</span>
              ) : null}
        </div>
      </div>
    </div>
  );
};