import React from 'react'
import type { Quote } from '../types'

interface Props {
    quote: Quote;
    onSave?: () => void;
    onDelete?: () => void;
    showDelete?: boolean;
}

const QuoteCard: React.FC<Props> = ({ quote, onSave, onDelete, showDelete }) => {
    return (
        <div style={{ padding: '1rem', marginBottom: '1rem' }}>
            {/* <strong>QuoteCard</strong> */}
            <p>{quote.content}</p>
            <p><strong>- {quote.author}</strong></p>
            {onSave && <button onClick={onSave}>Save</button>}
            {showDelete && onDelete && <button onClick={onDelete}>Delete</button>}
        </div>
    )
}

export default QuoteCard