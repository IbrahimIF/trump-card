import { useState } from 'react';
import type { Card } from '../types/card';
import { encodeDeckToUrl } from '../utils/sharing';

interface ShareButtonProps {
  cards: Card[];
}

export function ShareButton({ cards }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = encodeDeckToUrl(cards);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open in new tab so they can copy manually
      window.open(url, '_blank');
    }
  }

  return (
    <button className="btn btn-ghost" onClick={handleShare}>
      {copied ? '✓ Copied' : 'Share'}
    </button>
  );
}
