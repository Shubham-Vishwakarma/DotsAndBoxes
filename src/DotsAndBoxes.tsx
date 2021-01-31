import './index.css'

import React from 'react';
import CSS from 'csstype';

import Box from './Box';
import Dot from './Dot';
import Utility from './Utility';
import Line from './Line';
import ILine, {Direction} from './ILine';
import IDot from './IDot';
import IBox from './IBox';
import BackgroundColorContext from './BackgroundColorContext';

type Props = {
    parentHeight: number,
    parentWidth: number,
    numberOfRows: number,
    numberOfColumns: number
}

type State = {
    boxes: Array<IBox>,
    dots: Array<IDot>,
    lines: Array<ILine>
}

class DotsAndBoxes extends React.Component<Props, State>{

    static contextType = BackgroundColorContext

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
    
    private createBoxes(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<IBox>{
        let boxWidth: number = Math.floor(parentWidth/numberOfRows);
        let boxHeight: number = Math.floor(parentHeight/numberOfColumns);
    
        const boxes: Array<IBox> = [];
    
        for(let i = 0; i < numberOfRows; i++){
            for(let j = 0; j < numberOfColumns; j++){
                const id = `box-${i}${j}`;
                
                const style: CSS.Properties = {
                    backgroundColor: 'white',
                    height: String(boxHeight).concat('px'),
                    width: String(boxWidth).concat('px'),
                    top: String(i * boxHeight).concat('px'),
                    left: String(j * boxWidth).concat('px'),
                    position: 'absolute'
                }
    
                boxes.push({id: id, row: i, column: j, style: style, selected: false, count: 0, backgroundColor: 'white'});
            }
        }

        return boxes;
    }

    private createDots(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<IDot>{
        const boxWidth: number = Math.floor(parentWidth/numberOfRows);
        const boxHeight: number = Math.floor(parentHeight/numberOfColumns);
        const numberOfRowDots: number = numberOfRows + 1;
        const numberOfColumnDots: number = numberOfColumns + 1;

        const dotDiameter: number = Math.floor(Utility.min(boxWidth, boxHeight) * 0.1);

        const dots: Array<IDot> = []

        for(let i = 0; i < numberOfRowDots; i++){
            for(let j = 0; j < numberOfColumnDots; j++){
                const id = `dot-${i}${j}`;

                const style: CSS.Properties = {
                    backgroundColor: 'white',
                    border: '2px solid #b5cef5',
                    height: String(dotDiameter).concat('px'),
                    width: String(dotDiameter).concat('px'),
                    borderRadius: '50%',
                    top: String(Math.floor(i * boxHeight - dotDiameter/2)).concat('px'),
                    left: String(Math.floor(j * boxWidth - dotDiameter/2)).concat('px'),
                    position: 'absolute'
                }
    
                dots.push({id: id,row: i, column: j, style: style, selected: false});
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
                    border: '4px solid #b5cef5',
                    width: String(boxWidth).concat('px'),
                    top: String(Math.floor(i * boxHeight - 6)).concat('px'),
                    left: String(Math.floor(j * boxWidth)).concat('px'),
                    position: 'absolute'
                }

                lines.push({id: id, direction: direction, row: i, column: j, style: style, selected: false});
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
                    border: '4px solid #b5cef5',
                    top: String(Math.floor(i * boxHeight)).concat('px'),
                    left: String(Math.floor(j * boxWidth - 6)).concat('px'),
                    position: 'absolute',
                }

                lines.push({id: id, direction: direction, row: i, column: j, style: style, selected: false});
            }
        }

        return lines;
    }

    private onMouseDown(line: ILine){
        //Update Lines
        const lines = this.state.lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: this.context.backgroundColor};
                item.selected = true;
            }
            return item;
        });

        //Update Dots
        let dots: Array<IDot> = []
        switch(line.direction){
            case Direction.Horizontal:
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column + 1))
                    {
                        item.style = {...item.style, border: '2px solid rgba(0, 38, 97, 0.6)'};
                        item.selected = true;
                    }
                    return item;
                });
                break;
            case Direction.Vertical: 
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row + 1 && item.column === line.column))
                    {
                        item.style = {...item.style, border: '2px solid rgba(0, 38, 97, 0.6)'};
                        item.selected = true;
                    }
                    return item;
                });
                break;
        }

        //Update Boxes
        let boxes: Array<IBox> = []
        switch(line.direction){
            case Direction.Horizontal: 
                boxes = this.state.boxes.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row - 1 && item.column === line.column))
                    {
                        item.count++;
                        item.selected = item.count === 4;
                        item.style = item.selected ? {...item.style, backgroundColor: this.context.backgroundColor} : {...item.style};
                        item.backgroundColor = item.selected ? this.context.backgroundColor : 'white';
                    }
                    return item;
                });
                break;
            case Direction.Vertical: 
                boxes = this.state.boxes.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column - 1))
                    {
                        item.count++;
                        item.selected = item.count === 4;
                        item.style = item.selected ? {...item.style, backgroundColor: this.context.backgroundColor} : {...item.style};
                        item.backgroundColor = item.selected ? this.context.backgroundColor : 'white';
                    }
                    return item;
                });
                break;
        }

        this.context.changeBackgroundColor(this.context.backgroundColor);

        this.setState({lines: lines, dots: dots, boxes: boxes})
    }

    private onMouseEnter(line: ILine){
        const lines = this.state.lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: 'rgba(0, 38, 97, 0.6)'};
            }
            return item;
        });

        //Update Dots
        let dots: Array<IDot> = []
        switch(line.direction){
            case Direction.Horizontal:
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column + 1))
                    {
                        item.style = {...item.style, border: '2px solid rgba(0, 38, 97, 0.6)'};
                    }
                    return item;
                });
                break;
            case Direction.Vertical: 
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row + 1 && item.column === line.column))
                    {
                        item.style = {...item.style, border: '2px solid rgba(0, 38, 97, 0.6)'};
                    }
                    return item;
                });
                break;
        }

        this.setState({lines: lines, dots: dots});
    }

    private onMouseLeave(line: ILine){
        const lines = this.state.lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: '#b5cef5'};
            }
            return item;
        });

        //Update Dots
        let dots: Array<IDot> = []
        switch(line.direction){
            case Direction.Horizontal:
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column + 1))
                    {
                        item.style = {...item.style, border: '2px solid #b5cef5',};
                    }
                    return item;
                });
                break;
            case Direction.Vertical: 
                dots = this.state.dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row + 1 && item.column === line.column))
                    {
                        item.style = {...item.style, border: '2px solid #b5cef5',};
                    }
                    return item;
                });
                break;
        }

        this.setState({lines: lines, dots: dots});
    }

    render(){
        return(
            <div>
            {
                this.state.boxes.map((box) => (<Box key={box.id} box={box} />))
            }
            {
                this.state.lines.map((line) => (<Line  key={line.id} 
                                                        line={line} 
                                                        onMouseDown={this.onMouseDown.bind(this)}
                                                        onMouseEnter={this.onMouseEnter.bind(this)}
                                                        onMouseLeave={this.onMouseLeave.bind(this)}
                                                    />))
            }
            {
                this.state.dots.map((dot) => (<Dot key={dot.id} dot={dot} />))
            }
            </div>
        );
    }
}

export default DotsAndBoxes;