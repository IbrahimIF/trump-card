import type { Card } from '../types/card';

const SHARE_PARAM = 'deck';

/**
 * Encode a public view of the deck into the URL.
 * Ace cards are stripped entirely — they never appear in shared state.
 * Face-down (isFlipped: true) cards are included but marked as hidden.
 */
export function encodeDeckToUrl(cards: Card[]): string {
  const shareable = cards
    .filter(c => c.type !== 'ace' && c.status !== 'played')
    .map(c => ({
      id: c.id,
      title: c.title,
      notes: c.notes,
      type: c.type,
      suit: c.suit,
      status: c.status,
      isFlipped: c.isFlipped,
      expiryDate: c.expiryDate,
    }));

  const json = JSON.stringify(shareable);
  const encoded = btoa(encodeURIComponent(json));
  const url = new URL(window.location.href);
  url.searchParams.set(SHARE_PARAM, encoded);
  return url.toString();
}

/**
 * Decode a shared deck from the current URL, if present.
 * Returns null if no share param exists or decoding fails.
 */
export function decodeDeckFromUrl(): Card[] | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get(SHARE_PARAM);
    if (!encoded) return null;

    const json = decodeURIComponent(atob(encoded));
    const data = JSON.parse(json) as Card[];
    return data;
  } catch {
    return null;
  }
}

export function isSharedView(): boolean {
  return new URLSearchParams(window.location.search).has(SHARE_PARAM);
}
