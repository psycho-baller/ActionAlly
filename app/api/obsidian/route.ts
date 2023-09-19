import seed from "./seed";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  try {
    const documents = await seed(process.env.PINECONE_INDEX!);
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed crawling" });
  }
}
