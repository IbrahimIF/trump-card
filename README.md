# Trump Card

> *"We cannot change the cards we are dealt, just how we play the game."* — Randy Pausch

A personal, visual card deck for tracking everything you have going for you — plans, opportunities, connections, credentials, and resources. Built so you never forget what's in your hand.

---

## The Concept

This project came from the idea of **having cards up your sleeve** — a way to remind yourself what you have in your deck. Tasks, doors, opportunities and routes. After years of building toward a goal, you accumulate more than you can hold in your head at once.

Trump cards, last ditch plays, ace cards nobody knows about, wild cards that show up unexpectedly. It's all here.

> *"An ace up one's sleeve — a secret advantage held in reserve, used only when most needed."*

---

## Features

- **Playing card UI** — realistic proportions, suits, 3D flip animation
- **Card statuses** — Reserved (in hand), Playing (active, card sticks up), Played (archived)
- **Special card types** — Ace (secret, admin-only), Trump, Last Ditch, Wild, Resource
- **Shuffle & drag to reorder**
- **Deck stats panel** — hand strength, trump cards remaining
- **Rotating quotes** — fade in and out in the background
- **Expiry dates** — visual warning as deadlines approach
- **Shareable link** — base64-encoded deck state, no backend needed
- **PWA** — installable on phone (Add to Home Screen) and desktop, works offline

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite + TypeScript |
| Styling | Pure CSS (3D card animations, flip, shuffle) |
| Drag & drop | `@dnd-kit/core` |
| Data | `localStorage` |
| Sharing | Base64-encoded URL state |
| Installable | PWA — manifest + service worker |

---

## Quotes

*"Life is not a matter of holding good cards, but sometimes, playing a poor hand well."* — Jack London

*"One should always play fairly when one has the winning cards."* — Oscar Wilde

*"Cards are war, in disguise of a sport."* — Charles Lamb

*"Know your hand before you play it."* — Unknown

---

See [REQUIREMENTS.md](./REQUIREMENTS.md) for the full feature spec.
