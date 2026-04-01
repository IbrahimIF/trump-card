import type { DeckStats as Stats } from '../../types/card';
import './DeckStats.css';

interface DeckStatsProps {
  stats: Stats;
}

export function DeckStats({ stats }: DeckStatsProps) {
  const total = stats.reserved + stats.playing + stats.played;
  const active = stats.reserved + stats.playing;

  return (
    <div className={`deck-stats ${stats.hasLastDitchOnly ? 'last-ditch-warning' : ''}`}>
      <div className="stat">
        <span className="stat-value">{stats.playing}</span>
        <span className="stat-label">In Play</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.reserved}</span>
        <span className="stat-label">In Hand</span>
      </div>
      <div className="stat">
        <span className="stat-value">{stats.played}</span>
        <span className="stat-label">Played</span>
      </div>
      <div className="stat-divider" />
      <div className="stat">
        <span className="stat-value trump">{stats.trumpRemaining}</span>
        <span className="stat-label">Trump Cards</span>
      </div>
      <div className="hand-strength">
        <span className="hand-strength-label">Hand</span>
        <div className="hand-strength-bar">
          <div
            className="hand-strength-fill"
            style={{ width: total > 0 ? `${(active / total) * 100}%` : '0%' }}
          />
        </div>
      </div>
      {stats.hasLastDitchOnly && (
        <div className="last-ditch-flag">Last ditch only — play it</div>
      )}
    </div>
  );
}
