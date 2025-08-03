import React, { useState, useEffect } from 'react';
import type { Quote } from '../types';
import QuoteCard from '../components/QuoteCard';
import { getSavedQuotes, deleteQuotebyId } from '../utils/storage';

const MyQuotes: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    setQuotes(getSavedQuotes());
  }, []);

  const handleDelete = (id: string) => {
    deleteQuotebyId(id);
    setQuotes(getSavedQuotes());
  };

  return (
    <div>
      <h1>My Saved Quotes</h1>
      {quotes.length === 0 ? (
        <p>No quotes saved yet.</p>
      ) : (
        quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onDelete={() => handleDelete(quote.id)}
            showDelete
          />
        ))
      )}
    </div>
  );
};

export default MyQuotes;
