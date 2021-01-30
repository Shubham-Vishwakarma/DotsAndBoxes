import './index.css'

import ILine from './ILine';

type Props = {
    line: ILine
    setState: any,
    lines: Array<ILine>
}

function Line(props: Props) { 

    let { line, setState, lines } =  props;

    const OnMouseEnter = (line: ILine) => {
        if(!line.selected){
            let newLines = lines.map(item => {
                if(item.id === line.id){
                    item.style = {...line.style, backgroundColor: 'rgba(0, 0, 0, 0.5)'};
                }
                return item;
            });

            setState({lines: newLines});
        }
    }
    
    const OnMouseLeave = (line: ILine) => {
        if(!line.selected){
            let newLines = lines.map(item => {
                if(item.id === line.id){
                    item.style = {...line.style, backgroundColor: 'rgba(181, 206, 245'};
                }
                return item;
            });

            setState({lines: newLines});
        }
    }

    const OnMouseDown = (line: ILine) => {
        let newLines = lines.map(item => {
            if(item.id === line.id){
                item.style = {...line.style, backgroundColor: '#002661'};
                item.selected = true;
            }
            return item;
        });

        setState({lines: newLines});
    }

    return (
        <div key={line.id} id={line.id} style={line.style} 
            onMouseDown={() => OnMouseDown(line)}
            onMouseEnter={() => OnMouseEnter(line)}
            onMouseLeave={() => OnMouseLeave(line)}></div>
    );
};

export default Line;