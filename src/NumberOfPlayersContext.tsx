import React from 'react'
import INumberOfPlayersContext from './INumberOfPlayersContext';

const NumberOfPlayersContext = React.createContext<INumberOfPlayersContext>({
    numberOfPlayers: 0,
    setNumberOfPlayers: (_numberOfPlayers: number) => {}
});

export default NumberOfPlayersContext;