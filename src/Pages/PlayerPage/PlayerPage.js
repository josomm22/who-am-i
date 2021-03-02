import React, { useState, useEffect } from 'react';
import { getUpdatedPlayerInfo } from '../../api/api'
import useSound from 'use-sound';
import Confetti from 'react-confetti';
import kidscheering from '../../assets/sounds/kidscheering.mp3';
import './playerPage.scss';

const PlayerPage = (props) => {
    const [gameData, setGameData] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [isSelectedPlayer, setIsSelectedPlayer] = useState(false);
    const [isWinner, setIsWinner] = useState(false);
    const { id } = props.match.params;

    const updatePlayerInfo = playerID => {
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
    };

    const [playOn] = useSound(
        kidscheering,
        { volume: 0.25 }
    );

    useEffect(() => {
        if (isWinner) {
            playOn();
            setTimeout(() => { setIsWinner(false) }, 9000);
        };
    }, [isWinner]);

    useEffect(() => {
        updatePlayerInfo(id);
    }, [id]);


    return <div className="playerinfo-container">
        {isWinner && <Confetti />}
        Player {id}
        <div>
            Hello: {playerName}
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