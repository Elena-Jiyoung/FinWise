export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages } = req.body;
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: "Missing messages" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ OpenAI API error:", data);
      return res.status(response.status).json({ error: data.error?.message || "OpenAI request failed" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("❌ Error calling OpenAI:", error.message);
    return res.status(500).json({ error: "Failed to reach chat service" });
  }
}
