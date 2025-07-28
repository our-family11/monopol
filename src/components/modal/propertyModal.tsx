import React, { useState } from 'react';
import type { BoardSquare } from '../../data/boardData.ts';

interface PropertyModalProps {
    property: BoardSquare | null;
    onClose: () => void;
    onBuy: (memories: string[]) => void; // פונקציה לקנייה (שיתוף זיכרונות)
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onBuy }) => {
    const [memories, setMemories] = useState(["", "", ""]);

    if (!property) {
        return null;
    }

    const handleMemoryChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMemories = [...memories];
        newMemories[index] = event.target.value;
        setMemories(newMemories);
    };

    const handleBuy = () => {
        onBuy(memories);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-8 w-96">
                <h2 className="text-2xl font-semibold mb-4">קניית {property.name}</h2>
                <p className="mb-4">שתפו שלושה זיכרונות מהמקום כדי לקנות אותו:</p>
                {memories.map((memory, index) => (
                    <div key={index} className="mb-4">
                        <label htmlFor={`memory${index}`} className="block text-gray-700 text-sm font-bold mb-2">זיכרון {index + 1}:</label>
                        <textarea
                            id={`memory${index}`}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows={3}
                            value={memory}
                            onChange={(event) => handleMemoryChange(index, event)}
                        />
                    </div>
                ))}
                <div className="flex justify-end">
                    <button onClick={onClose} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2">
                        בטל
                    </button>
                    <button onClick={handleBuy} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        קנה
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyModal;