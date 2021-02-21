import './index.css'

import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import DotsAndBoxes from './DotsAndBoxes';
import Utility from './Utility';

type Props = {
    parentWidth: number,
    parentHeight: number
}

function GameBoard(props: Props){

    const [boardSize, setBoardSize] = useState<number>(0);
    const [gameBoardStyle, setGameBoardStyle] = useState<CSS.Properties>({});

    useEffect(() => {

        const boardSize = calculateBoardSize();
        const gameBoardStyle = modifyGameBoardCSS(boardSize);
        
        setBoardSize(boardSize);
        setGameBoardStyle(gameBoardStyle)

    // eslint-disable-next-line
    }, [props.parentWidth, props.parentHeight]);

    function calculateBoardSize(): number {
        return Math.floor(Utility.min(props.parentHeight, props.parentWidth) * 0.8);
    }

    function modifyGameBoardCSS(boardSize: number): CSS.Properties{
        let top = (props.parentHeight - boardSize)/2;

        const cssStyle: CSS.Properties = {
            position: 'relative',
            margin: 'auto',
            height: String(boardSize).concat('px'),
            width: String(boardSize).concat('px'),
            top: String(top).concat('px')
        }

        return cssStyle;
    }
    
    return(
        <div className='gameBoard' style={gameBoardStyle}>
            <DotsAndBoxes
                parentHeight={boardSize} 
                parentWidth={boardSize}
                numberOfRows={3}
                numberOfColumns={3}
            />
        </div>
    )

}

export default GameBoard;