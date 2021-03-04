import React, { useState, useEffect } from 'react';
import { InputNumber, Input, Button } from 'antd';
import crypto from 'crypto'
import { sendPlayersArrayToDB, sendSessionInfo, getSession } from '../../api/api';
import Game from '../Game';
import './admin.scss';

const Admin = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [players, setPlayers] = useState([]);
    const [session, setSession] = useState('');
    const [playersConfirmed, setPlayersConfirmed] = useState(false);

    const onPlayerNumberChange = (value) => {
        setNumberOfPlayers(value);
    }

    const onEnterPlayer = (e, index) => {
        const { value } = e.target;
        if (players[index]){
            let updatedPlayersList = players;
            updatedPlayersList[index].name = value;
            setPlayers(updatedPlayersList);
        }else {
            const playerID = crypto.randomBytes(3).toString('hex');
            let newPlayer = {
                name: value,
                id: playerID,
                session: session
            };
            setPlayers([...players, newPlayer]);
        }
    }

    const confirmPlayers = () => {
        let confirmedPlayers = players;
        confirmedPlayers.forEach(player => {
            if (!player.id) {
                player.id = crypto.randomBytes(3).toString('hex')
            }
        })
        sendPlayersArrayToDB(players);
        sendSessionInfo(session,players)
        setPlayersConfirmed(true)
    }

    const renderLink = (playerID) => {
        const currentLocation = window.location.href
        const playerLink = currentLocation.substring(0, currentLocation.indexOf("admin")) + `player/${playerID}`
        return playerLink
    }

    const resumeSession = async (event) => {
        const { value } = event.target;
        const sessionData = await getSession(value);
        if (sessionData) {
            setSession(sessionData.sessionID);
            setPlayers(sessionData.players);
            setPlayersConfirmed(true);
        };
    }

    useEffect(() => {
        const newSessionID = crypto.randomBytes(5).toString('hex');
        setSession(newSessionID)
    }, [])

    return (
        <div className="admin-page">
            <div>
                Number of players:
                <InputNumber min={1} value={numberOfPlayers} onChange={onPlayerNumberChange} />
            </div>
            <div className="session-input">Resume Session: <Input placeholder="sessionid" onPressEnter={resumeSession}/></div>
            <div className="players-container">
                {[...Array(numberOfPlayers)].map(
                    (n, index) =>
                        <div className="player-info" key={"playerinput" + index}>
                            <Input
                                className="name-field"
                                placeholder="Enter Player Name"
                                size="middle"
                                value={players[index] ? players[index].name : ''}
                                onPressEnter={(event) => onEnterPlayer(event, index)}
                            />
                            <Input
                                className="id-field"
                                readOnly
                                size="middle"
                                value={players[index] ? renderLink(players[index].id) : ''}
                                placeholder="confirm to get player link"
                            />
                            <Button onClick={() => { navigator.clipboard.writeText(players[index] ? renderLink(players[index].id) : null) }}>copy</Button>

                        </div>
                )}
            </div>
            <div>
                <Button onClick={confirmPlayers}>Confirm Players</Button>
                <Button disabled={!playersConfirmed}>Start Game</Button>
            </div>
            {playersConfirmed &&
                <Game players={players} session={session} />
            }
        </div>
    )
}
export default Admin;