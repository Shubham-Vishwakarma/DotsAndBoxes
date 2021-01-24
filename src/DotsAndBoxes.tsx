import './index.css'

import React from 'react';
import CSS from 'csstype';

import Box from './Box';
import Dot from './Dot';
import Utility from './Utility';

type Props = {
    parentHeight: number,
    parentWidth: number,
    numberOfRows: number,
    numberOfColumns: number
}

type State = {
    boxes: Array<CSS.Properties>,
    dots: Array<CSS.Properties>
}

class DotsAndBoxes extends React.Component<Props, State>{
    
    private boxes: Array<CSS.Properties> = [];
    private dots: Array<CSS.Properties> = [];

    constructor(props: Props){
        super(props);

        this.state = {
            boxes: [],
            dots: []
        }
    }

    componentDidMount(){
        this.createBoxes(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        this.createDots(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);

        this.setState({boxes: this.state.boxes.concat(this.boxes)});
    }
    
    private createBoxes(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number){
        let boxWidth: number = Math.floor(parentWidth/numberOfRows);
        let boxHeight: number = Math.floor(parentHeight/numberOfColumns);
    
        this.boxes = [];
    
        for(let i = 0; i < numberOfRows; i++){
            for(let j = 0; j < numberOfColumns; j++){
    
                let style: CSS.Properties = {
                    backgroundColor: 'white',
                    border: '1px solid black',
                    height: String(boxHeight).concat('px'),
                    width: String(boxWidth).concat('px'),
                    top: String(i * boxHeight).concat('px'),
                    left: String(j * boxWidth).concat('px'),
                    position: 'absolute'
                }
    
                this.boxes.push(style);
            }
        }
    }

    private createDots(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number){
        let boxWidth: number = Math.floor(parentWidth/numberOfRows);
        let boxHeight: number = Math.floor(parentHeight/numberOfColumns);
        let numberOfRowDots: number = numberOfRows + 1;
        let numberOfColumnDots: number = numberOfColumns + 1;

        let dotRadius: number = Utility.min(boxWidth, boxHeight) * 0.1;

        for(let i = 0; i < numberOfRowDots; i++){
            for(let j = 0; j < numberOfColumnDots; j++){
                let style: CSS.Properties = {
                    backgroundColor: 'black',
                    height: String(dotRadius).concat('px'),
                    width: String(dotRadius).concat('px'),
                    borderRadius: '50%',
                    top: String(i * boxHeight - dotRadius/2).concat('px'),
                    left: String(j * boxWidth - dotRadius/2).concat('px'),
                    position: 'absolute'
                }
    
                this.dots.push(style);
            }
        }
    }

    render(){
        return(
            <div>
            {
                this.boxes.map((value, index) => (<Box key={index} cssStyle={value} boxId={`box-${index}`} />))
            }
            {
                this.dots.map((value, index) => (<Dot key={index} cssStyle={value} dotId={`dot-${index}`} />))
            }
            </div>
        );
    }
}

export default DotsAndBoxes;