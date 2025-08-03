import type { Quote } from "../types";

const STORAGE_KEY = "savedQuotes";

export function saveQuotetoStorage(quote: Quote): void {
    const saved = getSavedQuotes();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved, quote]));
}

export function getSavedQuotes(): Quote[] {
    const quotes = localStorage.getItem(STORAGE_KEY);
    return quotes ? JSON.parse(quotes) : [];
}

export function deleteQuotebyId(id: string): void {
    const updated = getSavedQuotes().filter((quote) => quote.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}