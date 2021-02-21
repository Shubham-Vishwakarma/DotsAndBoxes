import Game from './Game'
import BackgroundColorContext from './BackgroundColorContext';
import { useState } from 'react';
import GameStatusContext from './GameStatusContext';
import IBox from './IBox';
import ScoreContext from './ScoreContext';
import IScore from './IScore';
import IScoreContext from './IScoreContext';
import GameStatus from './GameStatus';
import IGameStatusContext from './IGameStatusContext';

function App(){

    const colors: string[] = ['red', 'blue'];

    const changeBackgroundColor = (lastBackgroundColor: string) => {
        const lastIndex: number = colors.indexOf(lastBackgroundColor);
        const nextIndex = (lastIndex + 1) % colors.length;
        setBackgroundColorContext({
            backgroundColor: colors[nextIndex],
            changeBackgroundColor: changeBackgroundColor
        });
    };

    const setGameStatus = (gameStatus: GameStatus) => {
        setGameStatusContext({
            gameStatus: gameStatus,
            setGameStatus: setGameStatus
        });
    };

    const updateScore = (boxes: Array<IBox>) => {

        const score: Array<IScore> = [];
        const colors = Array.from(new Set(boxes.map(box => box.backgroundColor)));

        for(let i = 0; i < colors.length; i++){
            const key = colors[i];
            const count = boxes.filter(box => box.selected === true && box.backgroundColor === key).length;

            score.push({key: key, value: count});
        }

        setScoreContext({
            score: score,
            updateScore: updateScore
        });
    }
    
    const [backgroundColorContext, setBackgroundColorContext] = useState({
        backgroundColor: colors[0],
        changeBackgroundColor: changeBackgroundColor
    });

    const [gameStatusContext, setGameStatusContext] = useState<IGameStatusContext>({
        gameStatus: GameStatus.NotStarted,
        setGameStatus: setGameStatus
    });

    const [scoreContext, setScoreContext] = useState<IScoreContext>({
        score: [],
        updateScore: updateScore
    });

    return(
        <GameStatusContext.Provider value={gameStatusContext}>
            <ScoreContext.Provider value={scoreContext}>
                <BackgroundColorContext.Provider value={backgroundColorContext}>
                    <Game />
                </BackgroundColorContext.Provider>
            </ScoreContext.Provider>
        </GameStatusContext.Provider>
    );
}

export default App;