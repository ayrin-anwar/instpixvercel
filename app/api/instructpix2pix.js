import { Client } from "@gradio/client";

export default async function handler(req, res) {
  try {
    // Assuming you'll send the image URL and prompt in the request body
    const { imageUrl, prompt } = req.body;

    if (!imageUrl || !prompt) {
      return res.status(400).json({ error: "Please provide both imageUrl and prompt in the request body." });
    }

    const response_0 = await fetch(imageUrl);
    if (!response_0.ok) {
      return res.status(400).json({ error: `Failed to fetch images from URL: ${imageUrl}` });
    }
    const exampleImage = await response_0.blob();

    const client = await Client.connect("AyrinAnwar/InstructPix2PixAyrin");
    const result = await client.predict("/transform", {
      image: exampleImage,
      prompt: prompt,
      steps: 1,
    });

    // Send the result back as a JSON response
    res.status(200).json({ data: result.data });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    res.status(500).json({ error: error.message });
  }
}