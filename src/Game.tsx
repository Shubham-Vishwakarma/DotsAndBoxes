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
        console.log(`Before windowHeight = ${windowDimensions.height} and windowWidth = ${windowDimensions.width}`);

        const resizeWindow = () => {
            setWindowDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            });
        };

        console.log(`After windowHeight = ${windowDimensions.height} and windowWidth = ${windowDimensions.width}`);

        window.addEventListener('resize', resizeWindow);

        return () => (window.removeEventListener('resize', resizeWindow));
    }, [windowDimensions]);

    //Handle Game Window Resize
    useEffect(() => {

        console.log(`Cal Before windowHeight = ${windowDimensions.height} and windowWidth = ${windowDimensions.width}`);
        console.log(`Before gameHeight = ${gameDimensions.height} and gameWidth = ${gameDimensions.width}`);

        const gameHeight = windowDimensions.height;
        const gameWidth = Math.floor(windowDimensions.width * 0.6);

        setGameDimensions({
            height: gameHeight,
            width: gameWidth
        });

        console.log(`Cal after windowHeight = ${windowDimensions.height} and windowWidth = ${windowDimensions.width}`);
        console.log(`After gameHeight = ${gameDimensions.height} and gameWidth = ${gameDimensions.width}`);

        console.log('Before CSS')
        console.log(gameCssStyle);

        setGameCssStyle({
            height: String(gameHeight).concat('px'),
            width: String(gameWidth).concat('px'),
            backgroundColor: 'red',
            position: 'relative',
            margin: 'auto'
        });

        console.log('After CSS')
        console.log(gameCssStyle);

    }, [windowDimensions]);

    return (
        <div className='gameSection' style={gameCssStyle}>
            <GameBoard parentWidth={gameDimensions.width} parentHeight={gameDimensions.height} />
        </div>
    );
}

export default Game;