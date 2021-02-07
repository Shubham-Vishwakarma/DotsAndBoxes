import './index.css'

import React, { useContext, useEffect, useState } from 'react';

import Box from './Box';
import Dot from './Dot';
import Line from './Line';
import ILine from './ILine';
import IDot from './IDot';
import IBox from './IBox';
import BackgroundColorContext from './BackgroundColorContext';
import DotsAndBoxesHelper from './DotAndBoxesHelper';
import DotsAndBoxesUpdater from './DotsAndBoxesUpdater';
import GameOverContext from './GameOverContext';
import ScoreContext from './ScoreContext';

type Props = {
    parentHeight: number,
    parentWidth: number,
    numberOfRows: number,
    numberOfColumns: number
}

function DotsAndBoxes(props: Props){

    const backgroundColorContext = useContext(BackgroundColorContext);
    const gameOverContext = useContext(GameOverContext);
    const scoreContext = useContext(ScoreContext);

    const [boxes, setBoxes] = useState<Array<IBox>>([]);
    const [dots, setDots] = useState<Array<IDot>>([]);
    const [lines, setLines] = useState<Array<ILine>>([]);

    useEffect(() => {
        if(boxes.length === 0 && dots.length === 0 && lines.length === 0){
            const nboxes = DotsAndBoxesHelper.createBoxes(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns);
            const ndots = DotsAndBoxesHelper.createDots(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns);
            const nlines = DotsAndBoxesHelper.createLines(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns);

            setBoxes(nboxes);
            setDots(ndots);
            setLines(nlines);
        }
        else 
        {
            const nboxes = DotsAndBoxesHelper.updateBoxes(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns, boxes);
            const ndots = DotsAndBoxesHelper.updateDots(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns, dots);
            const nlines = DotsAndBoxesHelper.updateLines(props.parentWidth, props.parentHeight, props.numberOfRows, props.numberOfColumns, lines);
        
            setBoxes(nboxes);
            setDots(ndots);
            setLines(nlines);
        }
    // eslint-disable-next-line
    }, [props]);

    function onMouseDown(line: ILine){
        const nlines = DotsAndBoxesUpdater.updateLines(lines, line, backgroundColorContext.backgroundColor, true);
        const ndots: Array<IDot> = DotsAndBoxesUpdater.updateDots(dots, line, 'rgba(0, 38, 97, 0.6)', true)
        const nboxes: Array<IBox> = DotsAndBoxesUpdater.updateBoxes(boxes, line, backgroundColorContext.backgroundColor);

        backgroundColorContext.changeBackgroundColor(backgroundColorContext.backgroundColor);
        
        setBoxes(nboxes);
        setDots(ndots);
        setLines(nlines);

        if(boxes.length > 0 && boxes.filter(box => box.selected === true).length === boxes.length){
            gameOverContext.setIsGameOver(gameOverContext.isGameOver);
            scoreContext.updateScore(boxes);
        }
    }

    function onMouseEnter(line: ILine){
        const nlines = DotsAndBoxesUpdater.updateLines(lines, line, 'rgba(0, 38, 97, 0.6)', false);
        const ndots: Array<IDot> = DotsAndBoxesUpdater.updateDots(dots, line, 'rgba(0, 38, 97, 0.6)', false);
        
        setDots(ndots);
        setLines(nlines);
    }

    function onMouseLeave(line: ILine){
        const nlines = DotsAndBoxesUpdater.updateLines(lines, line, '#b5cef5', false);
        const ndots: Array<IDot> = DotsAndBoxesUpdater.updateDots(dots, line, '#b5cef5', false);

        setDots(ndots);
        setLines(nlines);
    }

    return(
        <div>
        {
            boxes.map((box) => (<Box key={box.id} box={box} />))
        }
        {
            lines.map((line) => (<Line  key={line.id} 
                                                    line={line} 
                                                    onMouseDown={onMouseDown}
                                                    onMouseEnter={onMouseEnter}
                                                    onMouseLeave={onMouseLeave}
                                                />))
        }
        {
            dots.map((dot) => (<Dot key={dot.id} dot={dot} />))
        }
        </div>
    );

}

export default DotsAndBoxes;