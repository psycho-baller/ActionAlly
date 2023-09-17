import { getEmbeddings } from "@/utils/embeddings";
import { Document, MarkdownTextSplitter, RecursiveCharacterTextSplitter } from "@pinecone-database/doc-splitter";
import { utils as PineconeUtils, Vector } from "@pinecone-database/pinecone";
import md5 from "md5";
import { getPineconeClient } from "@/utils/pinecone";
// import { Crawler, Page } from "./crawler";
import { truncateStringByBytes } from "@/utils/truncateString";

const { chunkedUpsert, createIndexIfNotExists } = PineconeUtils;

interface SeedOptions {
  splittingMethod: string;
  chunkSize: number;
  chunkOverlap: number;
}

type DocumentSplitter = RecursiveCharacterTextSplitter | MarkdownTextSplitter;

async function seed(indexName: string) {
  try {
    // Initialize the Pinecone client
    const pinecone = await getPineconeClient();

    // Choose the appropriate document splitter based on the splitting method
    // const splitter: DocumentSplitter =
    //   splittingMethod === "recursive"
    //     ? new RecursiveCharacterTextSplitter({ chunkSize, chunkOverlap })
    //     : new MarkdownTextSplitter({});

    // Prepare documents by splitting the pages
    const res = await fetch("http://localhost:3000/api/py/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    const documents = data.map((doc: any) => {
      const { page_content, metadata } = doc;
      const { last_accessed, last_modified, ...rest } = metadata;
      return {
        pageContent: page_content,
        metadata: {
          lastModified: doc.metadata.last_modified,
          lastAccessed: doc.metadata.last_accessed,
          ...rest,
        },
      };
    });

    // Create Pinecone index if it does not exist
    await createIndexIfNotExists(pinecone!, indexName, 1536);
    const index = pinecone && pinecone.Index(indexName);

    // Get the vector embeddings for the documents
    const vectors = await Promise.all(documents.flat().map(embedDocument));

    // Upsert vectors into the Pinecone index
    await chunkedUpsert(index!, vectors, "", 10);

    // Return the first document
    return documents[0];
  } catch (error) {
    console.error("Error seeding:", error);
    throw error;
  }
}

async function embedDocument(doc: Document): Promise<Vector> {
  try {
    // Generate OpenAI embeddings for the document content
    const embedding = await getEmbeddings(doc.pageContent);

    // Create a hash of the document content
    const hash = md5(doc.pageContent);

    // Return the vector embedding object
    return {
      id: hash, // The ID of the vector is the hash of the document content
      values: embedding, // The vector values are the OpenAI embeddings
      metadata: {
        // The metadata includes details about the document
        chunk: doc.pageContent, // The chunk of text that the vector represents
        hash: doc.metadata.hash as string, // The hash of the document content
        source: doc.metadata.source as string,
        created: doc.metadata.created as string,
        lastModified: doc.metadata.lastModified as string,
        lastAccessed: doc.metadata.lastAccessed as string,
        tags: doc.metadata.tags as string,
        Created: doc.metadata.Created as string,
      },
    } as Vector;
  } catch (error) {
    console.log("Error embedding document: ", error);
    throw error;
  }
}

export default seed;
