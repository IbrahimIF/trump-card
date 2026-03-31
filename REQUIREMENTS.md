# Requirements — Ace Up My Sleeve

---

## Purpose

A personal, visual card deck for tracking plans, opportunities, connections, and trump cards. Built for someone who has accumulated a lot of assets over years of working towards a goal and needs a way to see, organise, and act on them without losing track.

---

## Core Concepts

| Term | Meaning |
|------|---------|
| **Card** | A single plan, opportunity, connection, task, or resource |
| **Deck** | The full collection of your cards |
| **Trump Card** | A high-value card — saved for the right moment |
| **Last Ditch Card** | Final-resort play — flagged separately |
| **Playing** | A card currently in active use |
| **Reserved** | A card in your hand, not yet played |
| **Played** | A card that has been used, expired, or closed |

---

## Functional Requirements

### Cards
- [ ] Each card has: Title, Notes/description, Status, Type flag (Trump / Last Ditch / Standard)
- [ ] Cards have a front (content) and a back (plain card design — hidden)
- [ ] All cards are classified under Plans/Opportunities — no separate categories
- [ ] Cards can be added, edited, and removed
- [ ] Removing a card means it's been played, failed, or the opportunity closed — archive it as "Played", don't hard-delete

### Card Statuses
- [ ] **Reserved** — in hand, face-down. Not in active play.
- [ ] **Playing** — actively being worked. Card visually sticks up/out of the deck to indicate it's in play.
- [ ] **Played** — used or closed. Moved to an archive section.

### Interactions
- [ ] Flip a single card (front/back toggle with animation)
- [ ] Flip all cards at once
- [ ] Shuffle the deck (randomise card order with animation)
- [ ] Drag to reorder cards manually
- [ ] Mark a card as Trump Card
- [ ] Mark a card as Last Ditch Card
- [ ] Move card between statuses (Reserved → Playing → Played)

### Visibility & Sharing
- [ ] Deck owner is admin — sees all cards regardless of flip state
- [ ] Share a public link of your deck with others
- [ ] Face-down (reserved/unflipped) cards are hidden from non-admin viewers
- [ ] Admin can choose to reveal individual cards to shared viewers
- [ ] No login required for viewers — read-only link-based access

### Quotes
- [ ] Rotating quotes fade in and out across the UI
- [ ] Quotes are based around the card/deck-as-life metaphor
- [ ] Starting quotes:
  - "We cannot change the cards we are dealt, just how we play the game." — Randy Pausch
  - "Life is not a matter of holding good cards, but sometimes, playing a poor hand well." — Jack London
  - "One should always play fairly when one has the winning cards." — Oscar Wilde
  - "Cards are war, in disguise of a sport." — Charles Lamb

---

## UI / Design Requirements

- [ ] Clean white background — minimal, no clutter
- [ ] Realistic playing card aesthetic (card suits, rounded corners, shadow, proportions)
- [ ] Cards that are "Playing" visually protrude upward from the deck view
- [ ] Smooth flip animation (CSS 3D transform)
- [ ] Shuffle animation
- [ ] Quote overlay fades in/out — subtle, not distracting
- [ ] Mobile responsive
- [ ] Dark mode optional (future)

---

## Technical Requirements

- [ ] Pure HTML / CSS / JavaScript — no framework, no build step
- [ ] Data persisted in `localStorage`
- [ ] Shareable deck via URL (deck state encoded in URL or stored with a short key)
- [ ] No backend required for MVP
- [ ] Admin state determined by local session (you created the deck on this device)

---

## Future / Nice-to-Have

- [ ] Password-protect individual cards
- [ ] Export deck as PDF / image
- [ ] Deck themes (card suit styles — Hearts, Spades, etc.)
- [ ] Reminder/nudge system — "You haven't played this card in 30 days"
- [ ] Multiple decks
- [ ] Collaboration — let someone else add cards to your deck
