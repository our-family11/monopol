import React, { useEffect, useState } from 'react';
import type { BoardSquare } from '../../data/boardData.ts';

interface ShareMemoryModalProps {
    property: BoardSquare | null;
    numberOfMemories: number;
    onClose: () => void;
    onShare: (memories: string[]) => void;
}

const ShareMemoryModal: React.FC<ShareMemoryModalProps> = ({ property, numberOfMemories, onClose, onShare }) => {
    const [memories, setMemories] = useState(Array(numberOfMemories).fill(""));
    const [promptText, setPromptText] = useState("");

    useEffect(() => {
        if (numberOfMemories === 1) {
            setPromptText("ספרו לנו מה אתם זוכרים מהמקום הזה:");
        } else if (numberOfMemories === 2) {
            setPromptText("מכיוון שיש הרבה זיכרונות מהמקום הזה, ספרו לנו שני זיכרונות מהמקום הזה:");
        } else {
            setPromptText("ספרו לנו מה אתם זוכרים מהמקום הזה:");
        }
    }, [numberOfMemories]);

    if (!property) {
        return null;
    }

    const handleMemoryChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newMemories = [...memories];
        newMemories[index] = event.target.value;
        setMemories(newMemories);
    };

    const handleShare = () => {
        onShare(memories);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-xl shadow-lg p-8 w-96"> {/* שימו לב לקלאסים החדשים */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">שתפו {numberOfMemories} זיכרונות מ {property.name}</h2> {/* צבע טקסט */}
                <p className="text-gray-700 mb-4">{promptText}</p> {/* צבע טקסט */}
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
                    <button onClick={onClose} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"> {/* כפתור סגירה אדום */}
                        בטל
                    </button>
                    <button onClick={handleShare} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"> {/* כפתור ירוק */}
                        שתף זיכרונות
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShareMemoryModal;