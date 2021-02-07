import React from 'react'

const GameOverContext = React.createContext({
    isGameOver: false,
    setIsGameOver: (isGameOver: boolean) => {}
});

export default GameOverContext;