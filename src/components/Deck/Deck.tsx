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

const TABLE_ROTATIONS = [-2.5, 1.5, -1, 3, -3, 2, -1.5, 2.5, -0.5, 3.5];

function getTableRotation(index: number): number {
  return TABLE_ROTATIONS[index % TABLE_ROTATIONS.length];
}

export function Deck({ cards, isAdmin = true, isShuffling = false, onFlip, onStatusChange, onRemove }: DeckProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  const resourceCards = useMemo(() => cards.filter(c => c.type === 'resource'), [cards]);
  const mainCards = useMemo(() => cards.filter(c => c.type !== 'resource'), [cards]);
  const playing = useMemo(() => mainCards.filter(c => c.status === 'playing'), [mainCards]);
  const reserved = useMemo(() => mainCards.filter(c => c.status === 'reserved'), [mainCards]);
  const played = useMemo(() => mainCards.filter(c => c.status === 'played'), [mainCards]);
  const handCards = useMemo(() => [...playing, ...reserved], [playing, reserved]);

  const filteredPlaying = activeTab === 'playing' ? playing : [];
  const filteredReserved = activeTab === 'reserved' ? reserved : [];
  const filteredPlayed = activeTab === 'played' ? played : [];

  const tabs: FilterTab[] = ['all', 'reserved', 'playing', 'played'];

  function renderCard(card: Card, index: number, rotation?: number) {
    return (
      <PlayingCard
        key={card.id}
        card={card}
        isAdmin={isAdmin}
        isShuffling={isShuffling}
        shuffleIndex={index}
        rotation={rotation}
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
            <>
              {played.length > 0 && (
                <section className="deck-zone deck-zone--table">
                  <h2 className="deck-zone-label">On the Table</h2>
                  <div className="card-row card-row--table">
                    {played.map((card, i) => renderCard(card, i, getTableRotation(i)))}
                  </div>
                </section>
              )}

              {handCards.length > 0 ? (
                <section className="deck-zone deck-zone--hand">
                  <h2 className="deck-zone-label">In Hand</h2>
                  <div className="card-row card-row--hand">
                    {handCards.map((card, i) => renderCard(card, i))}
                  </div>
                </section>
              ) : (
                !played.length && <p className="deck-empty">No cards yet. Add one to get started.</p>
              )}
            </>
          ) : (
            <>
              {filteredPlaying.length > 0 && (
                <section className="deck-section deck-section--playing">
                  <div className="card-row">
                    {filteredPlaying.map((card, i) => renderCard(card, i))}
                  </div>
                </section>
              )}

              {filteredReserved.length > 0 && (
                <section className="deck-section deck-section--reserved">
                  <div className="card-row">
                    {filteredReserved.map((card, i) => renderCard(card, i))}
                  </div>
                </section>
              )}

              {filteredPlayed.length > 0 && (
                <section className="deck-section deck-section--played">
                  <div className="card-row">
                    {filteredPlayed.map((card, i) => renderCard(card, i))}
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
            {resourceCards.map((card, i) => renderCard(card, i))}
          </div>
        </aside>
      )}
    </div>
  );
}
