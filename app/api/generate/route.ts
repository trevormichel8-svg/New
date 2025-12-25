import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { prompt } = body;

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "db21e45b4c0f4e03f6e34c046d08ad76", // Example Stable Diffusion version
      input: { prompt }
    })
  });

  const json = await response.json();
  const image = json?.output?.[0] || null;

  return NextResponse.json({ image });
}
