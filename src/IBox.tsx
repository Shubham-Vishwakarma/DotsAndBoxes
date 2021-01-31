import CSS from 'csstype';

interface IBox {
    id: string,
    row: number,
    column: number,
    style: CSS.Properties,
    selected: boolean,
    count: number,
    backgroundColor: string
}

export default IBox;