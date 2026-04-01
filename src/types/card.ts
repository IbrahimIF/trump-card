export type CardStatus = 'reserved' | 'playing' | 'played';

export type CardType =
  | 'standard'
  | 'trump'
  | 'ace'
  | 'last-ditch'
  | 'wild'
  | 'resource';

export type CardSuit = 'spades' | 'hearts' | 'diamonds' | 'clubs';

export interface Card {
  id: string;
  title: string;
  notes: string;
  status: CardStatus;
  type: CardType;
  suit?: CardSuit;
  expiryDate?: string; // ISO date string
  isFlipped: boolean;
  createdAt: string; // ISO date string
  playedAt?: string; // ISO date string
  playedNote?: string; // journal note when archiving
}

export interface DeckStats {
  reserved: number;
  playing: number;
  played: number;
  trumpRemaining: number;
  hasLastDitchOnly: boolean;
}
