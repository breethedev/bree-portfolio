---
title: "Minigames: BlackJack"
category: "technical"
date: "08-16-2025"
---

# Minigames: BlackJack

I’ve always liked adding small touches to my portfolio that show off more than “here’s another landing page.” One fun way to do that is with a mini-game tab at the top. It’s unexpected, interactive, and still technical enough to show how you think as an engineer.

For this walkthrough, I’ll show you how I put together a minimalist Blackjack game in React. No chips, no bets. Just a clean game loop that works well as a portfolio flex.

## Step 1: Deck and Utilities

Any card game worth building starts with a proper deck utility. I keep this logic dead simple:

<details>
  <summary>Create 52 cards (suits × ranks).</summary>

```tsx
  export type Suit = React.ReactNode;
  export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
  export type Card = { suit: Suit; rank: Rank };
  export type Deck = Card[];

  // used lucide-react for suite icons
  const SUITS: Suit[] = [
  <Spade key="spade" />,
  <Club key="club" />,
  <Diamond key="diamond" />,
  <Heart key="heart" />,
  ];

  const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

```

</details>

<details>
  <summary>Shuffle once per round.</summary>

```tsx
function shuffle<T>(array: T[]): T[] {
const arr = [...array];
for (let i = arr.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
return arr;
}

function makeDeck(): Deck {
const d: Deck = [];
for (const s of SUITS) {
  for (const r of RANKS) d.push({ suit: s, rank: r });
}
return shuffle(d);
}
```

</details>

<details>
<summary>Draw cards off the top</summary>

```tsx
function draw(deck: Deck, n = 1): { cards: Card[]; deck: Deck } {
  return { cards: deck.slice(0, n), deck: deck.slice(n) };
}

function cardValue(rank: Rank): number {
  if (rank === "A") return 11; // handle totals in helper function
  if (["K", "Q", "J"].includes(rank)) return 10;
  return parseInt(rank, 10);
}
```

</details>

This makes it trivial to reuse across Blackjack (and if you also build Memory).

I also wrote a `handTotals()` helper that handles Aces as 1 or 11. Blackjack is basically just math with edge cases, so nailing that helper early saves you bugs later.

<details>
  <summary>handTotals()</summary>

  ```tsx
  function handTotals(cards: Card[]): { total: number; soft: boolean } {
  // Start by counting all aces as 11, then reduce by 10 while busting
  let total = 0;
  let aces = 0;
  for (const c of cards) {
    if (c.rank === "A") aces++;
    total += cardValue(c.rank);
  }
  while (total > 21 && aces > 0) {
    total -= 10; // make one ace count as 1 instead of 11
    aces--;
  }
  const soft = cards.some((c) => c.rank === "A") && total <= 21 && aces > 0; // at least one ace counted as 11
  return { total, soft };
}
  ```
</details>

## Step 2: Game State Machine

<!-- <details>
  <summary></summary>
  ```tsx
  ```
</details> -->

I don’t bother with Redux or fancy state management for a single component. A simple reducer gets the job done:

<details>
  <summary>idle → player → dealer → resolve</summary>
  
  ```tsx
  type Phase = "idle" | "player" | "dealer" | "resolve";

  type State = {
    deck: Deck;
    player: Card[];
    dealer: Card[];
    phase: Phase;
    revealDealerHole: boolean;
    result: "win" | "lose" | "push" | null;
    rounds: number;
  };

  const initialState: State = {
    deck: makeDeck(),
    player: [],
    dealer: [],
    phase: "idle",
    revealDealerHole: false,
    result: null,
    rounds: 0,
  };

  type Action =
    | { type: "DEAL" }
    | { type: "HIT" }
    | { type: "STAND" }
    | { type: "DEALER_TURN" }
    | { type: "RESOLVE" }
    | { type: "NEW_ROUND" };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "DEAL": {
        let deck = state.deck;
        if (deck.length < 15) deck = makeDeck();
        const a = draw(deck, 2);
        const b = draw(a.deck, 2);
        return {
          ...state,
          deck: b.deck,
          player: a.cards,
          dealer: b.cards,
          phase: "player",
          revealDealerHole: false,
          result: null,
          rounds: state.rounds + 1,
        };
      }
      case "HIT": {
        if (state.phase !== "player") return state;
        const { cards, deck } = draw(state.deck, 1);
        const player = [...state.player, ...cards];
        const { total } = handTotals(player);
        if (total > 21) {
          return { ...state, deck, player, phase: "resolve", revealDealerHole: true, result: "lose" };
        }
        return { ...state, deck, player };
      }
      case "STAND": {
        if (state.phase !== "player") return state;
        return { ...state, phase: "dealer", revealDealerHole: true };
      }
      case "DEALER_TURN": {
        if (state.phase !== "dealer") return state;
        const { total } = handTotals(state.dealer);
        if (total >= 17) {
          return { ...state, phase: "resolve" };
        }
        const { cards, deck } = draw(state.deck, 1);
        return { ...state, deck, dealer: [...state.dealer, ...cards] };
      }
      case "RESOLVE": {
        const pt = handTotals(state.player).total;
        const dt = handTotals(state.dealer).total;
        let result: State["result"] = null;
        if (pt > 21) result = "lose";
        else if (dt > 21) result = "win";
        else if (pt > dt) result = "win";
        else if (pt < dt) result = "lose";
        else result = "push";
        return { ...state, phase: "resolve", result };
      }
      case "NEW_ROUND": {
        return {
          ...state,
          player: [],
          dealer: [],
          phase: "idle",
          revealDealerHole: false,
          result: null,
        };
      }
      default:
        return state;
    }
  }
  ```
</details>

That’s it. No spaghetti if/else, no scattered refs. Each phase maps to obvious UI behavior:

- Player phase: buttons enabled (Hit, Stand).
- Dealer phase: dealer draws automatically until 17.
- Resolve: banner shows winner, buttons disable.

The nice thing about a reducer is you can add keyboard shortcuts (D for Deal, H for Hit, S for Stand, R for Reset) without worrying about your state getting messy.

## Step 3: UI Decisions

I wanted a minimalist card UI—no textures, no poker table backgrounds. Just:

- White or dark card background.
- Ranks and suits (no color to keep it minimal).
- Subtle borders and shadows for depth.

It looks clean in both light and dark themes, and it matches the rest of my portfolio styling.

The dealer’s second card stays hidden with a face-down placeholder until you stand, which feels surprisingly “game-like” even without animations.

## Step 4: Dealer AI (if you can call it that)

Dealer logic is almost laughably simple:

- Hit until 17.
- Stand on all 17 (yes, even soft 17—keeps the code clean).

React’s useEffect with a setTimeout handles this nicely so it feels like the dealer is “thinking” instead of instantly snapping cards into place.

## Step 5: Result Banner

Finally, when everything resolves, a banner pops up:

You win!
Dealer wins.
Push (tie).

That’s it. Clean and obvious.

## Why This Works in a Portfolio

This game isn’t about showing off React wizardry. It’s about showing that you can:

- Build small, complete features end-to-end.
- Write predictable state machines for real-time interactions.
- Care about polish and UX even in a toy project.
- It gives recruiters and peers something fun to click on, while still keeping the code clear and professional.

## Final Thoughts

Could you make it fancier? Sure. Animations, sounds, scoring history, all possible. But in the context of a portfolio header mini-game, less is more. Clean, interactive, and out of the way.

👉 Next up, I might write about how I built the Memory game to sit next to Blackjack in the same tab container. Both share utilities, but the gameplay logic is wildly different and makes for a neat comparison.
