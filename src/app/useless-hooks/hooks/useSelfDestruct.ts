import { useEffect, useState } from "react";

// unmounts a component after a specified countdown
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
