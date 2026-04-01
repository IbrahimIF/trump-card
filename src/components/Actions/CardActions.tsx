import { useState } from 'react';
import type { Card, CardStatus } from '../../types/card';
import './CardActions.css';

interface CardActionsProps {
  card: Card;
  onStatusChange: (id: string, status: CardStatus, note?: string) => void;
  onRemove: (id: string) => void;
}

export function CardActions({ card, onStatusChange, onRemove }: CardActionsProps) {
  const [showArchivePrompt, setShowArchivePrompt] = useState(false);
  const [archiveNote, setArchiveNote] = useState('');

  function handleArchive() {
    onStatusChange(card.id, 'played', archiveNote.trim() || undefined);
    setShowArchivePrompt(false);
  }

  if (showArchivePrompt) {
    return (
      <div className="card-archive-prompt">
        <p className="archive-prompt-label">What happened with this card?</p>
        <textarea
          className="field-input field-textarea"
          value={archiveNote}
          onChange={e => setArchiveNote(e.target.value)}
          placeholder="Played it, missed the window, door closed... (optional)"
          rows={2}
          autoFocus
        />
        <div className="archive-prompt-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => setShowArchivePrompt(false)}>
            Cancel
          </button>
          <button className="btn btn-primary btn-sm" onClick={handleArchive}>
            Archive
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card-actions">
      {card.status !== 'playing' && card.status !== 'played' && (
        <button
          className="card-action-btn"
          onClick={() => onStatusChange(card.id, 'playing')}
        >
          ▲ Play
        </button>
      )}
      {card.status === 'playing' && (
        <button
          className="card-action-btn"
          onClick={() => onStatusChange(card.id, 'reserved')}
        >
          ▼ Hold
        </button>
      )}
      {card.status !== 'played' && (
        <button
          className="card-action-btn card-action-btn--archive"
          onClick={() => setShowArchivePrompt(true)}
        >
          ✓ Archive
        </button>
      )}
      {card.status === 'played' && (
        <button
          className="card-action-btn"
          onClick={() => onStatusChange(card.id, 'reserved')}
        >
          ↩ Restore
        </button>
      )}
      <button
        className="card-action-btn card-action-btn--danger"
        onClick={() => onRemove(card.id)}
      >
        × Remove
      </button>
    </div>
  );
}
