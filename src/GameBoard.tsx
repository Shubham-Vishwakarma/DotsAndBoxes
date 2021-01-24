import './index.css'

import React from 'react';
import CSS from 'csstype';
import DotsAndBoxes from './DotsAndBoxes';
import Utility from './Utility';

interface Props{
    parentWidth: number,
    parentHeight: number
}

type State = {
}

const cssStyle: CSS.Properties = {
    backgroundColor: 'yellow',
    position: 'relative',
    margin: 'auto'
}

class GameBoard extends React.Component<Props, State>{

    private boardSize: number;

    constructor(props: Props){
        super(props);

        this.boardSize = this.calculateBoardSize();

        this.modifyGameBoardCSS(this.boardSize);
    }

    calculateBoardSize(): number {
        return Math.floor(Utility.min(this.props.parentHeight, this.props.parentWidth) * 0.8);
    }

    modifyGameBoardCSS(boardSize: number){
        let top = (this.props.parentHeight - boardSize)/2;

        cssStyle.height = String(boardSize).concat('px');
        cssStyle.width = String(boardSize).concat('px');
        cssStyle.top = String(top).concat('px');
    }

    render(){
        return(
            <div className='gameBoard' style={cssStyle}>
                <DotsAndBoxes
                    parentHeight={this.boardSize} 
                    parentWidth={this.boardSize}
                    numberOfRows={2}
                    numberOfColumns={2}
                />
            </div>
        )
    }
}

export default GameBoard;