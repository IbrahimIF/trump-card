import { useState } from 'react';
import type { Card, CardType, CardSuit, CardStatus } from '../types/card';
import './AddCardModal.css';

interface AddCardModalProps {
  onAdd: (card: Card) => void;
  onClose: () => void;
}

export function AddCardModal({ onAdd, onClose }: AddCardModalProps) {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [type, setType] = useState<CardType>('standard');
  const [suit, setSuit] = useState<CardSuit | ''>('');
  const [status, setStatus] = useState<CardStatus>('reserved');
  const [expiryDate, setExpiryDate] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;

    const card: Card = {
      id: `card-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title: title.trim(),
      notes: notes.trim(),
      type,
      suit: suit || undefined,
      status,
      expiryDate: expiryDate || undefined,
      isFlipped: false,
      createdAt: new Date().toISOString(),
    };

    onAdd(card);
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Card</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field-label">Title *</span>
            <input
              className="field-input"
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. AWS Cloud Practitioner"
              autoFocus
            />
          </label>

          <label className="field">
            <span className="field-label">Notes</span>
            <textarea
              className="field-input field-textarea"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="What is this card? Why does it matter?"
              rows={3}
            />
          </label>

          <div className="field-row">
            <label className="field">
              <span className="field-label">Type</span>
              <select className="field-input" value={type} onChange={e => setType(e.target.value as CardType)}>
                <option value="standard">Standard</option>
                <option value="trump">Trump Card</option>
                <option value="ace">Ace (secret)</option>
                <option value="last-ditch">Last Ditch</option>
                <option value="wild">Wild Card</option>
                <option value="resource">Resource</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">Suit</span>
              <select className="field-input" value={suit} onChange={e => setSuit(e.target.value as CardSuit | '')}>
                <option value="">None</option>
                <option value="spades">♠ Spades (Skills)</option>
                <option value="hearts">♥ Hearts (Connections)</option>
                <option value="diamonds">♦ Diamonds (Resources)</option>
                <option value="clubs">♣ Clubs (Plans)</option>
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              <span className="field-label">Status</span>
              <select className="field-input" value={status} onChange={e => setStatus(e.target.value as CardStatus)}>
                <option value="reserved">In Hand (Reserved)</option>
                <option value="playing">In Play</option>
              </select>
            </label>

            <label className="field">
              <span className="field-label">Expiry date</span>
              <input
                className="field-input"
                type="date"
                value={expiryDate}
                onChange={e => setExpiryDate(e.target.value)}
              />
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={!title.trim()}>
              Add Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
