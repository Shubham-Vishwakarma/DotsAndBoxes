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
import Color from './Color';
import NumberOfPlayersContext from './NumberOfPlayersContext';
import INumberOfPlayersContext from './INumberOfPlayersContext';

function App(){

    let numOfPlayers = 0;
    const colors: string[] = [Color.Red, Color.Green, Color.Yellow, Color.Blue];

    const changeBackgroundColor = (lastBackgroundColor: string) => {
        const lastIndex: number = colors.indexOf(lastBackgroundColor);
        let nextIndex: number = lastIndex;
        if(numOfPlayers > 0)
            nextIndex = (lastIndex + 1) % numOfPlayers;
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
        
        for(let i = 0; i < numOfPlayers; i++){
            const key = colors[i];
            const count = boxes.filter(box => box.selected === true && box.backgroundColor === key).length;

            score.push({key: key, value: count});
        }

        setScoreContext({
            score: score,
            updateScore: updateScore
        });
    }
    
    const setNumberOfPlayers = (numberOfPlayers: number) => {
        numOfPlayers = numberOfPlayers;
        setNumberOfPlayersContext({
            numberOfPlayers: numberOfPlayers,
            setNumberOfPlayers: setNumberOfPlayers
        })
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

    const [numberOfPlayerContext, setNumberOfPlayersContext] = useState<INumberOfPlayersContext>({
        numberOfPlayers: 0,
        setNumberOfPlayers: setNumberOfPlayers
    });

    return(
        <GameStatusContext.Provider value={gameStatusContext}>
            <NumberOfPlayersContext.Provider value={numberOfPlayerContext}>
                <ScoreContext.Provider value={scoreContext}>
                    <BackgroundColorContext.Provider value={backgroundColorContext}>
                        <Game />
                    </BackgroundColorContext.Provider>
                </ScoreContext.Provider>
            </NumberOfPlayersContext.Provider>
        </GameStatusContext.Provider>
    );
}

export default App;