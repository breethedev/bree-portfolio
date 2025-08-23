"use client";

import { useCallback, useEffect } from "react";
export const useKonamiCode = (callback: () => void) => {
  const konamiCode =
    "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,B,A";

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const pressedKeys = [];
      pressedKeys.push(event.key);

      if (pressedKeys.join(",") === konamiCode) {
        callback();
        pressedKeys.length = 0; // Reset the array after triggering the callback
      }
    },
    [callback, konamiCode]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
};
