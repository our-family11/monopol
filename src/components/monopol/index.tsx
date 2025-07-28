import { useState, useEffect, useRef } from 'react';
import BOARD_DATA, { type BoardSquare } from '../../data/boardData.ts';
import CARD_DATA, { CARD_TYPE, type Card } from '../../data/cardData.ts'; // לייבא נתוני כרטיסים
import Board from '../board/index.tsx';
import type { Player } from "../../data/player.ts";
import PlayerInfo from '../playerInfo/index.tsx';
import Dice from '../dice/index.tsx';
import CardModal from '../modal/cardModal.tsx'; // לייבא את CardModal
import PropertyModal from '../modal/PropertyModal.tsx';
import ShareMemoryModal from '../modal/shareMemoryModal.tsx';

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
    const [board, setBoard] = useState<BoardSquare[]>(BOARD_DATA);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const boardRef = useRef<HTMLDivElement>(null);
    const [squareSize, setSquareSize] = useState<number>(50);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [selectedProperty, setSelectedProperty] = useState<BoardSquare | null>(null);
    const [memoryToShare, setMemoryToShare] = useState<BoardSquare | null>(null); // state לשיתוף זיכרון
    const [numberOfMemoriesToShare, setNumberOfMemoriesToShare] = useState<number>(1)
    const isSwitchingRef = useRef(false);
    const sharedMemoriesLimit = 3;

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
                    handleSquareAction(); // זה מספיק
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
                case CARD_TYPE.Property:
                    handlePropertySquare(currentSquare);
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
        const card = CARD_DATA.filter(card => card.type === "Command")[Math.floor(Math.random() * CARD_DATA.filter(card => card.type === "Command").length)];
        setSelectedCard(card);
        if (card.action) {
            card.action(players[currentPlayerIndex], { setPlayers });
        }
    };

    const handleSurpriseSquare = () => {
        const card = CARD_DATA.filter(card => card.type === "Surprise")[Math.floor(Math.random() * CARD_DATA.filter(card => card.type === "Surprise").length)];
        setSelectedCard(card);
        if (card.action) {
            card.action(players[currentPlayerIndex], { setPlayers });
        }
    };

    const handlePropertySquare = (square: BoardSquare) => {
        if (!square.owner) {
            // הנכס לא בבעלות, לפתוח מודל קנייה
            setSelectedProperty(square);
            setMemoryToShare(null);
        } else if (square.owner !== players[currentPlayerIndex].id) {
            // הנכס בבעלות של שחקן אחר, לשתף זיכרון
            setMemoryToShare(square);
            setSelectedProperty(null);
            if (square.sharedMemory && square.sharedMemory.length > sharedMemoriesLimit) {
                // צריך לשתף שני זיכרונות
                console.log("שתף שני זיכרונות על המקום הזה!"); // נוסיף לUI
            } else {
                console.log("שתף זיכרון אחד על המקום הזה!"); // נוסיף לUI
            }
        } else {
            console.log("הנכס הזה כבר בבעלותך!");
        }
    };

    const handleBuyProperty = (memories: string[]) => {
        if (selectedProperty) {
            setPlayers(prevPlayers => {
                const updatedPlayers = prevPlayers.map(player => {
                    if (player.id === players[currentPlayerIndex].id) {
                        return {
                            ...player,
                            properties: [...player.properties, selectedProperty.id]
                        };
                    }
                    return player;
                });
                return updatedPlayers;
            });
            setBoard(prevBoard => {
                return prevBoard.map(square => {
                    if (square.id === selectedProperty.id) {
                        return { ...square, owner: players[currentPlayerIndex].id };
                    }
                    return square;
                });
            });
        }
        console.log("קנינו את הנכס, הזיכרונות ששותפו:", memories, 'board: ', board, 'players: ', players);
        closePropertyModal();
    };

    const handleShareMemory = (memories: string[]) => {
        // בדיקה שמערך הזיכרונות תקין
        if (memoryToShare && memories.length === numberOfMemoriesToShare) {
            // לוגיקה לשיתוף זיכרון
            const memoryText = memories.join("\n"); // חיבור הזיכרונות למחרוזת אחת
            setBoard(prevBoard => {
                return prevBoard.map(square => {
                    if (square.id === memoryToShare.id) {
                        return { ...square, sharedMemory: memoryText }; // שמירת הזיכרון בריבוע
                    }
                    return square;
                });
            });
            console.log(`הזיכרונות ששותפו על ${memoryToShare?.name}:`, memoryText);
            closeShareMemoryModal();
        } else {
            console.error("מספר הזיכרונות לא תואם!");
        }
    };
    const closeCardModal = () => {
        setSelectedCard(null);
    };

    const closePropertyModal = () => {
        setSelectedProperty(null);
    };

    const closeShareMemoryModal = () => {
        setMemoryToShare(null);
        setNumberOfMemoriesToShare(1)
    };

    const nextPlayer = () => {
        if (isSwitchingRef.current) {
            return;
        }

        isSwitchingRef.current = true;

        setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players.length);

        setTimeout(() => {
            isSwitchingRef.current = false;
        }, 1000);
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
            {selectedCard && <CardModal card={selectedCard} onClose={closeCardModal} />}
            {selectedProperty && (
                <PropertyModal
                    property={selectedProperty}
                    onClose={closePropertyModal}
                    onBuy={handleBuyProperty}
                />
            )}
            {memoryToShare && (
                <ShareMemoryModal
                    property={memoryToShare}
                    numberOfMemories={numberOfMemoriesToShare} // מעבירים את מספר הזיכרונות
                    onClose={closeShareMemoryModal}
                    onShare={handleShareMemory}
                />
            )}
        </div>
    );
}

export default Monopol;
