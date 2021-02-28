import IBox from "./IBox";
import IDot from "./IDot";
import ILine, {Direction} from "./ILine";

class DotsAndBoxesUpdater{

    static updateLines(lines: Array<ILine>, line: ILine, backgroundColor: string, selected: boolean): Array<ILine> {
        return lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: backgroundColor};
                item.selected = selected;
            }
            return item;
        });
    }

    static updateDots(dots: Array<IDot>, line: ILine, backgroundColor: string, selected: boolean): Array<IDot> {
        switch(line.direction){
            case Direction.Horizontal:
                return dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column + 1))
                    {
                        item.style = {...item.style, border: `2px solid ${backgroundColor}`};
                        item.selected = selected;
                    }
                    return item;
                });
            case Direction.Vertical: 
                return dots.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row + 1 && item.column === line.column))
                    {
                        item.style = {...item.style, border: `2px solid ${backgroundColor}`};
                        item.selected = selected;
                    }
                    return item;
                });
        }
    }

    static updateBoxes(boxes: Array<IBox>, line: ILine, backgroundColor: string): Array<IBox> {
        switch(line.direction){
            case Direction.Horizontal: 
                return boxes.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row - 1 && item.column === line.column))
                    {
                        item.count++;
                        item.selected = item.count === 4;
                        item.style = item.selected ? {...item.style, backgroundColor: backgroundColor} : {...item.style};
                        item.backgroundColor = item.selected ? backgroundColor : 'white';
                    }
                    return item;
                });
            case Direction.Vertical: 
                return boxes.map(item => {
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column - 1))
                    {
                        item.count++;
                        item.selected = item.count === 4;
                        item.style = item.selected ? {...item.style, backgroundColor: backgroundColor} : {...item.style};
                        item.backgroundColor = item.selected ? backgroundColor : 'white';
                    }
                    return item;
                });
        }
    }

    static isAnyBoxCompleted(boxes: Array<IBox>, line: ILine): boolean {

        let completed = false;

        switch(line.direction){
            case Direction.Horizontal: 
                for(let i = 0; i < boxes.length; i++){
                    const item: IBox = boxes[i];
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row - 1 && item.column === line.column))
                    {
                        completed = item.count + 1 >= 4;
                        if(completed) break;
                    }
                }
                break;
            case Direction.Vertical: 
                for(let i = 0; i < boxes.length; i++){
                    const item: IBox = boxes[i];   
                    if((item.row === line.row && item.column === line.column) ||
                        (item.row === line.row && item.column === line.column - 1))
                    {
                        completed = item.count + 1 >= 4;
                        if(completed) break;
                    }
                }
                break;
        }

        return completed;
    }

}

export default DotsAndBoxesUpdater;