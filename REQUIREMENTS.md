# Requirements — Ace Up My Sleeve

---

## Purpose

A personal, visual card deck for tracking plans, opportunities, connections, resources and trump cards. Built for someone who has accumulated a lot of assets over years of working towards a goal and needs a way to see, organise, and act on them without losing track.

---

## Core Concepts

| Term | Meaning |
|------|---------|
| **Card** | A single plan, opportunity, connection, resource, or asset |
| **Deck** | The full collection of your cards |
| **Ace Card** | Your secret advantage — unknown to everyone. Hidden even in shared view. The one card nobody knew you had. |
| **Trump Card** | A high-value card saved for the right moment — others may know it exists, but you choose when to play it |
| **Last Ditch Card** | Final-resort play — flagged separately, used when options are running low |
| **Wild Card** | An unexpected new arrival — a surprise opportunity or connection that just showed up |
| **Resource** | Something you have access to that gives you an edge — tools, platforms, credentials, knowledge, networks |
| **Playing** | A card currently in active use |
| **Reserved** | In your hand, not yet played |
| **Played** | Used, expired, or closed — archived |

---

## Card Types

Cards are grouped by type using suit as a visual language — not rigid categories, just flavour:

| Suit | Type | Examples |
|------|------|---------|
| ♠ Spades | Skills & Credentials | AWS exam, Salesforce cert, degree, technical skills |
| ♥ Hearts | Connections & People | Mentors, contacts, people willing to help, recruiters |
| ♦ Diamonds | Resources & Assets | LinkedIn, GitHub portfolio, Brunel career services, tools, subscriptions |
| ♣ Clubs | Plans & Strategies | Job applications, side projects, networking plays, routes into tech |

Suit is optional and decorative — every card is still a Plan/Opportunity at its core.

---

## Functional Requirements

### Cards
- [ ] Each card has: Title, Notes/description, Status, Card Type (Ace / Trump / Last Ditch / Wild / Standard), Suit (optional), Expiry date (optional)
- [ ] Cards have a front (your content) and a back (plain card design)
- [ ] Cards can be added, edited, and archived
- [ ] Archiving a card moves it to "Played" — prompts for a brief journal note (what happened, what you learned)
- [ ] No hard-delete — played cards are always recoverable

### Card Statuses
- [ ] **Reserved** — in hand, face-down. Not in active play.
- [ ] **Playing** — actively being worked. Card visually sticks up/out of the deck.
- [ ] **Played** — used, closed, or expired. Moved to archive with journal entry.

### Special Card Types
- [ ] **Ace** — completely hidden card. Never visible to shared viewers, ever. Admin-only. The secret advantage. Visually distinct (gold trim or similar).
- [ ] **Trump Card** — high-value play. Saved until the right moment. Marked visually.
- [ ] **Last Ditch Card** — final resort. Visually flagged (red border or similar). Ideally never needed.
- [ ] **Wild Card** — unexpected new arrival. Marked differently to show it just showed up.
- [ ] **Resource** — something you have, not something you're doing. Tools, access, platforms, credentials that support your other cards.

### Resources Section
- [ ] Dedicated section for Resource cards — things in your arsenal that aren't plans but enable plans
- [ ] Resources are always "available" unless archived (e.g. a subscription you cancelled, a platform you lost access to)
- [ ] Examples: LinkedIn profile, GitHub portfolio, university network, course access, industry contacts list

### Interactions
- [ ] Flip a single card (front/back toggle with animation)
- [ ] Flip all cards at once
- [ ] Shuffle the deck (randomise card order with animation)
- [ ] Drag to reorder manually
- [ ] Mark card as Trump / Last Ditch / Wild / Ace
- [ ] Move card between statuses
- [ ] "Show Your Hand" mode — reveal your full deck to a trusted person (e.g. mentor, recruiter) in one action. Temporary reveal, not permanent.

### Expiry & Deadlines
- [ ] Optional expiry date on any card
- [ ] Cards approaching expiry are visually highlighted (e.g. corner turns red)
- [ ] Expired cards prompt the user to archive them

### Deck Stats
- [ ] Summary panel: how many cards Reserved / Playing / Played
- [ ] Count of Trump cards remaining
- [ ] Visual "hand strength" indicator — qualitative signal of how strong your deck is right now
- [ ] Flag if Last Ditch is your only card left (you're running low)

### Visibility & Sharing
- [ ] Deck owner is admin — sees all cards regardless of flip state
- [ ] Share a public link with others — read-only
- [ ] Face-down and Ace cards are always hidden from non-admin viewers
- [ ] Admin can reveal individual cards to shared viewers
- [ ] "Show Your Hand" — temporary full reveal to a trusted viewer
- [ ] No login required for viewers

### Quotes
- [ ] Rotating quotes fade in and out across the UI
- [ ] Subtle, not distracting — background flavour
- [ ] Starting quotes:
  - "We cannot change the cards we are dealt, just how we play the game." — Randy Pausch
  - "Life is not a matter of holding good cards, but sometimes, playing a poor hand well." — Jack London
  - "One should always play fairly when one has the winning cards." — Oscar Wilde
  - "Cards are war, in disguise of a sport." — Charles Lamb
  - "An ace up one's sleeve — a secret advantage held in reserve, used only when most needed."
  - "Know your hand before you play it." — Unknown
  - "The player who wins is rarely the one with the best cards." — Unknown

---

## UI / Design Requirements

- [ ] Clean white background — minimal, sharp
- [ ] Realistic playing card proportions and aesthetic (rounded corners, shadow, suits)
- [ ] "Playing" cards visually protrude upward from the deck
- [ ] Ace card has a distinct visual treatment — gold, subtle glow, or different back design
- [ ] Smooth 3D flip animation
- [ ] Shuffle animation
- [ ] Quote fades in/out — background layer, doesn't interrupt interaction
- [ ] Expiry warning visible on card face (corner colour change)
- [ ] Mobile responsive
- [ ] Dark mode (future)

---

## Technical Requirements

- [ ] Pure HTML / CSS / JavaScript — no framework, no build step
- [ ] Data persisted in `localStorage`
- [ ] Shareable deck via URL
- [ ] No backend required for MVP
- [ ] Admin determined by local session

---

## Future / Nice-to-Have

- [ ] Password-protect the Ace card specifically
- [ ] Export deck as PDF / image
- [ ] Reminder/nudge — "You haven't played this card in 30 days"
- [ ] Multiple decks
- [ ] Collaboration — trusted person can add cards to your deck
- [ ] Deck history — timeline of what you played and when
- [ ] AI suggestion — based on your deck, suggest which card to play next
