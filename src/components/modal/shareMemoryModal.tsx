import React, { useState } from 'react';
import type { BoardSquare } from '../../data/boardData.ts';

interface ShareMemoryModalProps {
    property: BoardSquare | null;
    numberOfMemories: number; // כמה זיכרונות לשתף (1 או 2)
    onClose: () => void;
    onShare: (memories: string[]) => void; // משתמש במערך זיכרונות
}

const ShareMemoryModal: React.FC<ShareMemoryModalProps> = ({ property, numberOfMemories, onClose, onShare }) => {
    const [memories, setMemories] = useState(Array(numberOfMemories).fill(""));

    if (!property) {
        return null;
    }

    const handleMemoryChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMemories = [...memories];
        newMemories[index] = event.target.value;
        setMemories(newMemories);
    };

    const handleShare = () => {
        onShare(memories); // מעביר מערך
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-md p-8 w-96">
                <h2 className="text-2xl font-semibold mb-4">שתפו {numberOfMemories} זיכרונות מ {property.name}</h2>
                <p className="mb-4">ספרו לנו מה אתם זוכרים מהמקום הזה:</p>
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
                    <button onClick={handleShare} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        שתף זיכרונות
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareMemoryModal;