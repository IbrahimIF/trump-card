import type { Card } from '../types/card';

const SHARE_PARAM = 'd';
const NOTE_MAX = 80;

// Compressed shape for URL encoding — short keys to minimise payload size
type Packed = [
  id: string,       // 0: short id
  title: string,    // 1: title
  notes: string,    // 2: notes (truncated)
  type: string,     // 3: card type
  suit: string,     // 4: suit or ''
  status: string,   // 5: status
  flipped: 0 | 1,  // 6: isFlipped as bit
  expiry: string,   // 7: expiryDate or ''
];

/**
 * Encode a public view of the deck into the URL.
 * Ace cards are stripped entirely — they never appear in shared state.
 * Notes truncated to 80 chars. Short field keys used throughout.
 */
export function encodeDeckToUrl(cards: Card[]): string {
  const packed: Packed[] = cards
    .filter(c => c.type !== 'ace' && c.status !== 'played')
    .map(c => [
      c.id.slice(-8),                                          // last 8 chars of id
      c.title,
      c.notes.length > NOTE_MAX ? c.notes.slice(0, NOTE_MAX) + '…' : c.notes,
      c.type,
      c.suit ?? '',
      c.status,
      c.isFlipped ? 1 : 0,
      c.expiryDate ?? '',
    ]);

  const json = JSON.stringify(packed);
  const encoded = btoa(encodeURIComponent(json));
  const url = new URL(window.location.href);
  // Use clean base URL — strip any existing share param
  url.search = '';
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
    const packed = JSON.parse(json) as Packed[];

    return packed.map(p => ({
      id: `shared-${p[0]}`,
      title: p[1],
      notes: p[2],
      type: p[3] as Card['type'],
      suit: p[4] ? p[4] as Card['suit'] : undefined,
      status: p[5] as Card['status'],
      isFlipped: p[6] === 1,
      expiryDate: p[7] || undefined,
      createdAt: new Date().toISOString(),
    }));
  } catch {
    return null;
  }
}

export function isSharedView(): boolean {
  return new URLSearchParams(window.location.search).has(SHARE_PARAM);
}
