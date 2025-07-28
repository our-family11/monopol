import React from 'react';
import type { BoardSquare } from '../../data/boardData';
import type { Player } from '../../data/player.ts';
import PlayerWidget from '../player/index.tsx';

interface SquareProps {
    square: BoardSquare;
    players: Player[]; // להשתמש בטיפוס שחקן
    squareSize: number;
    getSquarePosition: (index: number) => { top: number; left: number };
}

const Square: React.FC<SquareProps> = ({ square, players, squareSize, getSquarePosition }) => {
    const position = getSquarePosition(square.position);

    return (
        <div
            className="absolute bg-gray-100 border border-gray-300 flex justify-center items-center text-xs word-break break-words p-1 box-border"
            style={{
                width: squareSize,
                height: squareSize,
                top: position.top,
                left: position.left,
            }}
        >
            {square.name}
            <div className="absolute bottom-1 left-1 flex">
                {players.map((player) => (
                    <PlayerWidget key={player.id} player={player} /> // שימוש בקומפוננטת Player
                ))}
            </div>
        </div>
    );
};

export default Square;