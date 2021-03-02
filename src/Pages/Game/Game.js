import React, { useState } from 'react';
import { Switch, Button, Input, Checkbox } from 'antd';
import { updateGameStatus, notifyWinner } from '../../api/api';

const Game = ({ players, session }) => {
    const [selectedPlayer, setSelectedPlayer] = useState('');
    const [word, setWord] = useState('');

    const onInputWordChange = (event) => {
        const { value } = event.target;
        setWord(value);
    };

    const updateGame = () => {
        updateGameStatus(players, selectedPlayer, word);
    };

    const onWinnerCheckboxChange = (event, playerID) => {
        const { checked } = event.target;
        if (selectedPlayer === playerID) {
            notifyWinner(playerID, checked);
        };
    };

    return (
        <div className="controls-container">
            <div>
                Word to guess:
                <Input onChange={onInputWordChange} />
            </div>
            <div>
                {!!players.length &&
                    <ul>
                        {players.map((player, index) =>
                            <li>
                                {player.name}
                            selected:
                            <Switch checked={player.id === selectedPlayer} onChange={() => setSelectedPlayer(player.id)} />
                            <Checkbox onChange={(event) => onWinnerCheckboxChange(event, player.id)}/>
                            </li>
                        )}
                    </ul>
                }
            </div>
            <div>
                <Button onClick={updateGame}>Update Game</Button>
            </div>
        </div>
    )
};
export default Game;