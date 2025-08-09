import { Club, Diamond, Heart, Spade } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { shuffle } from "@/helpers";
import "./MemoryGame.css";

export default function MemoryGame() {
  // The memory game will be a grid of 4x4 cards. Done.
  // The cards will be shuffled and the user will be able to flip two cards at a time. Done.
  // If the cards match, they will remain face up.
  // If the cards do not match, they will be flipped back over. Done.
  // The user will win if they can match all the cards. Done.
  // There is no time limit, lose state, or score.
  // The user can restart the game at any time.

  // The cards will be The suits of hearts, diamonds, clubs, spades and the face cards, J, Q, K, A.

  const CARDS: Card[] = useMemo(
    () => [
      { value: "A", flipped: false },
      { value: "K", flipped: false },
      { value: "Q", flipped: false },
      { value: "J", flipped: false },
      { value: <Spade />, flipped: false },
      { value: <Club />, flipped: false },
      { value: <Diamond />, flipped: false },
      { value: <Heart />, flipped: false },
    ],
    []
  );

  type Card = {
    id?: number;
    value: string | React.ReactNode;
    flipped: boolean;
  };

  const [cards, setCards] = useState<Card[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  console.log(flipped);
  console.log("cards", cards);

  useEffect(() => {
    // Initialize cards with duplicates
    const initialCards = CARDS.flatMap((card) => [
      { ...card, id: Math.random() },
      { ...card, id: Math.random() },
    ]);
    setCards(shuffle(initialCards));
  }, [CARDS]);

  function handleFlip(idx: number) {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    setFlipped((prev) => [...prev, idx]);
  }

  function restartGame() {
    setFlipped([]);
    setMatched([]);

    const initialCards = CARDS.flatMap((card) => [
      { ...card, id: Math.random() }, // Assign a unique id to each card instance
      { ...card, id: Math.random() },
    ]);
    setCards(shuffle(initialCards));
  }

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (cards[first].value === cards[second].value) {
        setMatched((m) => [...m, first, second]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, cards]);

  return (
    <div className="memory-game">
      <div className="memory-game__grid">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(idx);
          return (
            <div
              key={card.id}
              className={`memory-game__card ${isFlipped ? "flipped" : ""} ${
                matched.includes(idx) ? "matched" : ""
              }`}
              style={{
                backgroundColor: isFlipped ? "transparent" : "var(--btd-color-primary)",
              }}
              onClick={() => handleFlip(idx)}
            >
              <div className="memory-game__card-content">{card.value}</div>
            </div>
          );
        })}
      </div>
      <button onClick={restartGame}>Restart</button>
    </div>
  );
}
