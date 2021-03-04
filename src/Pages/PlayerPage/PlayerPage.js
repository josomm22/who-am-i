import React, { useState, useEffect, useCallback } from 'react';
import { getUpdatedPlayerInfo } from '../../api/api'
import Confetti from 'react-confetti';
import kidscheering from '../../assets/sounds/kidscheering.mp3';
import './playerPage.scss';

const PlayerPage = (props) => {
    const [gameData, setGameData] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [isSelectedPlayer, setIsSelectedPlayer] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const { id } = props.match.params;

    const updatePlayerInfo = useCallback((playerID)=>{
            getUpdatedPlayerInfo(playerID, (playerInfo) => {
                setIsWinner(playerInfo.isWinner);
                if (playerName !== playerInfo.name) {
                    setPlayerName(playerInfo.name);
                };
                if (playerInfo.gameData) {
                    setGameData(playerInfo.gameData);
                    playerInfo.gameData.currentPlayerID === id ? setIsSelectedPlayer(true) : setIsSelectedPlayer(false);
                };
            });
    },[playerName, id]) 

    const playSound = useCallback(() => {
        const audioEl = document.getElementsByClassName("audio-element")[0]
        audioEl.volume = 0.25;
        audioEl.play()
    }, [])

    useEffect(() => {
        if (isWinner) {
            // playOn()
            playSound()
            setTimeout(() => { setIsWinner(false) }, 9000);

        }
    }, [isWinner,playSound]);

    useEffect(() => {
        updatePlayerInfo(id);
    }, [id, updatePlayerInfo]);


    return <div className="playerinfo-container">
        {isWinner && <Confetti />}
        <audio className="audio-element">
            <source src={kidscheering}/>
        </audio>
        Player id {id}
        <div className="player-name">
            Hello {playerName}
        </div>
        {gameData &&
            <div className="info-container">
                <div className="bubble">
                    <div className="text-info">
                        Currently Playing:
                    </div>
                    <div className="game-info">
                        {gameData.currentPlayerName}
                    </div>
                </div>
                <div className="bubble">
                    <div className="text-info">
                        Famous person he needs to guess:
                    </div>
                    <div className="game-info">
                        {gameData.word}
                    </div>
                </div>
            </div>
        }
        {isSelectedPlayer &&
            <div>
                You have to guess which famous person you are...
                Here are some examples of questions you could ask.
                Note: you may only ask questions than can be answered by yes or no.
                <ul>
                    <li>Are you a male (female)?</li>
                    <li>Are you an entertainer?</li>
                    <li>Are you a singer (dancer, actor)?</li>
                    <li> Are you a historical figure?</li>
                    <li> Are you young (old)?</li>
                    <li>Are you alive now?</li>
                    <li>Are you considered beautiful (handsome)?</li>
                </ul>
            </div>
        }
    </div>
}

export default PlayerPage