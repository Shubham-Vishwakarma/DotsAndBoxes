// import css
import './index.css'


import CSS from 'csstype';

import GameBoard from './GameBoard'
import { useContext, useEffect, useState } from 'react';
import BackgroundColorContext from './BackgroundColorContext';
import GameOverDialog from './GameOverDialog';
import GameStatusContext from './GameStatusContext';
import NewGameDialog from './NewGameDialog';

type Dimension = {
    height: number,
    width: number
}

function Game(){

    const [windowDimensions, setWindowDimensions] = useState<Dimension>({height: window.innerHeight, width: window.innerWidth});
    const [gameDimensions, setGameDimensions] = useState<Dimension>({height: window.innerHeight, width: Math.floor(windowDimensions.width)});
    const [gameCssStyle, setGameCssStyle] = useState<CSS.Properties>({});

    const backgroundColorContext =  useContext(BackgroundColorContext);
    const gameStatusContext = useContext(GameStatusContext);

    // Handle window resize
    useEffect(() => {
        const resizeWindow = () => {
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };

        window.addEventListener('resize', resizeWindow);

        return () => (window.removeEventListener('resize', resizeWindow));
    }, [windowDimensions]);

    //Handle Game Window Resize
    useEffect(() => {
        const gameHeight = windowDimensions.height;
        const gameWidth = windowDimensions.width < 800 ? Math.floor(windowDimensions.width) : Math.floor(windowDimensions.width * 0.6);

        setGameDimensions({
            height: gameHeight,
            width: gameWidth
        });

        setGameCssStyle({
            backgroundColor: backgroundColorContext.backgroundColor,
            height: String(gameHeight).concat('px'),
            width: String(gameWidth).concat('px'),
            position: 'relative',
            margin: 'auto'
        });
    }, [windowDimensions, backgroundColorContext.backgroundColor]);

    return (
        <div className='gameSection' style={gameCssStyle}>
            <NewGameDialog parentWidth={windowDimensions.width} parentHeight={windowDimensions.height} gameStatus={gameStatusContext.gameStatus}/>
            <GameBoard parentWidth={gameDimensions.width} parentHeight={gameDimensions.height} />
            <GameOverDialog parentWidth={windowDimensions.width} parentHeight={windowDimensions.height} gameStatus={gameStatusContext.gameStatus}/>
        </div>
    );
}

export default Game;