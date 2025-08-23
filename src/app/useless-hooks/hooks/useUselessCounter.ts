import { useState, useCallback } from "react";

// a custom hook that increments or decrements at random steps
export const useUselessCounter = (initialValue: number = 0) => {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    const step = Math.floor(Math.random() * 10) + 1; // Random step between 1 and 10
    setCount((prevCount) => prevCount + step);
  }, []);

  const decrement = useCallback(() => {
    const step = Math.floor(Math.random() * 10) + 1; // Random step between 1 and 10
    setCount((prevCount) => prevCount - step);
  }, []);

  return { count, increment, decrement };
};
