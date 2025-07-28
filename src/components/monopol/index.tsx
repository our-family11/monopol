import { useState, useEffect, useRef } from 'react';
import BOARD_DATA from '../../data/boardData.ts';
import CARD_DATA, { CARD_TYPE, type Card } from '../../data/cardData.ts'; // לייבא נתוני כרטיסים
import Board from '../board/index.tsx';
import type { Player } from "../../data/player.ts";
import PlayerInfo from '../playerInfo/index.tsx';
import Dice from '../dice/index.tsx';
import CardModal from '../modal/cardModal.tsx'; // לייבא את CardModal

const BOARD_SIZE = 11;
const TOTAL_SQUARES = BOARD_SIZE * 4;

const INITIAL_PLAYERS: Player[] = [
    { id: 1, name: "Player 1", position: 0, money: 1500, color: "red", properties: [] },
    { id: 2, name: "Player 2", position: 0, money: 1500, color: "blue", properties: [] },
    { id: 3, name: "Player 3", position: 0, money: 1500, color: "green", properties: [] },
    { id: 4, name: "Player 4", position: 0, money: 1500, color: "yellow", properties: [] },
];

function Monopol() {
    const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [squareSize, setSquareSize] = useState<number>(50);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null); // state לכרטיס שנבחר
    const board = BOARD_DATA;

    useEffect(() => {
        const calculateSquareSize = () => {
            if (boardRef.current) {
                const width = boardRef.current.offsetWidth;
                setSquareSize(width / (BOARD_SIZE));
            }
        };

        calculateSquareSize();
        window.addEventListener('resize', calculateSquareSize);

        return () => {
            window.removeEventListener('resize', calculateSquareSize);
        };
    }, []);

    const rollDice = () => {
        const diceRoll = Math.floor(Math.random() * 6) + 1;
        console.log(`Dice Roll: ${diceRoll}`);
        movePlayer(diceRoll);
    };

    const movePlayer = (diceRoll: number) => {
        setPlayers((prevPlayers) => {
            const updatedPlayers = [...prevPlayers];
            const currentPlayer = { ...updatedPlayers[currentPlayerIndex] };
            const newPosition = (currentPlayer.position + diceRoll) % TOTAL_SQUARES;

            const moveOneStep = (currentStep: any) => {
                if (currentStep > diceRoll) {
                    currentPlayer.position = newPosition;
                    updatedPlayers[currentPlayerIndex] = currentPlayer;
                    setPlayers(updatedPlayers);
                    setTimeout(() => {
                        handleSquareAction();
                    }, 500);
                    return;
                }

                const nextPosition = (currentPlayer.position + 1) % TOTAL_SQUARES;
                currentPlayer.position = nextPosition;

                updatedPlayers[currentPlayerIndex] = currentPlayer;
                setPlayers([...updatedPlayers]);

                setTimeout(() => {
                    moveOneStep(currentStep + 1);
                }, 200);
            };

            moveOneStep(1);

            return prevPlayers;
        });
    };

    const handleSquareAction = () => {
        const currentPlayer = players[currentPlayerIndex];
        const currentSquare = board.find((square) => square.position === currentPlayer.position);

        if (currentSquare) {
            console.log(`Player ${currentPlayer.name} landed on ${currentSquare.name}`);
            switch (currentSquare.type) {
                case CARD_TYPE.Command:
                    handleCommandSquare();
                    break;
                case CARD_TYPE.Surprise:
                    handleSurpriseSquare();
                    break;
                default:
                    console.log("No action for this square type.");
            }
        }

        setTimeout(() => {
            nextPlayer();
        }, 1000);
    };

    const handleCommandSquare = () => {
        const card = CARD_DATA.filter(card => card.type === CARD_TYPE.Command)[Math.floor(Math.random() * CARD_DATA.filter(card => card.type === CARD_TYPE.Command).length)];
        setSelectedCard(card);
        if (card.action) {
            card.action(players[currentPlayerIndex], { setPlayers }); // לבצע את הפעולה
        }
    };

    const handleSurpriseSquare = () => {
        const card = CARD_DATA.filter(card => card.type === CARD_TYPE.Surprise)[Math.floor(Math.random() * CARD_DATA.filter(card => card.type === CARD_TYPE.Surprise).length)];
        setSelectedCard(card);
        if (card.action) {
            card.action(players[currentPlayerIndex], { setPlayers }); // לבצע את הפעולה
        }
    };

    const closeCardModal = () => {
        setSelectedCard(null); // לאפס את הכרטיס שנבחר
    };

    const nextPlayer = () => {
        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);
    };

    const startGame = () => {
        setGameStarted(true);
    };

    const getSquarePosition = (index: any) => {
        const sideLength = BOARD_SIZE;
        const squareWidth = squareSize;

        const side = Math.floor(index / sideLength);
        const positionOnSide = index % sideLength;

        let top = 0;
        let left = 0;

        switch (side) {
            case 0:
                top = 0;
                left = squareWidth * positionOnSide;
                break;
            case 1:
                top = squareWidth * positionOnSide;
                left = squareSize * sideLength;
                break;
            case 2:
                top = squareSize * sideLength;
                left = squareSize * sideLength - squareWidth * positionOnSide;
                break;
            case 3:
                top = squareSize * sideLength - squareWidth * positionOnSide;
                left = 0;
                break;
            default:
                console.error("Invalid side calculation");
        }

        return { top, left };
    };

    return (
        <div className="flex flex-col items-center font-sans">
            <h1 className="text-3xl font-bold mb-4">Monopol Game</h1>

            {!gameStarted ? (
                <button onClick={startGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Start Game
                </button>
            ) : (
                <>
                    <Board
                        board={board}
                        players={players}
                        squareSize={squareSize}
                        getSquarePosition={getSquarePosition}
                        boardRef={boardRef}
                    />

                    <div className="mt-8 text-center">
                        <Dice rollDice={rollDice} currentPlayerName={players[currentPlayerIndex].name} />
                        <PlayerInfo players={players} />
                    </div>
                </>
            )}
             {selectedCard && <CardModal card={selectedCard} onClose={closeCardModal} />} {/* להציג מודל אם יש כרטיס */}
        </div>
    );
}

export default Monopol;