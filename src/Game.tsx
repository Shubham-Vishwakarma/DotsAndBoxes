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
    const [gameBoardDimensions, setGameBoardDimensions] = useState<Dimension>({height: window.innerHeight, width: Math.floor(windowDimensions.width * 0.6)});
    const [gameBoardCssStyle, setGameBoardCssStyle] = useState<CSS.Properties>({
                                                            height: String(gameBoardDimensions.height).concat('px'),
                                                            width: String(gameBoardDimensions.width).concat('px'),
                                                            backgroundColor: 'red',
                                                            position: 'relative',
                                                            margin: 'auto'
                                                        });

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

    useEffect(() => {
        setGameBoardDimensions({
            height: Math.floor(windowDimensions.height),
            width: Math.floor(windowDimensions.width * 0.6)
        });

        setGameBoardCssStyle({
            height: String(gameBoardDimensions.height).concat('px'),
            width: String(gameBoardDimensions.width).concat('px'),
            backgroundColor: 'red',
            position: 'relative',
            margin: 'auto'
        });

    }, [windowDimensions]);

    return (
        <div className='gameSection' style={gameBoardCssStyle}>
            <GameBoard parentWidth={gameBoardDimensions.width} parentHeight={gameBoardDimensions.height} />
        </div>
    );
}

export default Game;