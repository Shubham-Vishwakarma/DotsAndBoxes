import CSS from 'csstype';

export enum Direction {
    Horizontal = "horizontal",
    Vertical = "vertical"
}

interface ILine {
    id: string,
    direction: Direction
    row: number,
    column: number,
    style: CSS.Properties
}

export default ILine;