import CSS from 'csstype';

interface IBox {
    id: string,
    row: number,
    column: number,
    style: CSS.Properties,
    selected: boolean
}

export default IBox;