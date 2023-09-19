import { type IUrlEntry } from "../components/UrlButton";
import { type Dispatch, type SetStateAction } from "react";

export async function crawlDocument(
  url: string,
  setEntries: Dispatch<SetStateAction<IUrlEntry[]>>,
  setCards: Dispatch<SetStateAction<unknown[]>>,
  splittingMethod: string,
  chunkSize: number,
  overlap: number
): Promise<void> {
  setEntries((seeded: IUrlEntry[]) =>
    seeded.map((seed: IUrlEntry) => (seed.url === url ? { ...seed, loading: true } : seed))
  );
  const response = await fetch("/api/crawl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      url,
      options: {
        splittingMethod,
        chunkSize,
        overlap,
      },
    }),
  });

  const { documents } = await response.json();

  setCards(documents);

  setEntries((prevEntries: IUrlEntry[]) =>
    prevEntries.map((entry: IUrlEntry) => (entry.url === url ? { ...entry, seeded: true, loading: false } : entry))
  );
}

export async function clearIndex(
  setEntries: Dispatch<SetStateAction<IUrlEntry[]>>,
  setCards: Dispatch<SetStateAction<unknown[]>>
) {
  const response = await fetch("/api/clearIndex", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    setEntries((prevEntries: IUrlEntry[]) =>
      prevEntries.map((entry: IUrlEntry) => ({
        ...entry,
        seeded: false,
        loading: false,
      }))
    );
    setCards([]);
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};
