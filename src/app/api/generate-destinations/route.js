import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const body = await request.json();
  const prompt = body.prompt;

  if (!prompt) {
    return new Response(JSON.stringify({ error: "Prompt is required" }), {
      status: 400,
    });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a travel assistant. When given a prompt, respond with **only** valid JSON representing an array of travel destination objects, like this:

[
  {
    "name": "Tokyo",
    "country": "Japan",
    "description": "Capital city known for ...",
    "highlights": ["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple"]
  }
]

Do not include any explanation, extra text, or formatting outside the JSON. If you cannot produce valid JSON, return an empty array [].
`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0,
    });

    let content = completion.choices[0]?.message?.content;

    // Handle if content is a stringified string, parse twice if needed
    let destinations = [];

    try {
      // First parse attempt
      let parsed = JSON.parse(content);

      // If parsed is still a string, parse again
      if (typeof parsed === "string") {
        destinations = JSON.parse(parsed);
      } else {
        destinations = parsed;
      }
    } catch (e) {
      return new Response(
        JSON.stringify({ error: "Failed to parse AI response." }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify({ destinations }), {
      status: 200,
    });
  } catch (err) {
    console.error("OpenAI error:", err);
    return new Response(JSON.stringify({ error: "OpenAI request failed" }), {
      status: 500,
    });
  }
}
