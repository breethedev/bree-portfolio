import { useEffect, useState } from "react";

// randomly injects a spooky string or emoji into the document body
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
