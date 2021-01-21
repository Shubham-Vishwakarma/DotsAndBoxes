// import css
import './index.css'

// import React from 'react';
import CSS from 'csstype';

import GameBoard from './GameBoard'

const gameWidth: number = Math.floor(window.innerWidth * 0.6);
const gameHeight: number = window.innerHeight;

const cssStyle: CSS.Properties = {
    height: String(gameHeight).concat('px'),
    width: String(gameWidth).concat('px'),
    backgroundColor: 'red',
    position: 'relative',
    margin: 'auto'
}

console.log(cssStyle);

const Game = () => {
    return (
        <div className='gameSection' style={cssStyle}>
            <GameBoard parentWidth={gameWidth} parentHeight={gameHeight} />
        </div>
    );
}

export default Game;