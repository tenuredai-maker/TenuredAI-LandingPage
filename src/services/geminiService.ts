
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) throw new Error("Failed to contact intelligence node");

    const data = await response.json();
    return `> ${data.text.trim()}`;
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return `> SYSTEM ERROR: Connection to sovereign model lost.`;
  }
};
