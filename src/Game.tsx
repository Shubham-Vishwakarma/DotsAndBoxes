// import css
import './index.css'


import CSS from 'csstype';

import GameBoard from './GameBoard'
import { useEffect, useState } from 'react';

interface Dimension{
    height: number,
    width: number
}

function Game(){

    const [windowDimensions, setWindowDimensions] = useState<Dimension>({height: window.innerHeight, width: window.innerWidth});
    const [gameDimensions, setGameDimensions] = useState<Dimension>({height: window.innerHeight, width: Math.floor(windowDimensions.width * 0.6)});
    const [gameCssStyle, setGameCssStyle] = useState<CSS.Properties>({});

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
        const gameWidth = Math.floor(windowDimensions.width * 0.6);

        setGameDimensions({
            height: gameHeight,
            width: gameWidth
        });

        setGameCssStyle({
            height: String(gameHeight).concat('px'),
            width: String(gameWidth).concat('px'),
            backgroundColor: 'red',
            position: 'relative',
            margin: 'auto'
        });
    }, [windowDimensions]);

    return (
        <div className='gameSection' style={gameCssStyle}>
            <GameBoard parentWidth={gameDimensions.width} parentHeight={gameDimensions.height} />
        </div>
    );
}

export default Game;