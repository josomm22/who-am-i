import React from 'react';

const PlayerPage = (props) => {
    return <div>Player{props.match.params.id}</div>
}

export default PlayerPage