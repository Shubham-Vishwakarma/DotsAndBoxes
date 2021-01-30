import './index.css'

import React from 'react';
import CSS from 'csstype';

import Box from './Box';
import Dot from './Dot';
import Utility from './Utility';
import Line from './Line';
import ILine, {Direction} from './ILine';

type Props = {
    parentHeight: number,
    parentWidth: number,
    numberOfRows: number,
    numberOfColumns: number
}

type State = {
    boxes: Array<CSS.Properties>,
    dots: Array<CSS.Properties>,
    lines: Array<ILine>
}

class DotsAndBoxes extends React.Component<Props, State>{

    constructor(props: Props){
        super(props);

        this.state = {
            boxes: [],
            dots: [],
            lines: []
        }
    }

    componentDidMount(){
        const boxes = this.createBoxes(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        const dots = this.createDots(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        const lines = this.createLines(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);

        this.setState({boxes: boxes, dots: dots, lines: lines});
    }

    componentDidUpdate(prevProps: Props){
        if(prevProps.parentWidth !== this.props.parentWidth ||
            prevProps.parentHeight !== this.props.parentHeight ||
            prevProps.numberOfRows !== this.props.numberOfRows ||
            prevProps.numberOfColumns !== this.props.numberOfColumns){
                const boxes = this.createBoxes(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
                const dots = this.createDots(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
                const lines = this.createLines(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        
                this.setState({boxes: boxes, dots: dots, lines: lines});
            }
    }
    
    private createBoxes(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<CSS.Properties>{
        let boxWidth: number = Math.floor(parentWidth/numberOfRows);
        let boxHeight: number = Math.floor(parentHeight/numberOfColumns);
    
        const boxes: Array<CSS.Properties> = [];
    
        for(let i = 0; i < numberOfRows; i++){
            for(let j = 0; j < numberOfColumns; j++){
    
                let style: CSS.Properties = {
                    backgroundColor: 'white',
                    height: String(boxHeight).concat('px'),
                    width: String(boxWidth).concat('px'),
                    top: String(i * boxHeight).concat('px'),
                    left: String(j * boxWidth).concat('px'),
                    position: 'absolute'
                }
    
                boxes.push(style);
            }
        }

        return boxes;
    }

    private createDots(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<CSS.Properties>{
        const boxWidth: number = Math.floor(parentWidth/numberOfRows);
        const boxHeight: number = Math.floor(parentHeight/numberOfColumns);
        const numberOfRowDots: number = numberOfRows + 1;
        const numberOfColumnDots: number = numberOfColumns + 1;

        const dotDiameter: number = Math.floor(Utility.min(boxWidth, boxHeight) * 0.1);

        const dots: Array<CSS.Properties> = []

        for(let i = 0; i < numberOfRowDots; i++){
            for(let j = 0; j < numberOfColumnDots; j++){
                let style: CSS.Properties = {
                    backgroundColor: 'white',
                    border: '2px solid black',
                    height: String(dotDiameter).concat('px'),
                    width: String(dotDiameter).concat('px'),
                    borderRadius: '50%',
                    top: String(Math.floor(i * boxHeight - dotDiameter/2)).concat('px'),
                    left: String(Math.floor(j * boxWidth - dotDiameter/2)).concat('px'),
                    position: 'absolute'
                }
    
                dots.push(style);
            }
        }

        return dots;
    }

    private createLines(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<ILine>{
        const boxWidth: number = Math.floor(parentWidth/numberOfRows);
        const boxHeight: number = Math.floor(parentHeight/numberOfColumns);

        const lines: Array<ILine> = []

        //Horizontal Lines
        for(let i = 0; i < numberOfRows + 1; i++){
            for(let j = 0; j < numberOfColumns; j++){
                const direction = Direction.Horizontal;
                const id = `${direction}-${i}${j}`;

                let style: CSS.Properties = {
                    backgroundColor: '#b5cef5',
                    height: '8px',
                    minHeight: '8px',
                    width: String(boxWidth).concat('px'),
                    top: String(Math.floor(i * boxHeight)).concat('px'),
                    left: String(Math.floor(j * boxWidth)).concat('px'),
                    position: 'absolute'
                }

                lines.push({id: id, direction: direction, row: i, column: j, style: style});
            }
        }

        //Vertical Lines
        for(let i = 0; i < numberOfRows; i++){
            for(let j = 0; j < numberOfColumns + 1; j++){
                const direction = Direction.Vertical;
                const id = `${direction}-${i}${j}`;

                let style: CSS.Properties = {
                    backgroundColor: '#b5cef5',
                    height: String(boxHeight).concat('px'),
                    width: '8px',
                    minWidth: '8px',
                    top: String(Math.floor(i * boxHeight)).concat('px'),
                    left: String(Math.floor(j * boxWidth)).concat('px'),
                    position: 'absolute',
                }

                lines.push({id: id, direction: direction, row: i, column: j, style: style});
            }
        }

        return lines;
    }

    render(){
        return(
            <div>
            {
                this.state.boxes.map((value, index) => (<Box key={index} cssStyle={value} boxId={`box-${index}`} />))
            }
            {
                this.state.lines.map((value, _, array) => (<Line key={value.id} line={value} setState={this.setState.bind(this)} lines={array}/>))
            }
            {
                this.state.dots.map((value, index) => (<Dot key={index} cssStyle={value} dotId={`dot-${index}`} />))
            }
            </div>
        );
    }
}

export default DotsAndBoxes;