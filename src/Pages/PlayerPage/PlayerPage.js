import React, {useState, useEffect} from 'react';
import { getUpdatedPlayerInfo } from '../../api/api'

const PlayerPage = (props) => {
    const [gameData,setGameData] = useState(null);
    const { id } = props.match.params

    const updatePlayerInfo = playerID => {
        getUpdatedPlayerInfo(playerID,(playerInfo) => {
            console.log("player", playerInfo);
            setGameData(playerInfo)
        });
    };

    useEffect(()=> {
        updatePlayerInfo(id);
    },[id]);

    return <div>Player{id}</div>
}

export default PlayerPage