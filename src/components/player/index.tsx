import React from 'react';
import type { Player } from '../../data/player.ts';

interface PlayerProps {
    player: Player;
}

const PlayerWidget: React.FC<PlayerProps> = ({ player }) => {
    return (
        <div
            className="w-2.5 h-2.5 rounded-full mr-0.5"
            style={{ backgroundColor: player.color }}
        ></div>
    );
};

export default PlayerWidget;