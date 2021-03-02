import React, { useState, useEffect } from 'react';
import { getUpdatedPlayerInfo } from '../../api/api'

const PlayerPage = (props) => {
    const [gameData, setGameData] = useState(null);
    const { id } = props.match.params

    const updatePlayerInfo = playerID => {
        getUpdatedPlayerInfo(playerID, (playerInfo) => {
            setGameData(playerInfo)
        });
    };

    useEffect(() => {
        updatePlayerInfo(id);
    }, [id]);

    return <div>
        Player {id}
        {gameData &&
            <ul>
                <li>{gameData.name}</li>
                <li>{gameData.id}</li>
            </ul>
        }
    </div>
}

export default PlayerPage