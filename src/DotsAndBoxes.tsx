import './index.css'

import React from 'react';

import Box from './Box';
import Dot from './Dot';
import Line from './Line';
import ILine from './ILine';
import IDot from './IDot';
import IBox from './IBox';
import BackgroundColorContext from './BackgroundColorContext';
import DotsAndBoxesHelper from './DotAndBoxesHelper';
import DotsAndBoxesUpdater from './DotsAndBoxesUpdater';

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
        const lines = DotsAndBoxesUpdater.updateLines(this.state.lines, line, this.context.backgroundColor, true);
        const dots: Array<IDot> = DotsAndBoxesUpdater.updateDots(this.state.dots, line, 'rgba(0, 38, 97, 0.6)', true)
        const boxes: Array<IBox> = DotsAndBoxesUpdater.updateBoxes(this.state.boxes, line, this.context.backgroundColor);

        this.context.changeBackgroundColor(this.context.backgroundColor);

        this.setState({lines: lines, dots: dots, boxes: boxes})
    }

    private onMouseEnter(line: ILine){
        const lines = DotsAndBoxesUpdater.updateLines(this.state.lines, line, 'rgba(0, 38, 97, 0.6)', false);
        const dots: Array<IDot> = DotsAndBoxesUpdater.updateDots(this.state.dots, line, 'rgba(0, 38, 97, 0.6)', false);
        
        this.setState({lines: lines, dots: dots});
    }

    private onMouseLeave(line: ILine){
        const lines = DotsAndBoxesUpdater.updateLines(this.state.lines, line, '#b5cef5', false);
        const dots: Array<IDot> = DotsAndBoxesUpdater.updateDots(this.state.dots, line, '#b5cef5', false);

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