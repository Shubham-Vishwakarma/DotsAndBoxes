import Game from './Game'
import BackgroundColorContext from './BackgroundColorContext';
import { useState } from 'react';
import GameOverContext from './GameOverContext';

function App(){

    const colors: string[] = ['red', 'blue'];

    const changeBackgroundColor = (lastBackgroundColor: string) => {
        const lastIndex: number = colors.indexOf(lastBackgroundColor);
        const nextIndex = (lastIndex + 1) % colors.length;
        setBackgroundColorContext({
            backgroundColor: colors[nextIndex],
            changeBackgroundColor: changeBackgroundColor
        });
    }

    const setIsGameOver = (isGameOver: boolean) => {
        setGameOverContext({
            isGameOver: !isGameOver,
            setIsGameOver: setIsGameOver
        });
    }
    
    const [backgroundColorContext, setBackgroundColorContext] = useState({
        backgroundColor: colors[0],
        changeBackgroundColor: changeBackgroundColor
    });

    const [gameOverContext, setGameOverContext] = useState({
        isGameOver: false,
        setIsGameOver: setIsGameOver
    });

    return(
        <GameOverContext.Provider value={gameOverContext}>
            <BackgroundColorContext.Provider value={backgroundColorContext}>
                <Game />
            </BackgroundColorContext.Provider>
        </GameOverContext.Provider>
    );
}

export default App;