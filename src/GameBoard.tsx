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
    cssStyle: CSS.Properties
}

class GameBoard extends React.Component<Props, State>{

    private boardSize: number = 0;

    constructor(props: Props){
        super(props);

        this.state = {
            cssStyle: {}
        }
    }

    componentDidMount(){
        this.boardSize = this.calculateBoardSize();
        const cssStyle = this.modifyGameBoardCSS(this.boardSize);
        this.setState({cssStyle: cssStyle});
    }

    componentDidUpdate(prevProps: Props){
        if(prevProps.parentHeight !== this.props.parentHeight || prevProps.parentWidth !== this.props.parentWidth){
            this.boardSize = this.calculateBoardSize();
            const cssStyle = this.modifyGameBoardCSS(this.boardSize);
            this.setState({cssStyle: cssStyle});
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
        return(
            <div className='gameBoard' style={this.state.cssStyle}>
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