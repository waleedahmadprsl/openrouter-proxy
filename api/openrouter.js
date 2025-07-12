export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  try {
    const response = await fetch('https://api.openrouter.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct-2506",
        messages: [
          { role: "system", content: "You are an assistant that generates Adobe Stock metadata (title, description, keywords) for a given image description." },
          { role: "user", content: prompt }
        ]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to reach OpenRouter" });
  }
}
