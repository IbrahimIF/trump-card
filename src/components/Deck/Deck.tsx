import { useMemo, useState } from 'react';
import type { Card, CardStatus } from '../../types/card';
import { PlayingCard } from '../Card/PlayingCard';
import './Deck.css';

type FilterTab = 'all' | 'reserved' | 'playing' | 'played';

interface DeckProps {
  cards: Card[];
  isAdmin?: boolean;
  isShuffling?: boolean;
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

export function Deck({ cards, isAdmin = true, isShuffling = false, onFlip, onStatusChange, onRemove }: DeckProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const resourceCards = useMemo(() => cards.filter(c => c.type === 'resource'), [cards]);
  const mainCards = useMemo(() => cards.filter(c => c.type !== 'resource'), [cards]);
  const playing = useMemo(() => mainCards.filter(c => c.status === 'playing'), [mainCards]);
  const reserved = useMemo(() => mainCards.filter(c => c.status === 'reserved'), [mainCards]);
  const played = useMemo(() => mainCards.filter(c => c.status === 'played'), [mainCards]);
  const activeCards = useMemo(() => mainCards.filter(c => c.status !== 'played'), [mainCards]);

  const filteredPlaying = activeTab === 'playing' ? playing : [];
  const filteredReserved = activeTab === 'reserved' ? reserved : [];
  const filteredPlayed = activeTab === 'played' ? played : [];

  const tabs: FilterTab[] = ['all', 'reserved', 'playing', 'played'];

  function renderCard(card: Card, index: number) {
    return (
      <PlayingCard
        key={card.id}
        card={card}
        isAdmin={isAdmin}
        isShuffling={isShuffling}
        shuffleIndex={index}
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
          {activeTab === 'all' ? (
            activeCards.length > 0 ? (
              <section className="deck-section">
                <div className="card-row">
                  {activeCards.map(renderCard)}
                </div>
              </section>
            ) : (
              <p className="deck-empty">No active cards yet. Add one to get started.</p>
            )
          ) : (
            <>
              {filteredPlaying.length > 0 && (
                <section className="deck-section deck-section--playing">
                  <div className="card-row">
                    {filteredPlaying.map(renderCard)}
                  </div>
                </section>
              )}

              {filteredReserved.length > 0 && (
                <section className="deck-section deck-section--reserved">
                  <div className="card-row">
                    {filteredReserved.map(renderCard)}
                  </div>
                </section>
              )}

              {filteredPlayed.length > 0 && (
                <section className="deck-section deck-section--played">
                  <div className="card-row">
                    {filteredPlayed.map(renderCard)}
                  </div>
                </section>
              )}

              {filteredPlaying.length === 0 && filteredReserved.length === 0 && filteredPlayed.length === 0 && (
                <p className="deck-empty">No cards in this view.</p>
              )}
            </>
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
