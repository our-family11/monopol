import React from 'react';

interface DiceProps {
    rollDice: () => void;
    currentPlayerName: string;
}

const Dice: React.FC<DiceProps> = ({ rollDice, currentPlayerName }) => {
    return (
        <>
            <h2 className="text-xl font-semibold mb-2">Current Player: {currentPlayerName}</h2>
            <button
                onClick={rollDice}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Roll Dice
            </button>
        </>
    );
};

export default Dice;