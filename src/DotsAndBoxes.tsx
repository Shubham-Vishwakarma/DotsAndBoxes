import './index.css'

import React from 'react';

import Box from './Box';
import Dot from './Dot';
import Line from './Line';
import ILine, {Direction} from './ILine';
import IDot from './IDot';
import IBox from './IBox';
import BackgroundColorContext from './BackgroundColorContext';
import DotsAndBoxesHelper from './DotAndBoxesHelper';

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
        const boxes = DotsAndBoxesHelper.createBoxes(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        const dots = DotsAndBoxesHelper.createDots(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);
        const lines = DotsAndBoxesHelper.createLines(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns);

        this.setState({boxes: boxes, dots: dots, lines: lines});
    }

    componentDidUpdate(prevProps: Props){
        if(prevProps.parentWidth !== this.props.parentWidth ||
            prevProps.parentHeight !== this.props.parentHeight ||
            prevProps.numberOfRows !== this.props.numberOfRows ||
            prevProps.numberOfColumns !== this.props.numberOfColumns){
                const boxes = DotsAndBoxesHelper.updateBoxes(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns, this.state.boxes);
                const dots = DotsAndBoxesHelper.updateDots(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns, this.state.dots);
                const lines = DotsAndBoxesHelper.updateLines(this.props.parentWidth, this.props.parentHeight, this.props.numberOfRows, this.props.numberOfColumns, this.state.lines);
        
                this.setState({boxes: boxes, dots: dots, lines: lines});
            }
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