import React, { useState, useEffect } from 'react';
import { InputNumber, Input, Button } from 'antd';
import crypto from 'crypto'
import { sendPlayersArrayToDB } from '../../api/api';
import './admin.scss';

const Admin = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [players, setPlayers] = useState([]);
    const [session, setSession] = useState('');
    const [playersConfirmed, setPlayersConfirmed] = useState(false);

    const onPlayerNumberChange = (value) => {
        setNumberOfPlayers(value);
        // setPlayers(new Array(value));
    }

    const onEnterPlayer = (e) => {
        const { value } = e.target;
        const playerID = crypto.randomBytes(3).toString('hex');
        let newPlayer = {
            name: value,
            id: playerID,
            session: session
        };
        setPlayers([...players, newPlayer])
    }

    const confirmPlayers = () => {
        sendPlayersArrayToDB(players);
        setPlayersConfirmed(true)
    }

    const renderLink = (playerID) => {
        const currentLocation = window.location.href
        const playerLink = currentLocation.substring(0,currentLocation.indexOf("admin")) + `player/${playerID}`
        return playerLink
    }

    useEffect(()=>{
        const newSessionID = crypto.randomBytes(5).toString('hex');
        setSession(newSessionID)
    },[])

    return (
        <div className="admin-page">
            <div>
                Number of players:
                <InputNumber min={1} value={numberOfPlayers} onChange={onPlayerNumberChange} />
            </div>
            <div className="players-container">
                {[...Array(numberOfPlayers)].map(
                    (n, index) =>
                        <div className="player-info" key={"playerinput" + index}>
                            <Input
                                className="name-field"
                                placeholder="Enter Player Name"
                                size="middle"
                                // onChange={}
                                onPressEnter={(event) => onEnterPlayer(event, index)}
                            />
                            <Input
                            className="id-field"
                            readOnly
                            size="middle"
                            value={players[index] ? renderLink(players[index].id) : ''} 
                            placeholder="confirm to get player link"
                            />
                            <Button onClick={() => {navigator.clipboard.writeText(players[index] ? renderLink(players[index].id) : null)}}>copy</Button>

                        </div>
                )}
            </div>
            <div>
                <Button onClick={confirmPlayers}>Confirm Players</Button>
                <Button disabled={!playersConfirmed}>Start Game</Button>
            </div>
        </div>
    )
}
export default Admin;