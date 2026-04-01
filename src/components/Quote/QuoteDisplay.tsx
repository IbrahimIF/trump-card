import { useState, useEffect } from 'react';
import { QUOTES } from '../../data/quotes';
import './QuoteDisplay.css';

const INTERVAL_MS = 8000;

export function QuoteDisplay() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * QUOTES.length));
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 600);
    }, INTERVAL_MS);

    return () => clearInterval(timer);
  }, []);

  const quote = QUOTES[index];

  return (
    <div className={`quote-display ${visible ? 'quote-visible' : 'quote-hidden'}`}>
      <p className="quote-text">"{quote.text}"</p>
      {quote.author && <span className="quote-author">— {quote.author}</span>}
    </div>
  );
}
