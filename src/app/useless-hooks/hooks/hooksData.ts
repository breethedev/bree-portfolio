type Hook = {
  name: string;
  description: string;
};

export const hooksData: Hook[] = [
  {
    name: "useDadJoke",
    description: "Fetches a random dad joke from an API.",
  },
  {
    name: "useKonamiCode",
    description: "Detects the Konami Code sequence in user input and triggers a callback.",
  },
  {
    name: "useSelfDestruct",
    description:
      "Triggers a self-destruct sequence after a specified delay, removing the component from the DOM.",
  },
  {
    name: "useSpooky",
    description:
      "Adds a spooky text or emoji to the document body at random intervals, creating a haunted effect.",
  },
  {
    name: "useUselessCounter",
    description: "A counter that, on increment or decrement, changes by a random step.",
  },
];
