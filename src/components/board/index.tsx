import React from "react";
import { GameSquare } from "../gameSquare";
import './style.scss';

export default function GameBoard() {
    const num_squares: Array<number> = Array.from(Array(40));

    return (
        <React.Fragment>
            <div className="game-board-root flex justify-center items-center h-screen perspective-[1200px]">
                <div className="grid grid-cols-11 grid-rows-11 transform rotate-x-30 shadow-2xl rounded-lg">
                    {num_squares.map((n, index) => {
                        const id: number = index + 1;

                        return (<GameSquare
                            id={id}
                            key={id}
                        />)
                    })}

                    <div className="center-square square">
                        <img className="w-full h-full object-contain" src="src/assets/our_family.jpg" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
