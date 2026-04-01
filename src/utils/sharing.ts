import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';
import type { Card } from '../types/card';

const SHARE_PARAM = 'd';
const NOTE_MAX = 80;

// Packed as a flat array — minimal JSON footprint before compression
type Packed = [
  id: string,       // 0: short id (last 8 chars)
  title: string,    // 1
  notes: string,    // 2: truncated to 80 chars
  type: string,     // 3
  suit: string,     // 4: or ''
  status: string,   // 5
  flipped: 0 | 1,  // 6
  expiry: string,   // 7: or ''
];

/**
 * Encode a public deck snapshot into a short URL.
 * Ace cards stripped entirely. Notes truncated. LZ-compressed before encoding.
 */
export function encodeDeckToUrl(cards: Card[]): string {
  const packed: Packed[] = cards
    .filter(c => c.type !== 'ace' && c.status !== 'played')
    .map(c => [
      c.id.slice(-8),
      c.title,
      c.notes.length > NOTE_MAX ? c.notes.slice(0, NOTE_MAX) + '…' : c.notes,
      c.type,
      c.suit ?? '',
      c.status,
      c.isFlipped ? 1 : 0,
      c.expiryDate ?? '',
    ]);

  const compressed = compressToEncodedURIComponent(JSON.stringify(packed));
  const url = new URL(window.location.href);
  url.search = '';
  url.searchParams.set(SHARE_PARAM, compressed);
  return url.toString();
}

/**
 * Decode a shared deck from the current URL, if present.
 * Returns null if no share param exists or decoding fails.
 */
export function decodeDeckFromUrl(): Card[] | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const compressed = params.get(SHARE_PARAM);
    if (!compressed) return null;

    const json = decompressFromEncodedURIComponent(compressed);
    if (!json) return null;

    const packed = JSON.parse(json) as Packed[];
    return packed.map(p => ({
      id: `shared-${p[0]}`,
      title: p[1],
      notes: p[2],
      type: p[3] as Card['type'],
      suit: p[4] ? (p[4] as Card['suit']) : undefined,
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
