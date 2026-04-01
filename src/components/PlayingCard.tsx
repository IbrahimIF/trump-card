import { Card, CardSuit, CardType } from '../types/card';
import './PlayingCard.css';

interface PlayingCardProps {
  card: Card;
  isAdmin?: boolean;
  onFlip?: (id: string) => void;
}

const SUIT_SYMBOLS: Record<CardSuit, string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
};

const TYPE_LABELS: Record<CardType, string> = {
  standard: '',
  trump: 'TRUMP',
  ace: 'ACE',
  'last-ditch': 'LAST DITCH',
  wild: 'WILD',
  resource: 'RESOURCE',
};

export function PlayingCard({ card, isAdmin = true, onFlip }: PlayingCardProps) {
  const isAceHidden = card.type === 'ace' && !isAdmin;

  const suitSymbol = card.suit ? SUIT_SYMBOLS[card.suit] : null;
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const typeLabel = TYPE_LABELS[card.type];

  const classNames = [
    'playing-card',
    `status-${card.status}`,
    `type-${card.type}`,
    card.isFlipped ? 'flipped' : '',
    isAceHidden ? 'ace-hidden' : '',
    card.suit ? `suit-${card.suit}` : '',
    isRed ? 'red' : 'black',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (!isAceHidden && onFlip) onFlip(card.id);
  }

  return (
    <div
      className={classNames}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={isAceHidden ? 'Hidden card' : `${card.title} — ${card.status}`}
    >
      <div className="card-inner">
        {/* Back */}
        <div className="card-back">
          <div className="card-back-pattern" />
        </div>

        {/* Front */}
        <div className="card-front">
          {typeLabel && (
            <span className="card-type-badge">{typeLabel}</span>
          )}

          <div className="card-corner top-left">
            {suitSymbol && <span className="corner-suit">{suitSymbol}</span>}
          </div>

          <div className="card-body">
            <h3 className="card-title">{card.title}</h3>
            {card.notes && <p className="card-notes">{card.notes}</p>}
            {card.expiryDate && (
              <span className="card-expiry">
                Expires {new Date(card.expiryDate).toLocaleDateString('en-GB')}
              </span>
            )}
          </div>

          <div className="card-corner bottom-right">
            {suitSymbol && <span className="corner-suit">{suitSymbol}</span>}
          </div>

          <div className="card-status-dot" title={card.status} />
        </div>
      </div>
    </div>
  );
}
