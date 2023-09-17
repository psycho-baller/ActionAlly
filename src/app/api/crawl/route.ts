import seed from './seed'
import { NextResponse } from 'next/server';

export const runtime = 'edge'

export async function POST(req: Request) {
  console.log("Crawling: ", req.body || "No URL provided");
  const { url } = await req.json();
  try {
    const documents = await seed(url, 1, process.env.PINECONE_INDEX!, {
      splittingMethod: "recursive",
      chunkSize: 1000,
      chunkOverlap: 100,
    });
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed crawling" });
  }
}