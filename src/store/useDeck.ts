import { useState, useEffect } from 'react';
import type { Card, CardStatus, DeckStats } from '../types/card';
import { SEED_CARDS } from '../data/seedCards';

const STORAGE_KEY = 'trump-card-deck';

function loadDeck(): Card[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Card[];
  } catch {
    // corrupted storage — fall back to seed
  }
  return SEED_CARDS;
}

function saveDeck(cards: Card[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
}

export function useDeck() {
  const [cards, setCards] = useState<Card[]>(loadDeck);

  useEffect(() => {
    saveDeck(cards);
  }, [cards]);

  function addCard(card: Card) {
    setCards(prev => [card, ...prev]);
  }

  function removeCard(id: string) {
    setCards(prev => prev.filter(c => c.id !== id));
  }

  function updateCard(id: string, changes: Partial<Card>) {
    setCards(prev => prev.map(c => c.id === id ? { ...c, ...changes } : c));
  }

  function flipCard(id: string) {
    setCards(prev => prev.map(c => c.id === id ? { ...c, isFlipped: !c.isFlipped } : c));
  }

  function flipAll(flipped: boolean) {
    setCards(prev => prev.map(c => ({ ...c, isFlipped: flipped })));
  }

  function setStatus(id: string, status: CardStatus, playedNote?: string) {
    setCards(prev => prev.map(c =>
      c.id === id
        ? {
            ...c,
            status,
            ...(status === 'played' ? { playedAt: new Date().toISOString(), playedNote } : {}),
          }
        : c
    ));
  }

  function shuffle() {
    setCards(prev => {
      const copy = [...prev];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  }

  function reorder(newOrder: Card[]) {
    setCards(newOrder);
  }

  const stats: DeckStats = {
    reserved: cards.filter(c => c.status === 'reserved').length,
    playing: cards.filter(c => c.status === 'playing').length,
    played: cards.filter(c => c.status === 'played').length,
    trumpRemaining: cards.filter(c => c.type === 'trump' && c.status !== 'played').length,
    hasLastDitchOnly:
      cards.filter(c => c.status !== 'played').length > 0 &&
      cards.filter(c => c.status !== 'played' && c.type !== 'last-ditch').length === 0,
  };

  return { cards, stats, addCard, removeCard, updateCard, flipCard, flipAll, setStatus, shuffle, reorder };
}
