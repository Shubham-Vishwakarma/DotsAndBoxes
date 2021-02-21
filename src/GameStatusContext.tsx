import React from 'react'
import GameStatus from './GameStatus';
import IGameStatusContext from './IGameStatusContext';

const GameStatusContext = React.createContext<IGameStatusContext>({
    gameStatus: GameStatus.NotStarted,
    setGameStatus: (_gameStatus: GameStatus) => {}
});

export default GameStatusContext;