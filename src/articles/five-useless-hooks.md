---
title: "5 Completely Useless React Hooks "
category: "technical"
date: "08-23-2025"
slug: "five-useless-hooks"
---

# 5 Completely Useless (But Fun) React Hooks You’ll Probably Never Need

A big part of being a good engineer isn’t just knowing when something’s broken. It’s knowing how to break it. Or at least, how to bend it in ways nobody expects.

That kind of playful curiosity is what makes us better problem-solvers. And sometimes the best way to practice it is by building things that have no real-world purpose other than being delightfully chaotic.

So instead of talking performance tuning or accessibility best practices, let’s take a detour. Here are five React hooks that are totally useless, but a lot of fun to build. They won’t improve your codebase, but they might improve your perspective.

## 1. useSpooky 👻

This hook randomly haunts your app. Maybe it returns a ghost emoji. Maybe it injects “boo!” into your UI at unpredictable times. Maybe it does both. The important part is that your app is no longer alone. It’s haunted.

You’ll get some practice with randomization, conditional rendering, and timing effects. But mostly you’ll get chaos.

<details>
  <summary>Code</summary>
  
  ```tsx
export const useSpooky = () => {
  const [isHaunted, setIsHaunted] = useState(false);

  useEffect(() => {
    if (!isHaunted) return;

    const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Random delay between 1s and 6s
    const timeoutDelayId = setTimeout(() => {
      setIsHaunted(true);
    }, randomDelay);

    const spookyStrings = ["👻", "Boo!", "🎃", "Return the Slab!"];
    const randomIndex = Math.floor(Math.random() * spookyStrings.length);
    const spookyString = spookyStrings[randomIndex];
    const spookyElement = document.createElement("div");

    // Set up the spooky element with base styles and content or you can use a class
    spookyElement.className = "spooky-element"; // Optional: add a class for styling
    spookyElement.textContent = spookyString;
    spookyElement.style.position = "fixed";
    spookyElement.style.top = "50%";
    spookyElement.style.left = "50%";
    spookyElement.style.transform = "translate(-50%, -50%)";
    spookyElement.style.fontSize = "2rem";

    const randomTimeout = Math.floor(Math.random() * 5000) + 1000; // Random timeout between 1s and 6s
    spookyElement.style.transition = `opacity ${randomTimeout}ms ease-in-out`;
    spookyElement.style.opacity = "0.8";

    document.body.appendChild(spookyElement);

    const timeoutId = setTimeout(() => {
      document.body.removeChild(spookyElement);
      setIsHaunted(false);
    }, randomTimeout + 1000); // Keep the spooky element for an additional second after the fade-out

    return () => {
      clearTimeout(timeoutDelayId);
      clearTimeout(timeoutId);
    };
  }, [isHaunted]);

  return { isHaunted, setIsHaunted };
};
  ```
</details>

## 2. useDadJoke 🙃

This one delivers a new dad joke every render. Your app may not solve real problems, but at least it’ll make someone groan.

It’s a good excuse to mess around with APIs or cycle through an array of terrible punchlines. Warning: once you add this, you’ll never stop saying, “Did you hear about the hook that…”

<details>
  <summary>Code</summary>
  
  ```tsx
  const useDadJoke = () => {
  const fetchDadJoke = async () => {
    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok"); // You should have better error handling here
      }
      const data = await response.json();
      return data.joke;
    } catch (error) {
      console.error("Failed to fetch dad joke:", error);
      return "Dad joke not available at the moment.";
    }
  };

  return { fetchDadJoke };
};
  ```
</details>

## 3. useKonamiCode 🎮

The legendary ↑ ↑ ↓ ↓ ← → ← → B A. This hook listens for it, and when someone enters the sequence… you get to decide the reward. Confetti? Rickroll? A hidden theme?

Building it teaches you about event listeners and state management. Plus, who doesn’t love a secret Easter egg?

<details>
  <summary>Code</summary>
  
  ```tsx
  import { useCallback, useEffect } from "react";
  const useKonamiCode = (callback: () => void) => {
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
  ```
</details>

## 4. useSelfDestruct 💥

Drama time. When you call this hook, a countdown starts… and then the component deletes itself. Just gone.

Completely impractical, but you’ll learn timers, side effects, and cleanup patterns. It’s like useEffect, but with an action-movie personality.

<details>
  <summary>Code</summary>
  
  ```tsx
    export const useSelfDestruct = (initialValue: number = 10) => {
  const [isMounted, setIsMounted] = useState(true);
  const [countdown, setCountdown] = useState(initialValue);
  useEffect(() => {
    if (!isMounted) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsMounted(false);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isMounted]);

  return {
    isMounted,
    countdown,
    reset: () => {
      setIsMounted(true);
      setCountdown(initialValue);
    },
  };
};
  ```
</details>

## 5. useUselessCounter 🔢

A counter that refuses to play nice. Every time you click to increment or decrement, the step size changes randomly. One click might add +7, the next subtract -3, the next jump +42. You never really know what’s going to happen.

It’s still a counter… technically. But it’s more like chaos math in hook form. You’ll learn about state updates and dynamic logic, but mostly you’ll learn to stop expecting order from life.

<details>
  <summary>Code</summary>
  
  ```tsx
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
  ```
</details>

## Wrap-Up

Are these hooks going to land you your next promotion? Absolutely not. Will they make your codebase better? Not even close.

But they will remind you that React doesn’t always have to be serious business. You’ll practice fundamentals, mess with state, and maybe prank a teammate or two. And hey—sometimes building something useless is the most useful way to learn.

👉 Now it’s your turn: what’s the most ridiculous hook you can think of? Build it. Share it. And let’s keep React a little weird.