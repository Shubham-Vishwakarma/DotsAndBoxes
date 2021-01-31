import CSS from 'csstype'

interface IDot{
    id: string,
    row: number,
    column: number,
    style: CSS.Properties,
    selected: boolean
}

export default IDot;