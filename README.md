# Ace Up My Sleeve 🃏

> *"We cannot change the cards we are dealt, just how we play the game."* — Randy Pausch

A personal deck of cards. Not for gambling — for life.

Every plan you're running, every connection you've built, every door that's still open, every certification you've earned — they're all cards in your hand. This tool lets you see them, organise them, play them at the right time, and know when you're running low.

Built around the idea that the most powerful thing you can do is **know what you're holding**.

---

## What It Does

- **Flip cards** — individual or all at once. Face-down cards are private; only you can see them unless you choose to reveal.
- **Shuffle** — randomise your deck for a fresh perspective.
- **Add & remove cards** — add new plans, connections, opportunities. Archive a card when it's been played, failed, or the door has closed.
- **Card statuses:**
  - **Reserved** — in your hand, face-down. Not in play yet.
  - **Playing** — actively in play. Card sticks up out of the deck so you know what you're focused on.
  - **Played** — used, closed, or expired. Archived with a journal note, never hard-deleted.
- **Card types:** Standard, Trump, Last Ditch, Wild, Ace, Resource
- **Ace card** — your secret advantage. Hidden from everyone. Always.
- **Trump cards** — your strongest plays. Save them. Deploy them when the moment is right.
- **Resources** — things you have access to that power your other cards. LinkedIn, GitHub, certifications, networks.
- **Last ditch card** — your final play if options are running low.
- **Wild card** — an unexpected arrival. A new connection or opportunity that just showed up.
- **Deck stats** — see how many cards you have in play, reserved, and remaining. Know your hand strength.
- **Expiry dates** — set deadlines on cards. Get warned when time is running out.
- **Randomised quotes** — card metaphor quotes fade in and out across the UI.
- **Share your deck** — share a link with others. You control what they see. Face-down and Ace cards stay hidden unless you choose to reveal.
- **Installable** — works on desktop and phone. Add to home screen like a native app.

---

## The Metaphor

A 52-card deck is a closed system. So is your situation at any given point. But within it, there's enormous variation in how you play.

- Some cards are trump cards — connections, credentials, a well-timed LinkedIn post asking your network for help.
- Some cards are reserved — plans you're not ready to play yet.
- Some cards expire — opportunities close, people move on.
- And sometimes you have to go all in on your last card.

The point isn't to have a perfect hand. It's to **know what you're holding and play it well**.

---

## Quotes

> *"Life is not a matter of holding good cards, but sometimes, playing a poor hand well."* — Jack London

> *"One should always play fairly when one has the winning cards."* — Oscar Wilde

> *"Cards are war, in disguise of a sport."* — Charles Lamb

> *"We cannot change the cards we are dealt, just how we play the game."* — Randy Pausch

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite + TypeScript |
| Styling & animations | Pure CSS (3D card flips, shuffle, protrude effect) |
| Drag & drop | `@dnd-kit/core` |
| Data | `localStorage` |
| Installable | PWA — `manifest.json` + `service-worker.js` |
| Sharing | URL with base64-encoded deck state |

No backend. No login. Runs entirely in the browser — installable on any device.

---

## Status

In development.
