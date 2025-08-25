export const useDadJoke = () => {
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
