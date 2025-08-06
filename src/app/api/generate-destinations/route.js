import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

async function getUnsplashImage(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${UNSPLASH_ACCESS_KEY}`
  );

  if (!response.ok) {
    console.error('Unsplash fetch failed');
    return null;
  }

  const data = await response.json();
  return data.results[0]?.urls?.regular || null;
}

export async function POST(request) {
  const body = await request.json();
  const prompt = body.prompt;
  const location = body.location;

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required' }), {
      status: 400,
    });
  }

  try {
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
    "food": "Some of the best restaurants name...",
    "activities": "Here are some things you can do ...",
    "history": "History on the destination...,
    "sports": "If they have a major sports team name them all and say what they are and play, if not don't say antying...",
    "travel": "Fastest way to get there from the user's location and approximate travel time"
    "hotel": "Can you name some best and local hotels....
    }
]

Do not include any explanation, extra text, or formatting outside the JSON. If you cannot produce valid JSON, return an empty array [].`,
        },
        {
          role: 'user',
          content: `User is interested in traveling to ${prompt}. The user is currently located in ${location}. Include the best travel method and estimated travel time for each destination.`,
        },
      ],
      temperature: 0,
    });

    let content = completion.choices[0]?.message?.content;
    let destinations = [];

    try {
      let parsed = JSON.parse(content);
      if (typeof parsed === 'string') {
        destinations = JSON.parse(parsed);
      } else {
        destinations = parsed;
      }
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'Failed to parse AI response.' }),
        { status: 500 }
      );
    }

    // Add Unsplash image for each destination
    for (const dest of destinations) {
      if (!dest.image) {
        const image = await getUnsplashImage(dest.name);
        dest.image = image || null;
      }
    }

    return new Response(JSON.stringify({ destinations }), {
      status: 200,
    });
  } catch (err) {
    console.error('OpenAI error:', err);
    return new Response(JSON.stringify({ error: 'OpenAI request failed' }), {
      status: 500,
    });
  }
}
