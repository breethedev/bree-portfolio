import React, { useEffect, useMemo, useReducer } from "react";
import { shuffle } from "@/helpers";
import "./BlackJack.css";
import { Spade, Club, Diamond, Heart } from "lucide-react";

// Minimalist Blackjack (no bets/chips). Player vs Dealer.
// Rules:
// - Initial deal: 2 cards each, dealer shows one.
// - Player may Hit or Stand.
// - Dealer hits until total >= 17 (dealer stands on soft 17 for simplicity).
// - Aces count as 1 or 11 (best non-busting total).
// - Round ends: player bust, dealer bust, or both stand and compare.
// - "New Round" resets with a fresh shuffled deck when low.

// --- Types & deck utils ---
export type Suit = React.ReactNode;
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type Card = { suit: Suit; rank: Rank };
export type Deck = Card[];

const SUITS: Suit[] = [
  <Spade key="spade" />,
  <Club key="club" />,
  <Diamond key="diamond" />,
  <Heart key="heart" />,
];
const RANKS: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function makeDeck(): Deck {
  const d: Deck = [];
  for (const s of SUITS) {
    for (const r of RANKS) d.push({ suit: s, rank: r });
  }
  return shuffle(d);
}

function draw(deck: Deck, n = 1): { cards: Card[]; deck: Deck } {
  return { cards: deck.slice(0, n), deck: deck.slice(n) };
}

function cardValue(rank: Rank): number {
  if (rank === "A") return 11; // handle soft conversion later
  if (["K", "Q", "J"].includes(rank)) return 10;
  return parseInt(rank, 10);
}

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

// --- Game state ---

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

export default function BlackjackGame() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const playerTotal = useMemo(() => handTotals(state.player), [state.player]);
  const dealerTotal = useMemo(() => handTotals(state.dealer), [state.dealer]);

  // Auto-advance dealer turn when in dealer phase
  useEffect(() => {
    if (state.phase === "dealer") {
      const id = setTimeout(() => dispatch({ type: "DEALER_TURN" }), 450);
      return () => clearTimeout(id);
    }
  }, [state.phase, state.dealer]);

  // If dealer finished, resolve
  useEffect(() => {
    if (state.phase === "dealer") {
      const { total } = dealerTotal;
      if (total >= 17) {
        const id = setTimeout(() => dispatch({ type: "RESOLVE" }), 300);
        return () => clearTimeout(id);
      }
    }
  }, [state.phase, dealerTotal]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "d") dispatch({ type: "DEAL" });
      if (e.key.toLowerCase() === "h") dispatch({ type: "HIT" });
      if (e.key.toLowerCase() === "s") dispatch({ type: "STAND" });
      if (e.key.toLowerCase() === "r") dispatch({ type: "NEW_ROUND" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const canHit = state.phase === "player";
  const canStand = state.phase === "player";
  const canDeal = state.phase === "idle" || state.phase === "resolve";

  return (
    <div className="blackjack-game">
      {/* Controls */}
      <div className="blackjack-controls">
        <div className="blackjack-btns">
          <button
            onClick={() => dispatch({ type: "DEAL" })}
            disabled={!canDeal}
            className={`blackjack-btn blackjack-btn--primary ${!canDeal ? "blackjack-btn--disabled" : ""}`}
            aria-label="Deal a new hand"
            title="Deal (D)"
          >
            Deal
          </button>
          <button
            onClick={() => dispatch({ type: "HIT" })}
            disabled={!canHit}
            className={`blackjack-btn blackjack-btn--ghost ${!canHit ? "blackjack-btn--disabled" : ""}`}
            aria-label="Hit"
            title="Hit (H)"
          >
            Hit
          </button>
          <button
            onClick={() => dispatch({ type: "STAND" })}
            disabled={!canStand}
            className={`blackjack-btn blackjack-btn--ghost ${!canStand ? "blackjack-btn--disabled" : ""}`}
            aria-label="Stand"
            title="Stand (S)"
          >
            Stand
          </button>
        </div>
        <button
          onClick={() => dispatch({ type: "NEW_ROUND" })}
          className="blackjack-btn blackjack-btn--subtle"
          aria-label="Reset the table"
          title="New Round (R)"
        >
          New Round
        </button>

        <div className="blackjack-shortcuts">Shortcuts: D deal · H hit · S stand · R new</div>
      </div>

      {/* Dealer */}
      <section aria-label="Dealer hand" className="blackjack-section">
        <h3 className="blackjack-section__title">Dealer</h3>
        <div className="blackjack-cards">
          {state.dealer.map((c, i) => (
            <CardView key={i} card={c} hidden={!state.revealDealerHole && i === 1} />
          ))}
        </div>
        <div className="blackjack-total">
          {state.dealer.length === 0
            ? "—"
            : state.revealDealerHole || state.phase !== "player"
              ? `Total: ${dealerTotal.total}`
              : "Total: ?"}
        </div>
      </section>

      {/* Player */}
      <section aria-label="Player hand" className="blackjack-section">
        <h3 className="blackjack-section__title">You</h3>
        <div className="blackjack-cards">
          {state.player.map((c, i) => (
            <CardView key={i} card={c} />
          ))}
        </div>
        <div className="blackjack-total">
          {state.player.length === 0 ? "—" : `Total: ${playerTotal.total}`}
        </div>
      </section>

      {/* Result banner */}
      {state.phase === "resolve" && (
        <div role="status" className="blackjack-result">
          {state.result === "win" && "You win!"}
          {state.result === "lose" && "Dealer wins."}
          {state.result === "push" && "Push (tie)."}
        </div>
      )}
    </div>
  );
}

// --- UI bits ---
function CardView({ card, hidden = false }: { card: Card; hidden?: boolean }) {
  if (hidden) return <CardBack />;
  const isRed = card.suit === "♥" || card.suit === "♦";
  return (
    <div
      className={`blackjack-card ${isRed ? "blackjack-card--red" : ""}`}
      aria-label={`${card.rank} of ${suitName(card.suit)}`}
    >
      <div className="blackjack-card__content">
        {card.rank}
        {card.suit}
      </div>
    </div>
  );
}

function CardBack() {
  return (
    <div className="blackjack-card blackjack-card--back" aria-label="Face-down card">
      <div className="blackjack-card__back-content">●●●</div>
    </div>
  );
}

function suitName(s: Suit) {
  switch (s) {
    case "♠":
      return "spades";
    case "♥":
      return "hearts";
    case "♦":
      return "diamonds";
    case "♣":
      return "clubs";
  }
}
