import { useMemo, useState } from 'react';
import type { Card, CardStatus } from '../../types/card';
import { PlayingCard } from '../Card/PlayingCard';
import './Deck.css';

type FilterTab = 'all' | 'reserved' | 'playing' | 'played';

interface DeckProps {
  cards: Card[];
  isAdmin?: boolean;
  onFlip?: (id: string) => void;
  onStatusChange?: (id: string, status: CardStatus, note?: string) => void;
  onRemove?: (id: string) => void;
}

const TAB_LABELS: Record<FilterTab, string> = {
  all: 'All',
  reserved: 'In Hand',
  playing: 'In Play',
  played: 'Played',
};

export function Deck({ cards, isAdmin = true, onFlip, onStatusChange, onRemove }: DeckProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const resourceCards = useMemo(() => cards.filter(c => c.type === 'resource'), [cards]);
  const mainCards = useMemo(() => cards.filter(c => c.type !== 'resource'), [cards]);
  const playing = useMemo(() => mainCards.filter(c => c.status === 'playing'), [mainCards]);
  const reserved = useMemo(() => mainCards.filter(c => c.status === 'reserved'), [mainCards]);
  const played = useMemo(() => mainCards.filter(c => c.status === 'played'), [mainCards]);

  const filteredPlaying = activeTab === 'all' || activeTab === 'playing' ? playing : [];
  const filteredReserved = activeTab === 'all' || activeTab === 'reserved' ? reserved : [];
  const filteredPlayed = activeTab === 'all' || activeTab === 'played' ? played : [];

  const tabs: FilterTab[] = ['all', 'reserved', 'playing', 'played'];

  function renderCard(card: Card) {
    return (
      <PlayingCard
        key={card.id}
        card={card}
        isAdmin={isAdmin}
        onFlip={onFlip}
        onStatusChange={onStatusChange}
        onRemove={onRemove}
      />
    );
  }

  return (
    <div className="deck-layout">
      <div className="deck-main">
        <div className="deck-tabs">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`deck-tab${activeTab === tab ? ' deck-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        <div className="deck-sections">
          {filteredPlaying.length > 0 && (
            <section className="deck-section deck-section--playing">
              {activeTab === 'all' && <h2 className="deck-section-label">In Play</h2>}
              <div className="card-row">
                {filteredPlaying.map(renderCard)}
              </div>
            </section>
          )}

          {filteredReserved.length > 0 && (
            <section className="deck-section deck-section--reserved">
              {activeTab === 'all' && <h2 className="deck-section-label">In Hand</h2>}
              <div className="card-row">
                {filteredReserved.map(renderCard)}
              </div>
            </section>
          )}

          {filteredPlayed.length > 0 && (
            <section className="deck-section deck-section--played">
              {activeTab === 'all' && <h2 className="deck-section-label">Played</h2>}
              <div className="card-row">
                {filteredPlayed.map(renderCard)}
              </div>
            </section>
          )}

          {filteredPlaying.length === 0 && filteredReserved.length === 0 && filteredPlayed.length === 0 && (
            <p className="deck-empty">No cards in this view.</p>
          )}
        </div>
      </div>

      {resourceCards.length > 0 && (
        <aside className="deck-resources">
          <h2 className="deck-section-label">Resources</h2>
          <div className="card-row card-row--compact">
            {resourceCards.map(renderCard)}
          </div>
        </aside>
      )}
    </div>
  );
}
