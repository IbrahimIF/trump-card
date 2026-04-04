import { useState, useRef } from 'react';
import type { Card, CardSuit, CardType, CardStatus } from '../../types/card';
import { CardActions } from '../Actions/CardActions';
import './PlayingCard.css';

interface PlayingCardProps {
  card: Card;
  isAdmin?: boolean;
  isShuffling?: boolean;
  shuffleIndex?: number;
  onFlip?: (id: string) => void;
  onStatusChange?: (id: string, status: CardStatus, note?: string) => void;
  onRemove?: (id: string) => void;
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

export function PlayingCard({ card, isAdmin = true, isShuffling = false, shuffleIndex = 0, onFlip, onStatusChange, onRemove }: PlayingCardProps) {
  const isAceHidden = card.type === 'ace' && !isAdmin;
  const [showActions, setShowActions] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    showActions ? 'card-actions-open' : '',
    isShuffling ? 'card--shuffling' : '',
  ]
    .filter(Boolean)
    .join(' ');

  function handleClick() {
    if (!isAceHidden && onFlip) onFlip(card.id);
  }

  function handleContextMenu(e: React.MouseEvent) {
    if (!isAdmin) return;
    e.preventDefault();
    setShowActions(v => !v);
  }

  function handlePointerDown() {
    if (!isAdmin) return;
    longPressTimer.current = setTimeout(() => setShowActions(true), 500);
  }

  function handlePointerUp() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  }

  return (
    <div className="playing-card-wrapper">
      <div
        className={classNames}
        style={isShuffling ? { '--card-idx': shuffleIndex } as React.CSSProperties : undefined}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter') handleClick();
          if (e.key === ' ') { e.preventDefault(); setShowActions(v => !v); }
        }}
        aria-label={isAceHidden ? 'Hidden card' : `${card.title} — ${card.status}`}
      >
        <div className="card-inner">
          <div className="card-back">
            <div className="card-back-pattern" />
          </div>

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

      {card.status === 'played' && card.playedNote && (
        <div className="played-reason-tag">
          <span className="played-reason-label">Played: </span>
          {card.playedNote}
        </div>
      )}

      {showActions && isAdmin && onStatusChange && onRemove && (
        <div className="card-actions-popover">
          <CardActions
            card={card}
            onStatusChange={(id, status, note) => {
              onStatusChange(id, status, note);
              setShowActions(false);
            }}
            onRemove={(id) => {
              onRemove(id);
              setShowActions(false);
            }}
          />
        </div>
      )}

      {showActions && (
        <div className="card-actions-backdrop" onClick={() => setShowActions(false)} />
      )}
    </div>
  );
}
