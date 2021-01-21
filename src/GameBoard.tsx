import './index.css'

import React from 'react';
import CSS from 'csstype';


type Props = {
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

function min(a: number, b: number): number {
    return a < b ? a : b;
}

class GameBoard extends React.Component<Props, State>{

    render() {

        let size = min(this.props.parentHeight, this.props.parentWidth);
        size = Math.floor(size*0.8);

        let top = (this.props.parentHeight - size)/2;

        cssStyle.height = String(size).concat('px');
        cssStyle.width = String(size).concat('px');
        cssStyle.top = String(top).concat('px');

        return(
            <div className='gameBoard' style={cssStyle}>
            </div>
        );
    }

}

export default GameBoard;