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

Cards are grouped by suit as a visual language — not rigid categories, just flavour:

| Suit | Type | Examples |
|------|------|---------|
| ♠ Spades | Skills & Credentials | AWS exam, Salesforce cert, degree, technical skills |
| ♥ Hearts | Connections & People | Mentors, contacts, people willing to help, recruiters |
| ♦ Diamonds | Resources & Assets | LinkedIn, GitHub portfolio, Brunel career services, tools, subscriptions |
| ♣ Clubs | Plans & Strategies | Job applications, side projects, networking plays, routes into tech |

Suit is optional and decorative — every card is a Plan/Opportunity at its core.

---

## Functional Requirements

### Cards
- [ ] Each card has: Title, Notes/description, Status, Card Type (Ace / Trump / Last Ditch / Wild / Resource / Standard), Suit (optional), Expiry date (optional)
- [ ] Cards have a front (content) and a back (plain card design)
- [ ] Cards can be added, edited, and archived
- [ ] Archiving moves a card to "Played" — prompts for a brief journal note (what happened, what you learned)
- [ ] No hard-delete — played cards are always recoverable

### Card Statuses
- [ ] **Reserved** — in hand, face-down. Not in active play.
- [ ] **Playing** — actively being worked. Card visually sticks up/out of the deck.
- [ ] **Played** — used, closed, or expired. Moved to archive with journal entry.

### Special Card Types
- [ ] **Ace** — completely hidden. Never visible to shared viewers. Admin-only. Visually distinct (gold trim/glow).
- [ ] **Trump Card** — high-value play. Saved until the right moment. Marked visually.
- [ ] **Last Ditch Card** — final resort. Red border. Ideally never needed.
- [ ] **Wild Card** — unexpected new arrival. Distinct styling to show it just showed up.
- [ ] **Resource** — something you have, not something you're doing. Supports other cards.

### Resources Section
- [ ] Dedicated section for Resource cards — things in your arsenal that enable plans
- [ ] Resources are "available" unless archived
- [ ] Examples: LinkedIn, GitHub portfolio, university network, course access, industry contacts

### Interactions
- [ ] Flip a single card (front/back toggle with animation)
- [ ] Flip all cards at once
- [ ] Shuffle the deck (randomise order with animation)
- [ ] Drag to reorder manually (`@dnd-kit/core`)
- [ ] Mark card as any type (Ace / Trump / Last Ditch / Wild / Resource)
- [ ] Move card between statuses (Reserved → Playing → Played)
- [ ] "Show Your Hand" mode — temporary full reveal to a trusted viewer

### Expiry & Deadlines
- [ ] Optional expiry date on any card
- [ ] Cards approaching expiry visually highlighted (corner colour change)
- [ ] Expired cards prompt the user to archive them

### Deck Stats
- [ ] Summary panel: Reserved / Playing / Played counts
- [ ] Trump cards remaining
- [ ] Visual "hand strength" indicator
- [ ] Warning flag if Last Ditch is the only card left

### Visibility & Sharing
- [ ] Deck owner is admin — sees all cards regardless of flip state
- [ ] Share a public read-only link
- [ ] Face-down and Ace cards always hidden from non-admin viewers
- [ ] Admin can reveal individual cards to shared viewers
- [ ] "Show Your Hand" — temporary full reveal to a trusted viewer
- [ ] No login required for viewers
- [ ] Deck state encoded as base64 in the URL — no backend needed

### Quotes
- [ ] Rotating quotes fade in and out across the UI — background flavour, not intrusive
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
- [ ] Ace card has distinct visual treatment — gold trim, subtle glow
- [ ] Smooth CSS 3D flip animation
- [ ] Shuffle animation
- [ ] Quote fades in/out — background layer, never interrupts interaction
- [ ] Expiry warning on card face (corner colour change)
- [ ] Mobile responsive
- [ ] Installable on phone (Add to Home Screen) and desktop
- [ ] Dark mode (future)

---

## Technical Requirements

| Layer | Choice | Notes |
|-------|--------|-------|
| Framework | React 18 + Vite + TypeScript | Component-based, fast dev server, type safety |
| Styling | Pure CSS | Hand-crafted — card flip (CSS 3D transforms), shuffle, protrude animations |
| Drag & drop | `@dnd-kit/core` | React-native DnD — cleaner than SortableJS in a React context |
| Data | `localStorage` | No backend needed |
| Sharing | Base64-encoded URL state | Deck shareable via link, no server |
| Installable | PWA — `manifest.json` + `service-worker.js` | Add to home screen on iOS/Android, install on desktop |
| Admin auth | `localStorage` flag | You created it on this device = you're admin |

### PWA Requirements
- [ ] `manifest.json` — app name, icons, display mode (standalone), theme colour
- [ ] `service-worker.js` — caches assets for offline use
- [ ] Works fully offline after first load
- [ ] Installable via "Add to Home Screen" on iOS and Android
- [ ] Installable as desktop app via browser prompt

---

## Future / Nice-to-Have

- [ ] Password-protect the Ace card specifically
- [ ] Export deck as PDF / image
- [ ] Reminder/nudge — "You haven't played this card in 30 days"
- [ ] Multiple decks
- [ ] Collaboration — trusted person can suggest cards to your deck
- [ ] Deck history — timeline of what you played and when
- [ ] AI suggestion — based on your deck, suggest which card to play next
