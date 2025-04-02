import { Client } from "@gradio/client";
import { NextResponse } from 'next/server';

export async function POST(req, res) { // Renamed the function to POST and added req, res (though we primarily use req)
  console.log("API working pix2pix")
  try {
    const reqBody = await req.json(); // Use req.json() to parse the request body
    const { imageUrl, prompt } = reqBody;

    if (!imageUrl || !prompt) {
      return NextResponse.json({ error: "Please provide both imageUrl and prompt in the request body." }, { status: 400 });
    }

    const response_0 = await fetch(imageUrl);
    if (!response_0.ok) {
      return NextResponse.json({ error: `Failed to fetch images from URL: ${imageUrl}` }, { status: 400 });
    }
    const exampleImage = await response_0.blob();

    const client = await Client.connect("AyrinAnwar/InstructPix2PixAyrin");
    const result = await client.predict("/transform", {
      image: exampleImage,
      prompt: prompt,
      steps: 1,
    });

    // Send the result back as a JSON response
    return NextResponse.json({ data: result.data });

  } catch (error) {
    console.error("Vercel Function Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}