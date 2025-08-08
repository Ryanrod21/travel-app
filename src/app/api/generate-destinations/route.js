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
  const { prompt, location, top10 } = body;

  // Validation
  if (!top10 && (!prompt || !location)) {
    return new Response(
      JSON.stringify({
        error: 'Prompt and location are required unless top10 is true.',
      }),
      { status: 400 }
    );
  }

  // System message: force JSON output only
  const systemMessage = {
    role: 'system',
    content: `You are a travel assistant. When given a prompt, respond with ONLY valid JSON representing an array of travel destination objects, like this:

[
  {
    "name": "Tokyo",
    "country": "Japan",
    "description": "Capital city known for ...",
    "highlights": ["Shibuya Crossing", "Tokyo Tower", "Senso-ji Temple"],
    "food": "Some of the best restaurants name...",
    "activities": "Here are some things you can do ...",
    "history": "History on the destination...",
    "sports": "If they have a major sports team name them all and say what they are and play, if not don't say anything...",
    "travel": "Fastest way to get there from the user's location and approximate travel time",
    "hotel": "Can you name some best and local hotels..."
  }
]

Do NOT include any explanation, markdown, or text outside this JSON. If you cannot produce valid JSON, respond with an empty array [].`,
  };

  // Compose user message based on top10 or prompt/location
  let userMessage = '';
  if (top10) {
    userMessage =
      'Return the top 10 most visited travel destinations worldwide in the required JSON format.';
  } else {
    userMessage = `User is interested in traveling to ${prompt}. You can give up to 12 related to prompt. The user is currently located in ${location}. Include the best travel method and estimated travel time for each destination.`;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [systemMessage, { role: 'user', content: userMessage }],
      temperature: 0,
    });

    const rawContent = completion.choices[0].message.content;

    // Extract JSON array safely using regex to avoid parsing errors
    const jsonMatch = rawContent.match(/\[.*\]/s);
    const cleanJson = jsonMatch ? jsonMatch[0] : '[]';

    let destinations = JSON.parse(cleanJson);

    // Fetch images for destinations if missing
    for (const dest of destinations) {
      if (!dest.image) {
        const image = await getUnsplashImage(dest.name);
        dest.image = image || null;
      }
    }

    return new Response(JSON.stringify({ destinations }), { status: 200 });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch destinations from AI.' }),
      { status: 500 }
    );
  }
}
