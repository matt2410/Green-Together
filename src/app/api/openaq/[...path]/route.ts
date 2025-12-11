import { NextResponse } from "next/server";

const API = process.env.OPENAQ_API_KEY ?? "";

function getHeaders() {
  return {
    "X-API-Key": API,
    Accept: "application/json",
  };
}

export async function GET(req: Request, ctx: { params: Promise<{ path?: string[] }> }) {
  const { path } = await ctx.params;

  if (!path || path.length === 0) {
    return NextResponse.json(
      { error: "Missing path for OpenAQ API proxy" },
      { status: 400 }
    );
  }

  const forwardPath = path.join("/");

  const search = req.url.split("?")[1];
  const queryString = search ? `?${search}` : "";

  const url = `https://api.openaq.org/v3/${forwardPath}${queryString}`;

  const res = await fetch(url, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: `OpenAQ returned ${res.status}`, details: text },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}
