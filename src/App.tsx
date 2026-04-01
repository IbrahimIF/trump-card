import { useDeck } from './store/useDeck';
import { Deck } from './components/Deck';
import { DeckStats } from './components/DeckStats';
import { QuoteDisplay } from './components/QuoteDisplay';
import './App.css';

function App() {
  const { cards, stats, flipCard, shuffle, flipAll } = useDeck();

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
            <button className="btn btn-ghost" onClick={() => flipAll(false)}>Show All</button>
            <button className="btn btn-ghost" onClick={() => flipAll(true)}>Hide All</button>
            <button className="btn btn-primary" onClick={shuffle}>Shuffle</button>
          </div>
        </div>
        <DeckStats stats={stats} />
        <QuoteDisplay />
      </header>

      <main className="app-main">
        <Deck cards={cards} isAdmin={true} onFlip={flipCard} />
      </main>
    </div>
  );
}

export default App;
