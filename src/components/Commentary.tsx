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

    const commTextPlain = String(ball.commText || '').toLowerCase();
    if (commTextPlain.includes('no run')) return '0';
    if (commTextPlain.includes('1 run') || commTextPlain.includes('one run')) return '1';
    if (commTextPlain.includes('2 runs') || commTextPlain.includes('two runs')) return '2';
    if (commTextPlain.includes('3 runs') || commTextPlain.includes('three runs')) return '3';
    if (commTextPlain.includes('5 runs') || commTextPlain.includes('five runs')) return '5';
    if (commTextPlain.includes('wide')) return 'Wd';
    if (commTextPlain.includes('no ball') || commTextPlain.includes('no-ball')) return 'Nb';

    return '•';
  };

  const outcomeIcon = getOutcomeIcon();
  
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
        {outcomeIcon}
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
        </div>
      )}
    </div>
  );
};