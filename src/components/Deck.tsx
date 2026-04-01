import { useMemo } from 'react';
import { Card } from '../types/card';
import { PlayingCard } from './PlayingCard';
import './Deck.css';

interface DeckProps {
  cards: Card[];
  isAdmin?: boolean;
  onFlip?: (id: string) => void;
}

export function Deck({ cards, isAdmin = true, onFlip }: DeckProps) {
  const playing = useMemo(() => cards.filter(c => c.status === 'playing'), [cards]);
  const reserved = useMemo(() => cards.filter(c => c.status === 'reserved'), [cards]);
  const played = useMemo(() => cards.filter(c => c.status === 'played'), [cards]);

  return (
    <div className="deck-layout">
      {playing.length > 0 && (
        <section className="deck-section deck-section--playing">
          <h2 className="deck-section-label">In Play</h2>
          <div className="card-row">
            {playing.map(card => (
              <PlayingCard key={card.id} card={card} isAdmin={isAdmin} onFlip={onFlip} />
            ))}
          </div>
        </section>
      )}

      {reserved.length > 0 && (
        <section className="deck-section deck-section--reserved">
          <h2 className="deck-section-label">In Hand</h2>
          <div className="card-row">
            {reserved.map(card => (
              <PlayingCard key={card.id} card={card} isAdmin={isAdmin} onFlip={onFlip} />
            ))}
          </div>
        </section>
      )}

      {played.length > 0 && (
        <section className="deck-section deck-section--played">
          <h2 className="deck-section-label">Played</h2>
          <div className="card-row">
            {played.map(card => (
              <PlayingCard key={card.id} card={card} isAdmin={isAdmin} onFlip={onFlip} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
