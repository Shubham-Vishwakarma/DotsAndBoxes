import './index.css'

import React from 'react';
import CSS from 'csstype';
import Square from './Square';


type Props = {
    parentWidth: number,
    parentHeight: number
}

type State = {
    squares: Array<CSS.Properties>
}

const cssStyle: CSS.Properties = {
    backgroundColor: 'yellow',
    position: 'relative',
    margin: 'auto'
}

let boardSize: number;
let list: Array<CSS.Properties> = [];

function min(a: number, b: number): number {
    return a < b ? a : b;
}

class GameBoard extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.state = {
            squares: []
        };

        boardSize = this.calculateBoardSize();

        this.modifyGameBoardCSS(boardSize);
    }

    componentDidMount(){
        this.createSquares(boardSize);
        this.setState({squares: this.state.squares.concat(list)});
    }

    calculateBoardSize(): number {
        return Math.floor(min(this.props.parentHeight, this.props.parentWidth) * 0.8);
    }

    modifyGameBoardCSS(boardSize: number){
        let top = (this.props.parentHeight - boardSize)/2;

        cssStyle.height = String(boardSize).concat('px');
        cssStyle.width = String(boardSize).concat('px');
        cssStyle.top = String(top).concat('px');
    }

    createSquares(boardSize: number){
        let squareSize = Math.floor(boardSize/3);

        let colors = [['blue', 'blueviolet', 'black'], ['yellow', 'red', 'green'], ['goldenrod', 'grey', 'white']]

        for(let i = 0; i < colors.length; i++){
            for(let j = 0; j < colors[i].length; j++){
                let color = colors[i][j];

                let style: CSS.Properties = {
                    backgroundColor: color,
                    height: String(squareSize).concat('px'),
                    width: String(squareSize).concat('px'),
                    top: String(i * squareSize).concat('px'),
                    left: String(j * squareSize).concat('px'),
                    position: 'absolute'
                }

                list.push(style);
            }
        }

        console.log(list);
    }

    render(){
        return(
            <div className='gameBoard' style={cssStyle}>
                {
                    this.state.squares.map((value, index) => (<Square cssStyle={value} key={index} />))
                }
            </div>
        )
    }

}

export default GameBoard;