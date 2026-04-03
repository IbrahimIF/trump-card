import { useState } from 'react';
import { useDeck } from './store/useDeck';
import { Deck } from './components/Deck/Deck';
import { DeckStats } from './components/DeckStats/DeckStats';
import { QuoteDisplay } from './components/Quote/QuoteDisplay';
import { AddCardModal } from './components/AddCardModal/AddCardModal';
import { ShareButton } from './components/Share/ShareButton';
import { decodeDeckFromUrl, isSharedView } from './utils/sharing';
import './App.css';

const sharedCards = decodeDeckFromUrl();
const shared = isSharedView();

function App() {
  const deck = useDeck();
  const [showAddModal, setShowAddModal] = useState(false);
  const [allFlipped, setAllFlipped] = useState(false);
  const [feltBg, setFeltBg] = useState(() => localStorage.getItem('trump-card-felt') === 'true');

  function toggleFelt() {
    setFeltBg(prev => {
      const next = !prev;
      localStorage.setItem('trump-card-felt', String(next));
      return next;
    });
  }

  const cards = shared && sharedCards ? sharedCards : deck.cards;
  const stats = shared && sharedCards
    ? {
        reserved: sharedCards.filter(c => c.status === 'reserved').length,
        playing: sharedCards.filter(c => c.status === 'playing').length,
        played: 0,
        trumpRemaining: sharedCards.filter(c => c.type === 'trump').length,
        hasLastDitchOnly: false,
      }
    : deck.stats;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="app-title">
            <span className="app-title-suit">♠</span>
            <h1>Trump Card</h1>
            <span className="app-title-suit">♠</span>
          </div>
          <div className="app-actions">
            {!shared && (
              <>
                <button className="btn btn-ghost" onClick={() => { deck.flipAll(!allFlipped); setAllFlipped(f => !f); }}>Flip All</button>
                <button className="btn btn-ghost" onClick={deck.shuffle}>Shuffle</button>
                <button className="btn btn-ghost" onClick={toggleFelt} title="Toggle background">{feltBg ? '⬜' : '🟩'}</button>
                <ShareButton cards={deck.cards} />
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ New Card</button>
              </>
            )}
            {shared && (
              <span className="shared-badge">Shared view — read only</span>
            )}
          </div>
        </div>
        <DeckStats stats={stats} />
        <QuoteDisplay />
      </header>

      <main className={`app-main${feltBg ? ' app-main--felt' : ''}`}>
        <Deck
          cards={cards}
          isAdmin={!shared}
          onFlip={!shared ? deck.flipCard : undefined}
          onStatusChange={!shared ? deck.setStatus : undefined}
          onRemove={!shared ? deck.removeCard : undefined}
        />
      </main>

      {showAddModal && (
        <AddCardModal
          onAdd={deck.addCard}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}

export default App;
