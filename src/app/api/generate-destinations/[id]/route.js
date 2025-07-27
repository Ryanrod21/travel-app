import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req, { params }) {
  const { id } = params;

  try {
    // Use a consistent prompt to always generate the same list
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are a travel assistant. When given a prompt, respond with **only** valid JSON representing an array of travel destination objects, like this:

[
  {
    "name": "Tokyo",
    "country": "Japan",
    "description": "Capital city known for ...",
    "highlights": ["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple"],
    "id": "1"
  }
]

Do not include any explanation, extra text, or formatting outside the JSON. If you cannot produce valid JSON, return an empty array [].`,
        },
        {
          role: 'user',
          content: 'Give me 10 unique travel destinations.',
        },
      ],
      temperature: 0,
    });

    let content = completion.choices[0]?.message?.content;
    let destinations = [];

    try {
      let parsed = JSON.parse(content);
      destinations = typeof parsed === 'string' ? JSON.parse(parsed) : parsed;
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response' }),
        { status: 500 }
      );
    }

    const destination = destinations.find((d) => d.id === id);

    if (!destination) {
      return new Response(JSON.stringify({ error: 'Destination not found' }), {
        status: 404,
      });
    }

    destination.image =
      destination.image || (await getUnsplashImage(destination.name));

    // destination.price = destination.price || Math.floor(Math.random() * 2000) + 500;

    return new Response(JSON.stringify(destination), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

async function getUnsplashImage(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    console.error('Unsplash failed');
    return null;
  }

  const data = await response.json();
  return data.results[0]?.urls?.regular || null;
}
