import React from 'react';
import type { Card } from '../../data/cardData.ts';

interface CardProps {
    card: Card;
}

const Card: React.FC<CardProps> = ({ card }) => {
    return (
        <div className="bg-white border border-gray-300 rounded-md p-4">
            <h3 className="text-lg font-semibold">{card.type}</h3>
            <p>{card.text}</p>
        </div>
    );
};

export default Card;