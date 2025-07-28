import type { Player } from "../data/player.ts";

// פונקציה לעדכון כסף של שחקן
export const updatePlayerMoney = (players: Player[], playerId: number, amount: number): Player[] => {
    return players.map(player =>
        player.id === playerId ? { ...player, money: player.money + amount } : player
    );
};

// פונקציה להעברת שחקן למיקום אחר
export const movePlayerTo = (players: Player[], playerId: number, newPosition: number): Player[] => {
    return players.map(player =>
        player.id === playerId ? { ...player, position: newPosition } : player
    );
};