import CSS from 'csstype';
import IBox from "./IBox";
import IDot from './IDot';
import ILine, { Direction } from './ILine';
import Utility from './Utility';

class DotsAndBoxesHelper {
    
    static createBoxes(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<IBox>{
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

    static createDots(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<IDot>{
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

    static createLines(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number): Array<ILine>{
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

    static updateBoxes(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number, boxes: Array<IBox>): Array<IBox>{
        let boxWidth: number = Math.floor(parentWidth/numberOfRows);
        let boxHeight: number = Math.floor(parentHeight/numberOfColumns);
    
        return boxes.map(box => {
            box.style = {...box.style, 
                            height: String(boxHeight).concat('px'), 
                            width: String(boxWidth).concat('px'),
                            top: String(box.row * boxHeight).concat('px'),
                            left: String(box.column * boxWidth).concat('px'),}
            return box;
        });
    }

    static updateDots(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number, dots: Array<IDot>): Array<IDot>{
        const boxWidth: number = Math.floor(parentWidth/numberOfRows);
        const boxHeight: number = Math.floor(parentHeight/numberOfColumns);
        
        const dotDiameter: number = Math.floor(Utility.min(boxWidth, boxHeight) * 0.1);

        return dots.map(dot => {
            dot.style = {
                            ...dot.style,
                            height: String(dotDiameter).concat('px'),
                            width: String(dotDiameter).concat('px'),
                            top: String(Math.floor(dot.row * boxHeight - dotDiameter/2)).concat('px'),
                            left: String(Math.floor(dot.column * boxWidth - dotDiameter/2)).concat('px'),
                        };
            return dot;
        });
    }

    static updateLines(parentWidth: number, parentHeight: number, numberOfRows: number, numberOfColumns: number, lines: Array<ILine>): Array<ILine>{
        const boxWidth: number = Math.floor(parentWidth/numberOfRows);
        const boxHeight: number = Math.floor(parentHeight/numberOfColumns);

        return lines.map(line => {
            switch(line.direction){
                case Direction.Horizontal:
                    line.style = {
                        ...line.style,
                        width: String(boxWidth).concat('px'),
                        top: String(Math.floor(line.row * boxHeight - 6)).concat('px'),
                        left: String(Math.floor(line.column * boxWidth)).concat('px'),
                    }
                    break;
                case Direction.Vertical:
                    line.style = {
                        ...line.style,
                        height: String(boxHeight).concat('px'),
                        top: String(Math.floor(line.row * boxHeight)).concat('px'),
                        left: String(Math.floor(line.column * boxWidth - 6)).concat('px'),
                    }
                    break;
            }
            return line;
        });
    }

}

export default DotsAndBoxesHelper;