import React from 'react';
import type { Player } from '../../data/player.ts';

interface PlayerInfoProps {
    players: Player[];
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ players }) => {
    return (
        <div className="mt-4">
            {players.map((player) => (
                <div key={player.id} className="mb-2">
                    {player.name} - Money: {player.money} - Position: {player.position}
                </div>
            ))}
        </div>
    );
};

export default PlayerInfo;