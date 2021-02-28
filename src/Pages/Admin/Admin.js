import React, { useState } from 'react';
import { InputNumber, Input, Button } from 'antd';
import crypto from 'crypto'
import { sendPlayersToDB, getPlayers } from '../../api/api';
import './admin.scss';

const routeTest = crypto.randomBytes(5).toString('hex')

const Admin = () => {
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [players, setPlayers] = useState([]);

    console.log("getPlayers", getPlayers())


    const onPlayerNumberChange = (value) => {
        setNumberOfPlayers(value);
        // setPlayers(new Array(value));
    }

    // const onInputChange = (eevent,index) => {
    //     const {value} = event.target;

    // }

    const onEnterPlayer = (e) => {
        const { value } = e.target;
        const playerID = crypto.randomBytes(3).toString('hex');
        let newPlayer = {
            name: value,
            id: playerID
        };
        setPlayers([...players, newPlayer])
        sendPlayersToDB(newPlayer)


    }

    const onConfirmPlayers = () => {
        if (!!players.length) {
            console.log("players", players)
            sendPlayersToDB(players)
        };
    }

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
                                placeholder="Enter Player Name"
                                size="middle"
                                // onChange={}
                                onPressEnter={(event) => onEnterPlayer(event, index)}
                            />
                            <Button>Confirm</Button>
                            <div>{!!players.length && players[index] ? <>Player Link:  {players[index].id}</> : ""}</div>
                        </div>
                )}
            </div>
            <div>
                <Button onClick={onConfirmPlayers}>Confirm Players</Button>
            </div>
        </div>
    )
}
export default Admin;