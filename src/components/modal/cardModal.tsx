import React from 'react';
import type { Card } from '../../data/cardData.ts';

interface CardModalProps {
    card: Card | null; // יכול להיות null אם אין קלף להצגה
    onClose: () => void;
}

const CardModal: React.FC<CardModalProps> = ({ card, onClose }) => {
    if (!card) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-8">
                <h2 className="text-2xl font-semibold mb-4">{card.type}</h2>
                <p className="mb-4">{card.text}</p>
                <button onClick={onClose} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    סגור
                </button>
            </div>
        </div>
    );
};

export default CardModal;