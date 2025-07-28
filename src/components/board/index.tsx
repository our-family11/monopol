import React from 'react';
import type { BoardSquare } from '../../data/boardData';
import Square from '../square/index.tsx';

interface BoardProps {
    board: BoardSquare[];
    players: any[]; // נשנה את זה בהמשך לטיפוס שחקן
    squareSize: number;
    getSquarePosition: (index: number) => { top: number; left: number };
    boardRef: React.RefObject<HTMLDivElement | null>; // הוספנו ref
}

const Board: React.FC<BoardProps> = ({ board, players, squareSize, getSquarePosition, boardRef }) => {
    return (
        <div className="relative w-[600px] h-[600px] bg-gray-300 border-2 border-black mb-8" ref={boardRef}>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 flex justify-center items-center z-10">
                <img src="src/assets/our_family.jpg" alt="Center" className="max-w-full max-h-full object-contain" />
            </div>
            {board.map((square) => (
                <Square
                    key={square.id}
                    square={square}
                    players={players.filter(player => player.position === square.position)}
                    squareSize={squareSize}
                    getSquarePosition={getSquarePosition}
                />
            ))}
        </div>
    );
};

export default Board;