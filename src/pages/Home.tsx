import { useCallback, useEffect, useState } from 'react'
import QuoteCard from '../components/QuoteCard'
import type { Quote } from '../types'
import { saveQuotetoStorage } from '../utils/storage'

const Home = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [quote, setQuote] = useState<Quote | null>(null);
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchQuotes = async () => {
        const cached = localStorage.getItem('quotes');
        if (cached) {
            return JSON.parse(cached);
        }

        try {
            const response = await fetch('http://localhost:4000/api/quotes');
            const data = await response.json();
            localStorage.setItem('quotes', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('Error fetching quote:', error);
            return [];
        }
    };

    const loadQuotes = useCallback(async () => {
        setLoading(true);
        const data = await fetchQuotes();
        setQuotes(data);
        if (data.length > 0) {
            setQuote(data[0]);
            setQuoteIndex(1);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        loadQuotes();
    }, [loadQuotes]);

    const handleNextQuote = () => {
        if (quoteIndex < quotes.length) {
            setQuote(quotes[quoteIndex]);
            setQuoteIndex(quoteIndex + 1);
        } else {
            setQuote(null);
        }
    }

    const handleSave = () => {
        if (quote) {
            saveQuotetoStorage(quote);
            alert('Quote saved successfully!');
        }
    }

    const handleReset = () => {
        if (quotes.length > 0) {
            setQuote(quotes[0]);
            setQuoteIndex(1);
        }
    };

    return (
        <div>
            <h1>Quote</h1>

            {loading && <p>Loading...</p>}

            {quote && <QuoteCard quote={quote} onSave={handleSave} />}

            {!loading && !quote && <p>No more quotes available.</p>}

            {quoteIndex < quotes.length && !loading && (
                <button onClick={handleNextQuote}>Next Quote</button>
            )}

            {quoteIndex >= quotes.length && !loading && (
                <div>
                    <p>No more quotes available.</p>
                    <button onClick={handleReset}>Start Over</button>
                </div>
            )}
        </div>

    )
}

export default Home