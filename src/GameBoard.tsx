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
    boardSize: number
    cssStyle: CSS.Properties
}

class GameBoard extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.state = {
            boardSize: 0,
            cssStyle: {}
        }
    }

    componentDidMount(){
        const boardSize = this.calculateBoardSize();
        const cssStyle = this.modifyGameBoardCSS(boardSize);
        this.setState({boardSize: boardSize, cssStyle: cssStyle});
    }

    componentDidUpdate(prevProps: Props){
        if(prevProps.parentHeight !== this.props.parentHeight || prevProps.parentWidth !== this.props.parentWidth){
            const boardSize = this.calculateBoardSize();
            const cssStyle = this.modifyGameBoardCSS(boardSize);
            this.setState({boardSize: boardSize, cssStyle: cssStyle});
        }
    }

    calculateBoardSize(): number {
        return Math.floor(Utility.min(this.props.parentHeight, this.props.parentWidth) * 0.8);
    }

    modifyGameBoardCSS(boardSize: number): CSS.Properties{
        let top = (this.props.parentHeight - boardSize)/2;

        const cssStyle: CSS.Properties = {
            position: 'relative',
            margin: 'auto',
            height: String(boardSize).concat('px'),
            width: String(boardSize).concat('px'),
            top: String(top).concat('px')
        }

        return cssStyle;
    }

    render(){
        console.log(`Board Size = ${this.state.boardSize}`)
        return(
            <div className='gameBoard' style={this.state.cssStyle}>
                <DotsAndBoxes
                    parentHeight={this.state.boardSize} 
                    parentWidth={this.state.boardSize}
                    numberOfRows={2}
                    numberOfColumns={2}
                />
            </div>
        )
    }
}

export default GameBoard;